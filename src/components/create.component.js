import React, { useState } from 'react';
import { cadastrar } from '../services/users.http.service'; // Importa a função para cadastrar usuários
import '../assets/css/create.css'; // Importa o estilo CSS
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate para navegação

export default function Cadastro() {
  const navigate = useNavigate(); // Inicializa o hook useNavigate para navegação

  // Estado para armazenar os dados do formulário e mensagens de erro/sucesso
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    errorMessage: ''
  });

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página
    try {
      // Chama a função de cadastro passando os dados do formulário
      await cadastrar(formData.username, formData.email, formData.password);
      // Atualiza o estado com a mensagem de sucesso e limpa a mensagem de erro
      setFormData({ ...formData, successMessage: "Cadastro realizado com sucesso!", errorMessage: '' });
      // Navega para a página de login após um pequeno intervalo
      setTimeout(() => navigate('/login'), 1500);
     
    } catch (error) {
      // Em caso de erro, exibe a mensagem de erro no console e atualiza o estado com a mensagem de erro
      console.error('Erro de cadastro:', error.message);
      setFormData({ ...formData, errorMessage: error.message });
    }
  };  

  return (
    <div>
      <h2>CRIAR CONTA</h2>
      {/* Exibe mensagem de erro se houver */}
      {formData.errorMessage && (
        <div className="alert alert-danger" role="alert">
          {formData.errorMessage}
        </div>
      )}
      {/* Exibe mensagem de sucesso se houver */}
      {formData.successMessage && (
        <div className="alert alert-success" role="alert">
          {formData.successMessage}
        </div>
      )}
      {/* Formulário de cadastro */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Usuário" value={formData.username} onChange={handleChange} required/>
        <br />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
        <br />
        <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} required/>
        <br />
        {/* Link para a página de login */}
        <p>Já tem uma conta? <a href="/login">Entrar</a></p>
        {/* Botão para submeter o formulário */}
        <button type="submit">CRIAR</button>
      </form>
    </div>
  );
}
