// URL base da API e chave de autenticação
const urlApi = "https://api.watchmode.com/v1";
const keyApi = "apiKey=97yfmdD8AG9u5fifZMR9XJ5RQsZIFcAYhsoXe6ZG";

// Função assíncrona newTitle para buscar novos lançamentos
const newTitle = async () => {
    try {
        // Realiza uma chamada fetch para a API com a URL e a chave de autenticação
        const response = await fetch(`${urlApi}/releases/?${keyApi}&limit=23`);

        // Verifica se a resposta da API é bem-sucedida
        if (!response.ok) {
            throw new Error("Erro na busca dos lançamentos");
        }

        // Converte a resposta para JSON
        const dataTotal = await response.json();

        // Extrai os dados dos lançamentos da resposta JSON
        const data = dataTotal.releases;

        // Retorna os dados dos lançamentos
        return data;
    } catch (error) {
        // Em caso de erro, imprime o erro no console
        console.log(error);
    }
}

// Função assíncrona searchTitles para buscar títulos com base em um valor de pesquisa
const searchTitles = async (searchValue) => {
    try {
        // Verifica se searchValue não é undefined antes de construir a URL
        if (searchValue !== undefined) {
            // Realiza uma chamada fetch para a API com a URL e a chave de autenticação, incluindo o valor de pesquisa
            const response = await fetch(`${urlApi}/autocomplete-search/?${keyApi}&search_value=${encodeURIComponent(searchValue)}&search_type=1&types=tv,movie`);
            
            if (!response.ok) {
                throw new Error('Erro ao buscar resultados');
            }
            // Converte a resposta para JSON
            const data = await response.json();
            return data.results;
        } else {
            console.log("Deu undefined")
            return []; // Retorna uma matriz vazia se searchValue for undefined
        }
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
};

// Função assíncrona detailTitle para buscar detalhes de um título específico
const detailTitle = async (idTitulo) => {
    try {
        // Realiza uma chamada fetch para a API com a URL e a chave de autenticação, incluindo o ID do título
        const response = await fetch(`${urlApi}/title/${idTitulo}/details/?${keyApi}&language=pt&append_to_response=sources`)
        if (!response.ok) {
            throw new Error("Erro na busca dos detalhes do titulo")
        }
        // Converte a resposta para JSON
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error);
    }
}

// Função assíncrona streaming para buscar informações sobre os serviços de streaming disponíveis
const streaming = async () => {
    try {
        // Realiza uma chamada fetch para a API com a URL e a chave de autenticação, incluindo a região
        const response = await fetch(`${urlApi}/sources/?${keyApi}&regions=BR`)
        if (!response.ok) {
            throw new Error("Erro na busca dos streaming")
        }
        // Converte a resposta para JSON
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error);
    }
}

// Exporta as funções para que possam ser utilizadas em outros arquivos
export { newTitle, searchTitles, detailTitle, streaming };
