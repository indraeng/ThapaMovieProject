import React from 'react'
import { useGlobalContext } from './context'
import { NavLink } from 'react-router-dom';

const Movies = () => {
  const { movie, isLoading } = useGlobalContext();

  if (isLoading) {
    return (
      <div className='loading'>Loading...</div>
    )
  }

  return (
    <section className='movie-page'>
      <div className='main-container'>
        {
          movie.map((currMovie) => {
            const { imdbID, Title, Poster } = currMovie;
            const movieName = Title.substring(0, 15);

            return <NavLink to={`movie/${imdbID}`} key={imdbID} >
              <div className="card">
                {/* <div className="card-info"> */}
                <h3 className='title'>{movieName.length >= 15 ? `${movieName}...` : movieName}</h3>
                <img src={Poster} alt={imdbID} className='poster_img' />
                {/* </div> */}
              </div>
            </NavLink>
          })
        }
      </div>
    </section>
  )
}

export default Movies
