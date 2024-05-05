import React, { useState } from 'react';
import { login } from '../services/users.http.service'; // Importa a função de login
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate para navegação

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    successMessage: '',
    errorMessage: ''
  }); // Estado para armazenar os dados do formulário e mensagens de sucesso/erro
  const navigate = useNavigate(); // Inicializa o hook useNavigate para navegação

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página
    try {
      // Chama a função de login passando o nome de usuário e senha
      const response = await login(formData.username, formData.password);
      const token = response.token; // Obtém o token de autenticação da resposta
      localStorage.setItem('token', token); // Armazena o token no localStorage para manter o usuário autenticado
      localStorage.setItem('id', response.id)
      // Atualiza o estado com a mensagem de sucesso e limpa a mensagem de erro
      setFormData({ ...formData, successMessage: "Logado com Sucesso!", errorMessage: '' });
      // Redireciona para a página inicial após um pequeno intervalo
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      // Em caso de erro, exibe a mensagem de erro no console e atualiza o estado com a mensagem de erro
      console.error('Erro de login:', error.message);
      setFormData({ ...formData, errorMessage: "Usuário ou Senha incorretos", successMessage: '' });
    }
  };

  // Renderiza o componente de login
  return (
    <div>
      <h2>ENTRAR</h2>
      {/* Exibe mensagem de sucesso se houver */}
      {formData.successMessage && (
        <div className="alert alert-success" role="alert">
          {formData.successMessage}
        </div>
      )}
      {/* Exibe mensagem de erro se houver */}
      {formData.errorMessage && (
        <div className="alert alert-danger" role="alert">
          {formData.errorMessage}
        </div>
      )}
      {/* Formulário de login */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Usuário" value={formData.username} onChange={handleChange} required/>
        <br />
        <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} required/>
        <br />
        {/* Botão para submeter o formulário */}
        <button type="submit">ENTRAR</button>
      </form>
      {/* Link para a página de cadastro */}
      <p>Não tem uma conta? <a href="/cadastro">Criar conta</a></p>
    </div>
  );
}
