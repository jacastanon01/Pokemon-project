import axios from 'axios'
import { useEffect, useState, useRef } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PokemonCard from './PokemonCard';
import Buttons from './Buttons';

function Home() {
    const [pokemonData, setPokemonData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // To limit to first gen use param ?limit=151 maybe?
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
    const [nextUrl, setNextUrl] = useState(null)
    const [prevUrl, setPrevUrl] = useState(null)

    const getPokemon = async () => {
        setIsLoading(true)
        const { data } = await axios.get(url)
        setNextUrl(data.next)
        setPrevUrl(data.previous)
        getPokemonData(data.results)
        setIsLoading(false)
    }

    const getPokemonData = (poke) => {
        try {
            poke.map(async ({ url }) => {
                const res = await axios.get(url) //{ signal: controller.signal }
                setPokemonData(prevState => {
                    //console.log('pokemonData:', pokemonData)
                    prevState = [...prevState, res.data]
                    prevState.sort((a,b) => a.id>b.id ? 1 : -1)
                    return prevState
                })
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    const capitalize = (word) => word[0].toUpperCase() + word.substring(1)

    const handleClickNext = () => {
        setPokemonData([])
        setUrl(nextUrl)
    }
    const handleClickPrev = () => {
        setPokemonData([])
        setUrl(prevUrl)
    }
    let ignore = false
    useEffect(() => {
        if (!ignore) {
            getPokemon()
        }

        return () => {
            ignore = true
        }
    }, [url])




    return (
        <>
            <Row>
                {!isLoading ? 
                    pokemonData.map(({ name, id, sprites, types }) => (
                        <Col key={id} sm={12} md={4} lg={4}>
                            <PokemonCard 
                                name={name} 
                                id={id} 
                                sprites={sprites} 
                                type={types[0].type} 
                                capitalize={capitalize}
                            />
                        </Col>
                    )) : <div>Loading...</div>}
            </Row>
            <Row className='d-flex justify-content-center'>
                <Buttons 
                    onNext={handleClickNext}
                    onPrev={handleClickPrev}
                />
            </Row>
        </>
    );
}

export default Home;