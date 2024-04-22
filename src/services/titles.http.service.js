// URL base da API e chave de autenticação
const urlApi = "https://api.watchmode.com/v1";
const keyApi = "apiKey=4od6XZPwlq0gBCh6gzZd0APr0ojhrl22iCusiGeF";

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

const searchTitles = async (searchValue) => {
    try {
        // Verifique se searchValue não é undefined antes de construir a URL
        if (searchValue !== undefined) {
            console.log(encodeURIComponent(searchValue));
            const response = await fetch(`${urlApi}/autocomplete-search/?${keyApi}&search_value=${encodeURIComponent(searchValue)}&search_type=1`);
            //console.log(encodeURIComponent(searchValue));
            if (!response.ok) {
                throw new Error('Erro ao buscar resultados');
            }
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

export { searchTitles };

// Exporta a função newTitle para que possa ser utilizada em outros arquivos
export { newTitle };
