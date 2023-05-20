import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseCard from '../CourseCard'

import './index.css'

const apiConstantsStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {coursesDataList: [], apiCallStatus: apiConstantsStatus.initial}

  componentDidMount() {
    this.getTechSkillsData()
  }

  getTechSkillsData = async () => {
    this.setState({apiCallStatus: apiConstantsStatus.inprogress})

    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))

      this.setState({
        coursesDataList: updatedData,
        apiCallStatus: apiConstantsStatus.success,
      })
    } else {
      this.setState({apiCallStatus: apiConstantsStatus.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={80} width={80} />
    </div>
  )

  onClickRetryButton = () => this.getTechSkillsData()

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
          className="retry-button"
          onClick={this.onClickRetryButton}
        >
          Retry
        </button>
      </div>
    </>
  )

  renderSuccessView = () => {
    const {coursesDataList} = this.state

    return (
      <>
        <ul className="course-items-container">
          {coursesDataList.map(eachCourse => (
            <CourseCard eachCourseDetails={eachCourse} key={eachCourse.id} />
          ))}
        </ul>
      </>
    )
  }

  renderResultView = () => {
    const {apiCallStatus} = this.state

    switch (apiCallStatus) {
      case apiConstantsStatus.success:
        return this.renderSuccessView()
      case apiConstantsStatus.failure:
        return this.renderFailureView()
      case apiConstantsStatus.inprogress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">
          <h1 className="corses-main-heading">Courses</h1>
          {this.renderResultView()}
        </div>
      </>
    )
  }
}
export default Home
