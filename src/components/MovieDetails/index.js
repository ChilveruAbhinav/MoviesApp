import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import Failure from '../Failure'
import ListItem from '../ListItem'
import ListItemAudio from '../ListItemAudio'
import SimilarItem from '../SimilarItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, details: {}}

  componentDidMount() {
    this.getMovieDetails()
  }

  getSimilarFormatted = similar => {
    const similarData = similar.map(item => ({
      similarId: item.id,
      similarBackDrop: item.backdrop_path,
      similarOverview: item.overview,
      similarPosterPath: item.poster_path,
      similarTitle: item.title,
    }))
    return similarData
  }

  getLangFormatted = lang => {
    const languages = lang.map(lan => ({
      id: lan.id,
      audio: lan.english_name,
    }))
    return languages
  }

  getFormatted = fetchedData => ({
    adult: fetchedData.adult,
    backDropPath: fetchedData.backdrop_path,
    budget: fetchedData.budget,
    genres: fetchedData.genres,
    id: fetchedData.id,
    overview: fetchedData.overview,
    posterPath: fetchedData.poster_path,
    releaseDate: fetchedData.release_date,
    runtime: fetchedData.runtime,
    similarMovies: this.getSimilarFormatted(fetchedData.similar_movies),
    spokenLanguages: this.getLangFormatted(fetchedData.spoken_languages),
    title: fetchedData.title,
    voteAvg: fetchedData.vote_average,
    voteCount: fetchedData.vote_count,
  })

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params
    const detailsUrl = `https://apis.ccbp.in/movies-app/movies/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(detailsUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const formattedData = this.getFormatted(fetchedData.movie_details)
      this.setState({
        apiStatus: apiStatusConstants.success,
        details: formattedData,
      })
      console.log(formattedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
    // console.log(response)
  }

  retryApi = () => {
    this.getMovieDetails()
  }

  renderFailure = () => (
    <>
      <Failure retryApi={this.retryApi} />
    </>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  detailsJsx = () => {
    const {details} = this.state
    const {
      adult,
      backDropPath,
      budget,
      genres,
      // id,
      overview,
      // posterPath,
      releaseDate,
      runtime,
      similarMovies,
      spokenLanguages,
      title,
      voteAvg,
      voteCount,
    } = details
    const guide = adult ? 'A' : 'U/A'
    const date = new Date(releaseDate)
    const day = date.getDate(date)
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const month = monthNames[parseInt(date.getMonth() + 1)]
    const year = date.getFullYear()
    const releasedOn = date.getFullYear()
    // const formattedDate = day + month + year
    return (
      <>
        <div className="details-container">
          <div
            className="movie-container"
            style={{
              backgroundImage: `url(${backDropPath})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <h1 className="movie-heading">{title}</h1>
            <div className="date-container">
              <p className="duration">{runtime}</p>
              <p className="duration">{guide}</p>
              <p className="duration">{releasedOn}</p>
            </div>
            <p className="movie-overview">{overview}</p>
            <button className="play-button" type="button">
              Play
            </button>
          </div>
          <div className="movie-detail-bottom-container">
            <div className="movie-lists-container">
              <div className="list-container-genre">
                <p className="head">genres</p>
                <ul className="lists-movie">
                  {genres.map(gen => (
                    <ListItem key={gen.id} det={gen} />
                  ))}
                </ul>
              </div>
              <div className="list-container-genre">
                <p className="head">Audio Available</p>
                <ul className="lists-movie">
                  {spokenLanguages.map(gen => (
                    <ListItemAudio key={gen.id} det={gen} />
                  ))}
                </ul>
              </div>
              <div className="list-container-genre">
                <div className="rating-count-container">
                  <h1 className="head">Rating Count</h1>
                  <p className="count">{voteCount}</p>
                </div>
                <div className="rating-count-container-2">
                  <h1 className="head">Rating Average</h1>
                  <p className="count">{voteAvg}</p>
                </div>
              </div>
              <div className="list-container-genre">
                <div className="rating-count-container">
                  <h1 className="head">Budget</h1>
                  <p className="count">{budget}</p>
                </div>
                <div className="rating-count-container-2">
                  <h1 className="head">Release Date</h1>
                  <p className="count">
                    {day}th {month} {year}
                  </p>
                </div>
              </div>
            </div>
            <h1 className="similar-head">More like this</h1>
            <ul className="similar-list">
              {similarMovies.map(sim => (
                <SimilarItem key={sim.id} simData={sim} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderMovieDetailsJsx = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.detailsJsx()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderMovieDetailsJsx()}
        <Footer />
      </>
    )
  }
}
export default MovieDetails
