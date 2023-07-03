import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import PokemonDetails from "../components/PokemonDetails";
import { useFetcher } from "../hooks/useFetcher"
import ErrorBoundary from "./ErrorBoundary";

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

  // const getPokemonData = async (result) => {
  //   if (!error && Object.keys(data).length > 0) {
  //       setPokemonDetails(result)
  //   }
  // }

  // useEffect(() => {
  //   let mounted = false
  //   if (!mounted) {
  //     getPokemonData(data);
  //   }
  //   return () => mounted = true
  // }, [data]);

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
