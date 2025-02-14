import { useState } from "react";
import { studentsData, departments } from "./data";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2"; 
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
    const [students, setStudents] = useState(studentsData);
    const [editingStudent, setEditingStudent] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const handleSave = (student) => {
        if (!editingStudent) {
            if (students.some(s => s.roll === student.roll)) {
                toast.error("Roll number must be unique!", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
                return;
            }
            setStudents([...students, student]);
            toast.success("Student added successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        } else {
            setStudents(students.map(s => s.roll === editingStudent.roll ? student : s));
            toast.info("✏️ Student details updated!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        }

        setEditingStudent(null);
        setIsAdding(false);
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setIsAdding(true);
    };

    const handleDelete = (roll) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                setStudents(students.filter(s => s.roll !== roll));
                toast.warn("🗑️ Student deleted!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });

                Swal.fire(
                    "Deleted!",
                    "The student has been removed.",
                    "success"
                );
            }
        });
    };

    return (
        <div className="app">
            <ToastContainer />  
            <h1>Student Management</h1>
            
            {isAdding ? (
                <StudentForm
                    onSave={handleSave}
                    onCancel={() => {
                        setEditingStudent(null);
                        setIsAdding(false);
                    }}
                    student={editingStudent}
                    departments={departments}
                />
            ) : (
                <>
                    <button onClick={() => setIsAdding(true)}>Add Student</button>
                    <StudentList students={students} onEdit={handleEdit} onDelete={handleDelete} />
                </>
            )}
        </div>
    );
}

export default App;
