import React from 'react'
import './Customer.css'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import CustomerHook from './CustomerHook'
import Pagination from 'react-js-pagination';

function Customer() {
    const { customerData, fetchData, nameClick, editCustomer,
        currentPage, totalDocs, perPage, pagingCounter, handlePageChange } = CustomerHook()
    return (
        <div>
            <Header></Header>
            <div className='customer_container'>
                <div className='settings_header'>
                    <span className='settings_title'>Total Customers - {totalDocs}</span>
                    <div className='add_customer'>
                        <button><Link to="/settings">Add Customer</Link></button>
                    </div>
                </div>
                <div className='customer_cont'>
                    <div className='row'>
                        <div className='col-sm-3'>
                            <div className='customer_left'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Customer</th>
                                            <th>Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customerData.map((list, index) => (
                                            <tr key={index}>
                                                <td className={(fetchData?.customer_name === list.customer_name) ? 'name_active' : ''} onClick={() => nameClick(list)}>
                                                    {list.customer_name}
                                                </td>
                                                <td>{list.wallet_amount ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(list.wallet_amount) : ''}</td>
                                                <td className='action_buttons'>
                                                    <button><Link to={`/settings?id=${list._id}`}>E</Link></button>
                                                    <button>D</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {
                                    customerData && !customerData.length &&
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
                                        <span>{fetchData?.customer_name}</span>
                                        <button onClick={() => editCustomer(fetchData?._id)}>Edit Customer Detail</button>
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

export default Customer
