import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica se o token de autenticação existe

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redireciona para a página de login se não estiver autenticado
  }

  return children; // Renderiza os componentes filhos se estiver autenticado
};

export default ProtectedRoute;
