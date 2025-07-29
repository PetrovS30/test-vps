import './App.css'
import { useState, useEffect } from 'react'

function App() {
    const [fruit, setFruit] = useState(null);
    const [vegetables, setVegetables] = useState(null);
    
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
    }, []);

    useEffect(()=> {
        const getVegetables = async() => {
            try {
                const response = await fetch('/api/vegetables');
                if(response.ok) {
                    const  data = await response.json();
                    console.log(data);
                    setVegetables(data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        getVegetables();
    }, []);

    return (
        <>
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
            <div className='vegetables-container'>
                <h2>Эти овощи из базы данных на русском языке</h2>
                {
                    vegetables ? vegetables.map(item => {
                        return ( 
                            <ul key={item.id}> 
                                <li>{item.name}</li>
                            </ul>
                        );
                    }) : <span className='vegetables-container_dont'>We didn`t get vegetables form DataBase MySQL</span>
                }
            </div>
        </>
    );
}

export default App
