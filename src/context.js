const { createContext, useContext, useEffect, useState } = require("react");

export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = createContext();

//custom provider function
const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [movie, setMovie] = useState([])
    const [isError, setIsError] = useState({ show: false, msg: '' })
    const [query, setQuery] = useState('avengers')

    const getMovies = async (url) => {
        setIsLoading(true)
        try {
            const resp = await fetch(url);
            const data = await resp.json();
            console.log(data)
            if (data.Response === 'True') {
                setIsLoading(false)
                setMovie(data.Search)
                // console.log('movie',movie);
                setIsError({
                    show: false,
                    msg: ""
                })
            }
            else {
                setIsError({
                    show: true,
                    msg: data.Error
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        var timerout = setTimeout(()=>{getMovies(`${API_URL}&s=${query}`)},800);
        return ()=>clearTimeout(timerout)
    }, [query])

    return <AppContext.Provider value={{ isLoading, movie, isError, query, setQuery }}>{children}</AppContext.Provider>
}

//global custom hooks
const useGlobalContext = () => {
    return useContext(AppContext)
}

export { useGlobalContext, AppProvider }