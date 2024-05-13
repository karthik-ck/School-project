import React, { useContext } from 'react'

const ExamContext = createContext()

const ExamProvider = ({ children }) => {
    const [examData, setExamData] = useState([])
    return (
        <ExamContext value={{ examData, setExamData }}>
            {children}
        </ExamContext>
    )
}

export default ExamProvider

export const useExam = () => useContext(ExamContext)