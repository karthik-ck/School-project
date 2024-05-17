import React from 'react'
import Header from '../Header/Header'
import './Reports.css'
import ReportsHook from './ReportsHook'

function Reports() {
  const { yeardata, year, classData, seClass, yearHandler, classHandler,
    branchData, seBranch, sectiondata, seSection, branchHandler, sectionHandler, report,
    searchFilter, allCheckboxHandler, selectAll } = ReportsHook()

  return (
    <div>
      <Header></Header>
      <div className='reports_container'>
        <div className='exam_header'>
          <div className='exam_header_top'>
            <ul>
              <li className='active'>HEALTH & ACTIVITY REPORT CARD</li>
            </ul>
          </div>
          <div className='exam_header_bottom'>
            <div className='exam_filter'>
              <span className='filter_title'>Filter</span>
              <div className='form-group'>
                <select className='exam_select form-control' value={year} onChange={yearHandler}>
                  <option disabled value=''>Select Year</option>
                  {yeardata.map((list) => (
                    <option key={list._id} value={list._id}>{list.yearTitle}</option>
                  ))}
                </select>
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
            <div className='table_title'>Stduent List</div>
            <table className='table'>
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Student Name</th>
                  <th style={{ display: "flex" }}>
                    <div className='checkbox_wrap'>
                      <input type="checkbox" onChange={allCheckboxHandler} checked={selectAll} />
                      <div className='checkbox_input'></div>
                    </div>Generate
                  </th>
                </tr>
              </thead>
              <tbody>
                {report.map((list, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{list.full_Name}</td>
                    <td>
                      <div className='checkbox_wrap'>
                        <input type="checkbox" checked={list?.selected}/>
                        <div className='checkbox_input'></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {
              report && !report.length &&
              <div className='no_data'>No Data Found</div>
            }
          </div>
          {
            report && report.length &&
            <div className='generate_button'>
              <button>Generate Report Card</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Reports
