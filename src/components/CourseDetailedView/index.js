import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class CourseDetailedView extends Component {
  state = {CourseDetailedObject: {}, apiCallStatus: apiConstantStatus.initial}

  componentDidMount() {
    this.getDetailedData()
  }

  getDetailedData = async () => {
    this.setState({apiCallStatus: apiConstantStatus.inprogress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.setState({
        CourseDetailedObject: updatedData,
        apiCallStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({apiCallStatus: apiConstantStatus.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  onClickRetryButton = () => this.getDetailedData()

  renderFailureView = () => (
    <>
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failure-img"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-text">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          className="Retry-button"
          onClick={this.onClickRetryButton}
        >
          Retry
        </button>
      </div>
    </>
  )

  renderSuccessView = () => {
    const {CourseDetailedObject} = this.state
    const {imageUrl, name, description} = CourseDetailedObject
    return (
      <>
        <div className="detailed-card-container">
          <img src={imageUrl} alt={name} className="card-img" />
          <div className="detailed-content-container">
            <h2 className="card-course-heading">{name}</h2>
            <p className="card-course-description">{description}</p>
          </div>
        </div>
      </>
    )
  }

  renderResultView = () => {
    const {apiCallStatus} = this.state

    switch (apiCallStatus) {
      case apiConstantStatus.success:
        return this.renderSuccessView()
      case apiConstantStatus.failure:
        return this.renderFailureView()
      case apiConstantStatus.inprogress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="detailed-page">{this.renderResultView()}</div>
      </>
    )
  }
}
export default CourseDetailedView
