import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

const PokemonDetailsPage = () => {

    const [pokemonDetails, setPokemonDetails] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { id } = useParams()
    const getPokemon = async () => {
        setIsLoading(true)
        const { data } = await getPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemonDetails(data)
        setIsLoading(false)
    }

    const getPokemonData = async (url) => {
        const response = await axios.get(url)
        console.log(response)
        return response
    }

    const listFiveMoves = () => {
        if (!isLoading) {
            const fiveMoves = pokemonDetails.moves.slice(0, 5)
            //getPokemonData()
            
            return fiveMoves.map(({ move }) => (
                <ListGroupItem as="li" key={move.name} className="p-inherit d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{move.name}</div>
                        
                        
                    </div>
                    {/* TODO: get damage of move from move.url `https://pokeapi.co/api/v2/move/${id}`
                        <span class="badge bg-primary rounded-pill">14</span>
                    */}
                    
                </ListGroupItem>
            ))
        }
    }

    const listMoves = listFiveMoves(pokemonDetails.moves)

    useEffect(() => {
        getPokemon()
    }, [])

    return (
        <>

            {
                isLoading ? <LoadingSpinner />
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
            }
        </>
    )
}

export default PokemonDetailsPage