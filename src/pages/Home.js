import axios from "../api/pokemonAPI";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PokemonCard from "../components/PokemonCard";
import Buttons from "../components/Buttons";
import LoadingSpinner from "../components/LoadingSpinner";
import { useFetcher } from "../hooks/useFetcher";

function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  let ignore = false;

  const { data, isLoading, error} = useFetcher('pokemon')

  console.log(data)

  // const { data, isLoading, updateUrl } = useAxiosFetch({
  //   ...requestObj,
  //   dataUrl: '/'
  // });

  const getPokemonData = (poke) => {
    try {
      poke.map(async ({ url }) => {
        const res = await axios.get(url);
        setPokemonData((prevState) => {
          prevState = [...prevState, res.data];
          prevState.sort((a, b) => (a.id > b.id ? 1 : -1));
          return prevState;
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClickNext = () => {
    setPokemonData([]);
    console.log(data.next)
    //axios.defaults.baseURL = data.next.toString();
    //updateUrl(data.next);
  };
  const handleClickPrev = () => {
    setPokemonData([]);
    //axios.defaults.baseURL = data.previous.toString();
    //updateUrl(data.previous);
  };

  useEffect(() => {

    if (!ignore) {
      data && getPokemonData(data.results);
    }

    return () => {
      ignore = true;
    };
  }, [data]);

  return (
    <>
      <Row>
        {!isLoading ? (
          pokemonData.map(({ name, id, sprites, types }) => (
            <Col key={id} sm={12} md={4} lg={4}>
              <PokemonCard
                name={name}
                id={id}
                sprites={sprites}
                type={types[0].type}
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
