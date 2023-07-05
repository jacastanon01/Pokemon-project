import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import { CaughtPokemonContext } from "../context/CaughtPokemonContext";

export const CatchModal = ({ pokemonName, showModal, onHide }) => {
  const capturedPokemon = useContext(CaughtPokemonContext);
  return (
    <Modal show={showModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="text-capitalize">
          {pokemonName} has been caught!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You now have {capturedPokemon.length} pokemon in your pokedex!
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button>
          <NavLink
            to={"/pokedex"}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Go to my pokemon
          </NavLink>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
