import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import "../styles/StudentList.css";
import { departments } from "../data"; // Assuming departments is imported

function StudentList({ students, onEdit, onDelete }) {
  const [searchRoll, setSearchRoll] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDept, setSelectedDept] = useState(""); // New state for department filter
  const studentsPerPage = 5;

  // Filter students by department
  const filteredStudents = selectedDept
    ? students.filter((student) => student.deptCode === selectedDept)
    : students;

  // Calculate total pages based on filtered students
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Get students for the current page
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const handleSearch = () => {
    const student = students.find((s) => s.roll === searchRoll.trim());
    if (student) {
      setSearchResult(student);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  const handleCloseSearch = () => {
    setSearchResult(null);
    setNotFound(false);
    setSearchRoll(""); // Clear input field
  };

  const handleDeptChange = (event) => {
    setSelectedDept(event.target.value);
    setCurrentPage(1); // Reset to first page whenever department is changed
  };

  return (
    <div className="student-list-container">
      <div className="student-list">
        <h2>Student Records</h2>

        {/* Department Filter Dropdown */}
        <div className="department-filter">
          <select onChange={handleDeptChange} value={selectedDept}>
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.code} value={dept.code}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter Roll Number to search"
            value={searchRoll}
            onChange={(e) => setSearchRoll(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Search Result */}
        {searchResult && (
          <div className="search-result">
            <h3>Search Result</h3>
            <p>
              <strong>Roll:</strong> {searchResult.roll}
            </p>
            <p>
              <strong>Name:</strong> {searchResult.name}
            </p>
            <p>
              <strong>Department:</strong> {searchResult.deptCode}
            </p>
            <p>
              <strong>Address:</strong> {searchResult.address}
            </p>
            <p>
              <strong>Phone:</strong> {searchResult.phone}
            </p>
            <button className="close-search" onClick={handleCloseSearch}>
              Close
            </button>
          </div>
        )}
        {notFound && (
          <p style={{ color: "red", textAlign: "center" }}>Student not found</p>
        )}

        {/* Student Table */}
        {filteredStudents.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>Roll</th>
                <th>Name</th>
                <th>Dept</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.roll}>
                  <td>{student.roll}</td>
                  <td>{student.name}</td>
                  <td>{student.deptCode}</td>
                  <td>{student.address}</td>
                  <td>{student.phone}</td>
                  <td>
                    <button onClick={() => onEdit(student)}>Edit</button>
                    <button onClick={() => onDelete(student.roll)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination Buttons */}
        <div className="list-buttons">
          <button
            className="prev"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </button>
          <span>
            {" "}
            Page {currentPage} of {totalPages}{" "}
          </span>
          <button
            className="next"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
