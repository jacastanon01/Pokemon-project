import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Card from "react-bootstrap/Card";

const PokemonDetails = ({ pokemonDetails, listMoves, id }) => {
  return (
    <Row className="">
      <Col className="">
        <Card
          className=" d-flex justify-content-center align-items-center"
          style={{ border: "none" }}
        >
          <Card.Img
            style={{ width: "20rem" }}
            src={pokemonDetails.sprites.front_default}
          />
          <Card.Body
            className={`${pokemonDetails.types[0].type.name} text-white rounded text-center my-3`}
          >
            <Card.Title style={{ minWidth: "30rem" }}>
              <h1>
                <strong>
                  #{id}{" "}
                  {pokemonDetails.name[0].toUpperCase() +
                    pokemonDetails.name.substring(1)}
                </strong>
              </h1>
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
      <Col sx={12} sm={12} md={12} lg={12} xl={12} className="h-100">
        <Card>
          <Card.Text>
            <Row>
              {pokemonDetails.types.map(({ type }) => (
                <Col key={type.name}>
                  <div
                    className={`${type.name} text-center text-white rounded p-3 my-3`}
                  >
                    <h3>
                      <strong>
                        {type.name[0].toUpperCase() + type.name.substring(1)}
                      </strong>
                    </h3>
                  </div>
                </Col>
              ))}
            </Row>
            <Row>
              <Col className="d-flex d-flex-column justify-content-center align-items-center">
                <Card.Img
                  style={{ width: "15rem" }}
                  src={pokemonDetails.sprites.front_default}
                  alt="Front profile"
                />
              </Col>
              <Col className="d-flex d-flex-column justify-content-center align-items-center">
                <Card.Img
                  style={{ width: "15rem" }}
                  src={pokemonDetails.sprites.back_default}
                  alt="Back profile"
                />
              </Col>
            </Row>
          </Card.Text>
        </Card>
        <ListGroup className="pb-3  list-group-flush">{listMoves}</ListGroup>
      </Col>
    </Row>
  );
};

export default PokemonDetails;
