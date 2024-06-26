// URL base da API
const urlApi = "http://localhost:3001/api";

// Função assíncrona login para realizar o login do usuário
const login = async (username, password) => {
  try {
    // Realiza uma chamada fetch para a rota de login da API com o método POST
    const response = await fetch(`${urlApi}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Envia os dados de usuário e senha no corpo da requisição como JSON
      body: JSON.stringify({
        usuario: username,
        senha: password
      })
    });

    // Verifica se a resposta da API é bem-sucedida
    if (!response.ok) {
      // Se não for, converte os dados de erro da resposta para JSON e lança um erro com a mensagem de erro
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    // Se a resposta for bem-sucedida, converte os dados da resposta para JSON e os retorna
    const data = await response.json();
    return data;
  } catch (error) {
    // Em caso de erro, imprime o erro no console e lança um novo erro com a mensagem de erro
    console.error('Erro ao fazer login:', error.message);
    throw new Error('Erro ao fazer login: ' + error.message);
  }
}

// Função assíncrona cadastrar para cadastrar um novo usuário
const cadastrar = async (username, email, password) => {
  try {
    // Realiza uma chamada fetch para a rota de cadastro de usuários da API com o método POST
    const response = await fetch(`${urlApi}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Envia os dados de usuário, e-mail e senha no corpo da requisição como JSON
      body: JSON.stringify({
        usuario: username,
        email: email,
        senha: password
      })
    });

    // Verifica se a resposta da API é bem-sucedida
    if (!response.ok) {
      // Se não for, converte os dados de erro da resposta para JSON e lança um erro com a mensagem de erro
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    // Se a resposta for bem-sucedida, converte os dados da resposta para JSON e os retorna
    const data = await response.json();
    return data;
  } catch (error) {
    // Em caso de erro, imprime o erro no console e lança um novo erro com a mensagem de erro
    console.error('Erro ao cadastrar:', error.message);
    throw new Error('Erro ao cadastrar: ' + error.message);
  }
}

const getFavoriteId = async () => {
  try {
    const id = localStorage.getItem('id');
    const response = await fetch(`${urlApi}/favorites/user/${id}`);
    if (!response.ok) {
        throw new Error("Erro na busca dos favoritos");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const saveFavorite = async (movie) => {
  try {
    const id = localStorage.getItem('id');
    const stream = movie.sources.map(source => source.name);
    const newMovie = { ...movie, sources: stream };

    const response = await fetch(`${urlApi}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idFilme: newMovie.id,
        urlFoto: newMovie.poster,
        title: newMovie.title,
        sources: newMovie.sources,
        usuario: id
      })
    });


    const data = await response.json();
  
    return data;
  } catch (error) {
    console.error('Erro ao cadastrar:', error.message);
    throw new Error('Erro ao cadastrar: ' + error.message);
  }
}


const deleteFavorite = async (id) => {
  try {
    const response = await fetch(`${urlApi}/favorites/${id}`,{
      method: 'DELETE'});
    if (!response.ok) {
        throw new Error("Erro ao deletar os favoritos")
    }
    
    const data = await response.json();
    return data;
} catch (error) {
    console.log(error);
}
}


// Exporta as funções para que possam ser utilizadas em outros arquivos
export { login, cadastrar, getFavoriteId, saveFavorite, deleteFavorite};
