import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { FaHome } from "react-icons/fa";
import { SiPokemon } from "react-icons/si";
import Nav from "react-bootstrap/Nav";
import { Image } from "react-bootstrap";
import pokeball from "../assets/pokeball-symbol.svg.png"
import pokemonLogo from "../assets/poke-logo.png"

//#2972b7 #fc0

const Header = () => {
  function generateRandomPokemon(){
    return (Math.floor(Math.random() * 200 ))
  }
  generateRandomPokemon()
  return (
    <header className="header m-3">
      <Navbar collapseOnSelect expand="sm">
        <Container>
          <LinkContainer to={`/pokemon/${123}`}>
            <Nav.Link className="text-uppercase">
              Random Pokemon
            </Nav.Link>          
          </LinkContainer>

          <LinkContainer to="/pokemon-project">
            <Navbar.Brand className="">
              <Image
                style={{ height: "auto", width: "12rem" }}
                src={pokemonLogo} 
              />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="pokedex" />
          <Navbar.Collapse
            id="pokedex"
            style={{ flexGrow: 0 }}
            className="justify-content-end"
          >
            <LinkContainer to="/pokedex">
              <Nav.Link pokedex className="text-uppercase">
                My pokemon
                <img
                  style={{ height: "auto", width: "2.5rem" }}
                  src={pokeball} 
                  alt="pokemon you've caught"
                />
              </Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
