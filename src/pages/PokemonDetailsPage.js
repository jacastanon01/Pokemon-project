import React, { useEffect, useState } from "react";
import axios from "axios";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import PokemonDetails from "../components/PokemonDetails";
import { useAxiosFetch, requestObj } from "../hooks/useAxiosFetch";

const PokemonDetailsPage = () => {
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [moves,setMoves] = useState([])
  const [movesData, setMovesData] = useState([])
  const { id } = useParams();
  let mounted =  false;

  const { data, isLoading, fetchError } = useAxiosFetch({
    ...requestObj,
    dataUrl: `/${id}`
})

  const getPokemonData = async (result) => {
    if (!fetchError && Object.keys(data).length > 0) {
        console.log(result)
        setPokemonDetails(await result)
        setMovesData(result?.moves.slice(0,5))
    }
}

  const fetchMovesData = () => {
      console.log(movesData, "----")
      movesData.forEach(async ({ move }) => {
          try {
              if (!mounted){
                  const res = await axios.get(move?.url.toString())
                  const {name, pp, type} = await res.data
                  setMoves(prev => {
                      return [...prev, {name, pp, type}]
                  })
          }

          } catch(err){
              console.log(err.message)
          }
      })
  }

  const fiveMoves = moves.map(({name, pp, type}) => {
      return (
          <ListGroupItem as="li" key={name} className="p-inherit d-flex justify-content-between align-items-start">
              <section className="ms-2 me-auto">
                  <div className="fw-bold">{name.toUpperCase()}</div>               
              </section>
              {/* TODO: get damage of move from move.url `https://pokeapi.co/api/v2/move/${id}`
                  <span class="badge bg-primary rounded-pill">14PP</span>
              */}
              <span className={`${type.name} badge rounded-pill`}><b>{pp}PP</b></span>
              
          </ListGroupItem>
      )
  })

  useEffect(() => {
    if (!mounted) {
      getPokemonData(data);

    }

    return () => mounted = true
  }, [data]);

  useEffect(() => {
    if (!mounted){
      fetchMovesData()

    }

    return () => mounted = true
  }, [movesData])

  return (
    <>
      {
        !isLoading && Object.keys(pokemonDetails).length > 0 ? (<PokemonDetails pokemonDetails={pokemonDetails} id={id} listMoves={fiveMoves} />) 
        : <LoadingSpinner />    
      }
    </>
  );
};

export default PokemonDetailsPage
