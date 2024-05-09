import React from 'react'
import Header from '../../Header/Header'
import AddPartiesHook from './AddPartiesHook'
import './AddParties.css'

function AddParties() {
    const { formData, handleChange, addNewParty, removeParty, numberOnly,
        saveParty, submitted, emailValidation, phoneValidation, showUpdate, cancelBtn, updateParty } = AddPartiesHook()
    return (
        <div>
            <Header></Header>
            <div className='settings_container'>
                <div className='settings_header'>
                    <span className='settings_title'>Add Parties</span>
                </div>
                <div className='settings_cont'>
                    {formData.parties.map((list, index) => (
                        <div key={index}>
                            <div className='row'>
                                <div className='col-sm-3'>
                                    <div className='form-group customer_input'>
                                        <label>Party Name</label>
                                        <input type="text" className='form-control' placeholder='Enter Party Name'
                                            name="parties_name" value={list.parties_name} onChange={(event) => handleChange(event, index)} />
                                    </div>
                                    {submitted && !list.parties_name &&
                                        <div className='error_message'>Party Name is Required</div>
                                    }
                                </div>
                                <div className='col-sm-3'>
                                    <div className='form-group customer_input'>
                                        <label>Phone Number</label>
                                        <input type="text" className='form-control' placeholder='Enter Phone Number'
                                            name="phone" maxLength={10} value={list.phone} onChange={(event) => handleChange(event, index)}
                                            onKeyDown={numberOnly} />
                                    </div>
                                    {submitted && !list.phone &&
                                        <div className='error_message'> Phone Number is Required</div>
                                    }
                                    {submitted && phoneValidation[index] && list.phone &&
                                        < div className='error_message'>Enter 10 Digit Phone Number</div>
                                    }
                                </div>
                                <div className='col-sm-3'>
                                    <div className='form-group customer_input'>
                                        <label>Email ID</label>
                                        <input type="text" className='form-control' placeholder='Enter Email ID'
                                            name="email" value={list.email} onChange={(event) => handleChange(event, index)} />
                                    </div>
                                    {submitted && !list.email &&
                                        <div className='error_message'> Email ID is Required</div>
                                    }
                                    {submitted && emailValidation[index] && list.email &&
                                        <div className='error_message'> Email ID is Invalid</div>
                                    }
                                </div>
                                <div className='col-sm-3'>
                                    <div className='form-group customer_input'>
                                        <label>Address</label>
                                        <input type="text" className='form-control' placeholder='Enter Address'
                                            name="address" value={list.address} onChange={(event) => handleChange(event, index)} />
                                    </div>
                                    {submitted && !list.address &&
                                        <div className='error_message'> Address is Required</div>
                                    }
                                </div>
                            </div>
                            {
                                index > 0 ?
                                    <div className='row'>
                                        <div className='form-group'>
                                            <button className='remove_btn' onClick={() => removeParty(index)}>Remove</button>
                                        </div>
                                    </div> : ''
                            }
                        </div>
                    ))}
                    {
                        !showUpdate ?
                            <div className='save_button'>
                                <button className='save_new_btn' onClick={addNewParty}>Save & Add New</button>
                                <button className='save_btn' onClick={saveParty}>Save</button>
                            </div>
                            :
                            <div className='save_button'>
                                <button className='save_new_btn' onClick={cancelBtn}>Cancel</button>
                                <button className='save_btn' onClick={updateParty}>Update</button>
                            </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default AddParties
