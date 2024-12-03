import React, { useState } from 'react';

const Sugestao = ({ user }) => {
  const [sugestoes, setSugestoes] = useState(JSON.parse(localStorage.getItem('sugestoes')) || []);
  const [descricao, setDescricao] = useState('');
  const [custos, setCustos] = useState('');
  const [campanhas, setCampanhas] = useState(JSON.parse(localStorage.getItem('campanhas')) || []);
  const [campanhaSelecionada, setCampanhaSelecionada] = useState('');

  const enviarSugestao = () => {
    if (!campanhaSelecionada) {
      alert('Selecione uma campanha para enviar a sugestão.');
      return;
    }

    const novaSugestao = {
      id: Date.now().toString(),
      descricao,
      custos: parseFloat(custos),
      autor: user.nome,
      campanha: campanhaSelecionada,
    };

    // Atualiza sugestões globais
    const sugestoesAtualizadas = [...sugestoes, novaSugestao];
    setSugestoes(sugestoesAtualizadas);
    localStorage.setItem('sugestoes', JSON.stringify(sugestoesAtualizadas));

    alert('Sugestão enviada com sucesso!');
    setDescricao('');
    setCustos('');
    setCampanhaSelecionada('');
  };

  const apagarSugestao = (id) => {
    const novasSugestoes = sugestoes.filter((s) => s.id !== id);
    setSugestoes(novasSugestoes);
    localStorage.setItem('sugestoes', JSON.stringify(novasSugestoes));
  };

  return (
    <div>
      <h2>Enviar Sugestão</h2>
      <select
        onChange={(e) => setCampanhaSelecionada(e.target.value)}
        value={campanhaSelecionada}
      >
        <option value="">Selecione uma campanha</option>
        {campanhas.map((c) => (
          <option key={c.nome} value={c.nome}>
            {c.nome}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <input
        type="number"
        placeholder="Custos envolvidos"
        value={custos}
        onChange={(e) => setCustos(e.target.value)}
      />
      <button onClick={enviarSugestao}>Enviar</button>

      <h3>Minhas Sugestões:</h3>
      <ul>
        {sugestoes
          .filter((s) => s.autor === user.nome)
          .map((s) => (
            <li key={s.id}>
              {s.campanha} - {s.descricao}
              <button onClick={() => apagarSugestao(s.id)}>Apagar</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sugestao;
