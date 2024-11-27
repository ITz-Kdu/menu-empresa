import React, { useState, useEffect } from 'react';

const Avaliacao = ({ user }) => {
  const [sugestoes, setSugestoes] = useState(JSON.parse(localStorage.getItem('sugestoes')) || []);
  const [selecionada, setSelecionada] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState(JSON.parse(localStorage.getItem('avaliacoes')) || {});
  const [nota, setNota] = useState("");  // Armazena o valor da nota digitada
  const [notaSalva, setNotaSalva] = useState(null); // Para armazenar e exibir a nota salva

  // Função para salvar a avaliação no localStorage
  const salvarAvaliacao = () => {
    const avaliacaoNota = Number(nota);
    if (avaliacaoNota < 1 || avaliacaoNota > 10) {
      alert("A nota deve ser entre 1 e 10.");
      return;
    }

    // Atualiza as avaliações com a nova nota para a sugestão selecionada
    const novaAvaliacao = { ...avaliacoes, [selecionada]: avaliacaoNota };
    setAvaliacoes(novaAvaliacao);
    localStorage.setItem('avaliacoes', JSON.stringify(novaAvaliacao));

    // Atualiza o estado da nota salva para exibição
    setNotaSalva(avaliacaoNota);
  };

  // Apaga a sugestão selecionada
  const apagarSugestao = (index) => {
    const novasSugestoes = sugestoes.filter((_, i) => i !== index);
    setSugestoes(novasSugestoes);
    localStorage.setItem('sugestoes', JSON.stringify(novasSugestoes));
  };

  // Exibe a avaliação da sugestão selecionada logo abaixo do campo de nota
  const mostrarAvaliacao = () => {
    if (selecionada !== null && selecionada >= 0 && selecionada < sugestoes.length) {
      const sugestao = sugestoes[selecionada];
      const avaliacao = avaliacoes[selecionada];
      return avaliacao 
        ? `Campanha: ${sugestao.campanha} - ${sugestao.descricao} | Avaliação: ${avaliacao}`
        : `Campanha: ${sugestao.campanha} - ${sugestao.descricao} | Esta sugestão ainda não foi avaliada.`;
    }
    return null;
  };

  useEffect(() => {
    // Sincroniza as avaliações sempre que as sugestões ou avaliações mudarem
    localStorage.setItem('sugestoes', JSON.stringify(sugestoes));
  }, [sugestoes]);

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

      {selecionada !== null && selecionada >= 0 && selecionada < sugestoes.length && (
        <div>
          <h3>Avaliação da Sugestão</h3>
          <input
            type="number"
            min="1"
            max="10"
            placeholder="Nota (1-10)"
            value={nota}
            onChange={(e) => setNota(e.target.value)}  // Atualiza a nota digitada
          />
          <button onClick={salvarAvaliacao}>Salvar Avaliação</button>
          {/* Exibe a avaliação abaixo do campo de entrada */}
          <div>
            {mostrarAvaliacao()}
          </div>

          {/* Exibe a nota salva, se existir */}
          {notaSalva !== null && (
            <div>
              Nota salva para {sugestoes[selecionada].campanha}: {notaSalva}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Avaliacao;
