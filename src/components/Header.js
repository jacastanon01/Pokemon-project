import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Image } from "react-bootstrap";
import pokeball from "../assets/pokeball-symbol.svg.png"
import pokemonLogo from "../assets/poke-logo.png"
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"

//#2972b7 #fc0

const Header = ({ random }) => {

  return (
    <header className="header m-3">
      <Navbar collapseOnSelect expand="sm">
        <Container>
          
          <LinkContainer to={`/pokemon/${random}`}>
            <Nav.Link className="text-uppercase">
              Random Pokemon <GiPerspectiveDiceSixFacesRandom style={{width: "2.5rem", height: "auto"}}/>
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
              <Nav.Link className="text-uppercase">
                pokedex {" "}
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
