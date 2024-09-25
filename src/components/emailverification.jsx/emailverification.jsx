import React, { useState, Fragment } from 'react';
import loginBg from '../../assets/images/login-bg-4.jpg'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setError(''); // Clear error message when user starts typing
  };

  // Validate email
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required.');
      toast.error("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email format.');
      toast.error("Invalid email format.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/generate-otp`, { email });
      console.log(response)
      if (response.data.success) {
        // Redirect to the URL provided by the server
        window.location.href = response.data.redirectUrl;
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error('Error during form submission:', err);
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <div id="main-wrapper" className="oxyy-login-register">
        <div className="hero-wrap">
          <div className="hero-mask opacity-8 bg-dark"></div>
          <div
            className="hero-bg hero-bg-scroll"
            style={{ backgroundImage: `url(${loginBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></div>
          <div className="hero-content w-100">
            <div className="container">
              <div className="row g-0">
                <div className="col-lg-11 col-xl-9 mx-auto">
                  <div className="row g-0 min-vh-100">
                    {/* Welcome Text */}
                    <div className="col-md-6">
                      <div className="hero-wrap h-100">
                        <div className="hero-mask opacity-3 bg-danger"></div>
                        <div
                          className="hero-bg hero-bg-scroll"
                          style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
                        ></div>
                        <div className="hero-content w-100 min-vh-100 d-flex flex-column">
                          <div className="row g-0">
                            <div className="col-10 col-lg-9 mx-auto">
                              <div className="logo mt-5 mb-5 mb-md-0">
                                <a className="d-flex" href="/" title="Oxyy">
                                  <img src="../src/assets/images/logo-light.png" alt="Oxyy" />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="row g-0 my-auto">
                            <div className="col-10 col-lg-9 mx-auto">
                              <h1 className="text-10 text-white fw-700 text-uppercase mb-4">
                                Don't worry, We are here to help you recover your password.
                              </h1>
                              <p className="text-white fw-300 lh-base mb-5">
                                Get access to your Orders, Wishlist, and Recommendations.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Welcome Text End */}

                    {/* Forgot Password Form */}
                    <div className="col-md-6 d-flex flex-column bg-light shadow-lg">
                      <div className="my-auto py-5">
                        <div className="row g-0">
                          <div className="col-10 col-lg-9 mx-auto">
                            <h3 className="text-6 fw-600">Email Verification</h3>
                            <p className="text-2 mb-5">
                              Enter the email address or mobile number associated with your account.
                            </p>
                            <form id="forgotForm" className="form-border" onSubmit={handleSubmit}>
                              <div className="icon-group icon-group-end mb-3">
                                <input
                                  type="text"
                                  className="form-control border-dark"
                                  id="emailAddress"
                                  value={email}
                                  onChange={handleInputChange}
                                  required
                                  placeholder="Enter Email"
                                />
                                <span className="icon-inside">
                                  <i className="fas fa-envelope"></i>
                                </span>
                              </div>
                              {error && <p className="text-danger">{error}</p>}
                              <button className="btn btn-danger rounded-0 my-3" type="submit" disabled={loading}>
                                {loading ? 'Submitting...' : 'Continue'}
                              </button>
                            </form>
                            <p className="text-2 mt-3">
                              {/* <a href="/" className='text-danger'>Return to Log In</a> */}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 pb-3">
                        <div className="row">
                          <div className="col-10 col-lg-9 mx-auto">
                            <p className="text-2 text-muted mb-0">
                              Copyright © 2024 <a href="http://bni.com" target='_blank' className='text-danger'>BNI</a>. All Rights Reserved.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Forgot Password Form End */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EmailVerification;
