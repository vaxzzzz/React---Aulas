import { useState } from 'react';

function Mybutton({ texto = "Risco na superficie" }) {

    const [count, setCount] = useState(0);

    return (
        <div style={{ 
            border: '1px solid #ccc', 
            borderRadius: '6px',
            padding: '12px 20px', 
            marginTop: '10px',
            width: '400px',
            marginLeft: '12px',
            marginBottom: '5px',
            display: 'flex',                 
            justifyContent: 'space-between',
            alignItems: 'center',          
        }}>
            
            {}
            <p style={{ margin: 0 }}>{texto} - <strong>{count}</strong></p>

            {}
            <button onClick={() => setCount(count + 1)} style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontWeight: 'bold',
            }}>

               Registrar 

            </button>

        </div>
    );
}

export default Mybutton;