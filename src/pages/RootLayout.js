import { useState, useContext } from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { Container } from 'react-bootstrap';



const RootLayout = () => {
    //const random = generateRandomPokemon()
    const [offset, setOffset] = useState(0);
    return (
        <Container>
            <Header />
            <Outlet context={{offset, setOffset}} />
        </Container>
    )
}

export default RootLayout