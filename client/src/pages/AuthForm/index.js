import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useStore } from '../../store';
import { LOGIN_USER, REGISTER_USER } from './mutations';

function AuthForm() {
  const [loginUser] = useMutation(LOGIN_USER);
  const [registerUser] = useMutation(REGISTER_USER);
  const { dispatch, actions } = useStore();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isLogin: true
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = e => {
    const prop = e.target.name;
    const value = e.target.value;

    if (prop === 'isLogin') {
      return setFormData({
        ...formData,
        isLogin: value === 'login' ? true : false
      });
    }

    setFormData({
      ...formData,
      [prop]: value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Pick the mutation function from useMutation
    const authFunction = formData.isLogin ? loginUser : registerUser;

    try {
      const { data } = await authFunction({
        variables: formData
      });

      dispatch({
        type: actions.UPDATE_USER,
        payload: data.login.user
      });

      setErrorMessage('');
      setFormData({
        username: '',
        email: '',
        password: '',
        isLogin: true
      });

      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-4">
        {formData.isLogin ? 'Log In' : 'Register'}
      </h1>

      <form onSubmit={handleSubmit} className="w-72 bg-white p-6 rounded-lg shadow-md">
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}

        {!formData.isLogin && (
          <input
            onChange={handleInputChange}
            name="username"
            type="text"
            value={formData.username}
            placeholder="Enter your Username"
            className="mb-4 p-2 border rounded w-full"
          />
        )}
        <input
          onChange={handleInputChange}
          name="email"
          type="email"
          value={formData.email}
          placeholder="Enter your email"
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
        <button className="w-full bg-blue-500 text-white rounded py-2">
          Submit
        </button>
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
