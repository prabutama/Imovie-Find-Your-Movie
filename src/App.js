import './App.css'
import React, { useEffect, useState } from 'react'

import { GetMovies, SearchMovies } from './api'

const App = () => {

  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    GetMovies().then((result) => {
      setPopularMovies(result);
    })
  }, []);

  const search = async (q) => {
      if(q.length > 3) {
          const resultsMovie = await SearchMovies(q);
          console.log(resultsMovie.results)
          setPopularMovies(resultsMovie.results)
      }
  }

  console.log({popularMovies: popularMovies});

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div key={ i } className='flex justify-center pt-10 w-[10rem] md:w-[20rem]'>
          <div class="w-full max-w-sm bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="p-2 md:p-8 rounded-t-lg" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt="product image" />
            </a>
          <div class="p-2 md:px-5 md:pb-5">
              <a href="#">
                  <h5 class="text-sm md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{ movie.title }</h5>
              </a>
              <div class="flex items-center md:mt-2.5 md:mb-5">
                <h5 class="text-sm md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white"><i class="bi bi-calendar-fill me-1"></i> { movie.release_date }</h5>
              </div>
              <div class="flex items-center justify-between">
                <h5 class="text-sm md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white"><i class="bi bi-star-fill text-yellow-400 me-1"></i> { movie.vote_average }</h5>
              </div>
          </div>
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <div className="bg-[#132043] py-6">
            <div className="flex items-center">
                <div className="md:w-1/4">
                    <p className='md:text-xl text-white font-bold ms-10 md:ms-20 text-center'>MOVISA</p>
                </div>
                <div className="w-2/3 md:w-1/2 flex justify-end md:justify-center relative">
                    <input onChange={ ({ target }) => search(target.value) } type="text" className='md:h-10 md:w-[70%] rounded-full ps-9 md:ps-12 py-1 text-sm md:text-xl align-middle font-medium'/>
                    <i class="bi bi-search absolute text-sm md:text-2xl left-16 md:left-40 top-1"></i>
                </div>
            </div>
      </div>
      <div className='flex flex-wrap justify-center gap-5' >
        <PopularMovieList/>
      </div>
    </>
  )
}

export default App
