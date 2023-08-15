import React from 'react';

function LoginForm({ handleInputChange, formData, handleSubmit, errorMessage }) {
  return (
    <>
    <input
      onChange={handleInputChange}
      name="identifier"
      type="text"
      value={formData.identifier} 
      placeholder="Enter your email or username"
      className="mb-4 p-2 border rounded w-full"
    />
    <input
      onChange={handleInputChange}
      name="password"
      type="password"
      value={formData.password}
      placeholder="Enter your password"
      className="mb-4 p-2 border rounded w-full"
    />
    <button className="w-full bg-blue-500 text-white rounded py-2" onClick={handleSubmit}>
      Submit
    </button>
    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
  </>
  );
}

export default LoginForm;