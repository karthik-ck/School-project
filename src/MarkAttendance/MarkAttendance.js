import React from 'react'
import Header from '../Header/Header'
import './MarkAttendance.css'
import MarkAttendanceHook from './MarkAttendanceHook'
import { FadeLoader } from 'react-spinners'

function MarkAttendance() {
  const { yeardata, year, classData, seClass, yearHandler, classHandler,
    branchData, seBranch, sectiondata, seSection, branchHandler, sectionHandler,
    searchFilter, selectAll, seDate, dateHandler, report,
    allPresentHandler, allHolidayHandler, presentHandler, allPresent, allHoliday,
    saveChanges, loading } = MarkAttendanceHook()

  return (
    <div>
      <Header></Header>
      <div className='attendance_container'>
        <div className='exam_header'>
          <div className='exam_header_top'>
            <ul>
              <li className='active'>Mark Attendance</li>
            </ul>
          </div>
          <div className='exam_header_bottom'>
            <div className='exam_filter'>
              <span className='filter_title'>Filter</span>
              {/* <div className='form-group'>
                <select className='exam_select form-control' value={year} onChange={yearHandler}>
                  <option disabled value=''>Select Year</option>
                  {yeardata.map((list) => (
                    <option key={list._id} value={list._id}>{list.yearTitle}</option>
                  ))}
                </select>
              </div> */}
              <div className='form-group'>
                <input type="date" className='form-control' value={seDate} onChange={dateHandler} />
              </div>
              <div className='form-group'>
                <select className='exam_select form-control' value={seClass} onChange={classHandler}>
                  <option disabled value=''>Select Class</option>
                  {classData.map((list) => (
                    <option key={list._id} value={list._id}>{list.class_name}</option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <select className='exam_select form-control' value={seBranch} onChange={branchHandler}>
                  <option disabled value=''>Select Branch</option>
                  {branchData.map((list) => (
                    <option key={list._id} value={list._id}>{list.branch_name}</option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <select className='exam_select form-control' value={seSection} onChange={sectionHandler}>
                  <option value='' disabled>Select Section</option>
                  {sectiondata.map((list) => (
                    <option key={list._id} value={list._id}>{list.section_name}</option>
                  ))}
                </select>
              </div>
              <div className='search_button'>
                <button onClick={searchFilter}>Search</button>
              </div>
            </div>
          </div>
        </div>
        <div className='exam_table'>
          <div className='row'>
            <div className='col-sm-12'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Sl. NO.</th>
                    <th>Admission No.</th>
                    <th>Student Name</th>
                    <th>
                      <label className='radio all_present'>
                        <input type='radio' name='attendance' value="PRESENT" checked={allPresent} onChange={allPresentHandler} />
                        All Present
                      </label>
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>
                      <label className='radio all_holiday'>
                        <input type='radio' name='attendance' value="HOLIDAY" checked={allHoliday} onChange={allHolidayHandler} />
                        HOLIDAY FOR ALL
                      </label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                          <FadeLoader color={"#123abc"} loading={loading} size={200} />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {report.map((list, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{list.admission_No}</td>
                          <td>{list.full_Name}</td>
                          <td>
                            <label className='radio all_present'>
                              <input type='radio' name={`attendance${index}`} value="PRESENT"
                                checked={list?.attendance === 'PRESENT'} onChange={(e) => presentHandler(e, list)} />
                              Present
                            </label>
                          </td>
                          <td>
                            <label className='radio first_half'>
                              <input type='radio' name={`attendance${index}`} value="1ST_HALF_LEAVE"
                                checked={list?.attendance === '1ST_HALF_LEAVE'} onChange={(e) => presentHandler(e, list)} />
                              1st Half Leave
                            </label>
                          </td>
                          <td>
                            <label className='radio second_half'>
                              <input type='radio' name={`attendance${index}`} value="2ND_HALF_LEAVE"
                                checked={list?.attendance === '2ND_HALF_LEAVE'} onChange={(e) => presentHandler(e, list)} />
                              2nd Half Leave
                            </label>
                          </td>
                          <td>
                            <label className='radio absent'>
                              <input type='radio' name={`attendance${index}`} value="ABSENT"
                                checked={list?.attendance === 'ABSENT'} onChange={(e) => presentHandler(e, list)} />
                              Absent
                            </label>
                          </td>
                          <td>
                            <label className='radio all_holiday'>
                              <input type='radio' name={`attendance${index}`} value="HOLIDAY"
                                checked={list?.attendance === 'HOLIDAY'} onChange={(e) => presentHandler(e, list)} />
                              Holiday
                            </label>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>

              {
                report && !report.length &&
                <div className='no_data'>No Data Found</div>
              }

            </div>
          </div>

          {
            report && report.length &&
            <div className='generate_button'>
              <button onClick={saveChanges}>Save Changes</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default MarkAttendance
