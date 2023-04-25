import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import PokemonDetails from "./PokemonDetails";
import useAxiosFetch from "../hooks/useAxiosFetch";

const PokemonDetailsPage = () => {
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [moves,setMoves] = useState([])
  const [movesData, setMovesData] = useState([])
  //const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  let mounted =  false;

  const { data, isLoading, error, updateUrl } = useAxiosFetch({
    axiosInstance: axios,
    method: 'GET',
    url: `https://pokeapi.co/api/v2/pokemon/${id}`,
    requestConfig: {
        headers: {
            'Content-Language': 'en-US',
            //'Accept': 'text/html'
        }
    }
})

//   const getPokemon = async () => {
//     setIsLoading(true);
//     const { data } = await getPokemonData(
//       `https://pokeapi.co/api/v2/pokemon/${id}`
//     );
//     setPokemonDetails(data);
//     setIsLoading(false);
//   };

  const getPokemonData = async (result) => {

    if (!mounted) {
        console.log(result)
        setPokemonDetails(result)
        setMovesData(result.moves.slice(0,5))
    }
}

const fetchMovesData = () => {
    movesData.forEach(async ({ move }) => {
        try {
            if (!mounted){
                const res = await axios.get(move.url.toString())
                const {name, pp, type} = res.data
                setMoves(prev => {
                    return [{...prev}, name, pp, type]
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

//   const listFiveMoves = () => {
//     if (!isLoading) {
//       const fiveMoves = pokemonDetails.moves.slice(0, 5);
//       //getPokemonData()

//       return fiveMoves.map(({ move }) => (
//         <ListGroupItem
//           as="li"
//           key={move.name}
//           className="p-inherit d-flex justify-content-between align-items-start"
//         >
//           <div className="ms-2 me-auto">
//             <div className="fw-bold">{move.name}</div>
//           </div>
//           {/* TODO: get damage of move from move.url `https://pokeapi.co/api/v2/move/${id}`
//                         <span class="badge bg-primary rounded-pill">14</span>
//                     */}
//         </ListGroupItem>
//       ));
//     }
//   };

//   const listMoves = listFiveMoves(pokemonDetails.moves);

  useEffect(() => {
    getPokemonData(data);

    return () => mounted = true
  }, [data]);

  useEffect(() => {
    fetchMovesData()

    return () => mounted = true
  }, [moves])

  return (
    <>
      {/* {isLoading ? (
        <LoadingSpinner />
      ) : (
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
                  Height: {Math.round(pokemonDetails.height * 3.93)}cm
                </Card.Text>
                <Card.Text>
                  Weight: {Math.round(pokemonDetails.weight * 0.22)}lbs
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sx={12} sm={12} md={12} lg={12} xl={12} className="h-100">
            <Card className="">
              <Card.Text>
                <Row className="">
                  {pokemonDetails.types.map(({ type }) => (
                    <Col key={type.name}>
                      <div
                        className={`${type.name} text-center text-white rounded p-3 my-3`}
                      >
                        <b>
                          {type.name[0].toUpperCase() + type.name.substring(1)}
                        </b>
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
          </Col>
          <ListGroup as="ol" numbered className="pb-3  list-group-flush">
            {listMoves}
          </ListGroup>
        </Row>
      )} */}
      {
        !isLoading ? (Object.keys(pokemonDetails).length > 0 && <PokemonDetails pokemonDetails={pokemonDetails} id={id} listMoves={fiveMoves} />) 
        : <LoadingSpinner />    
    }
    </>
  );
};

const PokemonDetails1 = () => {

    const [pokemonDetails, setPokemonDetails] = useState({})
    const [moves, setMoves] = useState([])
    const [moveObj, setMoveObj] = useState([])

    const { id } = useParams()

    const { data, isLoading, error, updateUrl } = useAxiosFetch({
        axiosInstance: axios,
        method: 'GET',
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
        requestConfig: {
            headers: {
                'Content-Language': 'en-US',
                //'Accept': 'text/html'
            }
        }
    })
    //setPokemonDetails(data)


    const getDetails = async (result) => {
        //setIsLoading(true)
        //axios.defaults.baseURL = await `https://pokeapi.co/api/v2/pokemon/${id}`
        if (!mounted){

            setPokemonDetails(result)
            setMoves(result.moves.slice(0,5))
            
        }
        //setIsLoading(false)
    } 

    const fetchMoveData = () => moves.forEach(async ({ move }) => {
        try {
            if (!mounted){
                console.log("HELLO")
                //axios.defaults.baseURL = move.url.toString()
                //await updateUrl(move.url.toString())
                const { data } = await axios.get(move.url.toString())
                //console.log(data)
                const {name, pp, type} = data
                //axios.all(move.url.toString()).then(axios.spread((name, pp, type) => {console.log(name, pp, type)}))

                    setMoveObj(prev => {
                        return [...prev, { name, pp, type}]
                    })
                
                //setMovePp({name: data.name, pp: data.pp})
                //setMovePp({name: data.name, pp: data.pp})
            }
        } catch(err){console.log(err.message)}
    })

    const listMoves = moveObj.map(({ name, pp, type }) => {
        
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
    )})
    
    let mounted = false
    useEffect(() => {
        //console.log(error.message)
        data && console.log(JSON.stringify(data + '^^^^^' ))
        getDetails(data)
        //fetchMoveData()
        return () => {
            mounted = true
            //setIsLoading(false)
            console.log('return function yall!')
        }
    }, [data])

    useEffect(() => {


        console.log('moves useffect', moveObj)


        fetchMoveData()
        
        return () => {
            mounted = true
        }

    }, [moves])

    return (
        <>
            
            {/* {
                isLoading ? <div>Loading...</div>
                    : (
                        <Row className=''>
                            <Col className=''>
                                
                                <Card className=' d-flex justify-content-center align-items-center' style={{ border: 'none' }}>
                                    <Card.Img style={{ width: '20rem' }} src={pokemonDetails.sprites.front_default} />
                                    <Card.Body className={`${pokemonDetails.types[0].type.name} text-white rounded text-center my-3`}>
   
                                        <Card.Title style={{minWidth: "30rem"}}>
                                            <h1><strong>#{id} {pokemonDetails.name[0].toUpperCase() + pokemonDetails.name.substring(1)}</strong></h1>
                                        </Card.Title>
                                        <Card.Text>
                                            Height: {Math.round(pokemonDetails.height * 3.93)}cm
                                        </Card.Text>
                                        <Card.Text>
                                            Weight: {Math.round(pokemonDetails.weight * 0.22)}lbs
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                    

                            </Col>
                            <Col sx={12} sm={12} md={12} lg={12} xl={12} className='h-100'>
                                <Card className=''>
                                    <Card.Text>
                                        <Row className=''>
                                            {pokemonDetails.types.map(({ type }) => (
                                                <Col key={type.name}>
                                                    <div className={`${type.name} text-center text-white rounded p-3 my-3`}>
                                                        <b>{type.name[0].toUpperCase() + type.name.substring(1)}</b>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                        <Row>
                                            <Col className='d-flex d-flex-column justify-content-center align-items-center'>
                                                <Card.Img style={{ width: '15rem' }} src={pokemonDetails.sprites.front_default} alt="Front profile" />
                                                
                                            </Col>
                                            <Col className='d-flex d-flex-column justify-content-center align-items-center'>
                                                <Card.Img style={{ width: '15rem' }} src={pokemonDetails.sprites.back_default} alt="Back profile" />
                                                
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                    
                                </Card>
                                
                            </Col>
                            <ListGroup as="ol" numbered className='pb-3  list-group-flush'>
                                {listMoves}
                            </ListGroup> 
                        </Row>
                    )
            } */}
                     
                        
                {Object.keys(pokemonDetails).length > 0 && <PokemonDetails pokemonDetails={pokemonDetails} id={id} listMoves={listMoves} />}
                    {/*{!isLoading && <PokemonDetails pokemonDetails={pokemonDetails} id={id} listMoves={listMoves} />}*/}
        </>
    )
}


export default PokemonDetails1
