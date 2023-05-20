import {Link} from 'react-router-dom'

import './index.css'

const CourseCard = props => {
  const {eachCourseDetails} = props
  const {id, name, logoUrl} = eachCourseDetails

  return (
    <>
      <Link to={`/courses/${id}`} className="linked-item">
        <li className="course-item-container">
          <img src={logoUrl} alt={name} className="course-img" />
          <p className="course-name">{name}</p>
        </li>
      </Link>
    </>
  )
}
export default CourseCard
