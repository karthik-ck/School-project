import React from 'react'
import Header from '../Header/Header'
import './Settings.css'
import SettingsHook from './SettingsHook'

function Settings() {
    const { formData, handleChange, addNewCustomer, removeCustomer, saveForm,
        submitted, emailValidation, numberOnly, phoneValidation, showUpdate, updateForm, cancelbtn } = SettingsHook()

    return (
        <div>
            <Header></Header>
            <div className='settings_container'>
                <div className='settings_header'>
                    <span className='settings_title'> Add Customers</span>
                </div>
                <div className='settings_cont'>
                    {formData.customers.map((list, index) => (
                        <div key={index}>
                            <div className='row'>
                                <div className='col-sm-3'>
                                    <div className='form-group customer_input'>
                                        <label>Customer Name</label>
                                        <input type="text" className='form-control' placeholder='Enter Customer Name'
                                            name="customer_name" value={list.customer_name} onChange={(event) => handleChange(index, event)} />
                                    </div>
                                    {submitted && !list.customer_name &&
                                        <div className='error_message'>Customer Name is Required</div>
                                    }
                                </div>
                                <div className='col-sm-3'>
                                    <div className='form-group customer_input'>
                                        <label>Phone Number</label>
                                        <input type="text" className='form-control' placeholder='Enter Phone Number'
                                            name="phone" maxLength={10} value={list.phone} onChange={(event) => handleChange(index, event)}
                                            onKeyDown={numberOnly} />
                                    </div>
                                    {submitted && !list.phone &&
                                        <div className='error_message'>Phone Number is Required</div>
                                    }
                                    {submitted && list.phone && phoneValidation[index] &&
                                        <div className='error_message'>Enter 10 Digit Phone Number</div>
                                    }
                                </div>
                                <div className='col-sm-3'>
                                    <div className='form-group customer_input'>
                                        <label>Email ID</label>
                                        <input type="text" className='form-control' placeholder='Enter Email ID'
                                            name="email" value={list.email} onChange={(event) => handleChange(index, event)} />
                                    </div>
                                    {submitted && !list.email &&
                                        <div className='error_message'>Email ID is Required</div>
                                    }
                                    {submitted && list.email && emailValidation[index] &&
                                        <div className='error_message'>Email ID is Invalid</div>
                                    }
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-3'>
                                    <div className='form-group customer_input'>
                                        <label>Address</label>
                                        <input type="text" className='form-control' placeholder='Enter Address'
                                            name="address" value={list.address} onChange={(event) => handleChange(index, event)} />
                                    </div>
                                    {submitted && !list.address &&
                                        <div className='error_message'> Address is Required</div>
                                    }
                                </div>
                                <div className='col-sm-3'>
                                    <div className='form-group customer_input'>
                                        <label>Wallet Money</label>
                                        <input type="text" className='form-control' placeholder='Enter Wallet Money' onKeyDown={numberOnly}
                                            name="wallet_amount" value={list.wallet_amount} onChange={(event) => handleChange(index, event)} />
                                    </div>
                                    {submitted && !list.wallet_amount &&
                                        <div className='error_message'> Wallet Money is Required</div>
                                    }
                                </div>
                                <div className='col-sm-3'>
                                    {index > 0 ?
                                        <div className='form-group'>
                                            <button className='remove_btn' onClick={() => removeCustomer(index)}>Remove</button>
                                        </div> : ''}

                                </div>
                            </div>
                        </div>
                    ))}
                    {
                        !showUpdate ?
                            <div className='save_button'>
                                <button className='save_new_btn' onClick={addNewCustomer}>Save & Add New</button>
                                <button className='save_btn' onClick={saveForm}>Save</button>
                            </div>
                            :
                            <div className='save_button'>
                                <button className='save_new_btn' onClick={cancelbtn}>Cancel</button>
                                <button className='save_btn' onClick={updateForm}>Update</button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Settings
