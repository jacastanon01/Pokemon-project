import { useContext } from 'react'
import { CaughtPokemonContext, CaughtPokemonContextDispatch } from '../context/CaughtPokemonContext'
import PokemonCard from '../components/PokemonCard'
import { Col, Row } from 'react-bootstrap'

const CaughtPokemonPage = () => {
    const capturedPokemon = useContext(CaughtPokemonContext)
    const dispatch = useContext(CaughtPokemonContextDispatch)

    return (
        <Row xl={3} md={2} xs={1}>
        {
           capturedPokemon && capturedPokemon.length > 0 ?(
               capturedPokemon.map((pokemon) => (
                    <Col>
                        <PokemonCard pokemon={pokemon.name} /> 
                    </Col>
                ))               
                ) : ("No pokemon here!")
        }
        </Row>
    )
}

export default CaughtPokemonPage