import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Slider from 'react-slick'
import SlickItem from '../SlickItem'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Failure from '../Failure'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingSlick extends Component {
  state = {trendingMovies: [], apiTrending: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingMovies()
  }

  getTrendingMovies = async () => {
    this.setState({
      apiTrending: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiTrendingMovieUrl =
      'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiTrendingMovieUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const trendingMoviesData = fetchedData.results.map(movie => ({
        id: movie.id,
        backPath: movie.backdrop_path,
        MovieOverview: movie.overview,
        movieTitle: movie.title,
        posterPath: movie.poster_path,
      }))
      this.setState({
        trendingMovies: trendingMoviesData,
        apiTrending: apiStatusConstants.success,
      })
    } else {
      this.setState({apiTrending: apiStatusConstants.failure})
    }
  }

  trendingSuccess = () => {
    const {trendingMovies} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div>
        <Slider {...settings}>
          {trendingMovies.map(item => (
            <SlickItem key={item.id} slickData={item} />
          ))}
        </Slider>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  retryApi = () => {
    this.getTrendingMovies()
  }

  renderFailure = () => (
    <>
      <Failure retryApi={this.retryApi} />
    </>
  )

  renderTrendingSlickJsx = () => {
    const {apiTrending} = this.state
    switch (apiTrending) {
      case apiStatusConstants.success:
        return this.trendingSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderTrendingSlickJsx()}</div>
  }
}
export default TrendingSlick
