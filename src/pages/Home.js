import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PokemonCard from "../components/PokemonCard";
import Buttons from "../components/Buttons";
import LoadingSpinner from "../components/LoadingSpinner";
import { useFetcher } from "../hooks/useFetcher";
import ErrorBoundary from "./ErrorBoundary";
import { useOutletContext } from "react-router-dom";

function Home() {
  const { offset, setOffset } = useOutletContext()
  const { data, isLoading, error } = useFetcher(`pokemon?offset=${offset}`);

  const handleClickNext = () => {
    setOffset((prev) => prev + 20);
  };
  const handleClickPrev = () => {
    setOffset((prev) => (prev > 0 ? prev - 20 : 0));
  };

  if (error)
    return (
      <ErrorBoundary />
    );

  return (
    <>
      <Row>
        {!isLoading ? (
          data?.results.map(({ name, id, sprites, types }) => (
            <Col key={id} xs={12} sm={6} md={6} lg={4}>
              <PokemonCard
                pokemon={name}
              />
            </Col>
          ))
        ) : (
          <LoadingSpinner />
        )}
      </Row>
      <Row className="d-flex justify-content-center">
        <Buttons onNext={handleClickNext} onPrev={handleClickPrev} />
      </Row>
    </>
  );
}

export default Home;
