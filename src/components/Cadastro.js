import React, { useState } from 'react';

const Cadastro = ({ setPage }) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.find(u => u.login === login)) {
      alert('Login já existe!');
      return;
    }
    const novoUsuario = { nome, cpf, login, senha };
    localStorage.setItem('usuarios', JSON.stringify([...usuarios, novoUsuario]));
    alert('Cadastro realizado com sucesso!');
    setPage('login');
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <input type="text" placeholder="Nome" onChange={e => setNome(e.target.value)} />
      <input type="text" placeholder="CPF" onChange={e => setCpf(e.target.value)} />
      <input type="text" placeholder="Login" onChange={e => setLogin(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />
      <button onClick={handleCadastro}>Cadastrar</button>
      <p onClick={() => setPage('login')} className="link">Já tem uma conta? Faça login</p>
    </div>
  );
};

export default Cadastro;
