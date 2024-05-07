import React from 'react'
import Header from '../Header/Header'
import './Home.css'
import HomeHook from './HomeHook'
import Pagination from 'react-js-pagination';

function Home() {
  const { name, code, type, listSubjects, handleChange, saveSubject,
    submitted, edit, showupdate, cancel, updateSubject, deleteSubject, Search,
    currentPage, totalPage, handlePageChange, totalDocs, pagingCounter, perPage
  } = HomeHook()

  return (
    <div>
      <Header></Header>
      <div className='subject_container'>
        <div className='subject_header'>
          <span className='subject_title'>Manage Subject</span>
          <div className='search_filter'>
            <input type='text' className='form-control' placeholder='Search Subject' onKeyUp={Search} />
          </div>
        </div>
        <div className='subject_cont'>
          <div className='row'>
            <div className='col-sm-4'>
              <div className='subject_left'>
                <div className='sub_title'>
                  Add Subject
                </div>
                <div className='subject_form'>
                  <div className='form-group'>
                    <input type="text" className='form-control' placeholder='Subject Name' name="name" value={name} onChange={handleChange} />
                  </div>
                  {submitted && !name &&
                    <div className='invalid-error'>Subject Name is Required</div>
                  }
                  <div className='form-group'>
                    <input type="text" className='form-control' placeholder='Subject Code' name="code" value={code} onChange={handleChange} />
                  </div>
                  {submitted && !code &&
                    <div className='invalid-error'>Subject Code is Required</div>
                  }
                  <div className='form-group subject_type'>
                    <div>Subject Type</div>
                    <div className='radio-group'>
                      <label className='radio'>
                        <input type='radio' name='type' value="Academic" checked={type === 'Academic'} onChange={handleChange} />
                        Academic
                      </label>
                      <label className='radio'>
                        <input type='radio' name='type' value="Additional" checked={type === 'Additional'} onChange={handleChange} />
                        Additional
                      </label>
                    </div>
                  </div>
                  {submitted && !type &&
                    <div className='invalid-error'>Subject Type is Required</div>
                  }
                  {showupdate ? (<div className='save_subject'>
                    <button onClick={updateSubject}>Update Subject</button>
                    <button onClick={cancel} className='cancel_button'>Cancel</button>
                  </div>) : (
                    <div className='save_subject'>
                      <button onClick={saveSubject}>Save Subject</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='col-sm-8'>
              <div className='subject_right'>
                <div className='subject_title'>Subject List</div>
                <div className='subject_table'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Sl No.</th>
                        <th>Subject Name</th>
                        <th>Subject Code</th>
                        <th>Subject Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listSubjects.map((list, index) => (
                        <tr key={list._id}>
                          <td>{perPage * (currentPage - 1) + index + 1}</td>
                          <td>{list.subject_name}</td>
                          <td>{list.subject_code}</td>
                          <td>{list.subjectType}</td>
                          <td className='action_buttons'>
                            <button onClick={() => edit(list)}>Edit</button>
                            <button onClick={() => deleteSubject(list)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {
                    listSubjects && !listSubjects.length &&
                    <div className='no_data'>No Data Found</div>
                  }

                  <div className='pagination'>
                    <div>
                      Showing {pagingCounter} to {currentPage * 10 > totalDocs ? totalDocs : currentPage * 10} of {totalDocs} entries
                    </div>
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={10} // Number of items per page
                      totalItemsCount={totalDocs} // Total number of items (useful for calculating the total number of pages)
                      pageRangeDisplayed={3} // Number of pages to display in the pagination
                      onChange={handlePageChange}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
