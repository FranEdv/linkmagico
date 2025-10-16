                break;
            default:
                respostaBase += "Aqui estão as informações que você precisa: ";
        }

        return respostaBase;
    }

    // ===== SISTEMA DE AGENDAMENTO INTELIGENTE =====
    detectarAgendamento(mensagem) {
        const mensagemLower = mensagem.toLowerCase();
        const palavrasAgendamento = [
            'agendar', 'marcar', 'reunião', 'reuniao', 'encontro', 'consulta',
            'horário', 'horario', 'data', 'hora', 'telefone', 'call', 'vídeo',
            'video', 'encontro', 'conversar', 'falar', 'ligar', 'whatsapp'
        ];

        const isAgendamento = palavrasAgendamento.some(palavra => 
            mensagemLower.includes(palavra)
        );

        if (isAgendamento) {
            console.log("📅 Solicitação de agendamento detectada");
            return this.gerarOpcoesAgendamento();
        }

        return null;
    }

    gerarOpcoesAgendamento() {
        const horarios = this.horariosDisponiveis.slice(0, 3); // 3 primeiros horários
        let resposta = `**📅 AGENDAMENTO DISPONÍVEL**\n\n`;
        resposta += `Encontrei estes horários para nossa conversa:\n\n`;
        
        horarios.forEach((horario, index) => {
            resposta += `${index + 1}. ${horario}\n`;
        });
        
        resposta += `\n💬 **Qual horário prefere?**\n`;
        resposta += `📞 Ou se preferir, posso passar nossos contatos diretos!`;
        
        return resposta;
    }

    processarAgendamento(mensagem) {
        const mensagemLower = mensagem.toLowerCase();
        
        // Detectar seleção de horário
        for (let i = 0; i < this.horariosDisponiveis.length; i++) {
            if (mensagemLower.includes((i + 1).toString()) || 
                mensagemLower.includes(this.horariosDisponiveis[i].toLowerCase())) {
                
                return `✅ **AGENDAMENTO CONFIRMADO!**\n\n` +
                       `📅 **Horário:** ${this.horariosDisponiveis[i]}\n` +
                       `🎯 **Próximo passo:** Nossa equipe entrará em contato para confirmar.\n` +
                       `📞 **Contato direto:** Veja nossos canais acima! ⬆️`;
            }
        }

        return null;
    }
}

// Inicializar SuperInteligência
const superInteligencia = new SuperInteligenciaEmocional();

// ===== SISTEMA DE BOTÕES FIXOS NO TOPO =====
function gerarBotoesFixos(contatos, robotName) {
    let botoesHTML = `
    <div class="lm-botoes-fixos" style="
        position: sticky; 
        top: 0; 
        background: white; 
        padding: 15px; 
        border-bottom: 2px solid #3b82f6;
        z-index: 1000;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    ">
        <div style="font-weight: bold; color: #1e40af; width: 100%; text-align: center; margin-bottom: 10px;">
            📞 Fale com ${robotName}
        </div>
    `;

    // Botão de WhatsApp
    if (contatos.whatsapp && contatos.whatsapp.length > 0) {
        const whatsappNum = contatos.whatsapp[0].replace(/\D/g, '');
        botoesHTML += `
        <a href="https://wa.me/${whatsappNum}" target="_blank" style="
            background: #25D366; 
            color: white; 
            padding: 12px 20px; 
            border-radius: 25px; 
            text-decoration: none; 
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
            box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3);
        " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 12px rgba(37, 211, 102, 0.4)';" 
           onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(37, 211, 102, 0.3)';">
            <i class="fab fa-whatsapp"></i> WhatsApp
        </a>`;
    }

    // Botão de Telefone
    if (contatos.telefone && contatos.telefone.length > 0) {
        const telefoneNum = contatos.telefone[0].replace(/\D/g, '');
        botoesHTML += `
        <a href="tel:${telefoneNum}" style="
            background: #3b82f6; 
            color: white; 
            padding: 12px 20px; 
            border-radius: 25px; 
            text-decoration: none; 
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.4)';" 
           onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(59, 130, 246, 0.3)';">
            <i class="fas fa-phone"></i> Ligar
        </a>`;
    }

    // Botão de Agendamento
    botoesHTML += `
    <button onclick="iniciarAgendamento()" style="
        background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); 
        color: white; 
        padding: 12px 20px; 
        border-radius: 25px; 
        border: none;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
    " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 12px rgba(139, 92, 246, 0.4)';" 
       onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(139, 92, 246, 0.3)';">
        <i class="fas fa-calendar-check"></i> Agendar
    </button>`;

    // Botão de Site
    if (contatos.site && contatos.site.length > 0) {
        botoesHTML += `
        <a href="${contatos.site[0]}" target="_blank" style="
            background: #10B981; 
            color: white; 
            padding: 12px 20px; 
            border-radius: 25px; 
            text-decoration: none; 
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
        " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 12px rgba(16, 185, 129, 0.4)';" 
           onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(16, 185, 129, 0.3)';">
            <i class="fas fa-globe"></i> Site
        </a>`;
    }

    botoesHTML += `</div>`;

    return botoesHTML;
}

// ===== Enhanced Logger =====
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

// ===== SISTEMA APRIMORADO DE DETECÇÃO DE BÔNUS =====
class SistemaExtracaoApurado {
    constructor() {
        this.termosBonus = [
            'bônus', 'bonus', 'brinde', 'presente', 'extra', 'grátis', 'gratis',
            'incluído', 'incluido', 'adicional', 'oferta', 'promocional',
            'regalo', 'complemento', 'vantagem', 'benefício', 'beneficio',
            'exclusivo', 'limitado', 'especial', 'oferta especial'
        ];
    }

    async extrairDadosCompletos(url) {
        try {
            console.log('🌐 [EXTRACAO APRIMORADA] Conectando à:', url);
            const { data } = await axios.get(url, {
                timeout: 30000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });
            
            const $ = cheerio.load(data);
            const dadosExtraidos = {
                titulo: this.limparTexto($('title').text()),
                descricao: this.limparTexto($('meta[name="description"]').attr('content')),
                textos: this.extrairTextosRelevantes($),
                bonus: this.buscarInformacoesBonus($),
                preco: this.extrairPrecos($),
                garantia: this.extrairGarantia($),
                secoesEspeciais: this.extrairSecoesEspeciais($),
                metadados: this.extrairMetadados($),
                // 🎯 MELHORIA: Usar sistema aprimorado de extração de contatos
                contatos: sistemaContatosAprimorado.extrairContatosAprimorado($)
            };

            console.log(`✅ [EXTRACAO] Concluída: ${dadosExtraidos.bonus.length} bônus encontrados`);
            return dadosExtraidos;
        } catch (error) {
            console.error('❌ [EXTRACAO] Erro:', error.message);
            return { erro: 'Falha na extração: ' + error.message };
        }
    }

    // 🎯 FUNÇÃO MANTIDA PARA COMPATIBILIDADE
    extrairContatos($) {
        return sistemaContatosAprimorado.extrairContatosAprimorado($);
    }

    extrairTextosRelevantes($) {
        const textos = [];
        const seletores = [
            'h1, h2, h3, h4',
            '.card, .benefit, .feature',
            '[class*="bonus"], [class*="bônus"]',
            '[class*="offer"], [class*="oferta"]',
            '.pricing, .price, .valor',
            '.guarantee, .garantia',
            'section, .section, .container',
            'p, span, div'
        ].join(', ');

        $(seletores).each((i, elem) => {
            const texto = this.limparTexto($(elem).text());
            if (texto && texto.length > 5 && texto.length < 500) {
                textos.push(texto);
            }
        });

        return [...new Set(textos)];
    }

    buscarInformacoesBonus($) {
        const bonusEncontrados = [];
        const elementosAlvo = [
            '[class*="bonus"]', '[class*="bônus"]', '[class*="gift"]',
            '[class*="presente"]', '[class*="extra"]', '.offer, .oferta',
            '.special, .especial', '.bonus-item', '.bonus-section'
        ];

        elementosAlvo.forEach(seletor => {
            $(seletor).each((i, elem) => {
                const texto = this.limparTexto($(elem).text());
                if (texto && this.contemTermoBonus(texto)) {
                    bonusEncontrados.push({
                        elemento: seletor,
                        conteudo: texto,
                        contexto: this.obterContexto($, elem),
                        tipo: 'busca_especifica'
                    });
                }
            });
        });

        // Busca geral como fallback
        $('body *').each((i, elem) => {
            const texto = this.limparTexto($(elem).text());
            if (texto && this.contemTermoBonus(texto) && texto.length < 500) {
                const jaExiste = bonusEncontrados.some(b => b.conteudo === texto);
                if (!jaExiste) {
                    bonusEncontrados.push({
                        elemento: elem.name || 'elemento',
                        conteudo: texto,
                        contexto: { tipo: 'busca_geral' },
                        tipo: 'busca_geral'
                    });
                }
            }
        });

        return bonusEncontrados;
    }

    contemTermoBonus(texto) {
        if (!texto) return false;
        const textoLower = texto.toLowerCase();
        return this.termosBonus.some(termo => textoLower.includes(termo));
    }

    obterContexto($, elemento) {
        const $elemento = $(elemento);
        const pai = $elemento.parent();
        return {
            elementoPai: pai.prop('tagName') || 'div',
            classePai: pai.attr('class') || '',
            irmaos: pai.children().length
        };
    }

    extrairPrecos($) {
        const precos = [];
        const seletoresPreco = [
            '[class*="price"]', '[class*="preco"]', '[class*="valor"]',
            '.pricing, .cost, .money', '.currency'
        ];

        seletoresPreco.forEach(seletor => {
            $(seletor).each((i, elem) => {
                const texto = this.limparTexto($(elem).text());
                if (texto && /R\$\s?\d+[.,]\d+|\d+[.,]\d+\s?reais/i.test(texto)) {
                    precos.push(texto);
                }
            });
        });

        return precos;
    }

    extrairGarantia($) {
        const garantias = [];
        const seletoresGarantia = [
            '[class*="garantia"]', '[class*="guarantee"]', '[class*="warranty"]',
            '.safe, .security, .refund'
        ];

        seletoresGarantia.forEach(seletor => {
            $(seletor).each((i, elem) => {
                const texto = this.limparTexto($(elem).text());
                if (texto && /garantia|devolução|reembolso|segurança/i.test(texto)) {
                    garantias.push(texto);
                }
            });
        });

        return garantias;
    }

    extrairSecoesEspeciais($) {
        const secoes = [];
        const secoesAlvo = [
            'section', 'div[class*="section"]', 'div[class*="container"]',
            '.offer-section', '.bonus-area', '.special-offer'
        ];

        secoesAlvo.forEach(seletor => {
            $(seletor).each((i, elem) => {
                const $elem = $(elem);
                const texto = this.limparTexto($elem.text());
                
                if (texto.length > 50 && texto.length < 1000) {
                    const termosRelevantes = this.termosBonus.concat([
                        'oferta', 'promoção', 'limitado', 'exclusivo', 'especial'
                    ]);
                    
                    const ehRelevante = termosRelevantes.some(termo => 
                        texto.toLowerCase().includes(termo)
                    );

                    if (ehRelevante) {
                        secoes.push({
                            tipo: seletor,
                            conteudo: texto.substring(0, 300),
                            tamanho: texto.length
                        });
                    }
                }
            });
        });

        return secoes;
    }

    extrairMetadados($) {
        return {
            ogTitle: this.limparTexto($('meta[property="og:title"]').attr('content')),
            ogDescription: this.limparTexto($('meta[property="og:description"]').attr('content')),
            keywords: this.limparTexto($('meta[name="keywords"]').attr('content')),
            canonical: this.limparTexto($('link[rel="canonical"]').attr('href'))
        };
    }

    limparTexto(texto) {
        if (!texto) return '';
        return texto
            .replace(/\s+/g, ' ')
            .replace(/\n/g, ' ')
            .trim();
    }
}

class ValidacaoCruzada {
    constructor() {
        this.termosBonus = [
            'bônus', 'bonus', 'brinde', 'presente', 'extra', 'grátis', 'gratis',
            'incluído', 'incluido', 'adicional', 'oferta', 'promocional'
        ];
    }

    validarDadosCompletos(dadosExtraidos) {
        console.log('🔍 [VALIDAÇÃO] Iniciando validação cruzada...');
        
        const validacoes = {
            bonus: this.validarBonusCruzado(dadosExtraidos),
            preco: this.validarPrecos(dadosExtraidos),
            garantia: this.validarGarantia(dadosExtraidos),
            consistencia: this.validarConsistencia(dadosExtraidos)
        };

        const dadosValidados = this.aplicarCorrecoes(dadosExtraidos, validacoes);
        const pontuacaoConfianca = this.calcularPontuacaoConfianca(validacoes);

        console.log(`✅ [VALIDAÇÃO] Concluída: ${pontuacaoConfianca * 100}% de confiança`);

        return {
            dadosValidados,
            pontuacaoConfianca,
            problemasCriticos: this.identificarProblemasCriticos(validacoes)
        };
    }

    validarBonusCruzado(dados) {
        const fontes = {
            bonusDireto: dados.bonus || [],
            secoesEspeciais: this.buscarBonusEmSecoes(dados.secoesEspeciais || []),
            textosRelevantes: this.buscarBonusEmTextos(dados.textos || [])
        };

        const todosBonus = [
            ...fontes.bonusDireto,
            ...fontes.secoesEspeciais,
            ...fontes.textosRelevantes
        ];

        const bonusUnicos = this.removerDuplicatas(todosBonus);

        return {
            fontes,
            bonusUnificados: bonusUnicos,
            totalEncontrado: bonusUnicos.length,
            confiabilidade: this.calcularConfiabilidadeBonus(fontes, bonusUnicos)
        };
    }

    buscarBonusEmSecoes(secoes) {
        const bonusEncontrados = [];
        
        secoes.forEach(secao => {
            const texto = secao.conteudo.toLowerCase();
            const termosEncontrados = this.termosBonus.filter(termo => 
                texto.includes(termo)
            );

            if (termosEncontrados.length > 0) {
                bonusEncontrados.push({
                    elemento: `secao_${secao.tipo}`,
                    conteudo: secao.conteudo.substring(0, 200),
                    contexto: { tipo: 'secao_especial', termos: termosEncontrados }
                });
            }
        });

        return bonusEncontrados;
    }

    buscarBonusEmTextos(textos) {
        const bonusEncontrados = [];
        
        textos.forEach(texto => {
            if (this.contemTermoBonus(texto)) {
                bonusEncontrados.push({
                    elemento: 'texto_geral',
                    conteudo: texto,
                    contexto: { tipo: 'texto_relevante' }
                });
            }
        });

        return bonusEncontrados;
    }

    contemTermoBonus(texto) {
        if (!texto) return false;
        return this.termosBonus.some(termo => 
            texto.toLowerCase().includes(termo.toLowerCase())
        );
    }

    removerDuplicatas(bonusArray) {
        const seen = new Set();
        return bonusArray.filter(item => {
            const key = item.conteudo.toLowerCase().trim();
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    validarPrecos(dados) {
        const precosEncontrados = [...(dados.preco || [])];
        return {
            precos: precosEncontrados,
            total: precosEncontrados.length
        };
    }

    validarGarantia(dados) {
        const garantias = [...(dados.garantia || [])];
        return {
            garantias: garantias,
            total: garantias.length
        };
    }

    validarConsistencia(dados) {
        const inconsistencias = [];
        
        if (dados.bonus && dados.bonus.length > 0 && 
            (!dados.preco || dados.preco.length === 0)) {
            inconsistencias.push('Bônus encontrados mas preços não identificados');
        }

        return {
            consistente: inconsistencias.length === 0,
            inconsistencias,
            score: Math.max(0, 10 - inconsistencias.length) / 10
        };
    }

    calcularConfiabilidadeBonus(fontes, bonusUnicos) {
        const pesos = {
            bonusDireto: 1.0,
            secoesEspeciais: 0.8,
            textosRelevantes: 0.6
        };

        let score = 0;
        let totalPeso = 0;

        Object.keys(fontes).forEach(fonte => {
            if (fontes[fonte].length > 0) {
                score += pesos[fonte] * fontes[fonte].length;
                totalPeso += pesos[fonte];
            }
        });

        return totalPeso > 0 ? (score / totalPeso) / Math.max(1, bonusUnicos.length) : 0;
    }

    calcularPontuacaoConfianca(validacoes) {
        const pesos = {
            bonus: 0.4,
            preco: 0.2,
            garantia: 0.2,
            consistencia: 0.2
        };

        let pontuacao = 0;
        pontuacao += validacoes.bonus.confiabilidade * pesos.bonus;
        pontuacao += (validacoes.preco.total > 0 ? 1 : 0.5) * pesos.preco;
        pontuacao += (validacoes.garantia.total > 0 ? 1 : 0.3) * pesos.garantia;
        pontuacao += validacoes.consistencia.score * pesos.consistencia;

        return Math.min(1, pontuacao);
    }

    identificarProblemasCriticos(validacoes) {
        const problemas = [];
        if (validacoes.bonus.totalEncontrado === 0) {
            problemas.push('NENHUM bônus identificado após validação cruzada');
        }
        if (validacoes.preco.total === 0) {
            problemas.push('NENHUM preço identificado');
        }
        if (validacoes.consistencia.inconsistencias.length > 0) {
            problemas.push(...validacoes.consistencia.inconsistencias);
        }
        return problemas;
    }

    aplicarCorrecoes(dados, validacoes) {
        const dadosCorrigidos = { ...dados };
        if (validacoes.bonus.bonusUnificados.length > 0) {
            dadosCorrigidos.bonus = validacoes.bonus.bonusUnificados;
        }
        return dadosCorrigidos;
    }
}

// Instâncias globais dos sistemas
const sistemaExtracao = new SistemaExtracaoApurado();
const sistemaValidacao = new ValidacaoCruzada();

// ===== FIM DO SISTEMA APRIMORADO =====

// Trust proxy for accurate IP addresses
app.set("trust proxy", true);

// ===== Session Configuration =====
let sessionConfig = {
    secret: process.env.SESSION_SECRET || "fallback-secret-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

// Usa Redis se disponível, caso contrário mostra aviso
if (process.env.REDIS_URL) {
    const RedisStore = require("connect-redis").default;
    const redis = require("redis");
    
    const redisClient = redis.createClient({
        url: process.env.REDIS_URL
    });
    
    redisClient.connect().catch(console.error);
    
    sessionConfig.store = new RedisStore({
        client: redisClient,
        prefix: "linkmagico:"
    });
    
    console.log("✅ Redis configurado para sessões");
} else {
    console.warn("⚠️  Redis não configurado - usando MemoryStore (não recomendado para produção)");
}

app.use(session(sessionConfig));

// ===== Middleware =====
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://kit.fontawesome.com", "https://ka-f.fontawesome.com"],
            styleSrc: ["'self'", "https://fonts.googleapis.com", "https://ka-f.fontawesome.com", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https://*"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://ka-f.fontawesome.com"],
            connectSrc: ["'self'", "https://linkmagico-comercial.onrender.com", "https://link-m-gico-v6-0-hmpl.onrender.com"], // Adicionar domínios da API
            frameSrc: ["'self'"],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"],
            upgradeInsecureRequests: [],
            reportUri: "/report-csp-violation" // Endpoint para relatar violações de CSP
        },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// Endpoint para relatar violações de CSP
app.post('/report-csp-violation', (req, res) => {
    if (req.body) {
        logger.warn('CSP Violation: %j', req.body);
    } else {
        logger.warn('CSP Violation: No data received!');
    }
    res.status(204).send();
});

app.use(cors({
    origin: ["https://linkmagico-comercial.onrender.com", "https://link-m-gico-v6-0-hmpl.onrender.com", "http://localhost:3000", "http://localhost:8080"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "X-API-Key"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));

app.use(morgan("combined"));

// ===== API Key Validation Functions =====
function loadApiKeys() {
    try {
        if (process.env.API_KEYS_JSON) {
            logger.info("Loading API keys from environment variable");
            return JSON.parse(process.env.API_KEYS_JSON);
        }
        
        logger.warn("No API keys found in environment variable API_KEYS_JSON");
    } catch (error) {
        logger.error("Error loading API keys:", error.message);
    }
    return {};
}

function validateApiKey(apiKey) {
    const apiKeys = loadApiKeys();
    const keyData = apiKeys[apiKey];
    
    if (keyData && keyData.active !== false) {
        return {
            success: true,
            client: {
                nome: keyData.nome || "API Client",
                plano: keyData.plano || "basic",
                apiKey: apiKey
            }
        };
    }
    
    return { success: false };
}

// ===== API Key Middleware =====
function requireApiKey(req, res, next) {
    logger.info(`[requireApiKey] Path: ${req.path}, Session Validated: ${!!(req.session && req.session.validatedApiKey)}`);

    // Permitir acesso a rotas públicas sem API Key
    if (req.path === "/" || req.path === "/validate-api-key" || req.path.startsWith("/public/") || req.path === "/chat.html" || req.path === "/chatbot") {
        return next();
    }

    let apiKey = req.headers["authorization"] && req.headers["authorization"].split(" ")[1]; // Apenas via cabeçalho Authorization

    if (apiKey) {
        const validation = validateApiKey(apiKey);
        if (validation.success) {
            req.session.validatedApiKey = apiKey;
            req.session.clientData = validation.client;
            req.cliente = validation.client;
            return next();
        }
    }

    if (req.session && req.session.validatedApiKey) {
        req.cliente = req.session.clientData;
        return next();
    }

    // Se a API Key não for encontrada ou for inválida, e não houver sessão validada, retornar erro 401
    return res.status(401).json({ success: false, error: "API Key não fornecida ou inválida" });
}

app.use(requireApiKey);

// ===== Static Files with API Key Protection =====
app.get("/", (req, res) => {
    logger.info(`[GET /] Session Validated: ${!!(req.session && req.session.validatedApiKey)}`);
    if (req.session && req.session.validatedApiKey) {
        return res.redirect("/app");
    }
    res.sendFile(path.join(__dirname, "public", "api_key_validation.html"));
});

app.post("/validate-api-key", (req, res) => {
    const { apiKey } = req.body;
    
    if (!apiKey) {
        return res.status(400).json({ 
            success: false, 
            error: "API Key é obrigatória" 
        });
    }

    const validation = validateApiKey(apiKey);
    if (!validation.success) {
        return res.status(401).json({ 
            success: false, 
            error: "API Key inválida" 
        });
    }

    req.session.validatedApiKey = apiKey;
    req.session.clientData = validation.client;
    req.cliente = validation.client; // Ensure req.cliente is set immediately after validation
    
    res.json({ 
        success: true, 
        message: "API Key validada com sucesso" 
    });
});

app.get("/app", (req, res) => {
    if (!req.cliente || !req.cliente.apiKey) {
        return res.redirect("/"); // Redireciona se não houver API Key validada
    }

    const filePath = path.join(__dirname, "public", "index_app.html");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            logger.error("Error reading index_app.html:", err);
            return res.status(500).send("Erro interno do servidor");
        }
        const modifiedHtml = data.replace("\"YOUR_API_KEY_PLACEHOLDER\"", `\"${req.cliente.apiKey}\"`)
                               .replace("<!-- WIDGET_SCRIPT_PLACEHOLDER -->", "<script src=\"/public/script.js\"></script>");
        res.send(modifiedHtml);
    });
});

app.get("/privacy.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "privacy.html"));
});

app.get("/excluir-dados", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "excluir-dados.html"));
});

// ===== ROTAS DE ADMINISTRAÇÃO DE LEADS =====
app.get("/admin/leads", requireApiKey, (req, res) => {
    const leadSystem = getLeadSystem(req.cliente.apiKey);
    const leads = leadSystem.getLeads();
    console.log(`📊 Retornando ${leads.length} leads para admin`);
    res.json({
        success: true,
        leads: leads,
        total: leads.length
    });
});

app.get("/admin/leads/:id", requireApiKey, (req, res) => {
    const leadSystem = getLeadSystem(req.cliente.apiKey);
    const lead = leadSystem.getLeadById(req.params.id);
    if (lead) {
        res.json({ success: true, lead });
    } else {
        res.status(404).json({ success: false, error: "Lead não encontrado" });
    }
});

// ===== ROTAS DE BACKUP DE LEADS =====
app.post("/admin/leads/backup/create", requireApiKey, (req, res) => {
    const leadSystem = getLeadSystem(req.cliente.apiKey);
    const backupSystem = getBackupSystem(leadSystem, req.cliente.apiKey);
    const result = backupSystem.createBackup("manual");
    res.json(result);
});

app.get("/admin/leads/backup/list", requireApiKey, (req, res) => {
    const leadSystem = getLeadSystem(req.cliente.apiKey);
    const backupSystem = getBackupSystem(leadSystem, req.cliente.apiKey);
    const backups = backupSystem.listBackups();
    res.json({
        success: true,
        backups: backups,
        total: backups.length
    });
});

app.post("/admin/leads/backup/restore", requireApiKey, (req, res) => {
    const { filename } = req.body;
    
    if (!filename) {
        return res.status(400).json({
            success: false,
            error: "Nome do arquivo de backup é obrigatório"
        });
    }
    const leadSystem = getLeadSystem(req.cliente.apiKey);
    const backupSystem = getBackupSystem(leadSystem, req.cliente.apiKey);
    const result = backupSystem.restoreBackup(filename);
    res.json(result);
});

// ROTA CHAT.HTML
app.get("/chat.html", (req, res) => {
    const robotName = req.query.name || "Assistente IA";
    const url = req.query.url || "";
    const instructions = req.query.instructions || "";
    
    const chatbotHTML = generateChatbotHTML({ robotName, url, instructions });
    res.send(chatbotHTML);
});

// ROTA CHATBOT COMPLETA
app.get("/chatbot", async (req, res) => {
    try {
        const robotName = req.query.name || "Assistente IA";
        const url = req.query.url || "";
        const instructions = req.query.instructions || "";
        
        let pageData = {};
        if (url) {
            try {
                pageData = await extractPageData(url);
            } catch (extractError) {
                console.warn('Failed to extract page data:', extractError.message || extractError);
            }
        }
        
        const html = generateFullChatbotHTML(pageData, robotName, instructions);
        res.set('Content-Type', 'text/html');
        res.send(html);
    } catch (error) {
        logger.error('Chatbot route error:', error.message || error);
        res.status(500).send('Erro interno ao gerar chatbot');
    }
});

app.use("/public", express.static(path.join(__dirname, "public"), {
    maxAge: "1d",
    etag: true,
    lastModified: true
}));

app.use(express.static("public", {
    maxAge: "1d",
    etag: true,
    lastModified: true
}));

// ===== Analytics & Cache =====
const analytics = {
    totalRequests: 0,
    chatRequests: 0,
    extractRequests: 0,
    errors: 0,
    activeChats: new Set(),
    startTime: Date.now(),
    responseTimeHistory: [],
    successfulExtractions: 0,
    failedExtractions: 0,
    leadsCaptured: 0
};

app.use((req, res, next) => {
    const start = Date.now();
    analytics.totalRequests++;

    res.on("finish", () => {
        const responseTime = Date.now() - start;
        analytics.responseTimeHistory.push(responseTime);
        if (analytics.responseTimeHistory.length > 100) analytics.responseTimeHistory.shift();
        if (res.statusCode >= 400) analytics.errors++;
    });

    next();
});

const dataCache = new Map();
const CACHE_TTL = 30 * 60 * 1000;

function setCacheData(key, data) {
    dataCache.set(key, { data, timestamp: Date.now() });
}

function getCacheData(key) {
    const cached = dataCache.get(key);
    if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
        return cached.data;
    }
    dataCache.delete(key);
    return null;
}

// ===== Utility functions =====
function normalizeText(text) {
    return (text || "").replace(/\s+/g, " ").trim();
}

function uniqueLines(text) {
    if (!text) return "";
    const seen = new Set();
    return text.split("\n")
        .map(line => line.trim())
        .filter(Boolean)
        .filter(line => {
            if (seen.has(line)) return false;
            seen.add(line);
            return true;
        })
        .join("\n");
}

function clampSentences(text, maxSentences = 2) {
    if (!text) return "";
    const sentences = normalizeText(text).split(/(?<=[.!?])\s+/);
    return sentences.slice(0, maxSentences).join(" ");
}

function extractBonuses(text) {
    if (!text) return [];
    const bonusKeywords = /(bônus|bonus|brinde|extra|grátis|template|planilha|checklist|e-book|ebook)/gi;
    const lines = String(text).split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const bonuses = [];

    for (const line of lines) {
        if (bonusKeywords.test(line) && line.length > 10 && line.length < 200) {
            bonuses.push(line);
            if (bonuses.length >= 5) break;
        }
    }
    return Array.from(new Set(bonuses));
}

// ===== Content extraction =====
function extractCleanTextFromHTML(html) {
    try {
        const $ = cheerio.load(html || "");
        $("script, style, noscript, iframe, nav, footer, aside").remove();

        const textBlocks = [];
        const selectors = ["h1", "h2", "h3", "p", "li", "span", "div"];

        for (const selector of selectors) {
            $(selector).each((i, element) => {
                const text = normalizeText($(element).text() || "");
                if (text && text.length > 15 && text.length < 1000) {
                    textBlocks.push(text);
                }
            });
        }

        const metaDesc = $("meta[name=\"description\"]").attr("content") ||
            $("meta[property=\"og:description\"]").attr("content") || "";
        if (metaDesc && metaDesc.trim().length > 20) {
            textBlocks.unshift(normalizeText(metaDesc.trim()));
        }

        const uniqueBlocks = [...new Set(textBlocks.map(b => b.trim()).filter(Boolean))];
        return uniqueBlocks.join("\n");
    } catch (error) {
        logger.warn("extractCleanTextFromHTML error:", error.message || error);
        return "";
    }
}

// ===== Page extraction =====
async function extractPageDataWithRetry(url, maxRetries = 3) {
    let lastError = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            logger.info(`Tentativa ${attempt}/${maxRetries} de extrair: ${url}`);
            
            // Timeout progressivo: 30s, 45s, 60s
            const timeout = 30000 + (attempt - 1) * 15000;
            
            const result = await Promise.race([
                extractPageData(url),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error(`Timeout após ${timeout/1000}s`)), timeout)
                )
            ]);
            
            // Verificar se a extração foi bem-sucedida
            if (result && (result.cleanText || result.title || result.description)) {
                logger.info(`✅ Extração bem-sucedida na tentativa ${attempt}`);
                return result;
            }
            
            throw new Error('Extração retornou dados vazios');
            
        } catch (error) {
            lastError = error;
            logger.warn(`❌ Tentativa ${attempt} falhou: ${error.message}`);
            
            if (attempt < maxRetries) {
                const waitTime = 2000 * attempt; // 2s, 4s, 6s
                logger.info(`⏳ Aguardando ${waitTime/1000}s antes da próxima tentativa...`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
            }
        }
    }
    
    // Se todas as tentativas falharam, retornar fallback
    logger.error(`❌ Todas as ${maxRetries} tentativas falharam para: ${url}`);
    return {
        title: "Chatbot Inteligente",
        description: "Assistente virtual pronto para ajudar",
        benefits: [],
        testimonials: [],
        cta: "",
        summary: "Este é um assistente inteligente que pode responder suas perguntas. A extração automática do conteúdo não foi possível, mas você ainda pode fazer perguntas!",
        cleanText: `Informações sobre: ${url}\n\nEste é um assistente virtual inteligente pronto para responder suas dúvidas.\n\nPor favor, faça sua pergunta e farei o melhor para ajudá-lo!`,
        imagesText: [],
        url: url,
        extractionTime: 0,
        method: "fallback",
        error: lastError ? lastError.message : "Extração falhou após múltiplas tentativas",
        bonuses_detected: [],
        price_detected: [],
        contatos: {
            telefone: [],
            whatsapp: [],
            email: [],
            site: [url],
            endereco: []
        }
    };
}

async function extractPageData(url) {
    const startTime = Date.now();
    try {
        if (!url) throw new Error("URL is required");

        const cacheKey = url;
        const cached = getCacheData(cacheKey);
        if (cached) {
            logger.info(`Cache hit for ${url}`);
            return cached;
        }
        
        logger.info(`Starting extraction for: ${url}`);

        const extractedData = {
            title: "",
            description: "",
            benefits: [],
            testimonials: [],
            cta: "",
            summary: "",
            cleanText: "",
            imagesText: [],
            url: url,
            extractionTime: 0,
            method: "unknown",
            bonuses_detected: [],
            price_detected: [],
            // 🎯 NOVO: Contatos extraídos
            contatos: {
                telefone: [],
                whatsapp: [],
                email: [],
                site: [url],
                endereco: []
            }
        };

        let html = "";
        try {
            logger.info("Attempting Axios + Cheerio extraction...");
            const response = await axios.get(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (compatible; LinkMagico-Bot/6.0; +https://linkmagico-comercial.onrender.com)",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                    "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8"
                },
                timeout: 30000,
                maxRedirects: 5,
                validateStatus: status => status >= 200 && status < 400
            });
            html = response.data || "";
            const finalUrl = response.request?.res?.responseUrl || url;
            if (finalUrl && finalUrl !== url) extractedData.url = finalUrl;
            extractedData.method = "axios-cheerio";
            logger.info(`Axios extraction successful, HTML length: ${String(html).length}`);
        } catch (axiosError) {
            logger.warn(`Axios extraction failed for ${url}: ${axiosError.message || axiosError}`);
        }

        if (html && html.length > 100) {
            try {
                const $ = cheerio.load(html);
                $("script, style, noscript, iframe").remove();

                // Title
                const titleSelectors = ["h1", "meta[property=\"og:title\"]", "meta[name=\"twitter:title\"]", "title"];
                for (const selector of titleSelectors) {
                    const el = $(selector).first();
                    const title = (el.attr && (el.attr("content") || el.text) ? (el.attr("content") || el.text()) : el.text ? el.text() : "").toString().trim();
                    if (title && title.length > 5 && title.length < 200) {
                        extractedData.title = title;
                        break;
                    }
                }

                // Description
                const descSelectors = ["meta[name=\"description\"]", "meta[property=\"og:description\"]", ".description", "article p", "main p"];
                for (const selector of descSelectors) {
                    const el = $(selector).first();
                    const desc = (el.attr && (el.attr("content") || el.text) ? (el.attr("content") || el.text()) : el.text ? el.text() : "").toString().trim();
                    if (desc && desc.length > 50 && desc.length < 1000) {
                        extractedData.description = desc;
                        break;
                    }
                }

                extractedData.cleanText = extractCleanTextFromHTML(html);

                const bodyText = $("body").text() || "";
                const summaryText = bodyText.replace(/\s+/g, " ").trim();
                const sentences = summaryText.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
                extractedData.summary = sentences.slice(0, 3).join(". ").substring(0, 400) + (sentences.length > 3 ? "..." : "");

                extractedData.bonuses_detected = extractBonuses(bodyText);

                // 🎯 EXTRAIR CONTATOS
                extractedData.contatos = sistemaContatosAprimorado.extrairContatosAprimorado($);

                logger.info(`Cheerio extraction completed for ${url}`);
                analytics.successfulExtractions++;
            } catch (cheerioError) {
                logger.warn(`Cheerio parsing failed: ${cheerioError.message || cheerioError}`);
                analytics.failedExtractions++;
            }
        }

        // Puppeteer fallback
        const minAcceptableLength = 200;
        if ((!extractedData.cleanText || extractedData.cleanText.length < minAcceptableLength) && puppeteer) {
            logger.info("Trying Puppeteer for dynamic rendering...");
            let browser = null;
            try {
                browser = await puppeteer.launch({
                    headless: true,
                    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
                    defaultViewport: { width: 1200, height: 800 },
                    timeout: 40000
                });
                const page = await browser.newPage();
                await page.setUserAgent("Mozilla/5.0 (compatible; LinkMagico-Bot/6.0)");
                await page.setRequestInterception(true);
                page.on("request", (req) => {
                    const rt = req.resourceType();
                    if (["stylesheet", "font", "image", "media"].includes(rt)) req.abort();
                    else req.continue();
                });

                try {
                    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 40000 });
                } catch (gotoErr) {
                    logger.warn("Puppeteer goto failed:", gotoErr.message || gotoErr);
                }

                try {
                    await page.evaluate(async () => {
                        await new Promise((resolve) => {
                            let totalHeight = 0;
                            const distance = 100;
                            const timer = setInterval(() => {
                                const scrollHeight = document.body.scrollHeight;
                                window.scrollBy(0, distance);
                                totalHeight += distance;

                                if (totalHeight >= scrollHeight || totalHeight > 3000) {
                                    clearInterval(timer);
                                    resolve();
                                }
                            }, 100);
                        });
                    });
                } catch (scrollErr) {
                    logger.warn("Puppeteer scroll failed:", scrollErr.message || scrollErr);
                }

                const content = await page.content();
                const puppeteerData = await page.evaluate(() => {
                    const metaDescription = document.querySelector("meta[name=\"description\"]")?.content ||
                                            document.querySelector("meta[property=\"og:description\"]")?.content || "";
                    const title = document.querySelector("title")?.textContent ||
                                  document.querySelector("h1")?.textContent || "";
                    return { metaDescription, title };
                });

                const finalText = extractCleanTextFromHTML(content);

                if (finalText && finalText.length > extractedData.cleanText.length) {
                    extractedData.cleanText = finalText;
                    extractedData.method = "puppeteer";
                    if (!extractedData.title && puppeteerData.title) extractedData.title = puppeteerData.title.slice(0, 200);
                    if (!extractedData.description && puppeteerData.metaDescription) extractedData.description = puppeteerData.metaDescription.slice(0, 500);
                    const sents = finalText.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
                    if (!extractedData.summary && sents.length) extractedData.summary = sents.slice(0, 3).join(". ").substring(0, 400) + (sents.length > 3 ? "..." : "");
                    extractedData.bonuses_detected = extractBonuses(finalText);
                    analytics.successfulExtractions++;
                }

            } catch (puppeteerErr) {
                logger.warn("Puppeteer extraction failed:", puppeteerErr.message || puppeteerErr);
                analytics.failedExtractions++;
            } finally {
                try { if (browser) await browser.close(); } catch (e) {}
            }
        }

        // Final processing
        try {
            if (extractedData.cleanText) extractedData.cleanText = uniqueLines(extractedData.cleanText);
            if (!extractedData.title && extractedData.cleanText) {
                const firstLine = extractedData.cleanText.split("\n").find(l => l && l.length > 10 && l.length < 150);
                if (firstLine) extractedData.title = firstLine.slice(0, 150);
            }
            if (!extractedData.summary && extractedData.cleanText) {
                const sents = extractedData.cleanText.split(/(?<=[.!?])\s+/).filter(Boolean);
                extractedData.summary = sents.slice(0, 3).join(". ").slice(0, 400) + (sents.length > 3 ? "..." : "");
            }
        } catch (procErr) {
            logger.warn("Final processing failed:", procErr.message || procErr);
        }

        extractedData.extractionTime = Date.now() - startTime;
        
        setCacheData(cacheKey, extractedData);
        logger.info(`Extraction completed for ${url} in ${extractedData.extractionTime}ms using ${extractedData.method}`);
        return extractedData;

    } catch (error) {
        analytics.failedExtractions++;
        logger.error(`Page extraction failed for ${url}:`, error.message || error);
        return {
            title: "",
            description: "",
            benefits: [],
            testimonials: [],
            cta: "",
            summary: "Erro ao extrair dados da página. Verifique se a URL está acessível.",
            cleanText: "",
            imagesText: [],
            url: url || "",
            extractionTime: Date.now() - startTime,
            method: "failed",
            error: error.message || String(error),
            bonuses_detected: [],
            price_detected: [],
            contatos: {
                telefone: [],
                whatsapp: [],
                email: [],
                site: [url],
                endereco: []
            }
        };
    }
}

// ===== LLM Integration =====
async function callGroq(messages, temperature = 0.4, maxTokens = 300) {
    if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY missing");

    const payload = {
        model: process.env.GROQ_MODEL || "llama-3.1-70b-versatile",
        messages,
        temperature,
        max_tokens: maxTokens
    };

    const url = process.env.GROQ_API_BASE || "https://api.groq.com/openai/v1/chat/completions";
    const headers = { "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" };

    try {
        const response = await axios.post(url, payload, { headers });
        return response.data.choices[0].message.content;
    } catch (error) {
        logger.error("Groq API call failed:", error.response ? error.response.data : error.message);
        throw new Error("Failed to get response from Groq API");
    }
}

async function callOpenRouter(messages, temperature = 0.4, maxTokens = 300) {
    if (!process.env.OPENROUTER_API_KEY) throw new Error("OPENROUTER_API_KEY missing");

    const payload = {
        model: process.env.OPENROUTER_MODEL || "mistralai/mistral-7b-instruct",
        messages,
        temperature,
        max_tokens: maxTokens
    };

    const url = process.env.OPENROUTER_API_BASE || "https://openrouter.ai/api/v1/chat/completions";
    const headers = { "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, "Content-Type": "application/json" };

    try {
        const response = await axios.post(url, payload, { headers });
        return response.data.choices[0].message.content;
    } catch (error) {
        logger.error("OpenRouter API call failed:", error.response ? error.response.data : error.message);
        throw new Error("Failed to get response from OpenRouter API");
    }
}

async function callOpenAI(messages, temperature = 0.4, maxTokens = 300) {
    if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY missing");

    const payload = {
        model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
        messages,
        temperature,
        max_tokens: maxTokens
    };

    const url = process.env.OPENAI_API_BASE || "https://api.openai.com/v1/chat/completions";
    const headers = { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" };

    try {
        const response = await axios.post(url, payload, { headers });
        return response.data.choices[0].message.content;
    } catch (error) {
        logger.error("OpenAI API call failed:", error.response ? error.response.data : error.message);
        throw new Error("Failed to get response from OpenAI API");
    }
}

// ===== AI Response Generation =====
const NOT_FOUND_MSG = "Desculpe, não encontrei informações específicas sobre isso. Posso ajudar com outras dúvidas?";

function shouldActivateSalesMode(instructions) {
    if (!instructions) return false;
    const salesKeywords = /(venda|vendas|compra|comprar|adquirir|produto|oferta|promoção|desconto)/i;
    return salesKeywords.test(instructions);
}

// ===== FUNÇÃO APRIMORADA DE RESPOSTA DA IA =====
async function generateAIResponse(userMessage, pageData = {}, conversationHistory = [], instructions = "", leadId = null) {
    const startTime = Date.now();
    try {
        if (!userMessage || !String(userMessage).trim()) {
            return NOT_FOUND_MSG;
        }

        // 🎯 CORREÇÃO: Limpar mensagem de caracteres especiais
        const cleanUserMessage = String(userMessage).replace(/<s>\s*\[OUT\]/g, '').replace(/<[^>]*>/g, '').replace(/\[.*?\]/g, '').trim();
        if (!cleanUserMessage) {
            return "Desculpe, não entendi sua mensagem. Poderia reformular?";
        }

        // 🎯 ANÁLISE DA JORNADA DO CLIENTE
        const journeyStage = journeyAnalyzer.analyzeJourneyStage(cleanUserMessage);
        const shouldMentionBonus = journeyAnalyzer.shouldMentionBonus(journeyStage, cleanUserMessage);
        const excitementWord = journeyAnalyzer.getRandomSynonym('empolgação');

        // Atualizar estágio do lead se existir
        if (leadId) {
            const leadSystem = getLeadSystem(process.env.API_KEYS_JSON ? JSON.parse(process.env.API_KEYS_JSON)[0] : "default");
            leadSystem.updateLeadJourneyStage(leadId, journeyStage);
        }

        // 🎯 DETECÇÃO APRIMORADA DE BÔNUS
        let bonusInfo = "";
        if (pageData && pageData.bonuses_detected && pageData.bonuses_detected.length > 0 && shouldMentionBonus) {
            bonusInfo = `BÔNUS DETECTADOS: ${pageData.bonuses_detected.join(', ')}. `;
        }

        // 🎯 INFORMAÇÕES DE CONTATO
        let contactInfo = "";
        if (pageData && pageData.contatos) {
            const contatos = pageData.contatos;
            contactInfo = `INFORMAÇÕES DE CONTATO: `;
            
            if (contatos.telefone.length > 0) {
                contactInfo += `Telefones: ${contatos.telefone.slice(0, 2).join(', ')}. `;
            }
            if (contatos.whatsapp.length > 0) {
                contactInfo += `WhatsApp: ${contatos.whatsapp.slice(0, 2).join(', ')}. `;
            }
            if (contatos.email.length > 0) {
                contactInfo += `Emails: ${contatos.email.slice(0, 2).join(', ')}. `;
            }
            if (contatos.site.length > 0) {
                contactInfo += `Site: ${contatos.site[0]}. `;
            }
        }

        // 🎯 PROMPT APRIMORADO PARA JORNADA DO CLIENTE
        const systemPrompt = `Você é um assistente de vendas inteligente que identifica a jornada do cliente.

JORNADA DO CLIENTE DETECTADA: ${journeyStage.toUpperCase()}
- DESCOBERTA: Cliente buscando informações básicas
- NEGOCIAÇÃO: Cliente interessado em preços e condições  
- FIDELIZAÇÃO: Cliente com dúvidas sobre suporte e uso

CONTEXTO DA PÁGINA:
- Título: ${pageData.title || 'Não disponível'}
- Descrição: ${pageData.description || 'Não disponível'}
- ${bonusInfo}
- ${contactInfo}
- URL: ${pageData.url || 'Não disponível'}

DIRETRIZES DE RESPOSTA:
1. Adapte sua resposta ao estágio da jornada (${journeyStage})
2. ${shouldMentionBonus ? 'Destaque os bônus relevantes' : 'Foque na dúvida específica do cliente'}
3. Use sinônimos variados para expressar entusiasmo (evite repetir "show")
4. Seja natural, humano e consultivo
5. Não force vendas, seja útil e genuíno
6. Sempre ofereça as opções de contato quando relevante
7. NUNCA inclua tags HTML como <s> [OUT] ou qualquer marcação

Instruções personalizadas: ${instructions}

RESPONDA em português de forma natural e envolvente.`;

        const messages = [
            {
                role: "system",
                content: systemPrompt
            },
            ...conversationHistory,
            { role: "user", content: cleanUserMessage }
        ];

        let response = "";
        let usedProvider = "none";

        // Try Groq first
        if (process.env.GROQ_API_KEY) {
            try {
                response = await callGroq(messages, 0.4, 300);
                usedProvider = "groq";
                logger.info("Groq API call successful");
            } catch (groqError) {
                logger.warn(`Groq failed: ${groqError.message || groqError}`);
            }
        }

        // Try OpenRouter if Groq failed
        if (!response && process.env.OPENROUTER_API_KEY) {
            try {
                response = await callOpenRouter(messages, 0.3, 250);
                usedProvider = "openrouter";
                logger.info("OpenRouter API call successful");
            } catch (openrouterError) {
                logger.warn(`OpenRouter failed: ${openrouterError.message || openrouterError}`);
            }
        }

        // Try OpenAI if others failed
        if (!response && process.env.OPENAI_API_KEY) {
            try {
                response = await callOpenAI(messages, 0.2, 250);
                usedProvider = "openai";
                logger.info("OpenAI API call successful");
            } catch (openaiError) {
                logger.warn(`OpenAI failed: ${openaiError.message || openaiError}`);
            }
        }

        if (!response || !String(response).trim()) {
            response = generateLocalResponse(cleanUserMessage, pageData, instructions, journeyStage);
            usedProvider = "local";
        }

        // 🎯 CORREÇÃO FINAL: Limpar resposta de qualquer caractere especial
        const finalResponse = String(response).replace(/<s>\s*\[OUT\]/g, '').replace(/<[^>]*>/g, '').replace(/\[.*?\]/g, '').trim();
        const responseTime = Date.now() - startTime;
        
        console.log(`🤖 [IA RESPONSE] Jornada: ${journeyStage} | Bônus: ${shouldMentionBonus}`);
        console.log(`🤖 [IA RESPONSE] Usuário: "${cleanUserMessage}"`);
        console.log(`🤖 [IA RESPONSE] Resposta: "${finalResponse}"`);
        console.log(`🤖 [IA RESPONSE] Provedor: ${usedProvider}, Tempo: ${responseTime}ms`);
        
        logger.info(`AI response generated in ${responseTime}ms using ${usedProvider}`);
        return finalResponse;

    } catch (error) {
        logger.error("AI response generation failed:", error.message || error);
        return NOT_FOUND_MSG;
    }
}

function generateLocalResponse(userMessage, pageData = {}, instructions = "", journeyStage = "descoberta") {
    const question = (userMessage || "").toLowerCase();
    const salesMode = shouldActivateSalesMode(instructions);
    const excitementWord = journeyAnalyzer.getRandomSynonym('empolgação');

    // 🎯 RESPOSTA INTELIGENTE BASEADA NA JORNADA
    if (/bônus|bonus|brinde|presente|extra|grátis/.test(question)) {
        if (pageData.bonuses_detected && pageData.bonuses_detected.length > 0) {
            const bonuses = pageData.bonuses_detected.slice(0, 3).join(", ");
            return `🎁 **${excitementWord.toUpperCase()}!** Encontrei estes bônus para você:\n\n${bonuses}\n\nSão por tempo limitado!`;
        } else {
            return "🔍 Analisei a página cuidadosamente e não identifiquei bônus específicos no momento. Mas você ainda tem acesso a todos os benefícios do produto!";
        }
    }

    if (/preço|valor|quanto custa|investimento/.test(question)) {
        return "💰 Para informações detalhadas sobre preços e condições de pagamento, consulte diretamente a página do produto onde você encontrará todas as opções disponíveis.";
    }

    if (/contato|telefone|whatsapp|email|falar|ligar|ligação/.test(question)) {
        let contactResponse = "📞 **Opções de contato disponíveis:**\n\n";
        
        if (pageData.contatos) {
            const contatos = pageData.contatos;
            
            if (contatos.telefone.length > 0) {
                contactResponse += `📞 **Telefone:** ${contatos.telefone.slice(0, 2).join(' ou ')}\n`;
            }
            if (contatos.whatsapp.length > 0) {
                contactResponse += `💬 **WhatsApp:** ${contatos.whatsapp.slice(0, 2).join(' ou ')}\n`;
            }
            if (contatos.email.length > 0) {
                contactResponse += `📧 **Email:** ${contatos.email.slice(0, 2).join(' ou ')}\n`;
            }
            if (contatos.site.length > 0) {
                contactResponse += `🌐 **Site:** ${contatos.site[0]}\n`;
            }
        } else {
            contactResponse += `🌐 **Site oficial:** ${pageData.url || 'Não disponível'}\n`;
        }
        
        contactResponse += "\nFique à vontade para entrar em contato por qualquer um desses canais!";
        return contactResponse;
    }

    if (/como funciona|funcionamento|o que é/.test(question)) {
        const summary = pageData.summary || pageData.description;
        if (summary) {
            const shortSummary = clampSentences(summary, 2);
            return `${shortSummary} Posso esclarecer mais algum aspecto específico para você?`;
        }
    }

    if (/suporte|atendimento|dúvida|problema|ajuda/.test(question)) {
        return "🛟 Para suporte técnico ou dúvidas específicas sobre o uso, recomendo entrar em contato diretamente com nossa equipe de atendimento que terá prazer em ajudar!";
    }

    if (pageData.summary) {
        const summary = clampSentences(pageData.summary, 2);
        return journeyStage === "negociacao" 
            ? `${summary} Gostaria de saber mais sobre valores e condições?` 
            : summary;
    }

    return NOT_FOUND_MSG;
}

// ===== API Routes =====
app.get("/health", (req, res) => {
    const uptime = process.uptime();
    const avgResponseTime = analytics.responseTimeHistory.length > 0 ?
        Math.round(analytics.responseTimeHistory.reduce((a, b) => a + b, 0) / analytics.responseTimeHistory.length) : 0;

    res.json({
        status: "healthy",
        uptime: Math.floor(uptime),
        timestamp: new Date().toISOString(),
        version: "7.0.0",
        analytics: {
            totalRequests: analytics.totalRequests,
            chatRequests: analytics.chatRequests,
            extractRequests: analytics.extractRequests,
            errors: analytics.errors,
            activeChats: analytics.activeChats.size,
            avgResponseTime,
            successfulExtractions: analytics.successfulExtractions,
            failedExtractions: analytics.failedExtractions,
            cacheSize: dataCache.size,
            leadsCaptured: analytics.leadsCaptured
        },
        services: {
            groq: !!process.env.GROQ_API_KEY,
            openai: !!process.env.OPENAI_API_KEY,
            openrouter: !!process.env.OPENROUTER_API_KEY,
            puppeteer: !!puppeteer
        }
    });
});

// ===== ENDPOINT: Captura de Lead =====
app.post("/api/capture-lead", requireApiKey, async (req, res) => {
    const leadSystem = getLeadSystem(req.cliente.apiKey);
    try {
        const { nome, email, telefone, url_origem, robotName } = req.body || {};
        
        if (!email) {
            return res.status(400).json({ 
                success: false, 
                error: "Email é obrigatório" 
            });
        }

        // Verificar se lead já existe
        const existingLead = leadSystem.findLeadByEmail(email);
        if (existingLead) {
            return res.json({ 
                success: true, 
                lead: existingLead,
                message: "Lead atualizado com sucesso" 
            });
        }

        // Criar novo lead
        const newLead = leadSystem.addLead({
            nome: nome || "Não informado",
            email,
            telefone: telefone || "Não informado",
            url_origem: url_origem || "",
            robotName: robotName || "Assistente IA"
        });

        analytics.leadsCaptured++;
        
        console.log(`🎯 NOVO LEAD CAPTURADO: ${newLead.nome} (${newLead.email})`);

        res.json({ 
            success: true, 
            lead: newLead,
            message: "Lead capturado com sucesso" 
        });

    } catch (error) {
        console.error("❌ Erro ao capturar lead:", error);
        res.status(500).json({ 
            success: false, 
            error: "Erro interno ao capturar lead" 
        });
    }
});

// ===== ENDPOINT CHAT COM CAPTURA DE LEAD =====
app.post("/api/chat-universal", requireApiKey, async (req, res) => {
    const leadSystem = getLeadSystem(req.cliente.apiKey);
    analytics.chatRequests++;
    try {
        const { message, pageData, url, conversationId, instructions = "", robotName, leadId } = req.body || {};
        
        if (!message) {
            return res.status(400).json({ 
                success: false, 
                error: "Mensagem é obrigatória" 
            });
        }

        if (conversationId) {
            analytics.activeChats.add(conversationId);
            setTimeout(() => analytics.activeChats.delete(conversationId), 30 * 60 * 1000);
        }

        let processedPageData = pageData;
        if (!processedPageData && url) {
            processedPageData = await extractPageData(url);
        }

        // 🎯 ATUALIZAR CONVERSA DO LEAD SE EXISTIR
        if (leadId) {
            leadSystem.updateLeadConversation(leadId, message, true);
        }

        const aiResponse = await generateAIResponse(message, processedPageData || {}, [], instructions, leadId);

        // 🎯 ATUALIZAR RESPOSTA NO LEAD SE EXISTIR
        if (leadId) {
            leadSystem.updateLeadConversation(leadId, aiResponse, false);
        }

        let finalResponse = aiResponse;

        return res.json({
            success: true,
            response: finalResponse,
            bonuses_detected: processedPageData?.bonuses_detected || [],
            contatos: processedPageData?.contatos || {},
            metadata: {
                hasPageData: !!processedPageData,
                contentLength: processedPageData?.cleanText?.length || 0,
                method: processedPageData?.method || "none"
            }
        });

    } catch (error) {
        analytics.errors++;
        logger.error("Chat endpoint error:", error.message || error);
        return res.status(500).json({ 
            success: false, 
            error: "Erro interno ao gerar resposta: " + (error.message || "Erro desconhecido"),
            details: error.message
        });
    }
});

// ===== 🎯 ENDPOINT SUPERINTELIGENTE - /api/process-chat-inteligente =====
app.post("/api/process-chat-inteligente", requireApiKey, async (req, res) => {
    const leadSystem = getLeadSystem(req.cliente.apiKey);
    analytics.chatRequests++;
    try {
        const { message, pageData, url, conversationId, instructions = "", robotName, leadId } = req.body || {};
        
        if (!message) {
            return res.status(400).json({ 
                success: false, 
                error: "Mensagem é obrigatória" 
            });
        }

        console.log('🧠 [SUPER-INTELIGENCIA] Processando mensagem:', { 
            messageLength: message.length,
            url: url || 'none',
            leadId: leadId || 'none'
        });

        if (conversationId) {
            analytics.activeChats.add(conversationId);
            setTimeout(() => analytics.activeChats.delete(conversationId), 30 * 60 * 1000);
        }

        let processedPageData = pageData;
        if (!processedPageData && url) {
            processedPageData = await extractPageData(url);
        }

        // 🎯 SUPERINTELIGÊNCIA: Análise Emocional Avançada
        const analiseEmocional = superInteligencia.analisarEmocao(message);
        
        // 🎯 CAPTURA DE INTENÇÕES DO CLIENTE
        const inteligencias = sistemaInteligencias.capturarInteligencias(message);
        
        // 🎯 ANÁLISE DE JORNADA
        const journeyStage = journeyAnalyzer.analyzeJourneyStage(message);
        
        // 🎯 SELEÇÃO DE PERSONALIDADE ADAPTATIVA
        const personalidade = superInteligencia.selecionarPersonalidade(
            analiseEmocional.emocao, 
            analiseEmocional.intensidade, 
            journeyStage
        );

        // 🎯 ATUALIZAR CONVERSA DO LEAD SE EXISTIR
        if (leadId) {
            leadSystem.updateLeadConversation(leadId, message, true);
            leadSystem.updateLeadJourneyStage(leadId, journeyStage);
        }

        let finalResponse = "";

        // 🎯 DETECTAR AGENDAMENTO
        const respostaAgendamento = superInteligencia.detectarAgendamento(message);
        if (respostaAgendamento) {
            finalResponse = respostaAgendamento;
            console.log("📅 Resposta de agendamento gerada");
        }
        // 🎯 PROCESSAR CONFIRMAÇÃO DE AGENDAMENTO
        else if (superInteligencia.processarAgendamento(message)) {
            finalResponse = superInteligencia.processarAgendamento(message);
            console.log("✅ Confirmação de agendamento processada");
        }
        // 🎯 USAR SISTEMA INTELIGENTE SE INTENÇÕES FORAM DETECTADAS
        else if (Object.values(inteligencias).some(val => val === true)) {
            const contatos = processedPageData?.contatos || {};
            
            // Gerar resposta base com empatia
            const respostaEmpatica = superInteligencia.gerarRespostaEmpatica(
                message, 
                analiseEmocional, 
                personalidade, 
                contatos
            );
            
            // Combinar com resposta contextual
            const respostaContextual = sistemaInteligencias.gerarRespostaContextual(
                inteligencias, 
                contatos, 
                journeyStage
            );
            
            finalResponse = respostaEmpatica + respostaContextual;
            console.log(`🎭 Resposta emocional inteligente gerada`);
        } else {
            // 🎯 USAR SISTEMA ORIGINAL COM MELHORIAS EMOCIONAIS
            const respostaIA = await generateAIResponse(message, processedPageData || {}, [], instructions, leadId);
            
            // Aplicar melhorias emocionais na resposta
            if (analiseEmocional.emocao === "negativo" && analiseEmocional.intensidade >= 2) {
                finalResponse = `🤗 **Entendo que isso é importante para você.** ` + respostaIA;
            } else if (analiseEmocional.urgencia) {
                finalResponse = `🚨 **Priorizando sua solicitação!** ` + respostaIA;
            } else {
                finalResponse = respostaIA;
            }
            
            console.log(`🤖 Resposta IA com melhorias emocionais`);
        }

        // 🎯 ATUALIZAR RESPOSTA NO LEAD SE EXISTIR
        if (leadId) {
            leadSystem.updateLeadConversation(leadId, finalResponse, false);
        }

        return res.json({
            success: true,
            response: finalResponse,
            inteligenciasDetectadas: inteligencias,
            analiseEmocional: analiseEmocional,
            personalidadeSelecionada: personalidade,
            journeyStage: journeyStage,
            bonuses_detected: processedPageData?.bonuses_detected || [],
            contatos: processedPageData?.contatos || {},
            metadata: {
                hasPageData: !!processedPageData,
                contentLength: processedPageData?.cleanText?.length || 0,
                method: processedPageData?.method || "none",
                sistema: "super-inteligencia-v1"
            }
        });

    } catch (error) {
        analytics.errors++;
        logger.error("Super inteligencia endpoint error:", error.message || error);
        return res.status(500).json({ 
            success: false, 
            error: "Erro interno ao gerar resposta inteligente: " + (error.message || "Erro desconhecido"),
            details: error.message
        });
    }
});

// ===== ENDPOINT APRIMORADO DE EXTRAÇÃO =====
app.post("/api/extract-enhanced", async (req, res) => {
    analytics.extractRequests++;
    try {
        const { url } = req.body || {};
        
        console.log("📥 [EXTRACAO APRIMORADA] Recebendo requisição para:", url);
        
        if (!url) {
            return res.status(400).json({ 
                success: false, 
                error: "URL é obrigatório" 
            });
        }

        try { 
            new URL(url); 
        } catch (urlErr) { 
            return res.status(400).json({ 
                success: false, 
                error: "URL inválido" 
            }); 
        }

        const extractedData = await sistemaExtracao.extrairDadosCompletos(url);
        
        if (extractedData.erro) {
            return res.status(500).json({ 
                success: false, 
                error: extractedData.erro 
            });
        }

        const validacao = sistemaValidacao.validarDadosCompletos(extractedData);
        
        console.log("✅ [EXTRACAO APRIMORADA] Concluída com sucesso");
        console.log(`🎯 Bônus encontrados: ${validacao.dadosValidados.bonus.length}`);
        console.log(`📞 Contatos encontrados: ${validacao.dadosValidados.contatos ? Object.keys(validacao.dadosValidados.contatos).length : 0}`);
        console.log(`📊 Confiança: ${(validacao.pontuacaoConfianca * 100).toFixed(1)}%`);
        
        return res.json({ 
            success: true, 
            data: validacao.dadosValidados,
            validacao: {
                pontuacaoConfianca: validacao.pontuacaoConfianca,
                problemas: validacao.problemasCriticos,
                totalBonus: validacao.dadosValidados.bonus.length
            }
        });

    } catch (error) {
        analytics.errors++;
        console.error("❌ Erro no endpoint /api/extract-enhanced:", error);
        logger.error("Extract-enhanced endpoint error:", error.message || error);
        
        return res.status(500).json({ 
            success: false, 
            error: "Erro interno ao extrair página: " + (error.message || "Erro desconhecido")
        });
    }
});

// /api/extract endpoint (ORIGINAL - mantido para compatibilidade)
app.post("/api/extract", async (req, res) => {
    analytics.extractRequests++;
    try {
        const { url, instructions, robotName } = req.body || {};
        
        console.log("📥 Recebendo requisição para extrair:", url);
        
        if (!url) {
            return res.status(400).json({ 
                success: false, 
                error: "URL é obrigatório" 
            });
        }

        try { 
            new URL(url); 
        } catch (urlErr) { 
            return res.status(400).json({ 
                success: false, 
                error: "URL inválido" 
            }); 
        }

        logger.info(`Starting extraction for URL: ${url}`);
        
        const extractedData = await extractPageData(url);
        
        if (instructions) extractedData.custom_instructions = instructions;
        if (robotName) extractedData.robot_name = robotName;

        console.log("✅ Extração concluída com sucesso");
        
        return res.json({ 
            success: true, 
            data: extractedData 
        });

    } catch (error) {
        analytics.errors++;
        console.error("❌ Erro no endpoint /api/extract:", error);
        logger.error("Extract endpoint error:", error.message || error);
        
        return res.status(500).json({ 
            success: false, 
            error: "Erro interno ao extrair página: " + (error.message || "Erro desconhecido"),
            details: error.message
        });
    }
});

// ===== FUNÇÃO: Geração Completa do HTML do Chatbot =====
function generateFullChatbotHTML(pageData = {}, robotName = 'Assistente IA', customInstructions = '') {
    const escapedPageData = JSON.stringify(pageData || {});
    const safeRobotName = String(robotName || 'Assistente IA').replace(/"/g, '\\"');
    const safeInstructions = String(customInstructions || '').replace(/"/g, '\\"');
    
    // Gerar botões fixos com contatos
    const contatos = pageData.contatos || {
        telefone: [],
        whatsapp: [], 
        email: [],
        site: [pageData.url || ''],
        endereco: []
    };
    
    const botoesFixos = gerarBotoesFixos(contatos, safeRobotName);

    return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>LinkMágico Chatbot - ${safeRobotName}</title>
<meta name="description" content="Chatbot IA - ${safeRobotName}"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.chat-container{width:100%;max-width:800px;height:90vh;background:white;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,0.15);display:flex;flex-direction:column;overflow:hidden}
.chat-header{background:linear-gradient(135deg,#3b82f6 0%,#1e40af 100%);color:white;padding:20px;text-align:center;position:relative}
.chat-header h1{font-size:1.5rem;font-weight:600}
.chat-header .subtitle{font-size:0.9rem;opacity:0.9;margin-top:5px}
.chat-messages{flex:1;padding:20px;overflow-y:auto;display:flex;flex-direction:column;gap:15px;background:#f8fafc}
.chat-message{max-width:70%;padding:15px;border-radius:15px;font-size:0.95rem;line-height:1.4}
.chat-message.user{background:linear-gradient(135deg,#3b82f6 0%,#1e40af 100%);color:white;align-self:flex-end;border-bottom-right-radius:5px}
.chat-message.bot{background:#f1f5f9;color:#334155;align-self:flex-start;border-bottom-left-radius:5px}
.chat-input-container{padding:20px;background:white;border-top:1px solid#e2e8f0;display:flex;gap:10px}
.chat-input{flex:1;border:1px solid#e2e8f0;border-radius:25px;padding:12px 20px;font-size:0.95rem;outline:none;transition:all 0.3s}
.chat-input:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,0.1)}
.send-button{background:linear-gradient(135deg,#3b82f6 0%,#1e40af 100%);border:none;border-radius:50%;width:50px;height:50px;color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.3s}
.send-button:hover{transform:scale(1.05);box-shadow:0 5px 15px rgba(59,130,246,0.4)}
.send-button:disabled{opacity:0.6;cursor:not-allowed;transform:none}
.typing-indicator{display:none;align-items:center;gap:5px;color:#64748b;font-size:0.9rem;margin-top:10px}
.typing-dot{width:8px;height:8px;background:#64748b;border-radius:50%;animation:typing 1.4s infinite}
.typing-dot:nth-child(2){animation-delay:0.2s}
.typing-dot:nth-child(3){animation-delay:0.4s}
@keyframes typing{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
.lead-form{background:white;padding:25px;margin:20px;border-radius:15px;box-shadow:0 8px 25px rgba(0,0,0,0.1);text-align:center}
.lead-form h3{color:#1e40af;margin-bottom:10px}
.lead-form p{color:#64748b;margin-bottom:20px}
.lead-form input{width:100%;padding:15px;margin-bottom:15px;border:2px solid#e2e8f0;border-radius:10px;font-size:1rem;transition:all 0.3s}
.lead-form input:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,0.1)}
.lead-form button{width:100%;background:linear-gradient(135deg,#3b82f6 0%,#1e40af 100%);color:white;border:none;padding:15px;border-radius:10px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:all 0.3s}
.lead-form button:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(59,130,246,0.3)}
.contact-buttons{display:flex;gap:10px;margin-top:15px;flex-wrap:wrap}
.contact-button{flex:1;min-width:120px;background:#f1f5f9;border:1px solid#e2e8f0;border-radius:8px;padding:12px;text-align:center;cursor:pointer;transition:all 0.3s;text-decoration:none;color:#334155;font-size:0.9rem;display:flex;align-items:center;justify-content:center;gap:5px}
.contact-button:hover{background:#3b82f6;color:white;transform:translateY(-2px)}
.lm-botoes-fixos a, .lm-botoes-fixos button { font-size: 0.85rem; }
@media (max-width:768px){.chat-container{height:100vh;border-radius:0}.chat-message{max-width:85%}.lead-form{margin:10px;padding:20px}.contact-button{min-width:100px;font-size:0.8rem}.lm-botoes-fixos{padding:10px !important}.lm-botoes-fixos a, .lm-botoes-fixos button{padding:10px 15px !important;font-size:0.8rem !important}}
</style>
</head>
<body>
<div class="chat-container">
<div class="chat-header">
<h1>${safeRobotName}</h1>
<div class="subtitle">Estou aqui para tirar todas as suas dúvidas</div>
</div>

${botoesFixos}

<div class="lead-form" id="leadForm">
<h3>🎯 Vamos começar!</h3>
<p>Deixe seus dados para uma experiência personalizada</p>
<input type="text" id="leadName" placeholder="Seu nome completo">
<input type="email" id="leadEmail" placeholder="Seu melhor email" required>
<input type="tel" id="leadPhone" placeholder="Seu WhatsApp (opcional)">
<button id="startChat"><i class="fas fa-comments" style="margin-right:8px"></i> Iniciar Conversa</button>
</div>

<div class="chat-messages" id="chatMessages" style="display:none">
<div class="chat-message bot">Olá! Sou ${safeRobotName}, estou aqui para tirar todas as suas dúvidas. Como posso ajudar você hoje?</div>
</div>

<div class="chat-input-container" id="chatInputContainer" style="display:none">
<input type="text" class="chat-input" id="messageInput" placeholder="Digite sua mensagem..." autocomplete="off">
<button class="send-button" id="sendButton"><i class="fas fa-paper-plane"></i></button>
</div>

<div class="typing-indicator" id="typingIndicator">
<span>Digitando</span>
<div class="typing-dot"></div>
<div class="typing-dot"></div>
<div class="typing-dot"></div>
</div>
</div>

<script>
const pageData = ${escapedPageData};
const robotName = "${safeRobotName}";
const customInstructions = "${safeInstructions}";

const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');
const leadForm = document.getElementById('leadForm');
const chatInputContainer = document.getElementById('chatInputContainer');
const startChatBtn = document.getElementById('startChat');

let leadId = null;
let agendamentoAtivo = false;

// Função para iniciar agendamento
function iniciarAgendamento() {
    const mensagem = "Gostaria de agendar uma reunião";
    messageInput.value = mensagem;
    sendMessage();
}

// Capturar lead
startChatBtn.addEventListener('click', async function() {
    const name = document.getElementById('leadName').value.trim();
    const email = document.getElementById('leadEmail').value.trim();
    const phone = document.getElementById('leadPhone').value.trim();

    if (!email) {
        alert('Por favor, informe seu email');
        return;
    }

    try {
        const response = await fetch('/api/capture-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: name || 'Não informado',
                email: email,
                telefone: phone || 'Não informado',
                url_origem: window.location.href,
                robotName: robotName
            })
        });

        const data = await response.json();
        
        if (data.success) {
            leadId = data.lead.id;
            leadForm.style.display = 'none';
            chatMessages.style.display = 'flex';
            chatInputContainer.style.display = 'flex';
            
            addMessage(\`Olá \${name || 'amigo'}! É um prazer ter você aqui. Como posso ajudar você hoje?\`, false);
            messageInput.focus();
        }
    } catch (error) {
        console.error('Erro ao capturar lead:', error);
        alert('Erro ao processar. Tente novamente.');
    }
});

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = \`chat-message \${isUser ? 'user' : 'bot'}\`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    messageInput.value = '';
    sendButton.disabled = true;
    typingIndicator.style.display = 'flex';

    try {
        const response = await fetch('/api/process-chat-inteligente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: message,
                pageData: pageData,
                robotName: robotName,
                instructions: customInstructions,
                conversationId: 'chatbot_' + Date.now(),
                leadId: leadId
            })
        });

        const data = await response.json();
        if (data.success) {
            addMessage(data.response, false);
        } else {
            addMessage('Desculpe, ocorreu um erro. Tente novamente.', false);
        }
    } catch (error) {
        addMessage('Erro de conexão. Verifique sua internet.', false);
    } finally {
        typingIndicator.style.display = 'none';
        sendButton.disabled = false;
        messageInput.focus();
    }
}

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Auto-focus no primeiro campo do formulário
document.getElementById('leadName').focus();
</script>
</body>
</html>`;
}

// Widget JS atualizado
app.get("/public/widget.js", (req, res) => {
    res.set("Content-Type", "application/javascript");
    res.send(`// LinkMágico Widget v7.0 - Com Captura de Leads\n(function() {\n    'use strict';\n    if (window.LinkMagicoWidget) return;\n    \n    var LinkMagicoWidget = {\n        config: {\n            position: 'bottom-right',\n            primaryColor: '#3b82f6',\n            robotName: 'Assistente IA',\n            salesUrl: '',\n            instructions: '',\n            apiBase: window.location.origin,\n            captureLeads: true\n        },\n        \n        getApiKeyFromQuery: function(name) {\n            const urlParams = new URLSearchParams(window.location.search);\n            return urlParams.get(name);\n        },\n\n        getStoredApiKey: function() {\n            return localStorage.getItem("lm_api_key");\n        },\n\n        storeApiKey: function(apiKey) {\n            localStorage.setItem("lm_api_key", apiKey);\n        },\n\n        init: function(userConfig) {\n            this.config = Object.assign(this.config, userConfig || {});\n            if (document.readyState === 'loading') {\n                document.addEventListener('DOMContentLoaded', this.createWidget.bind(this));\n            } else {\n                this.createWidget();\n            }\n        },\n        \n        createWidget: function() {\n            var container = document.createElement('div');\n            container.id = 'linkmagico-widget';\n            container.innerHTML = this.getHTML();\n            this.addStyles();\n            document.body.appendChild(container);\n            this.bindEvents();\n            \n            this.leadId = this.getStoredLeadId();\n        },\n        \n        getHTML: function() {\n            return '<div class="lm-button" id="lm-button"><i class="fas fa-comments"></i></div>' +\n                   '<div class="lm-chat" id="lm-chat" style="display:none;">' +\n                   '<div class="lm-header"><span>' + this.config.robotName + '</span><button id="lm-close">×</button></div>' +\n                   '<div class="lm-messages" id="lm-messages">' +\n                   '<div class="lm-msg lm-bot">Olá! Sou ' + this.config.robotName + ', estou aqui para tirar todas as suas dúvidas. Como posso ajudar você hoje?</div></div>' +\n                   '<div class="lm-lead-form" id="lm-lead-form" style="display:none;">' +\n                   '<div class="lm-form-title">Antes de começarmos...</div>' +\n                   '<input type="text" id="lm-lead-name" placeholder="Seu nome" class="lm-form-input">' +\n                   '<input type="email" id="lm-lead-email" placeholder="Seu melhor email" class="lm-form-input" required>' +\n                   '<input type="tel" id="lm-lead-phone" placeholder="Seu WhatsApp" class="lm-form-input">' +\n                   '<button id="lm-lead-submit" class="lm-form-submit">Começar Conversa</button>' +\n                   '</div>' +\n                   '<div class="lm-input"><input id="lm-input" placeholder="Digite..."><button id="lm-send">➤</button></div></div>';\n        },\n        \n        addStyles: function() {\n            if (document.getElementById('lm-styles')) return;\n            var css = '#linkmagico-widget{position:fixed;right:20px;bottom:20px;z-index:999999;font-family:sans-serif}' +\n                     '.lm-button{width:60px;height:60px;background:' + this.config.primaryColor + ';border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:1.8em;cursor:pointer;box-shadow:0 4px 8px rgba(0,0,0,0.2);transition:all 0.3s ease}' +\n                     '.lm-button:hover{transform:scale(1.1)}' +\n                     '.lm-chat{position:fixed;right:20px;bottom:90px;width:350px;height:500px;background:white;border-radius:10px;box-shadow:0 8px 16px rgba(0,0,0,0.2);display:flex;flex-direction:column;overflow:hidden}' +\n                     '.lm-header{background:' + this.config.primaryColor + ';color:white;padding:10px;display:flex;justify-content:space-between;align-items:center;font-weight:bold}' +\n                     '.lm-header button{background:none;border:none;color:white;font-size:1.2em;cursor:pointer}' +\n                     '.lm-messages{flex:1;padding:10px;overflow-y:auto;display:flex;flex-direction:column;gap:10px}' +\n                     '.lm-msg{padding:8px 12px;border-radius:15px;max-width:80%}' +\n                     '.lm-bot{background:#e0e0e0;align-self:flex-start}' +\n                     '.lm-user{background:' + this.config.primaryColor + ';color:white;align-self:flex-end}' +\n                     '.lm-input{display:flex;padding:10px;border-top:1px solid #eee}' +\n                     '.lm-input input{flex:1;border:1px solid #ddd;border-radius:20px;padding:8px 12px;outline:none}' +\n                     '.lm-input button{background:' + this.config.primaryColor + ';border:none;color:white;border-radius:50%;width:35px;height:35px;margin-left:10px;cursor:pointer}' +\n                     '.lm-lead-form{padding:15px;border-bottom:1px solid #eee}' +\n                     '.lm-form-title{font-weight:bold;margin-bottom:10px;color:#333}' +\n                     '.lm-form-input{width:100%;padding:8px;margin-bottom:8px;border:1px solid #ddd;border-radius:5px;font-size:0.9em}' +\n                     '.lm-form-submit{width:100%;background:' + this.config.primaryColor + ';color:white;border:none;padding:10px;border-radius:5px;cursor:pointer}' +\n                     '@media (max-width: 480px){.lm-chat{width:90%;height:80%;right:5%;bottom:5%}}';\n            var styleSheet = document.createElement('style');\n            styleSheet.id = 'lm-styles';\n            styleSheet.type = 'text/css';\n            styleSheet.innerText = css;\n            document.head.appendChild(styleSheet);\n        },\n        \n        bindEvents: function() {\n            var button = document.getElementById('lm-button');\n            var chat = document.getElementById('lm-chat');\n            var close = document.getElementById('lm-close');\n            var send = document.getElementById('lm-send');\n            var input = document.getElementById('lm-input');\n            var messages = document.getElementById('lm-messages');\n            var leadForm = document.getElementById('lm-lead-form');\n            var leadSubmit = document.getElementById('lm-lead-submit');\n\n            button.addEventListener('click', function() {\n                chat.style.display = chat.style.display === 'none' ? 'flex' : 'none';\n                if (this.config.captureLeads && !this.leadId) {\n                    leadForm.style.display = 'block';\n                    input.style.display = 'none';\n                    send.style.display = 'none';\n                }\n            }.bind(this));\n\n            close.addEventListener('click', function() {\n                chat.style.display = 'none';\n            });\n\n            leadSubmit.addEventListener('click', this.captureLead.bind(this));\n\n            send.addEventListener('click', this.sendMessage.bind(this));\n            input.addEventListener('keypress', function(e) {\n                if (e.key === 'Enter') {\n                    this.sendMessage();\n                }\n            }.bind(this));\n        },\n\n        captureLead: async function() {\n            var name = document.getElementById('lm-lead-name').value.trim();\n            var email = document.getElementById('lm-lead-email').value.trim();\n            var phone = document.getElementById('lm-lead-phone').value.trim();\n\n            if (!email) {\n                alert('Por favor, informe seu email');\n                return;\n            }\n\n            try {\n                const response = await fetch(this.config.apiBase + '/api/capture-lead', {\n                    method: 'POST',\n                    headers: {\n                        'Content-Type': 'application/json',\n                        'X-API-Key': this.config.apiKey\n                    },\n                    body: JSON.stringify({\n                        nome: name || 'Não informado',\n                        email: email,\n                        telefone: phone || 'Não informado',\n                        url_origem: window.location.href,\n                        robotName: this.config.robotName\n                    })\n                });\n\n                const data = await response.json();\n\n                if (data.success) {\n                    this.leadId = data.lead.id;\n                    this.storeLeadId(this.leadId);\n                    \n                    document.getElementById('lm-lead-form').style.display = 'none';\n                    document.getElementById('lm-input').style.display = 'block';\n                    document.getElementById('lm-send').style.display = 'block';\n                    \n                    var welcomeMsg = document.createElement('div');\n                    welcomeMsg.className = 'lm-msg lm-bot';\n                    welcomeMsg.textContent = 'Obrigado, ' + (name || 'amigo') + '! Como posso ajudar você hoje?';\n                    document.getElementById('lm-messages').appendChild(welcomeMsg);\n                }\n            } catch (error) {\n                console.error('Erro ao capturar lead:', error);\n                alert('Erro ao processar. Tente novamente.');\n            }\n        },\n\n        getStoredLeadId: function() {\n            return localStorage.getItem('lm_lead_id');\n        },\n\n        storeLeadId: function(leadId) {\n            localStorage.setItem('lm_lead_id', leadId);\n        },\n\n        sendMessage: async function() {\n            var input = document.getElementById('lm-input');\n            var messages = document.getElementById('lm-messages');\n            var message = input.value.trim();\n            if (!message) return;\n\n            var userMsg = document.createElement('div');\n            userMsg.className = 'lm-msg lm-user';\n            userMsg.textContent = message;\n            messages.appendChild(userMsg);\n            input.value = '';\n            messages.scrollTop = messages.scrollHeight;\n\n            try {\n                const response = await fetch(this.config.apiBase + '/api/chat-universal', {\n                    method: 'POST',\n                    headers: {\n                        'Content-Type': 'application/json',\n                        'X-API-Key': this.config.apiKey\n                    },\n                    body: JSON.stringify({\n                        message: message,\n                        url: this.config.salesUrl,\n                        instructions: this.config.instructions,\n                        robotName: this.config.robotName,\n                        conversationId: this.config.conversationId,\n                        leadId: this.leadId\n                    })\n                });\n                const data = await response.json();\n\n                var botMsg = document.createElement('div');\n                botMsg.className = 'lm-msg lm-bot';\n                botMsg.textContent = data.response || 'Desculpe, ocorreu um erro.';\n                messages.appendChild(botMsg);\n                messages.scrollTop = messages.scrollHeight;\n\n            } catch (error) {\n                console.error('Widget chat error:', error);\n                var errorMsg = document.createElement('div');\n                errorMsg.className = 'lm-msg lm-bot';\n                errorMsg.textContent = 'Erro de conexão. Tente novamente.';\n                messages.appendChild(errorMsg);\n                messages.scrollTop = messages.scrollHeight;\n            }\n        }\n    };\n\n    window.LinkMagicoWidget = LinkMagicoWidget;\n    if (window.LinkMagicoWidgetConfig) {\n        window.LinkMagicoWidget.init(window.LinkMagicoWidgetConfig);\n    }\n})();\n`);
});

function generateChatbotHTML({ robotName, url, instructions }) {
    const escapedRobotName = String(robotName).replace(/"/g, "&quot;");
    const escapedUrl = String(url).replace(/"/g, "&quot;");
    const escapedInstructions = String(instructions).replace(/"/g, "&quot;");

    return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>LinkMágico Chatbot - ${escapedRobotName}</title>
<meta name="description" content="Chatbot IA - ${escapedRobotName}"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.chat-container{width:100%;max-width:800px;height:90vh;background:white;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,0.15);display:flex;flex-direction:column;overflow:hidden}
.chat-header{background:linear-gradient(135deg,#3b82f6 0%,#1e40af 100%);color:white;padding:20px;text-align:center;position:relative}
.chat-header h1{font-size:1.5rem;font-weight:600}
.chat-header .subtitle{font-size:0.9rem;opacity:0.9;margin-top:5px}
.chat-messages{flex:1;padding:20px;overflow-y:auto;display:flex;flex-direction:column;gap:15px;background:#f8fafc}
.chat-message{max-width:70%;padding:15px;border-radius:15px;font-size:0.95rem;line-height:1.4}
.chat-message.user{background:linear-gradient(135deg,#3b82f6 0%,#1e40af 100%);color:white;align-self:flex-end;border-bottom-right-radius:5px}
.chat-message.bot{background:#f1f5f9;color:#334155;align-self:flex-start;border-bottom-left-radius:5px}
.chat-input-container{padding:20px;background:white;border-top:1px solid#e2e8f0;display:flex;gap:10px}
.chat-input{flex:1;border:1px solid#e2e8f0;border-radius:25px;padding:12px 20px;font-size:0.95rem;outline:none;transition:all 0.3s}
.chat-input:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,0.1)}
.send-button{background:linear-gradient(135deg,#3b82f6 0%,#1e40af 100%);border:none;border-radius:50%;width:50px;height:50px;color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.3s}
.send-button:hover{transform:scale(1.05);box-shadow:0 5px 15px rgba(59,130,246,0.4)}
.send-button:disabled{opacity:0.6;cursor:not-allowed;transform:none}
.typing-indicator{display:none;align-items:center;gap:5px;color:#64748b;font-size:0.9rem;margin-top:10px}
.typing-dot{width:8px;height:8px;background:#64748b;border-radius:50%;animation:typing 1.4s infinite}
.typing-dot:nth-child(2){animation-delay:0.2s}
.typing-dot:nth-child(3){animation-delay:0.4s}
@keyframes typing{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-10px)}}
.status-online{position:absolute;top:15px;right:15px;background:rgba(16,185,129,0.2);color:#10b981;padding:5px 10px;border-radius:15px;font-size:0.75rem;font-weight:600}
.lead-form{background:white;padding:20px;border-radius:10px;margin:20px;box-shadow:0 4px 12px rgba(0,0,0,0.1)}
.lead-form h3{margin-bottom:15px;color:#1e40af}
.lead-form input{width:100%;padding:12px;margin-bottom:10px;border:1px solid#e2e8f0;border-radius:8px;font-size:0.95rem}
.lead-form button{width:100%;background:linear-gradient(135deg,#3b82f6 0%,#1e40af 100%);color:white;border:none;padding:12px;border-radius:8px;cursor:pointer;font-weight:600}
.contact-buttons{display:flex;gap:10px;margin-top:15px;flex-wrap:wrap}
.contact-button{flex:1;min-width:120px;background:#f1f5f9;border:1px solid#e2e8f0;border-radius:8px;padding:10px;text-align:center;cursor:pointer;transition:all 0.3s;text-decoration:none;color:#334155;font-size:0.85rem}
.contact-button:hover{background:#3b82f6;color:white;transform:translateY(-2px)}
.contact-button i{margin-right:5px}
</style>
</head>
<body>
<div class="chat-container">
<div class="chat-header">
<h1>${escapedRobotName}</h1>
<div class="subtitle">Estou aqui para tirar todas as suas dúvidas</div>
<div class="status-online">Online</div>
</div>

<div class="lead-form" id="leadForm">
<h3>🎯 Vamos começar!</h3>
<p style="margin-bottom:15px;color:#64748b">Deixe seus dados para uma experiência personalizada</p>
<input type="text" id="leadName" placeholder="Seu nome completo">
<input type="email" id="leadEmail" placeholder="Seu melhor email" required>
<input type="tel" id="leadPhone" placeholder="Seu WhatsApp (opcional)">
<button id="startChat">Iniciar Conversa →</button>
</div>

<div class="chat-messages" id="chatMessages" style="display:none">
<div class="chat-message bot">
Olá! Sou ${escapedRobotName}, estou aqui para tirar todas as suas dúvidas. Como posso ajudar você hoje?
</div>
</div>

<div class="typing-indicator" id="typingIndicator">
<span class="typing-dot"></span>
<span class="typing-dot"></span>
<span class="typing-dot"></span>
<span>Digitando...</span>
</div>

<div class="chat-input-container" id="chatInputContainer" style="display:none">
<input type="text" class="chat-input" id="chatInput" placeholder="Digite sua pergunta..." maxlength="500">
<button class="send-button" id="sendButton">
<i class="fas fa-paper-plane"></i>
</button>
</div>
</div>

<script>
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');
const leadForm = document.getElementById('leadForm');
const chatInputContainer = document.getElementById('chatInputContainer');
const startChatBtn = document.getElementById('startChat');

const config = {
    robotName: "${escapedRobotName}",
    url: "${escapedUrl}",
    instructions: "${escapedInstructions}",
    conversationId: 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
};

let isTyping = false;
let leadId = null;

// Capturar lead
startChatBtn.addEventListener('click', async function() {
    const name = document.getElementById('leadName').value.trim();
    const email = document.getElementById('leadEmail').value.trim();
    const phone = document.getElementById('leadPhone').value.trim();

    if (!email) {
        alert('Por favor, informe seu email');
        return;
    }

    try {
        const response = await fetch('/api/capture-lead', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: name || 'Não informado',
                email: email,
                telefone: phone || 'Não informado',
                url_origem: window.location.href,
                robotName: config.robotName
            })
        });

        const data = await response.json();
        
        if (data.success) {
            leadId = data.lead.id;
            leadForm.style.display = 'none';
            chatMessages.style.display = 'flex';
            chatInputContainer.style.display = 'flex';
            
            addMessage(\`Olá \${name || 'amigo'}! É um prazer ter você aqui. Como posso ajudar você hoje?\`, false);
        }
    } catch (error) {
        console.error('Erro ao capturar lead:', error);
        alert('Erro ao processar. Tente novamente.');
    }
});

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message ' + (isUser ? 'user' : 'bot');
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    isTyping = true;
    typingIndicator.style.display = 'flex';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
    isTyping = false;
    typingIndicator.style.display = 'none';
}

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message || isTyping) return;

    addMessage(message, true);
    chatInput.value = '';
    sendButton.disabled = true;
    showTyping();

    try {
        const response = await fetch('/api/chat-universal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                url: config.url,
                instructions: config.instructions,
                robotName: config.robotName,
                conversationId: config.conversationId,
                leadId: leadId
            })
        });

        const data = await response.json();
        
        hideTyping();
        
        if (data.success) {
            addMessage(data.response);
        } else {
            addMessage('Desculpe, ocorreu um erro. Tente novamente em alguns minutos.');
        }
    } catch (error) {
        hideTyping();
        addMessage('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
        sendButton.disabled = false;
        chatInput.focus();
    }
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Auto-focus no primeiro campo do formulário
document.getElementById('leadName').focus();
</script>
</body>
</html>`;
}

// ===== CONFIGURAR NOVAS ROTAS =====
setupRoutes(app);

// ===== INICIALIZAR SISTEMAS =====
(async () => {
    await initialize();
    
    // Iniciar servidor
    const PORT = process.env.PORT || 3000;

// ===== ROTAS DAS NOVAS INTEGRAÇÕES V3.0 =====

// Gmail Integration
app.post('/api/gmail/send', async (req, res) => {
    try {
        const { to, subject, html, text } = req.body;
        const result = await gmailManager.sendEmail({ to, subject, html, text });
        res.json({ success: true, result });
    } catch (error) {
        logger.error('Erro ao enviar email:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/gmail/status', (req, res) => {
    const status = gmailManager.getStatus();
    res.json(status);
});

// WhatsApp Integration
app.post('/api/whatsapp/send', async (req, res) => {
    try {
        const { to, message } = req.body;
        const result = await whatsappManager.sendMessage(to, message);
        res.json({ success: true, result });
    } catch (error) {
        logger.error('Erro ao enviar WhatsApp:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/whatsapp/status', (req, res) => {
    const status = whatsappManager.getStatus();
    res.json(status);
});

// ChatGPT Integration
app.post('/api/chatgpt/generate', async (req, res) => {
    try {
        const { prompt, model, pageContent } = req.body;
        const result = await chatgptManager.generateResponse(prompt, pageContent, model);
        res.json({ success: true, result });
    } catch (error) {
        logger.error('Erro ao gerar resposta ChatGPT:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/chatgpt/status', (req, res) => {
    const status = chatgptManager.getStatus();
    res.json(status);
});

app.get('/api/chatgpt/models', (req, res) => {
    const models = chatgptManager.getAvailableModels();
    res.json(models);
});

// Whitelabel System
app.post('/api/whitelabel/:chatbotId', async (req, res) => {
    try {
        const { chatbotId } = req.params;
        const config = req.body;
        await whitelabelManager.saveConfig(chatbotId, config);
        res.json({ success: true, config });
    } catch (error) {
        logger.error('Erro ao salvar config whitelabel:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/whitelabel/:chatbotId', async (req, res) => {
    try {
        const { chatbotId } = req.params;
        const config = await whitelabelManager.getConfig(chatbotId);
        res.json({ success: true, config });
    } catch (error) {
        logger.error('Erro ao buscar config whitelabel:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Structured Leads
app.post('/api/leads/structured', async (req, res) => {
    try {
        const { chatbotId, leadData, metadata } = req.body;
        const lead = await structuredLeadsManager.saveLead(chatbotId, leadData, metadata);
        
        // Enviar notificações
        if (process.env.GMAIL_USER) {
            await gmailManager.sendLeadNotification(lead);
        }
        if (process.env.WHATSAPP_PROVIDER) {
            await whatsappManager.sendLeadNotification(lead);
        }
        
        res.json({ success: true, lead });
    } catch (error) {
        logger.error('Erro ao salvar lead estruturado:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/leads/structured/:chatbotId', async (req, res) => {
    try {
        const { chatbotId } = req.params;
        const { status, limit, offset } = req.query;
        const leads = await structuredLeadsManager.getLeads(chatbotId, { status, limit, offset });
        res.json({ success: true, leads });
    } catch (error) {
        logger.error('Erro ao buscar leads:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/leads/export/:chatbotId', async (req, res) => {
    try {
        const { chatbotId } = req.params;
        const csv = await structuredLeadsManager.exportToCSV(chatbotId);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="leads-${chatbotId}.csv"`);
        res.send(csv);
    } catch (error) {
        logger.error('Erro ao exportar leads:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/leads/stats/:chatbotId', async (req, res) => {
    try {
        const { chatbotId } = req.params;
        const stats = await structuredLeadsManager.getStats(chatbotId);
        res.json({ success: true, stats });
    } catch (error) {
        logger.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// CRM Integrations (documentação)
app.get('/api/crm/templates', (req, res) => {
    const templates = crmIntegrations.getAllTemplates();
    res.json({ success: true, templates });
});

app.get('/api/crm/templates/:crm', (req, res) => {
    const { crm } = req.params;
    const template = crmIntegrations.getTemplate(crm);
    if (template) {
        res.json({ success: true, template });
    } else {
        res.status(404).json({ success: false, error: 'CRM não encontrado' });
    }
});

console.log('✅ Rotas V3.0 configuradas');

app.listen(PORT, '0.0.0.0', () => {
        logger.info(`Server running on port ${PORT}`);
        
        console.log(`🌐 Servidor rodando em http://0.0.0.0:${PORT}` );
        console.log(`📊 Dashboard: http://0.0.0.0:${PORT}/api/system/status` );
        console.log(`🚀 LinkMágico v7.0 SUPERINTELIGENTE running on http://0.0.0.0:${PORT}` );
        console.log(`📊 Health check: http://0.0.0.0:${PORT}/health` );
        console.log(`🤖 Chatbot disponível em: http://0.0.0.0:${PORT}/chatbot` );
        console.log(`🔧 Widget JS disponível em: http://0.0.0.0:${PORT}/public/widget.js` );
        console.log(`🎯 Sistema de captura de leads PERSISTENTE ATIVADO`);
        console.log(`📈 Painel de leads: http://0.0.0.0:${PORT}/admin/leads` );
        console.log(`📞 Extração de contatos: ATIVADA`);
        console.log(`🧠 SUPERINTELIGÊNCIA EMOCIONAL: ATIVADA`);
        console.log(`📅 Sistema de agendamento: ATIVADO`);
        console.log(`🎯 Botões fixos no topo: IMPLEMENTADOS`);
        console.log(`👥 Jornada do cliente: Análise inteligente ATIVADA`);
        console.log(`🎭 Personalidades adaptativas: CONSULTIVO, EMPÁTICO, TÉCNICO, MOTIVACIONAL`);
        console.log(`🚨 Detecção de urgência: ATIVADA`);
        console.log(`🎯 Endpoint inteligente: /api/process-chat-inteligente`);
    });
})();