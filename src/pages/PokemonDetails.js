import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

const PokemonDetails = ({ pokemonDetails, listMoves, id }) => {
  const { sprites, types } = pokemonDetails
  return (
    <Row>
      <Col>
        <Col>
          {types.map(({ type }) => (
            <Card
              key={type.name}
              className={`${type.name} text-capitalize text-center text-white rounded p-3 fs-3`}
            >
              <strong>{type.name}</strong>
            </Card>
          ))}
        </Col>
        <Col className="">
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
              className={`${types[0].type.name} text-white rounded text-center my-5`}
            >
              <Card.Title style={{ minWidth: "30rem" }} className="fs-1">
                <strong className="text-capitalize">
                  #{id} {pokemonDetails.name}
                  {/* {pokemonDetails.name[0].toUpperCase() +
                      pokemonDetails.name.substring(1)} */}
                </strong>
              </Card.Title>
              <Card.Text>
                <h4>Height: {Math.round(pokemonDetails.height * 3.93)}cm</h4>
              </Card.Text>
              <Card.Text>
                <h4>Weight: {Math.round(pokemonDetails.weight * 0.22)}lbs</h4>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="h-300">
          <Card>
            <ListGroup sm={6} className="pb-3  list-group-flush">
              {listMoves}
            </ListGroup>
          </Card>
        </Col>
      </Col>
    </Row>
  );
};

export default PokemonDetails;
