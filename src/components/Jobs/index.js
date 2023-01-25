import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import JobFilters from '../JobFilters'
import JobItem from '../JobItem'
import Profile from '../Profile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    employmentTypeSelectedList: [],
    changeMinimumSalaryValue: 0,
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsDetailsList()
  }

  changeEmploymentType = parameter => {
    const {employmentTypeSelectedList} = this.state

    if (employmentTypeSelectedList.includes(parameter)) {
      const removalIndex = employmentTypeSelectedList.indexOf(parameter)
      employmentTypeSelectedList.splice(removalIndex, 1)
      this.setState(
        {
          employmentTypeSelectedList: [...employmentTypeSelectedList],
        },
        this.getJobsDetailsList,
      )
    } else {
      //   console.log(parameter)
      this.setState(
        {
          employmentTypeSelectedList: [
            ...employmentTypeSelectedList,
            parameter,
          ],
        },
        this.getJobsDetailsList,
      )
    }
  }

  changeSalaryRange = parameter => {
    this.setState(
      {changeMinimumSalaryValue: parseInt(parameter)},
      this.getJobsDetailsList,
    )
  }

  onUpdateJobsSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSubmit = event => {
    if (event.key === 'Enter') {
      this.getJobsDetailsList()
    }
  }

  getJobsDetailsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {
      employmentTypeSelectedList,
      changeMinimumSalaryValue,
      searchInput,
    } = this.state
    // console.log(changeMinimumSalaryValue)
    // console.log(employmentTypeSelectedList)
    const EmploymentTypeStringWithComma = employmentTypeSelectedList.join(',')
    // console.log(EmploymentTypeStringWithComma)

    const jwtToken = Cookies.get('jwt_token')
    const jobsApi = `https://apis.ccbp.in/jobs?employment_type=${EmploymentTypeStringWithComma}&minimum_package=${changeMinimumSalaryValue}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobsApi, options)
    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data)
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      alt="failure-view"
    />
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-unordered-list">
        {jobsList.map(eachJobDetails => (
          <JobItem key={eachJobDetails.id} eachJobDetails={eachJobDetails} />
        ))}
      </ul>
    )
  }

  renderJobsApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, jobsList} = this.state
    const jobsDisplay = jobsList.length === 0

    return jobsDisplay ? (
      <div className="no-jobs-container">
        <Navbar />
        <div className="search-input-content">
          <input
            type="search"
            className="search"
            placeholder="Search"
            value={searchInput}
            onChange={this.changeSearchInput}
            onKeyDown={this.onEnterKey}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={this.getJobDetails}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="no-job">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-desc">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      </div>
    ) : (
      <>
        <Navbar />
        <div className="jobs-main-container">
          <div className="input-container">
            <input
              type="search"
              onChange={this.onUpdateJobsSearch}
              className="search-field"
              placeholder="Search"
              value={searchInput}
              onKeyDown={this.onClickSubmit}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-icon"
              onClick={this.getJobsDetailsList}
            >
              <BsSearch />
            </button>
          </div>
          <Profile />
          <JobFilters
            className="job-filters-container"
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
            searchInput={searchInput}
            changeSearchInput={this.changeSearchInput}
            getJobDetails={this.getJobDetails}
          />
          <div className="jobs-list-container">
            {this.renderJobsApiStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
