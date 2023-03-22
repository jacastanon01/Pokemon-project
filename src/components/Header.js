import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { FaHome } from 'react-icons/fa'

const Header = () => {
  return (
    <header className='header d-flex justify-content-center mb-3 p-2'>
      <Navbar>
        <Container>
          <LinkContainer to="/Pokemon-project/">
            <Navbar.Brand><FaHome/> Home</Navbar.Brand>
          </LinkContainer>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header