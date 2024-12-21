import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Inputs() {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    age: '',
    occupation: '',
    physicalActivity: 'Medium',
    sleepHours: '',
    qualityOfSleep: 'Fair',
    stressLevel: 'Medium',
    height: '',
    weight: '',
    systolic: '',
    diastolic: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the report page with input data
    router.push('/report');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Health Inputs</h1>
      <form onSubmit={handleSubmit}>
        <input name="age" placeholder="Age" value={inputs.age} onChange={handleChange} required />
        <br />
        <input name="occupation" placeholder="Occupation" value={inputs.occupation} onChange={handleChange} required />
        <br />
        <select name="physicalActivity" value={inputs.physicalActivity} onChange={handleChange}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <br />
        <input name="sleepHours" placeholder="Sleep Hours" value={inputs.sleepHours} onChange={handleChange} required />
        <br />
        <select name="qualityOfSleep" value={inputs.qualityOfSleep} onChange={handleChange}>
          <option>Excellent</option>
          <option>Good</option>
          <option>Fair</option>
          <option>Poor</option>
        </select>
        <br />
        <select name="stressLevel" value={inputs.stressLevel} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <br />
        <input name="height" placeholder="Height (cm)" value={inputs.height} onChange={handleChange} required />
        <br />
        <input name="weight" placeholder="Weight (kg)" value={inputs.weight} onChange={handleChange} required />
        <br />
        <input name="systolic" placeholder="Systolic BP" value={inputs.systolic} onChange={handleChange} required />
        <br />
        <input name="diastolic" placeholder="Diastolic BP" value={inputs.diastolic} onChange={handleChange} required />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
