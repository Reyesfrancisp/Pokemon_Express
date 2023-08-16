import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthForm(props) {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    identifier: '',
    password: '',
    confirmPassword: '',
    isLogin: true
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = e => {
    const prop = e.target.name;
    const value = e.target.value;

    if (prop === 'isLogin') {
      setFormData({
        ...formData,
        isLogin: value === 'login' ? true : false
      });
    } else {
      setFormData({
        ...formData,
        [prop]: value
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.isLogin && formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    let url = '/login';  // Default to login endpoint

    if (!formData.isLogin) {
      url = '/register';  // Change to register endpoint if not logging in
    }

    try {
      const res = await axios.post(url, formData);

      props.setState((oldState) => {
        return {
          ...oldState,
          user: res.data.user
        }
      });
      setErrorMessage('');
      setFormData({
        email: '',
        username: '',
        identifier: '',
        password: '',
        confirmPassword: '',
        isLogin: true
      });

      // Redirect to team
      navigate('/teams');
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-4">
        {formData.isLogin ? 'Log In' : 'Register'}
      </h1>

      <form className="w-72 bg-white p-6 rounded-lg shadow-md">
        {formData.isLogin ? (
          <LoginForm
            handleInputChange={handleInputChange}
            formData={formData}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
          />
        ) : (
          <RegisterForm
            handleInputChange={handleInputChange}
            formData={formData}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
          />
        )}

        <div className="flex items-center mt-4 justify-center ">
          <label htmlFor="login" className="mr-2 ">
            Login
          </label>
          <input
            name="isLogin"
            onChange={handleInputChange}
            type="radio"
            id="login"
            value="login"
            checked={formData.isLogin}
            className="mr-2"
          />
          <label htmlFor="register">
            Register
          </label>
          <input
            name="isLogin"
            onChange={handleInputChange}
            type="radio"
            id="register"
            value="register"
            checked={!formData.isLogin}
            className="ml-2"
          />
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
