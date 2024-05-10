import React from 'react'
import Header from '../../Header/Header'
import './CreateExam.css'
import CreateExamHook from './CreateExamHook'

function CreateExam() {
    const { classdata, selectedClass, classHandler, branchdata, termdata,
        selectedBranch, selectedTerm, branchHandler, termHandler, saveExam ,
        examname, examnameChange, annualReport, annualReportChange, status,
        statusChange, startDate, endDate, startDateChange, endDateChange ,
        deadlineDate, deadlineDateChange } = CreateExamHook()

    return (
        <div>
            <Header></Header>
            <div className='exam_container'>
                <div className='settings_header'>
                    <span className='settings_title'>Add Exam</span>
                </div>
                <div className='settings_cont'>
                    <div className='assign_title'>Assign</div>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <div className='form-group exam_form'>
                                <select className='form-control' value={selectedClass} onChange={classHandler}>
                                    <option value='' disabled>Select Class</option>
                                    {classdata.map((list) => (
                                        <option key={list._id} value={list._id}>{list.class_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='form-group exam_form'>
                                <select className='form-control' value={selectedBranch} onChange={branchHandler}>
                                    <option value='' disabled>Select Branch</option>
                                    {branchdata.map((list) => (
                                        <option key={list._id} value={list._id}>{list.branch_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <div className='form-group exam_form'>
                                <select className='form-control' value={selectedTerm} onChange={termHandler}>
                                    <option value='' disabled>Select Term</option>
                                    {termdata.map((list) => (
                                        <option key={list._id} value={list._id}>{list.term_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='form-group exam_form'>
                                <input type="text" className='form-control' placeholder='Exam Name' value={examname} onChange={examnameChange}/>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <div className='input_container'>
                                <label>Included in Annaul Report</label>
                                <div className='radio_button'>
                                    <input type="radio" id="yes" name="annual_report" value={annualReport} onChange={()=>annualReportChange(true)}/>
                                    <label htmlFor="yes">Yes</label>
                                    <input type="radio" id="no" name="annual_report" value={annualReport} onChange={() => annualReportChange(false)} />
                                    <label htmlFor="no">No</label>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='input_container'>
                                <label>Status</label>
                                <div className='radio_button'>
                                    <input type="radio" id="active" name="status" value={status} onChange={()=>statusChange(1)} />
                                    <label htmlFor="active">Active</label>
                                    <input type="radio" id="inactive" name="status" value={status} onChange={() => statusChange(0)} />
                                    <label htmlFor="inactive">InActive</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='assign_title'>Exam Star Date & End Date</div>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <div className='date_container'>
                                <label>Exam Start Date</label>
                                <input type="date" className='form-control date_input' value={startDate} onChange={startDateChange}/>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='date_container'>
                                <label>Exam End Date</label>
                                <input type="date" className='form-control date_input' value={endDate} onChange={endDateChange} min={startDate} disabled={!startDate} />
                            </div>
                        </div>
                    </div>
                    <div className='assign_title'>LAST DATE TO ENTRY & UPDATE MARKS</div>
                    <div className='col-sm-4'>
                        <div className='date_container'>
                            <label>Mark Entry Deadline</label>
                            <input type="date" className='form-control date_input' value={deadlineDate} onChange={deadlineDateChange} min={endDate} disabled={!endDate} />
                        </div>
                    </div>
                    <div className='save_button'>
                        <button className='save_btn' onClick={saveExam}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateExam
