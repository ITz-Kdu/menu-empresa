import React, { useState } from 'react';

const Campanha = ({ user, setUser }) => {
  const [campanhas, setCampanhas] = useState(JSON.parse(localStorage.getItem('campanhas')) || []);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [premio, setPremio] = useState('');

  const criarCampanha = () => {
    const novaCampanha = { nome, descricao, periodo, premio, responsavel: user.nome };
    const atualizadas = [...campanhas, novaCampanha];
    setCampanhas(atualizadas);
    localStorage.setItem('campanhas', JSON.stringify(atualizadas));
  };

  const apagarCampanha = (index) => {
    const novasCampanhas = campanhas.filter((_, i) => i !== index);
    setCampanhas(novasCampanhas);
    localStorage.setItem('campanhas', JSON.stringify(novasCampanhas));
  };

  return (
    <div>
      <h2>Bem-vindo, {user.nome}</h2>
      <button onClick={() => setUser(null)}>Sair</button>
      <h3>Nova Campanha</h3>
      <input type="text" placeholder="Nome" onChange={e => setNome(e.target.value)} />
      <textarea placeholder="Descrição" onChange={e => setDescricao(e.target.value)} />
      <input type="text" placeholder="Período" onChange={e => setPeriodo(e.target.value)} />
      <input type="number" placeholder="Prêmio" onChange={e => setPremio(e.target.value)} />
      <button onClick={criarCampanha}>Criar</button>

      <h3>Campanhas Ativas:</h3>
      <ul>
        {campanhas.map((c, index) => (
          <li key={index}>
            {c.nome} - Responsável: {c.responsavel}
            <button onClick={() => apagarCampanha(index)}>Apagar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Campanha;
