import { useState } from 'react';
import Placar from './components/Placar';
import AcoesJogo from './components/AcoesJogo';
import Historico from './components/Historico';

export default function App() {
  const [pontosA, setPontosA] = useState(0);
  const [pontosB, setPontosB] = useState(0);

  // true = Time A | false = Time B
  const [posseTimeA, setPosseTimeA] = useState(true);

  // Histórico agora guarda as informações necessárias para desfazer
  const [historico, setHistorico] = useState([]);

  // Verifica se existe vencedor
  const vencedor =
    pontosA >= 21
      ? 'Time A'
      : pontosB >= 21
      ? 'Time B'
      : null;

  // Registrar pontos
  function registrarPontos(pontos) {
    // Se já existe vencedor, não deixa pontuar
    if (vencedor) {
      return;
    }

    const timeAtual = posseTimeA ? 'Time A' : 'Time B';

    // Adiciona os pontos
    if (posseTimeA) {
      setPontosA(pontosA + pontos);
    } else {
      setPontosB(pontosB + pontos);
    }

    // Salva a jogada no histórico
    setHistorico([
      ...historico,
      {
        time: timeAtual,
        pontos: pontos,
        posseAnterior: posseTimeA
      }
    ]);

    // Troca a posse
    setPosseTimeA(!posseTimeA);
  }

  // Passar a bola
  function passarBola() {
    // Não permite passar a bola depois da vitória
    if (vencedor) {
      return;
    }

    setPosseTimeA(!posseTimeA);
  }

  // Desfazer última jogada
  function desfazerUltimaJogada() {
    // Se não existe histórico, não faz nada
    if (historico.length === 0) {
      return;
    }

    // Pega a última jogada
    const ultimaJogada = historico[historico.length - 1];

    // Remove os pontos
    if (ultimaJogada.time === 'Time A') {
      setPontosA(pontosA - ultimaJogada.pontos);
    } else {
      setPontosB(pontosB - ultimaJogada.pontos);
    }

    // Devolve a posse anterior
    setPosseTimeA(ultimaJogada.posseAnterior);

    // Remove a última jogada do histórico
    setHistorico(historico.slice(0, -1));
  }

  // Reiniciar partida
  function reiniciarPartida() {
    setPontosA(0);
    setPontosB(0);
    setPosseTimeA(true);
    setHistorico([]);
  }

  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'sans-serif',
        maxWidth: '600px',
        margin: '0 auto'
      }}
    >

      <h1>Placar do Jogo</h1>

      {/* BANNER DE VITÓRIA */}
      {vencedor && (
        <div
          style={{
            backgroundColor: '#ffd700',
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '10px',
            fontSize: '24px',
            fontWeight: 'bold'
          }}
        >
          🏆 {vencedor} venceu a partida! 🏆
        </div>
      )}

      <Placar
        pontosA={pontosA}
        pontosB={pontosB}
        posseTimeA={posseTimeA}
      />

      <AcoesJogo
        onPontuar={registrarPontos}
        onPassarBola={passarBola}
        onDesfazer={desfazerUltimaJogada}
        onReiniciar={reiniciarPartida}
        podeDesfazer={historico.length > 0}
        jogoFinalizado={vencedor !== null}
      />

      <Historico historico={historico} />

    </div>
  );
}