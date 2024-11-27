import React, { useState } from 'react';

const Avaliacao = ({ user }) => {
  const [sugestoes, setSugestoes] = useState(JSON.parse(localStorage.getItem('sugestoes')) || []);
  const [selecionada, setSelecionada] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState(JSON.parse(localStorage.getItem('avaliacoes')) || {});

  const avaliarSugestao = (nota) => {
    const novaAvaliacao = { ...avaliacoes, [selecionada]: nota };
    setAvaliacoes(novaAvaliacao);
    localStorage.setItem('avaliacoes', JSON.stringify(novaAvaliacao));
  };

  const apagarSugestao = (index) => {
    const novasSugestoes = sugestoes.filter((_, i) => i !== index);
    setSugestoes(novasSugestoes);
    localStorage.setItem('sugestoes', JSON.stringify(novasSugestoes));
  };

  return (
    <div>
      <h2>Avaliar Sugestões</h2>
      <ul>
        {sugestoes.map((s, index) => (
          <li key={index}>
            {s.campanha} - {s.descricao}
            <button onClick={() => setSelecionada(index)}>Avaliar</button>
            <button onClick={() => apagarSugestao(index)}>Apagar</button>
          </li>
        ))}
      </ul>

      {selecionada !== null && (
        <div>
          <h3>Avaliação da Sugestão</h3>
          <input type="number" placeholder="Nota" onChange={(e) => avaliarSugestao(e.target.value)} />
        </div>
      )}
    </div>
  );
};

export default Avaliacao;
