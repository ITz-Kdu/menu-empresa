import React, { useState } from 'react';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Campanha from './components/Campanha';
import Sugestao from './components/Sugestao';
import Avaliacao from './components/Avaliacao';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login'); // login, cadastro, campanha, sugestao, avaliacao
  const [campanhas, setCampanhas] = useState(JSON.parse(localStorage.getItem('campanhas')) || []);
  const [sugestoes, setSugestoes] = useState(JSON.parse(localStorage.getItem('sugestoes')) || []);
  const [avaliacoes, setAvaliacoes] = useState(JSON.parse(localStorage.getItem('avaliacoes')) || []);

  // Função para apagar os dados armazenados
  const limparDados = (tipo) => {
    if (window.confirm(`Tem certeza que deseja apagar todas as ${tipo}?`)) {
      localStorage.removeItem(tipo);

      // Atualiza o estado correspondente
      if (tipo === 'campanhas') setCampanhas([]);
      if (tipo === 'sugestoes') setSugestoes([]);
      if (tipo === 'avaliacoes') setAvaliacoes([]);

      alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} apagadas com sucesso!`);
    }
  };

  if (!user) {
    return page === 'login' ? <Login setUser={setUser} setPage={setPage} /> : <Cadastro setPage={setPage} />;
  }

  return (
    <div>
      <nav>
        <button onClick={() => setPage('campanha')}>Campanhas</button>
        <button onClick={() => setPage('sugestao')}>Sugestões</button>
        <button onClick={() => setPage('avaliacao')}>Avaliações</button>
        <button onClick={() => setUser(null)}>Sair</button>
      </nav>

      {page === 'campanha' && <Campanha user={user} campanhas={campanhas} setCampanhas={setCampanhas} />}
      {page === 'sugestao' && <Sugestao user={user} sugestoes={sugestoes} setSugestoes={setSugestoes} />}
      {page === 'avaliacao' && <Avaliacao user={user} avaliacoes={avaliacoes} setAvaliacoes={setAvaliacoes} />}
    </div>
  );
}

export default App;
