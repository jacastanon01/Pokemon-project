import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import PokemonDetails from "../components/PokemonDetails";
import { useFetcher } from "../hooks/useFetcher"
import Fade from "react-bootstrap/Fade"
import {useSwr } from "swr";

const NextPokemon = ({ nextId }) => {
  const {data: next, isLoading } = useFetcher('pokemon', nextId)

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
  const [pokemonDetails, setPokemonDetails] = useState({});
  const { id } = useParams();

  const { data, error, isLoading } = useFetcher('pokemon', id)

  const getPokemonData = async (result) => {
    if (!error && Object.keys(data).length > 0) {
        setPokemonDetails(result)
    }
  }

  useEffect(() => {
    let mounted = false
    if (!mounted) {
      getPokemonData(data);
    }
    return () => mounted = true
  }, [data]);

  return (
    <>
      <div style={{display: "none"}}><NextPokemon nextId={+id + 1}/></div>
      {
        !isLoading && Object.keys(pokemonDetails).length > 0 
        ? <PokemonDetails pokemonDetails={pokemonDetails} id={id} />
        : <LoadingSpinner />    
      }
    </>
  );
};

export default PokemonDetailsPage
