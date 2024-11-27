import React, { useState } from 'react';

const Login = ({ setUser, setPage }) => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const user = usuarios.find(u => u.login === login && u.senha === senha);
    if (user) setUser(user);
    else alert('Login ou senha incorretos');
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Login" onChange={e => setLogin(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
      <p onClick={() => setPage('cadastro')} className="link">Não tem uma conta? Cadastre-se</p>
    </div>
  );
};

export default Login;
