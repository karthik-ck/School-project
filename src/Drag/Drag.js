import React from 'react'
import Header from '../Header/Header'
import './Drag.css'
import DragHook from './DragHook'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

function Drag() {
    const { studentData, handleOnDragEnd, onSortEnd } = DragHook()

    // Sortable element
    const SortableItem = SortableElement(({ item }) => (
        <tr>
            <td>{item._id}</td>
            <td>{item.full_Name}</td>
            <td>{item.admission_No}</td>
        </tr>
    ));

    // Sortable container
    const SortableTable = SortableContainer(({ items }) => (
        <tbody>
            {items.map((item, index) => (
                <SortableItem key={`item-${item.id}`} index={index} item={item} />
            ))}
        </tbody>
    ));


    return (
        <div>
            <Header></Header>
            <div className='dragdrop_container'>
                <div className='exam_table'>
                    <div className='row'>
                        <div className='table_title'>Drag & Drop</div>
                        {/* <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="table">
                                {(provided) => (
                                    <table {...provided.droppableProps} ref={provided.innerRef} className="table">
                                        <thead>
                                            <tr>
                                                <th>Sl No.</th>
                                                <th>Student Name</th>
                                                <th>Admission No.</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentData.map((list, index) => (
                                                <Draggable key={list._id} draggableId={list._id} index={index}>
                                                    {(provided) => (
                                                        <tr
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <td>{index + 1}</td>
                                                            <td>{list.full_Name}</td>
                                                            <td>{list.admission_No}</td>
                                                        </tr>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </tbody>
                                    </table>
                                )}
                            </Droppable>
                        </DragDropContext> */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Sl No.</th>
                                    <th>Student Name</th>
                                    <th>Admission No.</th>
                                </tr>
                            </thead>
                            <SortableTable items={studentData} onSortEnd={onSortEnd} useDragHandle />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Drag
