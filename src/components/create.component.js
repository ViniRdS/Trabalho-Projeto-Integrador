import React from 'react';

function Cadastro() {
  return (
    <div>
      <h2>Criar Conta</h2>
      <form>
        <input type="text" name="username" placeholder="Usuário" />
        <br />
        <input type="email" name="email" placeholder="Email" />
        <br />
        <input type="password" name="password" placeholder="Senha" />
        <br />
        <p>Já tem uma conta? <a href="/login">Entrar</a></p>
        <button type="submit">Criar</button>
      </form>

    </div>
  );
}

export default Cadastro;
