import './App.css'
import { useState, useEffect } from 'react'

function App() {
    const [fruit, setFruit] = useState(null);

  useEffect(()=> {
    const getFruit = async() => {
        try {
            const response = await fetch('/api/fruit');
            if(response.ok) {
                const  data = await response.json();
                console.log(data);
                setFruit(data);
            }
        } catch (e) {
            console.log(e);
        }
    }
    getFruit();
  }, [])

return (
  <div className='fruit-container'>
    {
      fruit &&
      fruit.map(item => {
        return ( 
          <ul key={item.id}> 
            <li>{item.fruit}</li>
          </ul>
        );
      })
    }
  </div>
);
}

export default App
