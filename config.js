// Configurações padrão da aplicação
export const defaultConfig = {
    app_title: "Calculadora de IMC",
    subtitle: "Calcule seu Índice de Massa Corporal e conheça sua classificação",
    weight_label: "Peso (kg)",
    height_label: "Altura (m ou cm)",
    calculate_button: "Calcular IMC"
};

// Classificações do IMC segundo a Organização Mundial da Saúde (OMS)
export const IMC_CLASSIFICATIONS = {
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
