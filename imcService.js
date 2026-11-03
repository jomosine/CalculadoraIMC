import { IMC_CLASSIFICATIONS } from './config.js';

/**
 * Calcula o IMC (Índice de Massa Corporal)
 * @param {number} weight - Peso em kg
 * @param {number} height - Altura em metros
 * @returns {number} Valor do IMC
 */
export function calculateIMC(weight, height) {
    if (!weight || !height || weight <= 0 || height <= 0) {
        throw new Error('Peso e altura devem ser valores positivos');
    }
    return weight / (height * height);
}

/**
 * Classifica o IMC de acordo com os padrões da OMS (sem lacunas entre faixas)
 * @param {number} imc - Valor do IMC
 * @returns {Object} Objeto com classificação, risco e descrição
 */
export function classifyIMC(imc) {
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
 * Valida os dados de entrada
 * @param {number} weight - Peso em kg
 * @param {number} height - Altura em metros ou cm
 * @returns {Object} Objeto com isValid, message e convertedHeight
 */
export function validateInput(weight, height) {
    if (isNaN(weight) || weight <= 0) {
        return { isValid: false, message: 'Por favor, insira um peso válido' };
    }
    if (weight < 1 || weight > 500) {
        return { isValid: false, message: 'O peso deve estar entre 1 e 500 kg' };
    }
    if (isNaN(height) || height <= 0) {
        return { isValid: false, message: 'Por favor, insira uma altura válida' };
    }
    if (height > 3 && height <= 300) {
        return { isValid: true, message: '', convertedHeight: height / 100 };
    }
    if (height < 0.5 || height > 3) {
        return { isValid: false, message: 'A altura deve estar entre 0.5m e 3.0m (ex: 1.75)' };
    }
    return { isValid: true, message: '', convertedHeight: height };
}
