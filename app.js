// Configurações padrão da aplicação
const defaultConfig = {
    app_title: "Calculadora de IMC",
    subtitle: "Calcule seu Índice de Massa Corporal e conheça sua classificação",
    weight_label: "Peso (kg)",
    height_label: "Altura (m ou cm)",
    calculate_button: "Calcular IMC"
};

// Classificações do IMC segundo a Organização Mundial da Saúde (OMS)
const IMC_CLASSIFICATIONS = {
    UNDERWEIGHT: {
        min: 0,
        max: 18.5,
        classification: "Abaixo do peso",
        class: "underweight",
        risk: "Risco Baixo (Possível desnutrição)",
        description: "Pode indicar desnutrição ou outros problemas de saúde. Recomenda-se consultar um profissional de saúde para avaliação nutricional.",
        color: "text-teal-600"
    },
    NORMAL: {
        min: 18.5,
        max: 24.9,
        classification: "Peso normal",
        class: "normal",
        risk: "Risco Normal (Saudável)",
        description: "Parabéns! Seu peso está dentro da faixa considerada saudável. Mantenha uma alimentação equilibrada e pratique exercícios regularmente.",
        color: "text-emerald-600"
    },
    OVERWEIGHT: {
        min: 25.0,
        max: 29.9,
        classification: "Sobrepeso",
        class: "overweight",
        risk: "Risco Elevado",
        description: "Indica excesso de peso. Recomenda-se adotar hábitos alimentares mais saudáveis e aumentar a atividade física para prevenir complicações.",
        color: "text-yellow-600"
    },
    OBESE_1: {
        min: 30.0,
        max: 34.9,
        classification: "Obesidade Grau I",
        class: "obese-1",
        risk: "Risco Alto",
        description: "Obesidade moderada. É importante buscar orientação médica e nutricional para um plano de emagrecimento seguro e eficaz.",
        color: "text-orange-500"
    },
    OBESE_2: {
        min: 35.0,
        max: 39.9,
        classification: "Obesidade Grau II",
        class: "obese-2",
        risk: "Risco Muito Alto",
        description: "Obesidade severa. Necessário acompanhamento médico urgente para prevenir complicações cardiovasculares e metabólicas.",
        color: "text-red-500"
    },
    OBESE_3: {
        min: 40.0,
        max: Infinity,
        classification: "Obesidade Grau III",
        class: "obese-3",
        risk: "Risco Extremo (Mórbido)",
        description: "Obesidade mórbida. Requer intervenção médica imediata. Considere tratamentos especializados e possíveis procedimentos cirúrgicos.",
        color: "text-red-700"
    }
};

/**
 * Calcula o IMC (Índice de Massa Corporal)
 * @param {number} weight - Peso em kg
 * @param {number} height - Altura em metros
 * @returns {number} Valor do IMC
 */
function calculateIMC(weight, height) {
    if (!weight || !height || weight <= 0 || height <= 0) {
        throw new Error('Peso e altura devem ser valores positivos');
    }
    return weight / (height * height);
}

/**
 * Classifica o IMC de acordo com os padrões contínuos da OMS
 * @param {number} imc - Valor do IMC
 * @returns {Object} Objeto com classificação, risco e descrição
 */
function classifyIMC(imc) {
    if (imc < 18.5) {
        return IMC_CLASSIFICATIONS.UNDERWEIGHT;
    } else if (imc < 25.0) {
        return IMC_CLASSIFICATIONS.NORMAL;
    } else if (imc < 30.0) {
        return IMC_CLASSIFICATIONS.OVERWEIGHT;
    } else if (imc < 35.0) {
        return IMC_CLASSIFICATIONS.OBESE_1;
    } else if (imc < 40.0) {
        return IMC_CLASSIFICATIONS.OBESE_2;
    } else {
        return IMC_CLASSIFICATIONS.OBESE_3;
    }
}

/**
 * Valida e normaliza os dados de entrada
 * @param {number} weight - Peso em kg
 * @param {number} height - Altura em metros ou cm
 * @returns {Object}
 */
function validateInput(weight, height) {
    if (isNaN(weight) || weight <= 0) {
        return { isValid: false, message: 'Por favor, insira um peso válido.' };
    }
    if (weight < 1 || weight > 500) {
        return { isValid: false, message: 'O peso deve estar entre 1 e 500 kg.' };
    }
    if (isNaN(height) || height <= 0) {
        return { isValid: false, message: 'Por favor, insira uma altura válida.' };
    }

    // Se o usuário digitou em centímetros (ex: 175 ao invés de 1.75)
    if (height > 3 && height <= 300) {
        return { isValid: true, message: '', convertedHeight: height / 100 };
    }

    if (height < 0.5 || height > 3) {
        return { isValid: false, message: 'A altura deve estar entre 0.5m e 3.0m (ex: 1.75).' };
    }

    return { isValid: true, message: '', convertedHeight: height };
}

// Elementos DOM
const elements = {};

function cacheElements() {
    elements.form = document.getElementById('imc-form');
    elements.weightInput = document.getElementById('weight');
    elements.heightInput = document.getElementById('height');
    elements.calculateButton = document.getElementById('calculate-button');
    elements.resultContainer = document.getElementById('result-container');
    elements.imcValue = document.getElementById('imc-value');
    elements.imcClassification = document.getElementById('imc-classification');
    elements.riskTitle = document.getElementById('risk-title');
    elements.riskDescription = document.getElementById('risk-description');
    elements.appTitle = document.getElementById('app-title');
    elements.subtitle = document.getElementById('subtitle');
    elements.weightLabel = document.getElementById('weight-label');
    elements.heightLabel = document.getElementById('height-label');
}

/**
 * Atualiza os textos da interface
 */
function updateConfig(config) {
    if (!config) return;
    if (elements.appTitle) elements.appTitle.textContent = config.app_title || defaultConfig.app_title;
    if (elements.subtitle) elements.subtitle.textContent = config.subtitle || defaultConfig.subtitle;
    if (elements.weightLabel) elements.weightLabel.textContent = config.weight_label || defaultConfig.weight_label;
    if (elements.heightLabel) elements.heightLabel.textContent = config.height_label || defaultConfig.height_label;
    if (elements.calculateButton) elements.calculateButton.textContent = config.calculate_button || defaultConfig.calculate_button;
}

/**
 * Exibe o resultado do cálculo de IMC
 */
function displayResult(imc, classification) {
    if (!elements.resultContainer) return;

    // Atualizar valor do IMC
    elements.imcValue.textContent = imc.toFixed(1);
    elements.imcValue.className = `text-5xl font-extrabold mb-4 ${classification.color}`;

    // Atualizar classificação
    elements.imcClassification.textContent = classification.classification;
    elements.imcClassification.className = `text-xl font-bold mb-5 ${classification.color}`;

    // Atualizar informações de risco
    elements.riskTitle.textContent = classification.risk;
    elements.riskDescription.textContent = classification.description;

    // Exibir o container de resultado
    elements.resultContainer.classList.remove('hidden');
    elements.resultContainer.classList.add('block');

    // Re-iniciar animação de fadeIn
    elements.resultContainer.classList.remove('animate-fadeIn');
    void elements.resultContainer.offsetWidth; // Força reflow para reiniciar animação
    elements.resultContainer.classList.add('animate-fadeIn');

    // Rolagem suave até o resultado
    elements.resultContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
}

/**
 * Processa a submissão do formulário
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const rawWeight = elements.weightInput.value.replace(',', '.');
    const rawHeight = elements.heightInput.value.replace(',', '.');

    const weight = parseFloat(rawWeight);
    let height = parseFloat(rawHeight);

    const validation = validateInput(weight, height);
    if (!validation.isValid) {
        alert(validation.message);
        return;
    }

    if (validation.convertedHeight) {
        height = validation.convertedHeight;
        elements.heightInput.value = height.toFixed(2);
    }

    try {
        const imc = calculateIMC(weight, height);
        const classification = classifyIMC(imc);
        displayResult(imc, classification);
    } catch (error) {
        console.error('Erro ao calcular IMC:', error);
        alert('Erro ao calcular IMC. Por favor, verifique os dados informados.');
    }
}

/**
 * Inicialização
 */
function init() {
    cacheElements();

    if (elements.form) {
        elements.form.removeEventListener('submit', handleFormSubmit);
        elements.form.addEventListener('submit', handleFormSubmit);
    }

    updateConfig(defaultConfig);

    if (window.elementSdk) {
        window.elementSdk.init({
            defaultConfig: defaultConfig,
            onConfigChange: updateConfig,
            mapToCapabilities: () => ({
                recolorables: [],
                borderables: [],
                fontEditable: undefined,
                fontSizeable: undefined
            }),
            mapToEditPanelValues: (config) => new Map([
                ["app_title", config.app_title || defaultConfig.app_title],
                ["subtitle", config.subtitle || defaultConfig.subtitle],
                ["weight_label", config.weight_label || defaultConfig.weight_label],
                ["height_label", config.height_label || defaultConfig.height_label],
                ["calculate_button", config.calculate_button || defaultConfig.calculate_button]
            ])
        });
    }
}

// Iniciar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Expor utilitários globalmente caso necessário
window.IMCApp = {
    defaultConfig,
    IMC_CLASSIFICATIONS,
    calculateIMC,
    classifyIMC,
    validateInput,
    displayResult
};
