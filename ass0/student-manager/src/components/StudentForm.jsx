import { useState } from "react";
import "../styles/StudentForm.css";

function StudentForm({ onSave, onCancel, student, departments }) {
  const [formData, setFormData] = useState(
    student || { roll: "", name: "", address: "", phone: "", deptCode: "" }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <label htmlFor="roll">Roll Number:</label>
        <input
          type="text"
          id="roll"
          name="roll"
          placeholder="Enter The Roll"
          value={formData.roll}
          onChange={handleChange}
          pattern="[0-9]+" 
          minLength="1"
          maxLength="12"
          title="Enter only digit of maximum length of 12 characters"
          required
          disabled={!!student} 
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter The Name"
          value={formData.name}
          onChange={handleChange}
          pattern="^[A-Za-z ]+$" 
          minLength="2"
          maxLength="50"
          required
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter The Address"
          value={formData.address}
          onChange={handleChange}
          minLength="3"
          maxLength="100"
          required
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Enter The Phone Number"
          value={formData.phone}
          onChange={handleChange}
          pattern="[0-9]{10}"
          minLength="10"
          maxLength="10"
          title="Phone number must be exact 10 digits"
          required
        />

        <label>Department:</label>
        <select
          name="deptCode"
          value={formData.deptCode}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.code} value={dept.code}>
              {dept.name}
            </option>
          ))}
        </select>

        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
