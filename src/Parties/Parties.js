import React from 'react'
import Header from '../Header/Header'
import PartiesHook from './PartiesHook'
import './Parties.css'
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination';

function Parties() {
    const { partyData, fetchData, nameClick, editParty, deleteParty, handlePageChange,
        currentPage, totalDocs, perPage, pagingCounter, } = PartiesHook()
    return (
        <div>
            <Header></Header>
            <div className='customer_container'>
                <div className='settings_header'>
                    <span className='settings_title'>Total Parties - {totalDocs}</span>
                    <div className='add_customer'>
                        <button><Link to="/parties/add-parties">Add Party</Link></button>
                    </div>
                </div>
                <div className='customer_cont'>
                    <div className='row'>
                        <div className='col-sm-3'>
                            <div className='customer_left'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Party</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {partyData.map((list, index) => (
                                            <tr key={index}>
                                                <td className={(fetchData?.parties_name === list.parties_name) ? 'name_active' : ''}
                                                    onClick={() => nameClick(list)}>
                                                    {list.parties_name}
                                                </td>
                                                <td className='action_buttons'>
                                                    <button onClick={() => editParty(list._id)}>E</button>
                                                    <button onClick={() => deleteParty(list._id)}>D</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {
                                    partyData && !partyData.length &&
                                    <div className='no_data'>No Data Found</div>
                                }

                                <div className='pagination'>
                                    <div>
                                        Showing {pagingCounter} to {currentPage * 10 > totalDocs ? totalDocs : currentPage * 10} of {totalDocs} entries
                                    </div>
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={perPage} // Number of items per page
                                        totalItemsCount={totalDocs} // Total number of items (useful for calculating the total number of pages)
                                        pageRangeDisplayed={3} // Number of pages to display in the pagination
                                        onChange={handlePageChange}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-9'>
                            <div className='customer_right'>
                                <div className='customer_details_top'>
                                    <div className='cust_header'>
                                        <span>{fetchData?.parties_name}</span>
                                        <button onClick={() => editParty(fetchData._id)}>Edit Party Detail</button>
                                    </div>
                                    <div className='cust_list'>
                                        <div className='row'>
                                            <div className='col-sm-4'>
                                                <div className='cust_list_card'>
                                                    <span>Phone</span> <br></br>
                                                    <b>{fetchData?.phone}</b>
                                                </div>
                                            </div>
                                            <div className='col-sm-4'>
                                                <div className='cust_list_card'>
                                                    <span>Email</span> <br></br>
                                                    <b>{fetchData?.email}</b>
                                                </div>
                                            </div><div className='col-sm-4'>
                                                <div className='cust_list_card'>
                                                    <span>Address</span> <br></br>
                                                    <b>{fetchData?.address}</b>
                                                </div>
                                            </div>
                                        </div>
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

export default Parties
