import './index.css'

const SalaryRange = props => {
  const {eachSalaryRangeDetails, filteringListBasedOnSalaryRange} = props
  const {salaryRangeId, label} = eachSalaryRangeDetails

  const onClickRadio = () => {
    filteringListBasedOnSalaryRange(salaryRangeId)
  }
  return (
    <li className="each-list1">
      <input
        type="radio"
        className="radio-type"
        id={salaryRangeId}
        name="salary-range"
        value={label}
        onClick={onClickRadio}
      />
      <label htmlFor={salaryRangeId}>{label}</label> <br />
    </li>
  )
}

export default SalaryRange
