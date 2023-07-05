import { createContext, useContext, useReducer} from "react"

export const CaughtPokemonContext = createContext(null)
export const CaughtPokemonContextDispatch = createContext(null)

export const CaughtPokemonProvider = ({children}) => {
    const [capturedPokemon, dispatch] = useReducer(pokemonReducer, [])

    return (
        <CaughtPokemonContext.Provider value={capturedPokemon}>
            <CaughtPokemonContextDispatch.Provider value={dispatch}>
                {children}
            </CaughtPokemonContextDispatch.Provider>
        </CaughtPokemonContext.Provider>
    )
}

const pokemonReducer = (state, action) => {
    switch(action.type){
        case "CATCH":
            return [...state,
                action.pokemon
            ]
        case "DELETE":
            return state.filter(s => action.id !== s.id) 
        default:
            return state
    }
}