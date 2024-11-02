import './index.css'

const MovieCardDetails = (props) => {
    const { movieCardDetails } = props
    const { id, title, posterPath, releaseDate, voteAverage, overview } = movieCardDetails

    if (!posterPath) {
        return null
    }

    const posterImgUrl = `https://image.tmdb.org/t/p/w500${posterPath}`

    return (
        <li className="movie-list-item">
            <img src={posterImgUrl} alt={id} className="movie-poster-img" />
            <div className="movie-poster-details">
                <h1 className="movie-title">{title}</h1>
                <p className="movie-release-date">RELEASE DATE: {releaseDate}</p>
                <p className="movie-rating">RATING: {voteAverage.toFixed(1)}</p>
                <p className="movie-overview">{overview}</p>
            </div>
        </li>
    )
}

export default MovieCardDetails