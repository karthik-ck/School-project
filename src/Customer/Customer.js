import React from 'react'
import './Customer.css'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import CustomerHook from './CustomerHook'

function Customer() {
    const { customerData } = CustomerHook()
    return (
        <div>
            <Header></Header>
            <div className='customer_container'>
                <div className='settings_header'>
                    <span className='settings_title'>Total Customers - 1</span>
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
                                                <td>{list.customer_name}</td>
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
                            </div>
                        </div>
                        <div className='col-sm-9'>
                            <div className='customer_right'>
                                <div className='customer_details_top'>
                                    <div className='cust_header'>
                                        <span>Name</span>
                                        <button>Edit Customer Detail</button>
                                    </div>
                                    <div className='cust_list'>
                                        <div className='row'>
                                            <div className='col-sm-4'>
                                                <div className='cust_list_card'>
                                                    <span>Phone</span> <br></br>
                                                    <b>7986566546</b>
                                                </div>
                                            </div>
                                            <div className='col-sm-4'>
                                                <div className='cust_list_card'>
                                                    <span>Email</span> <br></br>
                                                    <b>7986566546</b>
                                                </div>
                                            </div><div className='col-sm-4'>
                                                <div className='cust_list_card'>
                                                    <span>Address</span> <br></br>
                                                    <b>7986566546</b>
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
