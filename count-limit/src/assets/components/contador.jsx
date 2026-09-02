import { useState, useEffect } from 'react';

export default function ContadorCurtidas() {
  const [curtidas, setCurtidas] = useState(0);

  useEffect(() => {
    if (curtidas = 5) {
      alert('Curtidas em alta!');
    }
  }, [curtidas]);

  return (
    <div>
      <h1>Contador de Curtidas</h1>

      <p>Curtidas: {curtidas}</p>

      <button onClick={() => setCurtidas(curtidas + 1)}>
        Curtir 
      </button>
    </div>
  );
}