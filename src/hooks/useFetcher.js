import useSwr from "swr"

const BASE_URL = 'https://pokeapi.co/api/v2/'

export const useFetcher = (path, name) => {
    if (!path){
        throw new Error('Path is required')
    }

    const url = name ? `${BASE_URL}${path}/${name}` : BASE_URL + path
    const { data, error, isLoading } = useSwr(url.toString())
    // console.log(JSON.stringify(data) + "DATA")
    // console.log(url)

    return { data, error, isLoading }
}