import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = jobDetails

  return (
    <li className="similar-list-docs" key={jobDetails.id}>
      <div className="company-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="logo-url"
        />
        <div>
          <h1 className="company-title">{title}</h1>
          <div className="star-icon-container">
            <AiFillStar className="star-icon" />
            <p className="rating-count">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-desc-heading">Description</h1>
      <p className="description">{jobDescription}</p>
      <div className="location-desc">
        <div className="star-icon-container">
          <GoLocation className="location-icon" />
          <p className="location-desc description">{location}</p>
        </div>
        <div className="star-icon-container">
          <BsBriefcaseFill className="location-icon left-icon" />
          <p className="emp-type description">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
