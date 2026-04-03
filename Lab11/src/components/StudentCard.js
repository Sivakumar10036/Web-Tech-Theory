import React from "react";
import "./StudentCard.css";

function StudentCard({ student, onDelete, onEdit })
{
    function getGrade()
    {
        if (student.marks >= 90) return "A";
        else if (student.marks >= 75) return "B";
        else return "C";
    }

    return (
        <div className="card">
            <h2>{student.name}</h2>
            <p>{student.department}</p>
            <p>Marks: {student.marks}</p>

            <span className={`grade grade-${getGrade()}`}>
                Grade: {getGrade()}
            </span>

            <div className="actions">
                <button onClick={() => onEdit(student)}>✏️</button>
                <button onClick={() => onDelete(student.id)}>❌</button>
            </div>
            
        </div>
    );
}

export default StudentCard;