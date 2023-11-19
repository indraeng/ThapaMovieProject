import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { API_URL } from './context'

const SingleMovie = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading, setIsError] = useState(true)
  const [movie, setMovie] = useState('')

  const getMovies = async (url) => {
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      console.log(data)
      if (data.Response === 'True') {
        setIsLoading(false)
        setMovie(data)
        // console.log('movie',movie);
      }
      // else {
      //   setIsError({
      //     show: true,
      //     msg: data.Error
      //   })
      // }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    var timerout = setTimeout(() => { getMovies(`${API_URL}&i=${id}`) }, 800);
    return () => clearTimeout(timerout)
  }, [id])

  if (isLoading) {
    return (
      <div className='loading'>Loading...</div>
    )
  }

  return (
    <div className='single_card'>
      <img src={movie.Poster} alt='single-poster' className='single-movie-poster' />
      <div className='movie-info'>
        <p className='title' >{movie.Title}</p>
        <p>{movie.Released}</p>
        <p className='actors'>{movie.Actors}</p>
        <p>{movie.Genre}</p>
        <p>{movie.imdbRating} / 10</p>
        <p>{movie.Country}</p>
        <NavLink to={'/'} className='back-btn'>Go back</NavLink>
      </div>
    </div>
  )
}

export default SingleMovie
