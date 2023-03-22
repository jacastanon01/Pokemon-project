import { useState, useEffect } from 'react'
import axios from 'axios'

const useAxiosFetch = (dataUrl) => {
    //console.log(dataUrl)
    const [ url, updateUrl ] = useState(dataUrl)
    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        //const source = axios.CancelToken.source()
        const controller = new AbortController()

        const fetchData = async (url) => {
            setIsLoading(true)
            try {
                const response = await axios.get(url, {
                    signal: controller.signal
                })
                if (isMounted) {
                    setData(response.data)
                    setFetchError(null)
                }
            } catch(err) {
                if (isMounted){
                    setFetchError(err.message)
                    setData([])
                }
            } finally {
                isMounted && setTimeout(() => {setIsLoading(false)}, 2000)
            }
        }

        fetchData(url)

        const cleanUp = () => {
            console.log('cleanup')
            isMounted = false
            controller.abort()
        }

        return cleanUp
    }, [url])

    return { data, fetchError, isLoading, updateUrl }
}

export default useAxiosFetch