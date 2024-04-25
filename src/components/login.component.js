import React from 'react';

function Login() {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <input type="text" name="username" placeholder="Usuário" />
        <br />
        <input type="password" name="password" placeholder="Senha" />
        <br />
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem uma conta? <a href="/cadastro">Criar conta</a></p>
    </div>
  );
}

export default Login;
