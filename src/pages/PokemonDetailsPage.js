import React, { useEffect, useState } from "react";
import axios from "axios";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import PokemonDetails from "./PokemonDetails";
import useAxiosFetch from "../hooks/useAxiosFetch";

const PokemonDetailsPage = () => {
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [moves,setMoves] = useState([])
  const [movesData, setMovesData] = useState([])
  const { id } = useParams();
  let mounted =  false;

  const { data, isLoading } = useAxiosFetch({
    axiosInstance: axios,
    method: 'GET',
    dataUrl: `https://pokeapi.co/api/v2/pokemon/${id}`,
    requestConfig: {
        headers: {
            'Content-Language': 'en-US',
            //'Accept': 'text/html'
        }
    }
})

  const getPokemonData = async (result) => {
    if (!mounted) {
        console.log(result)
        setPokemonDetails(result)
        setMovesData(result.moves.slice(0,5))
    }
}

  const fetchMovesData = () => {
      console.log(movesData, "----")
      movesData.forEach(async ({ move }) => {
          try {
              if (!mounted){
                  const res = await axios.get(move.url.toString())
                  const {name, pp, type} = res.data
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
    getPokemonData(data);

    return () => mounted = true
  }, [data]);

  useEffect(() => {
    fetchMovesData()

    return () => mounted = true
  }, [movesData])

  return (
    <>
      {
        !isLoading ? (Object.keys(pokemonDetails).length > 0 && <PokemonDetails pokemonDetails={pokemonDetails} id={id} listMoves={fiveMoves} />) 
        : <LoadingSpinner />    
      }
    </>
  );
};

export default PokemonDetailsPage
