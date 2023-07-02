import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { useFetcher } from "../hooks/useFetcher";
import PokemonMove from "./PokemonMove";
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom";


const PokemonDetails = ({ pokemonDetails, listMoves, id }) => {
  //const moves = PokemonDetails.moves.slice(0,5)
  console.log(pokemonDetails)
  const { sprites, types, moves } = pokemonDetails
  //const { data, error, isLoading} = useFetcher('move', pokemonDetails.move.name)

  //let moveGroup = []
  // for (let i=0; i <5; i++){
  //   //moveGroup.push(<PokemonMove move={moves[i].move}/>)
    
  // }
  const fiveMoves = moves && moves?.slice(0,5)

  const moveGroup = moves && fiveMoves?.map(({ move }) => {
    return (move ? <PokemonMove key={move.name} move={move} /> : <div>No more moves to display</div>)
  })

  return (
    <Row className="container-fluid">
      <Col>
      <Col className="d-flex w-100 justify-content-between">
        <Link className="" to={`../pokemon/${+id - 1}`} relative='path'>
          Previous
        </Link>
        <Link className="" to={`../pokemon/${+id + 1}`} relative='path'>
          Next
        </Link>
        </Col>
        <Col>
          {types.map(({ type }) => (
            <Card
              key={type.name}
              className={`${type.name} text-capitalize text-center rounded p-3 fs-3`}
            >
              <strong>{type.name}</strong>
            </Card>
          ))}
        </Col>
        
        <Col id="IMAGES">
        <Card
          className=" d-flex justify-content-center align-items-center"
          style={{ border: "none" }}
        >
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
          <Card.Body
            className={`${types[0].type.name} rounded text-center my-5 w-100`}
          >
            <Card.Title style={{ minWidth: "20rem" }} className="fs-1 fw-bolder">
              <strong className="text-capitalize">
                #{id} {pokemonDetails.name}
              </strong>
            </Card.Title>
            <Card.Text className="fs-3 fw-bold">
              Height: {Math.round(pokemonDetails.height * 3.93)}cm
            </Card.Text>
            <Card.Text className="fs-3 fw-bold">
              Weight: {Math.round(pokemonDetails.weight * 0.22)}lbs
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        
        <Col id="MOVES">

            <ListGroup sm={6} className="pb-3">
              {moveGroup}
            </ListGroup>
        </Col>
      </Col>
    </Row>
  );
};

export default PokemonDetails;
