import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import PokemonDetails from "../components/PokemonDetails";
import { useFetcher } from "../hooks/useFetcher"
import ErrorBoundary from "./ErrorBoundary";
import Container  from "react-bootstrap/Container";

const NextPokemon = ({ nextId }) => {
  const {data: next, isLoading, error } = useFetcher('pokemon', nextId)

  if (error) return (<ErrorBoundary />)

  return (
    !isLoading 
    && Object.keys(next).length > 0 
    && <PokemonDetails 
      key={nextId} 
      pokemonDetails={next} 
      id={nextId} 
    />
  )
}

const PokemonDetailsPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useFetcher('pokemon', id)

  if (error) return (<ErrorBoundary />)

  return (
    <>
      <div style={{display: "none"}}><NextPokemon nextId={+id + 1}/></div>
      {
        !isLoading && Object.keys(data).length > 0 
        ? <PokemonDetails pokemonDetails={data} id={id} />
        : <LoadingSpinner />    
      }
    </>
  );
};

export default PokemonDetailsPage
