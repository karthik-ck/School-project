import React from 'react'
import Header from '../Header/Header'
import './Exam.css'
import ExamHook from './ExamHook'

function Exam() {
  const { classData, seClass, branchData, seBranch, termdata, seTerm, addExam,
    classHandler, branchHandler, termHandler, examData, dateFormat, searchFilter ,
    editExam } = ExamHook()
  return (
    <div>
      <Header></Header>
      <div className='exam_container'>
        <div className='exam_header'>
          <div className='exam_header_top'>
            <ul>
              <li className='active'>Manage Exam</li>
              <li>Manage Maximum Mark</li>
            </ul>
            <div className='add_exam'>
              <button onClick={addExam}>Add Exam</button>
            </div>
          </div>
          <div className='exam_header_bottom'>
            <div className='exam_filter'>
              <span className='filter_title'>Filter</span>
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
                <select className='exam_select form-control' value={seTerm} onChange={termHandler}>
                  <option value='' disabled>Select Term</option>
                  {termdata.map((list) => (
                    <option key={list._id} value={list._id}>{list.term_name}</option>
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
            <div className='table_title'>Exam List</div>
            <table className='table'>
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Exam Name</th>
                  <th>Term</th>
                  <th>INCLUDED IN ANNUAL REPORT</th>
                  <th>EXAM START DATE</th>
                  <th>EXAM END DATE</th>
                  <th>MARK ENTRY DEADLINE DATE</th>
                  <th>STATUS</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {examData.map((list, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{list.exam_name}</td>
                    <td>{list.term_name}</td>
                    <td>{list.annual_report_status === true ? 'Yes' : 'No'}</td>
                    <td>{list.exam_start_date ? dateFormat(list.exam_start_date) : ''}</td>
                    <td>{list.exam_end_date ? dateFormat(list.exam_end_date) : ''}</td>
                    <td>{list.dealine_for_markEntry ? dateFormat(list.dealine_for_markEntry) : ''}</td>
                    <td>{list.status === 1 ? 'Active' : 'InActive'}</td>
                    <td className='action_buttons'>
                      <button onClick={()=>editExam(list._id,{list})}>E</button>
                      <button>D</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {
              examData && !examData.length &&
              <div className='no_data'>No Data Found</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Exam
