import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { useParams } from 'react-router-dom'

const PokemonDetailsPage = () => {

    const [pokemonDetails, setPokemonDetails] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { id } = useParams()
    const getPokemon = async () => {
        setIsLoading(true)
        const { data } = await getPokemonData()
        setPokemonDetails(data)
        setIsLoading(false)
    }

    const getPokemonData = async () => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        console.log(response)
        return response
    }

    const listFiveMoves = () => {
        if (!isLoading) {
            const fiveMoves = pokemonDetails.moves.slice(0, 5)
            console.log(fiveMoves)
            return fiveMoves.map(({ move }) => (
                <ListGroupItem key={move.name}>{move.name}</ListGroupItem>
            ))
        }
    }

    const listMoves = listFiveMoves(pokemonDetails.moves)

    useEffect(() => {
        getPokemon()
        //console.log(pokemonDetails)
    }, [])

    return (
        <>
            {
                isLoading ? <div>Loading...</div>
                    : (
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Card className='m-2 p-2 d-flex justify-content-center align-items-center' style={{ border: 'none' }}>
                                    <Card.Img style={{ width: '10rem' }} src={pokemonDetails.sprites.front_default} />
                                    <Card.Body className={`${pokemonDetails.types[0].type.name} text-white rounded`}>

                                        <Card.Title>
                                            <strong>#{id} {pokemonDetails.name[0].toUpperCase() + pokemonDetails.name.substring(1)}</strong>
                                        </Card.Title>

                                    </Card.Body>
                                    <ListGroup>
                                        {listMoves}
                                    </ListGroup>
                                </Card>

                            </Col>
                            <Col sx={12} sm={12} md={12} lg={12} xl={12} className='d-flex justify-content-center align-items-center h-100'>
                                <Card className='my-3' style={{ border: 'none' }}>
                                    <Card.Text>
                                        <Row>
                                            {pokemonDetails.types.map(({ type }) => (
                                                <Col key={type.name}>
                                                    <div className={`${type.name} text-center text-white rounded p-3 my-3`}>
                                                        {type.name}
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Card.Img style={{ width: '15rem' }} src={pokemonDetails.sprites.front_default} alt="Front profile" />
                                                <Card.Text className='my-3 text-center'>Front Profile</Card.Text>
                                            </Col>
                                            <Col>
                                                <Card.Img style={{ width: '15rem' }} src={pokemonDetails.sprites.back_default} alt="Back profile" />
                                                <Card.Text className='text-center my-3'>Back Profile</Card.Text>
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                </Card>
                            </Col>
                        </Row>
                    )
            }
        </>
    )
}

export default PokemonDetailsPage