import React, { useState, useEffect } from "react";
import StudentCard from "./components/StudentCard";
import "./App.css";

function App()
{
    const [students, setStudents] = useState(() =>
    {
        const saved = localStorage.getItem("students");
        return saved ? JSON.parse(saved) : [
            { id: 1, name: "Siva Kumar", department: "CSE", marks: 92 },
            { id: 2, name: "Rahul", department: "ECE", marks: 85 }
        ];
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    const [newStudent, setNewStudent] = useState({
        name: "",
        department: "",
        marks: ""
    });

    const [editId, setEditId] = useState(null);

    useEffect(() =>
    {
        localStorage.setItem("students", JSON.stringify(students));
    }, [students]);

    function handleInputChange(event)
    {
        setNewStudent({
            ...newStudent,
            [event.target.name]: event.target.value
        });
    }

    function addOrUpdateStudent()
    {
        if (!newStudent.name || !newStudent.department || !newStudent.marks)
        {
            alert("Please fill all fields");
            return;
        }

        if (newStudent.marks < 0 || newStudent.marks > 100)
        {
            alert("Marks should be between 0 and 100");
            return;
        }

        if (editId !== null)
        {
            setStudents(students.map(student =>
                student.id === editId
                    ? { ...student, ...newStudent, marks: Number(newStudent.marks) }
                    : student
            ));
            setEditId(null);
        }
        else
        {
            const newEntry =
            {
                id: Date.now(),
                ...newStudent,
                marks: Number(newStudent.marks)
            };

            setStudents([...students, newEntry]);
        }

        setNewStudent({ name: "", department: "", marks: "" });
    }

    function deleteStudent(id)
    {
        setStudents(students.filter(student => student.id !== id));
    }

    function editStudent(student)
    {
        setNewStudent({
            name: student.name,
            department: student.department,
            marks: student.marks
        });
        setEditId(student.id);
    }

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
    <div className="app">

        <div className={darkMode ? "container dark" : "container"}>

            <h1>🎓 Student Dashboard</h1>

            <div className="top-bar">
                <button
                    className="toggle"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
                </button>

                <input
                    type="text"
                    placeholder="Search student..."
                    className="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="form">
                <input type="text" name="name" placeholder="Name"
                    value={newStudent.name} onChange={handleInputChange} />

                <input type="text" name="department" placeholder="Department"
                    value={newStudent.department} onChange={handleInputChange} />

                <input type="number" name="marks" placeholder="Marks"
                    value={newStudent.marks} onChange={handleInputChange} />

                <button onClick={addOrUpdateStudent}>
                    {editId ? "Update" : "Add"}
                </button>
            </div>

            <div className="card-container">
                {
                    filteredStudents.map(student => (
                        <StudentCard
                            key={student.id}
                            student={student}
                            onDelete={deleteStudent}
                            onEdit={editStudent}
                        />
                    ))
                }
            </div>

        </div>

        {/* ✅ Footer OUTSIDE container */}
        <div className="fixed-footer">
            © 2026 Rajavarapu Siva Kumar. All Rights Reserved.
        </div>

    </div>
);
}

export default App;