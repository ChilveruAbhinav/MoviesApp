import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import PopularItem from '../PopularItem'
import Header from '../Header'
import './index.css'
import Footer from '../Footer'
import Failure from '../Failure'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {apiPopular: apiStatusConstants.initial, popularList: []}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiPopular: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const popularApi = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(popularApi, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const popularMoviesList = fetchedData.results.map(pop => ({
        id: pop.id,
        backDrop: pop.backdrop_path,
        posterDrop: pop.poster_path,
        popTitle: pop.title,
      }))
      this.setState({
        apiPopular: apiStatusConstants.success,
        popularList: popularMoviesList,
      })
    } else {
      this.setState({apiPopular: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderPopularSuccess = () => {
    const {popularList} = this.state
    return (
      <>
        <ul className="popular-list">
          {popularList.map(item => (
            <PopularItem key={item.id} popularDetails={item} />
          ))}
        </ul>
      </>
    )
  }

  retryApi = () => {
    this.getPopularMovies()
  }

  renderFailure = () => (
    <>
      <Failure retryApi={this.retryApi} />
    </>
  )

  renderPopularJsx = () => {
    const {apiPopular} = this.state

    switch (apiPopular) {
      case apiStatusConstants.success:
        return this.renderPopularSuccess()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
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
        <div className="popular-container">{this.renderPopularJsx()}</div>
        <Footer />
      </>
    )
  }
}
export default Popular
