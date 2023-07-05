import { useContext } from "react";
import {
  CaughtPokemonContext,
  CaughtPokemonContextDispatch,
} from "../context/CaughtPokemonContext";
import PokemonCard from "../components/PokemonCard";
import { Col, Row, Card } from "react-bootstrap";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { NavLink, useOutletContext } from "react-router-dom";
import profOakImg from "../assets/Prof-oak.jpg";

const CaughtPokemonPage = () => {
  const capturedPokemon = useContext(CaughtPokemonContext);
  const dispatch = useContext(CaughtPokemonContextDispatch);
  const { random } = useOutletContext()

  return (
    <>
      {capturedPokemon && capturedPokemon.length > 0 ? (
        <Row xl={3} md={2} xs={1}>
          {capturedPokemon.map((pokemon) => (
            <Col>
              <PokemonCard pokemon={pokemon.name} key={pokemon.id} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row className="w-100 d-flex flex-column align-items-center justify-content-center">
          <Col sm={12} md={8}>
            <Card className="">
              <Card.Body style={{ background: "#f6f6f6" }}>
                <Card.Title className="px-5 mb-5 text-center fs-3 mx-auto">
                  Hmm you haven't caught any Pokemon yet. Click the
                  box for a random pokemon to catch!
                </Card.Title>
                <Row>
                  <Col>
                    <NavLink to={`/pokemon/${random}`}>
                        <GiPerspectiveDiceSixFacesRandom
                            style={{ width: "80%", height: "100%", textDecoration: "none" }}
                        />
                    </NavLink>
                  </Col>
                  <Col>
                    <Card.Img src={profOakImg} alt="Professor Oak" />{" "}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CaughtPokemonPage;

{
  /* <Card.Img src="https://external-preview.redd.it/e5zoQw-hgw-LCjdhC_4G8IAcHxex5pzda_BD_FPTcBY.png?auto=webp&v=enabled&s=8e3a6d55de26ae39620b325592f1d2a3df6709b1" style={{width: "70%", height: "auto"}} /> */
}
