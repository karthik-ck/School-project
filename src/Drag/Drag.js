import React from 'react'
import Header from '../Header/Header'
import './Drag.css'
import DragHook from './DragHook'

function Drag() {
    const { studentData } = DragHook()

    return (
        <div>
            <Header></Header>
            <div className='dragdrop_container'>
                <div className='exam_table'>
                    <div className='row'>
                        <div className='table_title'>Drag & Drop</div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Sl No.</th>
                                    <th>Class</th>
                                    <th>Section</th>
                                    <th>Total</th>
                                    <th>Boys</th>
                                    <th>Girls</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.map((list, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{list.class_name}</td>
                                        <td>{list.section_name}</td>
                                        <td>{list.totalStudents}</td>
                                        <td>{list.maleCount}</td>
                                        <td>{list.femaleCount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Drag
