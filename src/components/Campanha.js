import React, { useState } from 'react';

const Campanha = ({ user, setUser }) => {
  const [campanhas, setCampanhas] = useState(JSON.parse(localStorage.getItem('campanhas')) || []);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [premio, setPremio] = useState('');
  const [abaAtiva, setAbaAtiva] = useState('minhasCampanhas');
  const [campanhaEditando, setCampanhaEditando] = useState(null);
  const [participacoes, setParticipacoes] = useState(JSON.parse(localStorage.getItem('participacoes')) || []);
  const [vencedora, setVencedora] = useState(null);

  const criarCampanha = () => {
    const novaCampanha = {
      nome,
      descricao,
      periodo,
      premio,
      responsavel: user.nome,
      participantes: [],
      vencedora: null,
    };
    const atualizadas = [...campanhas, novaCampanha];
    setCampanhas(atualizadas);
    localStorage.setItem('campanhas', JSON.stringify(atualizadas));
    alert('Campanha criada com sucesso!');
    resetarFormulario();
  };

  const resetarFormulario = () => {
    setNome('');
    setDescricao('');
    setPeriodo('');
    setPremio('');
    setCampanhaEditando(null);
    setVencedora(null);
  };

  const apagarCampanha = (campanha) => {
    const novasCampanhas = campanhas.filter((c) => c !== campanha);
    setCampanhas(novasCampanhas);
    localStorage.setItem('campanhas', JSON.stringify(novasCampanhas));
  };

  const iniciarEdicao = (campanha) => {
    setCampanhaEditando(campanha);
    setNome(campanha.nome);
    setDescricao(campanha.descricao);
    setPeriodo(campanha.periodo);
    setPremio(campanha.premio);
    setVencedora(campanha.vencedora);
  };

  const salvarEdicao = () => {
    const campanhasAtualizadas = campanhas.map((c) => {
      if (c === campanhaEditando) {
        return { ...c, nome, descricao, periodo, premio, vencedora };
      }
      return c;
    });
    setCampanhas(campanhasAtualizadas);
    localStorage.setItem('campanhas', JSON.stringify(campanhasAtualizadas));
    alert('Campanha editada com sucesso!');
    resetarFormulario();
  };

  const participarDaCampanha = (campanha) => {
    const participantesAtualizados = campanha.participantes || [];
    if (!participantesAtualizados.includes(user.nome)) {
      participantesAtualizados.push(user.nome);
    }

    const campanhasAtualizadas = campanhas.map((c) => {
      if (c === campanha) {
        return { ...c, participantes: participantesAtualizados };
      }
      return c;
    });

    setCampanhas(campanhasAtualizadas);
    localStorage.setItem('campanhas', JSON.stringify(campanhasAtualizadas));

    const minhasParticipacoes = [...participacoes, campanha];
    setParticipacoes(minhasParticipacoes);
    localStorage.setItem('participacoes', JSON.stringify(minhasParticipacoes));

    alert(`Você está participando da campanha: ${campanha.nome}`);
  };

  const anunciarVencedor = (campanha, sugestao) => {
    if (!sugestao || !sugestao.descricao) {
      alert('Selecione uma sugestão válida para anunciar como vencedor.');
      return;
    }

    const campanhasAtualizadas = campanhas.map((c) => {
      if (c === campanha) {
        return { ...c, vencedora: sugestao };
      }
      return c;
    });
    setCampanhas(campanhasAtualizadas);
    localStorage.setItem('campanhas', JSON.stringify(campanhasAtualizadas));

    alert(`Vencedor da campanha "${campanha.nome}" anunciado: ${sugestao.descricao}`);
  };

  return (
    <div>
      <h2>Bem-vindo, {user.nome}</h2>

      <nav>
        <button onClick={() => setAbaAtiva('minhasCampanhas')}>Minhas Campanhas</button>
        <button onClick={() => setAbaAtiva('todasCampanhas')}>Campanhas Gerais</button>
        <button onClick={() => setAbaAtiva('minhasParticipacoes')}>Minhas Participações</button>
      </nav>

      {abaAtiva === 'minhasCampanhas' && (
        <>
          <h3>{campanhaEditando ? 'Editar Campanha' : 'Nova Campanha'}</h3>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <input
            type="text"
            placeholder="Período"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          />
          <input
            type="number"
            placeholder="Prêmio"
            value={premio}
            onChange={(e) => setPremio(e.target.value)}
          />
          {campanhaEditando ? (
            <button onClick={salvarEdicao}>Salvar</button>
          ) : (
            <button onClick={criarCampanha}>Criar</button>
          )}

          <h3>Minhas Campanhas:</h3>
          <ul>
            {campanhas
              .filter((c) => c.responsavel === user.nome)
              .map((c, index) => (
                <li key={index}>
                  <strong>{c.nome}</strong> - Responsável: {c.responsavel}
                  <button className='edit' onClick={() => iniciarEdicao(c)}>Editar</button>
                  <button className='clear' onClick={() => apagarCampanha(c)}>Apagar</button>
                </li>
              ))}
          </ul>
        </>
      )}

      {abaAtiva === 'todasCampanhas' && (
        <>
          <h3>Campanhas Gerais:</h3>
          <div className='camp-card'>
          <div>
            {campanhas.map((c, index) => (
              <div key={index}>
                <strong>{c.nome}</strong> - Responsável: {c.responsavel}
                <p>
                  <strong>Descrição:</strong> {c.descricao}
                </p>
                <p>
                  <strong>Período:</strong> {c.periodo}
                </p>
                <p>
                  <strong>Prêmio:</strong> {c.premio}
                </p>
                {!c.participantes || !c.participantes.includes(user.nome) ? (
                  <button onClick={() => participarDaCampanha(c)}>Participar</button>
                ) : (
                  <p>Você está participando desta campanha.</p>
                )}
                {c.vencedora && <p><strong>Vencedora:</strong> {c.vencedora.descricao}</p>}
              </div>
            ))}
          </div>
          </div>
        </>
      )}

      {abaAtiva === 'minhasParticipacoes' && (
        <>
          <h3>Campanhas que você está participando:</h3>
          <ul>
            {participacoes.map((c, index) => (
              <li key={index}>
                <strong>{c.nome}</strong> - Responsável: {c.responsavel}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Campanha;
