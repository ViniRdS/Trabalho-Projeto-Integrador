import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate para navegação
import '../assets/css/buttonLogin.css'; // Importa o estilo CSS do botão

export default function ButtonLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar se o usuário está autenticado
  const navigate = useNavigate(); // Inicializa o hook useNavigate para navegação

  // Função para verificar se o usuário está autenticado
  const checkAuthentication = () => {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    setIsLoggedIn(!!token); // Define o estado isLoggedIn com base na presença do token
  };

  // Efeito useEffect para verificar a autenticação inicial e configurar um intervalo para verificação contínua
  useEffect(() => {
    // Verifica a autenticação inicialmente
    checkAuthentication();
    // Configura um intervalo para verificar a autenticação continuamente
    const intervalId = setInterval(() => {
      checkAuthentication();
    }, 1000); // Verifica a cada 1 segundo

    // Limpa o intervalo ao desmontar o componente para evitar vazamento de memória
    return () => clearInterval(intervalId);
  }, []); // Executa apenas uma vez ao montar o componente

  // Função para lidar com o clique no botão
  const handleEntrarClick = () => {
    if (isLoggedIn) {
      // Se estiver autenticado, faz logout
      localStorage.removeItem('token'); // Remove o token do localStorage
      localStorage.removeItem('id')
      setIsLoggedIn(false); // Atualiza o estado para refletir que o usuário não está mais autenticado
      navigate('/'); // Redireciona para a página inicial após o logout
    } else {
      // Se não estiver autenticado, redireciona para a página de login
      navigate('/login');
    }
  };

  // Renderiza o botão com o texto "Entrar" se não estiver autenticado, ou "Logout" se estiver autenticado
  return (
    <button className="enter-button" onClick={handleEntrarClick}>
      {isLoggedIn ? 'Logout' : 'Entrar'}
    </button>
  );
}
