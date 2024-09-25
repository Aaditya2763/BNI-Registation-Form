import "./login.css"
import Spinner from 'react-bootstrap/Spinner';
import loginImg from "../../assets/images/demos/loginImg.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginForm = () => {
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
    <div className="">
     <h1 style={{textAlign:"center",paddingTop:"50px"}}>Registration Form</h1>
      <div className="form" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="shape1"></div>
        <div className="shape2"></div>
       
        <div className="form_wrapper"  >
          <div className="row" style={{display:'flex', justifyContent:'center', alignItems:'center',margin:"200px auto"}} >

          <img src={loginImg} alt="" className="form__img col-sm-6" />
          <form action="" className="form__content col-sm-6" onSubmit={handleSubmit}>
            <h1 className="form__title" style={{ fontSize: '1.5rem', fontWeight: '700' }}>Welcome to BNI</h1>
            <div className="form__div form__div-one">
              <div className="form__icon">
                <i class='bx bx-envelope'></i>
              </div>
              <div className="form__div-input">
              {error && <p className="text-danger">{error}</p>}
                <input type="email" className="form__input" placeholder="Enter your email"  id="emailAddress"
                                  value={email}
                                  disabled={loading}
                                  onChange={handleInputChange} />
              </div>
            </div>
            <button
              className="form__button"
              type="submit"
              style={{ backgroundColor: "rgb(192, 23, 23)" }}
              disabled={loading} // Optional: Disable the button while loading
            >
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden"></span>
                </Spinner>
              ) : (
                "Login"
              )}
            </button>
            <p className="text-2 text-muted mb-0 text-center">
                              Copyright © 2024 <a href="http://bni.com" target='_blank' className='text-danger'>BNI</a>. All Rights Reserved.
                            </p>
          </form>
          
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;
