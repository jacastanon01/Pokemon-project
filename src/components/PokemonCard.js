import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import { Link, useMatch } from "react-router-dom";
import "./PokemonCard.css";
import { useFetcher } from "../hooks/useFetcher";
import ErrorBoundary from "../pages/ErrorBoundary";
import {BsFillTrash3Fill }from "react-icons/bs"
import { CaughtPokemonContextDispatch } from "../context/CaughtPokemonContext";

// style={{backgroundColor: "#00d4ff"}}

const PokemonCard = ({ pokemon }) => {
  const path = useMatch("/pokedex")
  const dispatch = useContext(CaughtPokemonContextDispatch)
  
  const { data, error } = useFetcher("pokemon", pokemon);
  if (error) {
    return <ErrorBoundary />;
  }

  return (
    data && (
      <Card className="p-3 rounded text-center shadow mb-5">
        {
          path && <button 
              style={{width: "10%", height: "auto", borderRadius: "10%"}}
              onClick={() => {
                console.log("CLICKED")
                dispatch({
                  type: "DELETE",
                  id: data.id
                })
              }}
            >
            <BsFillTrash3Fill />
          </button>
        }
        <Link to={`/pokemon/${data.id}`} style={{ textDecoration: "none" }}>
          <Card.Img
            style={{ width: "8rem" }}
            src={data.sprites.front_default}
            variant="top"
          />
          <Card.Body className={`${data.types[0].type.name}`}>
            <Card.Title
              className={`title text-capitalize ${
                data.types[0].type.name.toLowerCase() !== "dark" && "text-black"
              }`}
            >
              {`#${data.id} ${data.name}`}
              <br />
              {data.types[0].type.name}
            </Card.Title>
          </Card.Body>
        </Link>
      </Card>
    )
  );
};

export default PokemonCard;
