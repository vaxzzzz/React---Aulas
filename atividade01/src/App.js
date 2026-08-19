import CounterCard from './components/AddCount';

function App() {
  const defeitos = [
    'Risco na superfície',
    'Dimensão fora do padrão',
    'Peça trincada'
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {defeitos.map((defeito, index) => (
        <CounterCard key={index} label={defeito} />
      ))}
    </div>
  );
}

export default App;