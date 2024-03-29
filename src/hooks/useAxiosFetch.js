import { useState, useEffect } from 'react'
import axios from '../api/pokemonAPI'

export const requestObj = {
    axiosInstance: axios,
    method: "GET",
    requestConfig: {
      headers: {
        "Content-Language": "en-US",
      },
    },
  }

export const useAxiosFetch = (configObj) => {
    const {
        axiosInstance,
        method,
        dataUrl,
        requestConfig = {},
    } = configObj
    //console.log(dataUrl)
    const [url, updateUrl] = useState(dataUrl)
    const [data, setData] = useState({})
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        //const source = axios.CancelToken.source()
        const controller = new AbortController()

        const fetchData = async (url) => {
            setIsLoading(true)
            try {
                const response = await axiosInstance[method.toLowerCase()](url, {
                    ...requestConfig,
                    signal: controller.signal
                })
                if (isMounted) {
                    setData(response.data)
                    setFetchError(null)
                }
            } catch(err) {
                if (isMounted){
                    setFetchError(err.message)
                    setData({})
                }
            } finally {
                isMounted && setIsLoading(false)
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
