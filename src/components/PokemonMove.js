import axios from "axios"
import { useFetcher } from "../hooks/useFetcher"
import ListGroupItem from "react-bootstrap/ListGroupItem"


const PokemonMove = ({ move }) => {
    const { data: moveData, error, isLoading} = useFetcher('move', move.name)
    const {name, pp, type} = !isLoading && moveData

        return !isLoading ? (
            <ListGroupItem as="li" className="p-inherit d-flex justify-content-between align-items-start">
                <section className="ms-2 me-auto">
                    <div className="fw-bold">{name.toUpperCase()}</div>               
                </section>
                <span className={`${type.name} badge rounded-pill`}><b>{pp}PP</b></span>             
            </ListGroupItem>
        ) : <div></div>
}

export default PokemonMove