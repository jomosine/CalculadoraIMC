/**
 * Serviço de API para comunicação com o backend
 * Estrutura preparada para integração com banco de dados
 */

// Configure a URL da API aqui quando o backend estiver pronto
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Salva um cálculo de IMC no banco de dados
 * @param {Object} data - Dados do cálculo (weight, height, imc, classification, etc.)
 * @returns {Promise<Object>} Resposta da API
 */
export async function saveIMCRecord(data) {
    try {
        const response = await fetch(`${API_BASE_URL}/imc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                weight: data.weight,
                height: data.height,
                imc: data.imc,
                classification: data.classification,
                risk: data.risk,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar registro');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao salvar registro:', error);
        throw error;
    }
}

/**
 * Busca histórico de cálculos de IMC
 * @param {number} limit - Número máximo de registros
 * @returns {Promise<Array>} Lista de registros
 */
export async function getIMCHistory(limit = 10) {
    try {
        const response = await fetch(`${API_BASE_URL}/imc?limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar histórico');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar histórico:', error);
        throw error;
    }
}

/**
 * Busca estatísticas do usuário
 * @returns {Promise<Object>} Estatísticas (média, evolução, etc.)
 */
export async function getIMCStatistics() {
    try {
        const response = await fetch(`${API_BASE_URL}/imc/statistics`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar estatísticas');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        throw error;
    }
}

/**
 * Deleta um registro de IMC
 * @param {string} id - ID do registro
 * @returns {Promise<Object>} Resposta da API
 */
export async function deleteIMCRecord(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/imc/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar registro');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao deletar registro:', error);
        throw error;
    }
}
