import React, { useState } from 'react';

const Sugestao = ({ user }) => {
  const [sugestoes, setSugestoes] = useState(JSON.parse(localStorage.getItem('sugestoes')) || []);
  const [descricao, setDescricao] = useState('');
  const [custos, setCustos] = useState('');
  const [campanhas, setCampanhas] = useState(JSON.parse(localStorage.getItem('campanhas')) || []);
  const [campanhaSelecionada, setCampanhaSelecionada] = useState('');

  const enviarSugestao = () => {
    const novaSugestao = { descricao, custos, autor: user.nome, campanha: campanhaSelecionada };
    const atualizadas = [...sugestoes, novaSugestao];
    setSugestoes(atualizadas);
    localStorage.setItem('sugestoes', JSON.stringify(atualizadas));
  };

  const apagarSugestao = (index) => {
    const novasSugestoes = sugestoes.filter((_, i) => i !== index);
    setSugestoes(novasSugestoes);
    localStorage.setItem('sugestoes', JSON.stringify(novasSugestoes));
  };

  return (
    <div>
      <h2>Enviar Sugestão</h2>
      <select onChange={(e) => setCampanhaSelecionada(e.target.value)}>
        <option value="">Selecione uma campanha</option>
        {campanhas.map((c, index) => (
          <option key={index} value={c.nome}>{c.nome}</option>
        ))}
      </select>
      <textarea placeholder="Descrição" onChange={(e) => setDescricao(e.target.value)} />
      <input type="number" placeholder="Custos envolvidos" onChange={(e) => setCustos(e.target.value)} />
      <button onClick={enviarSugestao}>Enviar</button>

      <h3>Minhas Sugestões:</h3>
      <ul>
        {sugestoes.filter(s => s.autor === user.nome).map((s, index) => (
          <li key={index}>
            {s.campanha} - {s.descricao}
            <button onClick={() => apagarSugestao(index)}>Apagar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sugestao;
