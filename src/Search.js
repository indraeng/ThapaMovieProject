import React from 'react'
import { useGlobalContext } from './context'

const Search = () => {
  const { query, setQuery, isError } = useGlobalContext();
  return (
    <>
      <section className='search-cont'>
        <h2>Search your fevorite Movie</h2>
        <form action="#" onSubmit={(e) => e.preventDefault()} className='form'>
          <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className='inp' />
            <p>{isError.show && isError.msg}</p>
          </div>
        </form>
      </section>
    </>
  )
}

export default Search
