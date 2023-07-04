import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function generateRandomPokemon(){
    return (Math.floor(Math.random() * 200))
  }

const RootLayout = () => {
    const [offset, setOffset] = useState(0);
    const [random, setRandom] = useState(0)
    const location = useLocation()
      
      useEffect(() => {
        const randomId = generateRandomPokemon()
        setRandom(randomId)
    }, [location])

    return (
        <Container>
            <Header random={random}/>
            <Outlet context={{offset, setOffset}} />
        </Container>
    )
}

export default RootLayout