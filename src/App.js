import React, {useState} from 'react'
import Home from './pages/Home'
import Header from './components/Header'
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PokemonDetailsPage from './pages/PokemonDetailsPage';


const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path='/Pokemon-project' element={<Home />} />
          <Route path='/pokemon/:id' element={<PokemonDetailsPage />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
