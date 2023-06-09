import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SearchItem from '../SearchItem'

import './index.css'

const searchRoute = true

const renderConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
  loading: 'LOADING',
}

class SearchContainer extends Component {
  state = {
    searchResultsList: [],
    renderStatus: renderConstraints.initial,
    searchValue: '',
  }

  getSearchMoviesData = async searchValue => {
    this.setState({renderStatus: renderConstraints.loading})
    const jwtToken = Cookies.get('jwt_token')
    const searchApi = `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(searchApi, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedSearchMoviesData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        searchResultsList: fetchedSearchMoviesData,
        renderStatus: renderConstraints.success,
        searchValue,
      })
    } else {
      this.setState({renderStatus: renderConstraints.fail})
    }
  }

  renderSuccessView = () => {
    const {searchResultsList} = this.state
    return searchResultsList.length > 0 ? (
      <ul className="search-items">
        {searchResultsList.map(eachMovie => (
          <SearchItem eachMovie={eachMovie} key={eachMovie.id} />
        ))}
      </ul>
    ) : (
      this.renderNoResultsView()
    )
  }

  renderNoResultsView = () => {
    const {searchValue} = this.state

    return (
      <div className="NoResult">
        <img
          className="noResultImage"
          alt="no movies"
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/No_Views_awtv8d.svg"
        />
        <p className="no-results-text">
          Your search for {searchValue} did not find any matches.
        </p>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  retryFunction = () => {
    this.getSearchMoviesData()
  }

  onFailureOfData = () => (
    <div>
      <div className="failureContainer">
        <img
          src="https://www.shutterstock.com/image-vector/computer-server-big-data-error-600w-2156541851.jpg"
          alt="failure view"
          className="failure-image"
        />
        <p className="failurePara">Something went wrong. Please try again</p>
        <button
          type="button"
          onClick={this.retryFunction}
          className="failure-button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderSwitchView = () => {
    const {renderStatus} = this.state
    switch (renderStatus) {
      case renderConstraints.loading:
        return this.renderLoaderView()
      case renderConstraints.success:
        return this.renderSuccessView()
      case renderConstraints.fail:
        return this.onFailureOfData()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header
          getSearchMoviesData={this.getSearchMoviesData}
          searchRoute={searchRoute}
        />
        <div className="search-container">{this.renderSwitchView()}</div>
      </>
    )
  }
}
export default SearchContainer
