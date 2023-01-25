import {Component} from 'react'

import {Link} from 'react-router-dom'

import Navbar from '../Navbar'

import './index.css'

class Home extends Component {
  render() {
    const {history} = this.props
    const onClickFindJobs = () => {
      history.replace('/jobs')
    }
    return (
      <div className="home-main-container">
        <Navbar />
        <div className="home-des-container">
          <h1 className="home-heading">Find the Job That Fits Your Life</h1>
          <p className="home-des">
            Millions of people are searching for jobs,salary information,
            company reviews.Find the job that fits your abilities and potential.
          </p>
          <Link to="/jobs">
            <button
              onClick={onClickFindJobs}
              type="button"
              className="find-job-button"
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
