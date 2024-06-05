import { useEffect, useState } from 'react'
import UserService from '../Services/UserService'

function DragHook() {
    const [studentData, setStudentData] = useState([])
    const [year, setYear] = useState('')

    useEffect(() => {
        getAcademicYear()
    }, [])

    useEffect(() => {
        if (year) {
            report()
        }
    }, [year])

    function getAcademicYear() {
        UserService.getAcademicYearDropdown()
            .then((response) => {
                const defaultYear = response.data.data.find(
                    (year) => year.set_default === "TRUE"
                );
                setYear(defaultYear._id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function report() {
        UserService.getHealthReports(year, "6576f412116a3911559cc20a", "6576f0b7c23808ea977924f6", "")
            .then((response) => {
                if (response.data.data.data.length) {
                    setStudentData(response.data.data.data[0]?.documentdata || []);
                } else {
                    setStudentData([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(studentData);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setStudentData(items);
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setStudentData((prevItems) => {
            const newItems = [...prevItems];
            const movedItem = newItems.splice(oldIndex, 1)[0];
            newItems.splice(newIndex, 0, movedItem);
            return newItems;
        });
    };

    return {
        studentData,
        handleOnDragEnd,
        onSortEnd
    }
}

export default DragHook
