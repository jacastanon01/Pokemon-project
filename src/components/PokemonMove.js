import { useFetcher } from "../hooks/useFetcher"
import ListGroupItem from "react-bootstrap/ListGroupItem"
import { Row, Col } from "react-bootstrap"


const PokemonMove = ({ move }) => {
    const { data: moveData, isLoading} = useFetcher('move', move.name)
    const {name, pp, type, power, accuracy, effect_entries} = !isLoading && moveData

    const flexBasis = { 'flex': 1}

        return moveData && (
            <ListGroupItem as="li" className="fw-bold">
                <Row className={`d-flex`}>
                    <Col style={flexBasis} className="m-auto">{name.toUpperCase()}</Col>               
                    {   
                        accuracy && power ? (
                            <>
                                <Col style={flexBasis} className="m-auto">ACCURACY: {accuracy}</Col>
                                <Col style={flexBasis} className="m-auto">POWER: {power}</Col> 
                            </> ) : 
                            <>  
                                <Col style={flexBasis} className="m-auto">EFFECT: </Col>
                                <Col style={flexBasis} className="m-auto">{effect_entries[0].short_effect}</Col>
                            </>
                    }           
                    <Col style={flexBasis} className={`${type.name} rounded-pill d-flex justify-content-center align-items-center`}>
                        {pp}PP
                    </Col>
                </Row>
            </ListGroupItem>
        )
}

export default PokemonMove