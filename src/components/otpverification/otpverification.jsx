import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const maskEmail = (email) => {
  if (email) {
    const [localPart, domainPart] = email.split('@');
    if (localPart.length <= 7) return email;

    const firstPart = localPart.substring(0, 4);
    const lastPart = localPart.substring(localPart.length - 3);
    return `${firstPart}****${lastPart}@${domainPart}`;
  }
};

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [resendLoading, setResendLoading] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const otpId = queryParams.get('id');
  const navigate = useNavigate();

  useEffect(() => {
    if (!otpId) {
      navigate("/");
    }
    if (initialLoad && otpId) {
      setInitialLoad(false);

      const checkOtpStatus = async (id) => {
        try {
          const response = await axios.get(`http://localhost:5000/api/otpStatus/${id}`);
          if (response.data.success) {
            setEmail(response.data.email);
            toast.success("OTP sent successfully");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error('Error checking OTP status:', error);
          toast.error('An error occurred while checking OTP status.');
        }
      };

      checkOtpStatus(otpId);
    }
  }, [otpId]);

  useEffect(() => {
    // Cleanup interval on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 4) {
      toast.error('Please enter a valid OTP.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', { otp: otpCode, id: otpId });
      if (response.data.success) {
        toast.success('OTP verified successfully');
        // Handle successful OTP verification (e.g., redirect to another page)
        window.location.href = response.data.redirectUrl;
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async (id) => {
    setResendLoading(true);
    setCanResend(false);
    setTimer(15); // Set the timer to 15 seconds

    try {
      const response = await axios.post(`http://localhost:5000/api/resend-otp/`, { id });
      if (response.data.success) {
        toast.success("OTP sent successfully");
       
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error('An error occurred while checking OTP status.');
    } finally {
      // Start the countdown
      const id = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(id);
            setCanResend(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      setIntervalId(id);
      setResendLoading(false);
    }
  };

  return (
    <div id="main-wrapper" className="oxyy-login-register">
      <ToastContainer />
      <div className="shape1"></div>
      <div className="shape2"></div>
      <div className="container-fluid px-0">
        <div className="row g-0 min-vh-100">
          {/* Welcome Text */}
          <div className="col-md-5">
            <div className="hero-wrap h-100">
              <div className="hero-mask " style={{ backgroundColor: "#e5a79a" }}></div>
              <div className="hero-content w-100">
                <div className="container d-flex flex-column min-vh-100">
                  <div className="row g-0">
                    <div className="col-11 col-md-10 col-lg-9 mx-auto">
                      <div className="logo mt-5 mb-5 mb-md-0">
                        <a className="d-flex" href="/" title="Oxyy">
                          <img src="../src/assets/images/logo-light.jpeg" alt="Oxyy" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row g-0 my-auto">
                    <div className="col-11 col-md-10 col-lg-9 mx-auto">
                      <p className="text-4 lh-base">We are glad to see you again!</p>
                      <h1 className="text-9 fw-600 mb-5">Connect with industry leaders and fellow creatives to expand your network and unlock new opportunities for your business</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Welcome Text End */}

          {/* OTP Form */}
          <div className="col-md-7 d-flex flex-column">
            <div className="container my-auto py-5">
              <div className="row g-0">
                <div className="col-11 col-md-10 col-lg-9 col-xl-8 mx-auto">
                  <h3 className="fw-600 mb-4">Email Verification</h3>
                  <p className="text-center">
                    <img className="img-fluid" src="../src/assets/images/otp-icon.png" alt="verification" />
                  </p>
                  <p className="text-muted mb-4">
                    Please enter the OTP (one-time password) to verify your account. A code has been sent to <span className="text-dark text-4">{maskEmail(email)}</span>
                  </p>
                  <form id="otp-screen" onSubmit={handleSubmit}>
                    <label className="form-label fw-500">Enter 4 digit code</label>
                    <div className="row g-3">
                      {otp.map((digit, index) => (
                        <div className="col" key={index}>
                          <input
                            type="text"
                            className="form-control bg-light border-light text-center text-6 py-2"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            autoComplete="off"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="row mt-3 align-items-center">
                      <div className="col">
                        <button className="btn btn-danger shadow-none my-2" type="submit" disabled={loading}>
                          {loading ? 'Verifying...' : 'Verify'}
                        </button>
                      </div>
                      <div className="col">
                        <p className="text-end text-2 mb-0">
                          {canResend ? (
                            <a onClick={() => resendOTP(otpId)} className="text-danger">
                              {resendLoading ? "Please wait..." : "Resend it"}
                            </a>
                          ) : (
                            <span className="text-muted">{resendLoading ? "Please wait..." : `Resend OTP in ${timer} seconds`}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* OTP Form End */}
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
