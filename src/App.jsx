

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import EmailVerification from './components/emailverification.jsx/emailverification'
import OtpVerification from './components/otpverification/otpverification.jsx'
import RegisterationSuccess from './components/registrationpage/registerationSuccess.jsx'
import RegisterationForm from './components/registerationForm/RegistartionForm.jsx'  
import CustomStepper from './components/multistepForm/multiform.jsx'
import LoginForm from './components/emailverification.jsx/login.jsx'
import Test from './components/test/Test'



function App() {


  return (
   
      <Router>
      <Routes>
        <Route path="/" element={<RegisterationForm />} />
        <Route path="/verify-otp" element={<OtpVerification/>} />
        <Route path="/registeration-form" element={<RegisterationForm />} />
        <Route path="/registeration-success" element={<RegisterationSuccess/>} />
        <Route path="/login" element={<LoginForm />} />
       
      </Routes>
    </Router>
   
  )
}


export default App



