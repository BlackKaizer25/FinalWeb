import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const handleSignIn = (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setErrorMessage('Please type your username and password.');
            return;
        }

        setErrorMessage('');
        navigate('/accounts');
    };

    return (
        <div className="login-container">
  <div className="login-box">
    {/* Centered Form Section */}
    <div className="form-section">
      <img
        src={require('../assets/Exploredamilag.png')}
        alt="Explore Damilag Logo"
        className="image-logo"
      />
      <h2>Sign In</h2>
      <p>Please sign in to continue</p>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Username"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Enter your username"
        />
        <div className="password-container">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Enter your password"
          />
          <span
            className="password-toggle"
            onClick={togglePasswordVisibility}
            role="button"
            aria-label="Toggle password visibility"
          >
            {passwordVisible ? 'HIDE' : 'SHOW'}
          </span>
        </div>
        <div className="options-container">
          <label className="remember-me">
            <input type="checkbox" aria-label="Remember me" /> Remember me
          </label>
          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>
        </div>
        <button type="submit" className="sign-in-button">
          Sign in
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  </div>
</div>


    );
};

export default Login;
