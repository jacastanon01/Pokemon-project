import Col from "react-bootstrap/Col";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import PokemonMove from "./PokemonMove";
import { Link } from "react-router-dom";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const PokemonDetails = ({ pokemonDetails, listMoves, id }) => {
  const { sprites, types, moves } = pokemonDetails;
  const fiveMoves = moves && moves?.slice(0, 5);
  const [showMoves, setShowMoves] = useState(false)
  const moveGroup =
    moves &&
    fiveMoves.map(({ move }) => {
      return move ? (
        <PokemonMove key={move.name} move={move} />
      ) : (
        <div>No more moves to display</div>
      );
    });
// src="https://www.freepnglogos.com/uploads/pokemon-symbol-logo-png-31.png"
// src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1024px-Pok%C3%A9_Ball_icon.svg.png"
  return (
    <Row className="justify-content-center">
      <Col className="">
        <Col id="IMAGES">
          <Card
            className=" d-flex justify-content-center align-items-center position-relative"
            style={{ border: "none" }}
          >
            <Col
              id="NAV_LINKS"
              style={{ zIndex: 5 }}
              className="d-flex justify-content-between position-absolute w-100"
            >
              <Link className="m-3" to={`../${+id - 1}`} relative="path">
                <h2 className={`${types[0].type.name} px-2 h-100`}>
                  <GrLinkPrevious />
                </h2>
              </Link>
              <Link className="m-3" to={`../${+id + 1}`} relative="path">
                <h2 className={`${types[0].type.name} px-2 h-100`}>
                  <GrLinkNext />
                </h2>
              </Link>
            </Col>
            <Card.Body
              className={`${types[0].type.name}1 rounded text-center mb-1 w-100 d-flex flex-column g-3`}
            >
              <Card.Title
                style={{ minWidth: "20rem" }}
                className="fs-1 fw-bolder"
              >
                <strong className="text-capitalize">
                  #{id} {pokemonDetails.name}
                </strong>
              </Card.Title>
              <Card.Text className="fs-3 fw-bold m-0">
                Height: {Math.round(pokemonDetails.height * 3.93)}cm
              </Card.Text>
              <Card.Text className="fs-3 fw-bold m-0">
                Weight: {Math.round(pokemonDetails.weight * 0.22)}lbs
              </Card.Text>

            </Card.Body>
            <Card.Body className="d-flex flex-column align-items-center fs-4 mb-2 p-2 w-md-70">
              <Card.Text className="text-uppercase m-0">Gotta Catch 'em All!</Card.Text>
                <button title="Click to catch this Pokemon!" style={{background: "none", border: "none"}}><Card.Img style={{height: "5rem", width: "5rem"}} 
                 src="https://www.freepnglogos.com/uploads/pokemon-symbol-logo-png-31.png"
                // src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1024px-Pok%C3%A9_Ball_icon.svg.png"
                 /> </button>
              <Card.Text className="text-uppercase">Add {pokemonDetails.name} to Pokedex </Card.Text>
            </Card.Body>
            <Card.Img
              style={{ width: "20rem" }}
              src={sprites.other.home.front_default}
            />
            <Row>
              <Col className="d-flex d-flex-column justify-content-center align-items-center">
                <Card.Img
                  style={{ width: "20rem" }}
                  src={sprites.front_default}
                  alt="Front profile"
                />
              </Col>
              <Col className="d-flex d-flex-column justify-content-center align-items-center">
                <Card.Img
                  style={{ width: "20rem" }}
                  src={sprites.back_default}
                  alt="Back profile"
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col id="TYPES">
          {types.map(({ type }) => (
            <Card
              key={type.name}
              className={`${type.name}1 text-capitalize text-center rounded p-3 fs-3`}
            >
              <strong>{type.name}</strong>
            </Card>
          ))}
        </Col>

        <Col id="MOVES">
          <Col className="bg-white fs-3 text-center rounded">
              <button className="px-3 my-2" onClick={() => setShowMoves(!showMoves)}>
                {!showMoves ? "Show" : "Hide" } moves
              </button></Col>
          <ListGroup sm={6} className="pb-3">
            {showMoves && moveGroup}
          </ListGroup>
        </Col>
      </Col>
    </Row>
  );
};

export default PokemonDetails;
