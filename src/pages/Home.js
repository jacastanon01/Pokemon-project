import api from "../api/pokemonAPI";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PokemonCard from "../components/PokemonCard";
import Buttons from "../components/Buttons";
import LoadingSpinner from "../components/LoadingSpinner";
import { useFetcher } from "../hooks/useFetcher";
import ErrorBoundary from "./ErrorBoundary";
import PokemonDetails from "../components/PokemonDetails";

function Home({ offset, setOffset }) {
  const [pokemonData, setPokemonData] = useState([]);

  const { data, isLoading, error } = useFetcher(`pokemon?offset=${offset}`);

  // const { data, isLoading, updateUrl } = useAxiosFetch({
  //   ...requestObj,
  //   dataUrl: '/'
  // });

  // const getPokemonData = () => {
  //   try {
  //     data?.results.map(async ({ url }) => {
  //       const res = await api.get(url);
  //       setPokemonData((prevState) => {
  //         //if (true) console.log(prevState)
  //         prevState = [...prevState, res.data];
  //         //let filteredState = prevState.filter(p => res.data.name !== p.name)
  //         prevState.sort((a, b) => (a.id > b.id ? 1 : -1));
  //         return prevState;
        
  //       });
  //     });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const handleClickNext = () => {
    setPokemonData([]);
    setOffset((prev) => prev + 20);
    //axios.defaults.baseURL = data.next.toString();
    //updateUrl(data.next);
  };
  const handleClickPrev = () => {
    setPokemonData([]);
    setOffset((prev) => (prev > 0 ? prev - 20 : 0));
    //axios.defaults.baseURL = data.previous.toString();
    //updateUrl(data.previous);
  };

  // let ignore = true;
  // useEffect(() => {
  //   if (ignore) {
  //     getPokemonData();
  //     //data && preload(data.next)
  //   }

  //   return () => {
  //     ignore = false;
  //   };
  // }, [data, offset]);

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
