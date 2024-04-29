import React from 'react';
import '../assets/css/login.css'; // Importe o arquivo CSS aqui
import Login from '../components/login.component'; // Importa o componente Login do arquivo login.component.js

export default function LoginPage() {
  return (
    <div className="login-container">
      <Login/>
    </div>
  );
}

