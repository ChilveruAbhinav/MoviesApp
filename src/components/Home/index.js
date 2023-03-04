import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import OriginalSlick from '../OriginalSlick'
import TrendingSlick from '../TrendingSlick'

import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import Failure from '../Failure'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiMovies: apiStatusConstants.initial,
    poster: {},
  }

  componentDidMount() {
    this.getPoster()
  }

  getPoster = async () => {
    this.setState({
      apiMovies: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiTrendingUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiTrendingUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const len = fetchedData.results.length
      const index = Math.floor(Math.random() * len)
      const moviesDetails = fetchedData.results[index]
      const posterDetails = {
        backImg: moviesDetails.backdrop_path,
        id: moviesDetails.id,
        overview: moviesDetails.overview,
        posterImg: moviesDetails.poster_path,
        title: moviesDetails.title,
      }
      this.setState({
        poster: {...posterDetails},
        apiMovies: apiStatusConstants.success,
      })
    } else {
      this.setState({apiMovies: apiStatusConstants.failure})
    }
  }

  renderPoster = () => {
    const {poster} = this.state
    const {backImg, overview, title} = poster
    return (
      <>
        <div
          className="poster-container"
          style={{
            backgroundImage: `url(${backImg})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <h1 className="poster-title">{title}</h1>
          <p className="poster-overview">{overview}</p>
          <button type="button" className="play-button">
            Play
          </button>
        </div>
      </>
    )
  }

  retryApi = () => {
    this.getTrendingMovies()
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

  renderJsk = () => {
    const {apiMovies} = this.state
    switch (apiMovies) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderPoster()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderJsk()}
        <div className="home-container-main-container">
          <h1 className="slick-heading">Trending</h1>
          <TrendingSlick />
          <h1 className="slick-heading-2">Originals</h1>
          <OriginalSlick />
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home
