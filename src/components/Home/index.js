import { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'

import Header from '../Header'
import MovieCardDetails from '../MovieCardDetails'

import './index.css'
import MovieContext from '../../context/MovieContext'

let originalArray

const Home = () => {
    const [moviesData, setMoviesData] = useState([])
    const [searchInput, setSearchInput] = useState("Jack")
    const [updateSearchInput, setUpdateSearchInput] = useState("Jack")
    const [isLoading, setIsLoading] = useState(true)
    const [pageDetails, setPageDetails] = useState({
        pageArray: [],
        currentPage: 1,
        totalPages: 1
    })

    const MOVIES_PER_PAGE = 10   // number of movies per page

    useEffect(() => {
        const getMoviesSearchData = async () => {
            try {
                const API_KEY = "96b7d4a3d469e7b177a4e7408dd82a69"
                const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${updateSearchInput}`
                const response = await fetch(apiUrl)
                const data = await response.json()
                // console.log(data)
                const updatedData = data.results.map(movie => ({
                    adult: movie.adult,
                    backdropPath: movie.backdrop_path ? movie.backdrop_path : null,
                    genreIds: movie.genre_ids,
                    id: movie.id,
                    originalLanguage: movie.original_language,
                    originalTitle: movie.original_title,
                    overview: movie.overview,
                    popularity: movie.popularity,
                    posterPath: movie.poster_path,
                    releaseDate: movie.release_date,
                    title: movie.title,
                    video: movie.video,
                    voteAverage: movie.vote_average,
                    voteCount: movie.vote_count
                }))
                    .filter(movie => movie.posterPath)

                    // Sorting by release date and then by rating
                    .sort((a, b) => {
                        const dateA = new Date(a.releaseDate)
                        const dateB = new Date(b.releaseDate)

                        // Sort by release date (latest first)
                        if (dateA < dateB) return 1
                        if (dateA > dateB) return -1

                        // If release dates are the same, sort by vote average (highest first)
                        return b.voteAverage - a.voteAverage
                    })

                originalArray = updatedData
                const totalPages = Math.ceil(updatedData.length / MOVIES_PER_PAGE)
                setMoviesData(updatedData)
                setPageDetails({
                    pageArray: updatedData.slice(0, MOVIES_PER_PAGE),
                    currentPage: 1,
                    totalPages
                })

                setIsLoading(false)

            } catch (e) {
                console.log(`DB Error: ${e.message}`)
            }
        }

        getMoviesSearchData()
    }, [updateSearchInput])

    const onChangeSearchInput = (event) => {
        setSearchInput(event.target.value)
    }

    const onClickSearchBtn = () => {
        // setIsLoading(true)
        const searchQuery = searchInput.toLowerCase()
        if (searchQuery === "") {
            setPageDetails({
                ...pageDetails,
                pageArray: [],
                currentPage: 1,
                totalPages: Math.ceil(originalArray.length / MOVIES_PER_PAGE)
            })
            // setIsLoading(false)
        } else {
            const getFilteredData = originalArray.filter(movie => (
                movie.title.toLowerCase().includes(searchQuery)
            ))
            const totalPages = Math.ceil(getFilteredData.length / MOVIES_PER_PAGE)
            setPageDetails({
                ...pageDetails,
                pageArray: getFilteredData.slice(0, MOVIES_PER_PAGE),
                currentPage: 1,
                totalPages
            })
            setUpdateSearchInput(searchInput)
            setIsLoading(true)
        }
    }

    // console.log(pageDetails.pageArray)

    const goToPage = (pageNum) => {
        const startIndex = (pageNum - 1) * MOVIES_PER_PAGE
        const endIndex = pageNum * MOVIES_PER_PAGE
        setPageDetails({
            ...pageDetails,
            pageArray: moviesData.slice(startIndex, endIndex),
            currentPage: pageNum
        })
    }

    return (
        <MovieContext.Consumer>
            {value => {
                const { lightTheme } = value

                const moviePageClassName = lightTheme ? 'light' : 'dark'
                const noMoviesFoundClass = lightTheme ? 'light' : 'dark'

                return (
                    <>
                        <Header
                            searchInput={searchInput}
                            onChangeSearchInput={onChangeSearchInput}
                            onClickSearchBtn={onClickSearchBtn}
                        />
                        <div className={`movie-page-container ${moviePageClassName}`}>
                            {isLoading ? (
                                <div className="loader-container">
                                    <Oval type="Oval" color="#ffffff" height={50} width={50} />
                                </div>
                            ) : (
                                <>
                                    <ul className="movie-list-container">
                                        {pageDetails.pageArray.length > 0 ? (
                                            pageDetails.pageArray.map(eachMovie => (
                                                <MovieCardDetails key={eachMovie.id} movieCardDetails={eachMovie} />
                                            ))
                                        ) : (
                                            searchInput.trim() === "" ? (
                                                <p className={`no-movies-found ${noMoviesFoundClass}`}>Search Movies ...</p>
                                            ) : (
                                                <p className={`no-movies-found ${noMoviesFoundClass}`}>No Movies Found</p>
                                            )
                                        )}
                                    </ul>

                                    {/* Pagination Controls */}
                                    {pageDetails.pageArray.length > 0 && (
                                        <div className="pagination-container">
                                            {Array.from({ length: pageDetails.totalPages }, (_, index) => (
                                                <button
                                                    type="button"
                                                    key={index + 1}
                                                    className={`page-button ${pageDetails.currentPage === index + 1 ? "page-active" : ""}`}
                                                    onClick={() => goToPage(index + 1)}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                )
            }}
        </MovieContext.Consumer>
    )
}

export default Home