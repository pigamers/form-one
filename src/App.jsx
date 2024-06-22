// src/App.js

import { useState } from 'react';

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!values.name) tempErrors.name = 'Name is required';
    if (!values.email) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(values.email)) tempErrors.email = 'Email is invalid';
    if (!values.age) tempErrors.age = 'Age is required';
    else if (values.age <= 0) tempErrors.age = 'Age must be greater than 0';
    if (values.attendingWithGuest === 'Yes' && !values.guestName) tempErrors.guestName = 'Guest Name is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  return {
    values,
    errors,
    handleChange,
    validate
  };
};

const EventRegistrationForm = () => {
  const initialState = {
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: ''
  };

  const { values, errors, handleChange, validate } = useForm(initialState);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(values);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Event Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Age</label>
            <input
              type="text"
              inputMode='numeric'
              name="age"
              value={values.age}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Are you attending with a guest?</label>
            <select
              name="attendingWithGuest"
              value={values.attendingWithGuest}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          {values.attendingWithGuest === 'Yes' && (
            <div>
              <label className="block text-gray-700">Guest Name</label>
              <input
                type="text"
                name="guestName"
                value={values.guestName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
              {errors.guestName && <p className="text-red-500 text-sm">{errors.guestName}</p>}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          >
            Submit
          </button>
        </form>
        {submittedData && (
          <div className="mt-4 p-4 bg-green-100 rounded">
            <h3 className="text-lg font-bold mb-2">Submission Summary:</h3>
            <p>Name: {submittedData.name}</p>
            <p>Email: {submittedData.email}</p>
            <p>Age: {submittedData.age}</p>
            <p>Attending with Guest: {submittedData.attendingWithGuest}</p>
            {submittedData.attendingWithGuest === 'Yes' && (
              <p>Guest Name: {submittedData.guestName}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventRegistrationForm;
