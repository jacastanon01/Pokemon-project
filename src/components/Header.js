import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <header className='header d-flex justify-content-center'>
      <Navbar>
        <Container>
          <LinkContainer to="/Pokemon-project/">
            <Navbar.Brand>Home</Navbar.Brand>
          </LinkContainer>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header