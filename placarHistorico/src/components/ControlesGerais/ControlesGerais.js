export default function ControlesGerais({ onReiniciar, onDesfazer, podeDesfazer, jogoFinalizado }) {
  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '15px 0' }}>
      <button onClick={onDesfazer} disabled={!podeDesfazer || jogoFinalizado}>
         Desfazer Última Jogada
      </button>
      <button onClick={onReiniciar}>
         Reiniciar Partida
      </button>
    </div>
  );
}