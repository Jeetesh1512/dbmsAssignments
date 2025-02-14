import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    setTitle(`Calculator - ${today}`);
    document.title = `Calculator - ${today}`;
  }, []);

  const handleAddition = () => {
    setResult(Number(num1) + Number(num2));
  };

  const handleDifference = () => {
    setResult(Number(num1) - Number(num2));
  };

  return (
    <div className="container">
      <h1>{title}</h1>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="Enter first number"
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Enter second number"
      />
      <div>
        <button className="add-btn" onClick={handleAddition}>Add</button>
        <button className="subtract-btn" onClick={handleDifference}>Subtract</button>
      </div>
      {result !== null && <div className="result">Result: {result}</div>}
    </div>
  );
}
