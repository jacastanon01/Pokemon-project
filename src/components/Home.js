import axios from '../api/pokemonAPI'
import { useEffect, useState} from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PokemonCard from './PokemonCard';
import Buttons from './Buttons';
import LoadingSpinner from './LoadingSpinner';

function Home() {
    const [pokemonData, setPokemonData] = useState([])
    //const [isLoading, setIsLoading] = useState(true)
    //const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
    //const [nextUrl, setNextUrl] = useState(null)
    //const [prevUrl, setPrevUrl] = useState(null)

    const { data, isLoading, updateUrl } = useAxiosFetch({
        axiosInstance: axios,
        method: 'GET',
        dataUrl: '/',
        requestConfig: {
            headers: {
                'Content-Language': 'en-US'
            }
        }

    })

    // const getPokemon = async () => {
    //     setIsLoading(true)
    //     const { data } = await axios.get(url)
    //     setNextUrl(data.next)
    //     setPrevUrl(data.previous)
    //     getPokemonData(data.results)
    //     setIsLoading(false)
    // }

    const getPokemonData = (poke) => {
        try {
            poke.map(async ({ url }) => {
                const res = await axios.get(url)
                setPokemonData(prevState => {
                    prevState = [...prevState, res.data]
                    prevState.sort((a,b) => a.id>b.id ? 1 : -1)
                    return prevState
                })
            })
        } catch (err) {
            console.log(err.message)
        }
    }


    const handleClickNext = () => {
        setPokemonData([])
        //setUrl(nextUrl)
        axios.defaults.baseURL = data.next.toString()
        updateUrl(data.next)
    }
    const handleClickPrev = () => {
        setPokemonData([])
        //setUrl(prevUrl)
        axios.defaults.baseURL = data.previous.toString()
        updateUrl(data.previous)
    }

    let ignore = false
    useEffect(() => {
        if (!ignore) {
            getPokemonData(data.results)
        }

        return () => {
            ignore = true
        }
    }, [data])




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
                            />
                        </Col>
                    )) : <LoadingSpinner />
                }
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