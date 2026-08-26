export default function AcoesJogo({ 
  onPontuar, 
  onPassarBola, 
  onDesfazer, 
  onReiniciar, 
  podeDesfazer, 
  jogoFinalizado 
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', margin: '20px 0' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => onPontuar(1)} disabled={jogoFinalizado}>+1 Ponto</button>
        <button onClick={() => onPontuar(2)} disabled={jogoFinalizado}>+2 Pontos</button>
        <button onClick={() => onPontuar(3)} disabled={jogoFinalizado}>+3 Pontos</button>
        <button onClick={onPassarBola} disabled={jogoFinalizado}>Trocar Posse</button>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={onDesfazer} disabled={!podeDesfazer || jogoFinalizado}>
          ↩️ Desfazer
        </button>
        <button onClick={onReiniciar}>
          🔄 Reiniciar Partida
        </button>
      </div>
    </div>
  );
}