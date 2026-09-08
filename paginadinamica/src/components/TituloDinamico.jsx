import { useState, useEffect } from 'react';

function TituloDinamico() {
  const [texto, setTexto] = useState('');

  useEffect(() => {
    document.title = texto;
  }, [texto]);

  return (
    <div>
      <h1>Título Dinâmico</h1>

      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite alguma coisa"
      />

      <p>Texto digitado: {texto}</p>
    </div>
  );
}

export default TituloDinamico;