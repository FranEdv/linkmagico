// auth.js - Sistema de Autenticação LinkMágico v6.0
const fs = require('fs');
const path = require('path');

// Função para carregar e validar API keys
function loadApiKeys() {
    try {
        const dataFile = path.join(__dirname, 'data', 'api_keys.json');
        if (!fs.existsSync(dataFile)) {
            console.log('⚠️ Arquivo de API keys não encontrado, criando estrutura...');
            const dataDir = path.join(__dirname, 'data');
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }
            
            const initialData = {
                apiKeys: [],
                saved: new Date().toISOString()
            };
            fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
            return new Map();
        }
        
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        const keyMap = new Map();
        
        if (data.apiKeys && Array.isArray(data.apiKeys)) {
            data.apiKeys.forEach(([key, info]) => {
                if (key && info && info.active) {
                    keyMap.set(key, info);
                }
            });
        }
        
        console.log(`📊 Carregadas ${keyMap.size} API keys ativas`);
        return keyMap;
    } catch (error) {
        console.error('❌ Erro ao carregar API keys:', error);
        return new Map();
    }
}

// Cache de API keys para performance
let apiKeysCache = loadApiKeys();
let lastCacheUpdate = Date.now();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

function refreshApiKeysCache() {
    const now = Date.now();
    if (now - lastCacheUpdate > CACHE_TTL) {
        apiKeysCache = loadApiKeys();
        lastCacheUpdate = now;
    }
}

// Função para validar API key
function validateApiKey(apiKey) {
    if (!apiKey || typeof apiKey !== 'string') {
        return { valid: false, reason: 'API key inválida' };
    }
    
    if (!apiKey.startsWith('lm_')) {
        return { valid: false, reason: 'Formato de API key inválido' };
    }
    
    refreshApiKeysCache();
    
    const keyInfo = apiKeysCache.get(apiKey);
    if (!keyInfo) {
        return { valid: false, reason: 'API key não encontrada' };
    }
    
    if (!keyInfo.active) {
        return { valid: false, reason: 'API key desativada' };
    }
    
    // Verificar limites (se implementado)
    if (keyInfo.limits) {
        const now = new Date();
        const today = now.toDateString();
        
        // Verificar limite diário (implementação básica)
        if (keyInfo.usage && keyInfo.usage.daily && keyInfo.usage.daily.date === today) {
            if (keyInfo.usage.daily.requests >= keyInfo.limits.dailyRequests) {
                return { valid: false, reason: 'Limite diário excedido' };
            }
        }
    }
    
    return { 
        valid: true, 
        client: {
            nome: keyInfo.client || 'Cliente',
            plano: keyInfo.plan || 'pro',
            created: keyInfo.created,
            limits: keyInfo.limits
        }
    };
}

// Middleware de autenticação condicional
function authMiddleware(req, res, next) {
    // Rotas que sempre são públicas
    const publicRoutes = [
        '/',
        '/health',
        '/privacy.html',
        '/privacy-policy',
        '/excluir-dados',
        '/delete-data',
        '/data-deletion',
        '/api/log-consent',
        '/api/data-deletion',
        '/widget.js',
        '/chatbot'
    ];
    
    // Se é rota pública, passa direto
    if (publicRoutes.includes(req.path)) {
        return next();
    }
    
    // Pegar API key do header ou query string
    const apiKey = req.headers['x-api-key'] || req.query.api_key || req.query.key;
    
    // Se não tem API key, permite (modo gratuito)
    if (!apiKey) {
        return next();
    }
    
    // Se tem API key, valida
    const validation = validateApiKey(apiKey);
    
    if (!validation.valid) {
        console.log(`🔒 API key rejeitada: ${validation.reason}`);
        return res.status(401).json({ 
            error: 'API key inválida',
            reason: validation.reason,
            hint: 'Verifique se sua API key está correta e ativa'
        });
    }
    
    // Salva informações do cliente na requisição
    req.cliente = validation.client;
    req.apiKey = apiKey;
    
    console.log(`✅ Cliente autenticado: ${validation.client.nome}`);
    next();
}

// Middleware específico para páginas HTML que precisam de auth
function htmlAuthMiddleware(req, res, next) {
    // Páginas HTML que precisam de autenticação obrigatória
    const protectedHtmlRoutes = [];
    
    if (!protectedHtmlRoutes.includes(req.path)) {
        return next();
    }
    
    const apiKey = req.headers['x-api-key'] || req.query.api_key || req.query.key;
    
    if (!apiKey) {
        return res.status(401).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Autenticação Necessária</title>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                    .error { color: #dc3545; }
                </style>
            </head>
            <body>
                <h1 class="error">🔒 Autenticação Necessária</h1>
                <p>Esta página requer uma API key válida.</p>
                <p>Adicione ?api_key=sua_chave_aqui na URL</p>
            </body>
            </html>
        `);
    }
    
    const validation = validateApiKey(apiKey);
    
    if (!validation.valid) {
        return res.status(401).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>API Key Inválida</title>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                    .error { color: #dc3545; }
                </style>
            </head>
            <body>
                <h1 class="error">❌ API Key Inválida</h1>
                <p>Motivo: ${validation.reason}</p>
                <p>Verifique se sua API key está correta e ativa.</p>
            </body>
            </html>
        `);
    }
    
    req.cliente = validation.client;
    req.apiKey = apiKey;
    next();
}

// Função para criar rota de validação de API key
function createValidationRoute(app) {
    app.get('/api/validate-key', (req, res) => {
        const apiKey = req.headers['x-api-key'] || req.query.api_key || req.query.key;
        
        if (!apiKey) {
            return res.status(400).json({
                valid: false,
                error: 'API key não fornecida'
            });
        }
        
        const validation = validateApiKey(apiKey);
        
        if (!validation.valid) {
            return res.status(401).json({
                valid: false,
                error: validation.reason
            });
        }
        
        res.json({
            valid: true,
            client: validation.client.nome,
            plan: validation.client.plano,
            created: validation.client.created
        });
    });
    
    console.log('📡 Rota de validação de API key criada: /api/validate-key');
}

// Função para atualizar uso da API key
function updateKeyUsage(apiKey, operation = 'request') {
    try {
        refreshApiKeysCache();
        
        const dataFile = path.join(__dirname, 'data', 'api_keys.json');
        if (!fs.existsSync(dataFile)) return;
        
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        
        if (!data.apiKeys || !Array.isArray(data.apiKeys)) return;
        
        const keyIndex = data.apiKeys.findIndex(([key]) => key === apiKey);
        
        if (keyIndex === -1) return;
        
        const [key, keyInfo] = data.apiKeys[keyIndex];
        
        if (!keyInfo.usage) {
            keyInfo.usage = {
                requests: 0,
                chatbots: 0,
                extractions: 0
            };
        }
        
        // Incrementar contador
        keyInfo.usage.requests = (keyInfo.usage.requests || 0) + 1;
        
        if (operation === 'chatbot') {
            keyInfo.usage.chatbots = (keyInfo.usage.chatbots || 0) + 1;
        }
        
        if (operation === 'extraction') {
            keyInfo.usage.extractions = (keyInfo.usage.extractions || 0) + 1;
        }
        
        // Atualizar timestamp de último uso
        keyInfo.lastUsed = new Date().toISOString();
        
        // Salvar
        data.apiKeys[keyIndex] = [key, keyInfo];
        data.saved = new Date().toISOString();
        
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        
        // Atualizar cache
        apiKeysCache.set(apiKey, keyInfo);
        
        console.log(`📈 Uso atualizado para ${keyInfo.client}: ${keyInfo.usage.requests} requests`);
        
    } catch (error) {
        console.error('❌ Erro ao atualizar uso da API key:', error);
    }
}

// Middleware para rastrear uso
function trackUsageMiddleware(req, res, next) {
    const originalSend = res.send;
    
    res.send = function(data) {
        // Se a requisição foi bem-sucedida e tem API key, rastreia uso
        if (req.apiKey && res.statusCode < 400) {
            let operation = 'request';
            
            if (req.path === '/extract') {
                operation = 'extraction';
            } else if (req.path === '/chat-universal') {
                operation = 'chatbot';
            }
            
            updateKeyUsage(req.apiKey, operation);
        }
        
        originalSend.call(this, data);
    };
    
    next();
}

module.exports = {
    authMiddleware,
    htmlAuthMiddleware,
    createValidationRoute,
    validateApiKey,
    updateKeyUsage,
    trackUsageMiddleware,
    loadApiKeys
};
