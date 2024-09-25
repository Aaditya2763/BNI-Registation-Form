  import React, { useState, useEffect } from "react";
  import { Form, Row, Col, Button } from "react-bootstrap";
  import Spinner from "react-bootstrap/Spinner";
  import { useLocation, useNavigate } from "react-router-dom";
  import axios from "axios";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import logo from "../../assets/images/logo-light.jpeg";
  import Loader from "../loader/loader";
  import { CheckBox } from "@mui/icons-material";
  
  const RegistrationForm = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [formSunmitted, setFormSubmitted] = useState(false);
    const location = useLocation();
    const [initialLoad, setInitialLoad] = useState(true);
    const queryParams = new URLSearchParams(location.search);
    const otpId = queryParams.get("id");
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isGst,setisGst]=useState(false);

    useEffect(() => {
    
      if (initialLoad && otpId) {
        setInitialLoad(false);

        const getMemberData = async (id) => {
          try {
            setLoading(true);
            const response = await axios.get(
              `http://localhost:5000/api/getmemberdata/${id}`
            );
            if (response.data.success) {
              setData(response.data.data);
              setFormData({
                firstName: response.data.data.firstName || "",
                lastName: response.data.data.lastName || "",
                dob: response.data.data.dob
                  ? new Date(response.data.data.dob).toISOString().split("T")[0]
                  : "",
                phoneNumber: response.data.data.phoneNumber || "",
                altPhoneNumber: response.data.data.altPhoneNumber || "",
                addressArea: response.data.data.addressArea || "",
                addressState: response.data.data.addressState || "",
                addressCity: response.data.data.addressCity || "",
                addressPincode: response.data.data.addressPincode || "",
                companyAddressArea: response.data.data.companyAddressArea || "",
                companyAddressState: response.data.data.companyAddressState || "",
                companyAddressCity: response.data.data.companyAddressCity || "",
                companyAddressPincode:
                  response.data.data.companyAddressPincode || "",
                  altEmailAddress: response.data.data.altEmailAddress || "",
                companyArea: response.data.data.companyArea || "",
                gstNumber: response.data.data.gstNumber || "",
                companyCategory: response.data.data.companyCategory || "",
                companySubCategory: response.data.data.companySubCategory || "",
                chapterName: response.data.data.chapterName || "",
                accolades: response.data.data.accolades || [],
                inductionDate: response.data.data.inductionDate
                  ? new Date(response.data.data.inductionDate)
                    .toISOString()
                    .split("T")[0]
                  : "",
                region: response.data.data.region || "",
                membershipTimePeriod: response.data.data.membershipTimePeriod || "",
                renewalDate: response.data.data.renewalDate? new Date(response.data.data.renewalDate)
                .toISOString()
                .split("T")[0]
              : "",
              renewableDueDate:response.data.data.renewableDueDate? new Date(response.data.data.renewalDate)
              .toISOString()
              .split("T")[0]
            : "",
              lastRenewableDate: response.data.data.lastRenewableDate? new Date(response.data.data.renewalDate)
              .toISOString()
              .split("T")[0]
            : "",
              });
            }
            setLoading(false);
          } catch (error) {
            setLoading(false);
            return;
          }
        };

        getMemberData(otpId);
      }
    }, [otpId]);

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      dob: "",
      phoneNumber: "",
      altPhoneNumber: "",
      altEmailAddress: "",
      addressArea: "",
      addressState: "",
      addressCity: "",
      addressPincode: "",
      companyAddressArea: "",
      companyAddressState: "",
      companyAddressCity: "",
      companyAddressPincode: "",
      companyArea: "",
      gstNumber: "",
      companyCategory: "",
      companySubCategory: "",
      chapterName: "",
      accolades: [],
      inductionDate: "",
      region: "",
      membershipTimePeriod: "",
      renewalDate: "",
      renewableDueDate: "",
      lastRenewableDate: "",
      setRenewableDate: "",
    });

    console.log(formData.renewalDate)
    const [errors, setErrors] = useState({});

    const chapters = {
      West: [
        "Amigos",
        "BNI Capital",
        "BNI Elixir",
        "BNI Fantom",
        "BNI Iconic",
        "BNI Impulse",
        "BNI Nexus",
        "BNI Opulence",
        "BNI UNO",
        "Impetus",
        "Zeal",
        "Javelin",
        "Prolific",
        "Revenue",
      ],
      East: ["BNI Game Changers", "Dynamo", "Quantum"],
      North: ["BNI Triumph", "Marvel", "Kinetic", "Stellar"],
      South: [
        "Airavat",
        "Athena",
        "Daire",
        "Ede",
        "Elegant",
        "Empezar",
        "Equipo",
        "Exuberance",
        "Krieger",
        "Magnanimous",
        "Mintage",
        "Nucleus",
        "Ocy",
        "Ulti-Mates",
      ],
    };

    const showCompanyDataHandler=()=>{
      setisGst(!isGst)
    }

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
    
      if (name === "membershipTimePeriod") {
        const paymentDate = new Date(); // Use the current date as payment date
        const { renewalDate, renewableDueDate, lastRenewableDate, setRenewableDate } = calculateDates(value, formData.inductionDate);
        setFormData({
          ...formData,
          [name]: value,
          renewalDate,
          renewableDueDate,
          lastRenewableDate,
          setRenewableDate,
        });
      } else {
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      }
    };
    

    const handleUpdate = async (req, res) => {
      if (!validate()) return;
      try {
        const response = await axios.put(
          `http://localhost:5000/api/updatememberdata/${otpId}`,
          formData
        );
        if (response.data.success) {
          toast.success("Data updated successfully");
          // navigate("/registeration-success");
        }
        // console.log(response)
      } catch (error) {
        toast.error("Something went wrong try again");
        console.error(error);
      }
    };
    const handleRegionChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
        chapterName: "", // Reset chapter name when region changes
      });
    };

    const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        accolades: checked
          ? [...prevData.accolades, value]
          : prevData.accolades.filter((item) => item !== value),
      }));
    };

    const validate = () => {
      const newErrors = {};
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.dob) newErrors.dob = "Date of Birth is required";
      if (!formData.phoneNumber)
        newErrors.phoneNumber = "Phone number is required";
      if (!formData.addressArea)
        newErrors.addressArea = "Address area is required";
      if (!formData.addressState)
        newErrors.addressState = "Address state is required";
      if (!formData.addressCity)
        newErrors.addressCity = "Address city is required";
      if (!formData.addressPincode)
        newErrors.addressPincode = "Address pincode is required";
      if (!formData.companyAddressArea)
        newErrors.companyAddressArea = "Company address area is required";
      if (!formData.companyAddressState)
        newErrors.companyAddressState = "Company address state is required";
      if (!formData.companyAddressCity)
        newErrors.companyAddressCity = "Company address city is required";
      if (!formData.companyAddressPincode)
        newErrors.companyAddressPincode = "Company address pincode is required";
      if (!formData.companyArea)
        newErrors.companyArea = "Company area is required";
      if (!formData.gstNumber) newErrors.gstNumber = "GST number is required";
      if (!formData.companyCategory)
        newErrors.companyCategory = "Company category is required";
      if (!formData.companySubCategory)
        newErrors.companySubCategory = "Company sub-category is required";
      if (!formData.chapterName)
        newErrors.chapterName = "Chapter name is required";
      if (formData.accolades.length === 0)
        newErrors.accolades = "At least one accolade must be selected";
      if (!formData.inductionDate)
        newErrors.inductionDate = "Induction date is required";
      if (!formData.region) newErrors.region = "Region is required";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    const getpincode = async (pin) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/getpincodedata",
          {
            pincode: pin,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data; // Return the response data from the server
      } catch (error) {
        console.error("Error in getpincode function:", error);
        throw error; // Re-throw the error to be caught by the caller
      }
    };
    
    // Function to handle pincode validation and data fetching
    const handlePincodeValidation = async () => {
      if (formData.addressPincode.length === 6) {
       
    
        try {
          const res = await getpincode(formData.addressPincode); // Await the result of getpincode
          
          const { city, state } = res.pindata[0];
          if (res.success) {
            setFormData((prevData) => ({
              ...prevData,
              addressCity: city, // Assuming 'city' is part of the data returned
              addressState:state
            }));
            return;
          } else {
            toast.error("Something went wrong, try again");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("An error occurred while fetching data");
        }
      }
    };

    const handlePincodeValidation2 = async () => {
      if (formData.companyAddressPincode.length === 6) {
       
    
        try {
          const res = await getpincode(formData.companyAddressPincode); // Await the result of getpincode
          
          const { city, state } = res.pindata[0];
          if (res.success) {
            setFormData((prevData) => ({
              ...prevData,
              companyAddressCity: city, // Assuming 'city' is part of the data returned
              companyAddressState:state
             
            }));
            return;
          } else {
            toast.error("Something went wrong, try again");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          // toast.error("An error occurred while fetching data");
        }
      }
    };
    
    // Call the handlePincodeValidation function
    handlePincodeValidation();
    // handlePincodeValidation2();
    const calculateDates = (membershipTimePeriod, inductionDate)=> {
      const today = new Date(inductionDate);
      let renewalDate = today;
      let renewableDueDate = "";
      let lastRenewableDate = "";
      let setRenewableDate = "";
    
      switch (membershipTimePeriod) {
        case "1":
          renewalDate.setFullYear(today. getFullYear() + 1);
          break;
        case "2":
          renewalDate.setFullYear(today. getFullYear() + 2);
          break;
        case "5":
          renewalDate.setFullYear(today. getFullYear() + 5);
          break;
        default:
          return { renewalDate: "", renewableDueDate: "", lastRenewableDate: "", setRenewableDate: "" };
      }
    
      if (today. getDate() <= 15) {
        renewalDate.setMonth(today. getMonth());
        lastRenewableDate.setData(1)
        
        renewalDate.setDate(1)
      } 
      if(today. getDate()> 15) {
        renewalDate.setMonth(today. getMonth() + 1);
        
        renewalDate.setDate(1)
      }
    
      renewableDueDate = new Date(renewalDate);
      renewableDueDate.setDate(renewableDueDate.getDate() + 30);
      lastRenewableDate = new Date(renewalDate);
      lastRenewableDate.setDate(lastRenewableDate.getDate() - 60);
      setRenewableDate = new Date(renewalDate);
      setRenewableDate.setDate(setRenewableDate.getDate() - 60);
    
      return {
        renewalDate: renewalDate.toISOString().split("T")[0],
        renewableDueDate: renewableDueDate.toISOString().split("T")[0],
        lastRenewableDate: lastRenewableDate.toISOString().split("T")[0],
        setRenewableDate: setRenewableDate.toISOString().split("T")[0],
      };
    };
    
    
    const handleSubmit = async (e) => {
      try {
        setFormSubmitted(true);
        e.preventDefault();
        if (validate()) {
          const res = await axios.post(
            `http://localhost:5000/api/memberData/${otpId}`,
            formData
          );
          if (res.data.success) {
            toast.success("Data Submitted successfully");
          }
        }
        setFormSubmitted(false);
      } catch (error) {
        setFormSubmitted(false);
        toast.error("Something went wrong try again");
        return;
      }
    };

    return (
      <>
        <ToastContainer />
      
        <div className="container mt-5 bg-light border p-5">
          <div className="text-center">

          
          <img
            src={logo}
            alt="Logo"
            className="logo"
            style={{ width: "300px", height: "100px", margin: "20px 40px", textAlign:"center" }}
          />

</div>

          {!loading && (
            <h3 style={{ textAlign: "center", paddingBottom: "50px" }}>
              BNI Member Details
            </h3>
          )}

  <div style={{marginBottom: "20px",textAlign:"center",fontSize:"1.5rem", fontWeight:"600"}}>Basic Details</div>
          <Form onSubmit={handleSubmit}>
          
            <Row className="mb-3">
              <Col xs={12} sm={6}>
                <Form.Group controlId="firstName">
                  <Form.Label  className="form-label-highlight" style={{fontWeight:"500"}}>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} sm={6}>
                <Form.Group controlId="lastName">
                  <Form.Label style={{fontWeight:"500"}}>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} sm={6}>
                <Form.Group controlId="dob">
                  <Form.Label style={{fontWeight:"500"}}>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    isInvalid={!!errors.dob}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dob}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} sm={6}>
                <Form.Group controlId="phoneNumber">
                  <Form.Label style={{fontWeight:"500"}}>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.phoneNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} sm={6}>
                <Form.Group controlId="altPhoneNumber">
                  <Form.Label style={{fontWeight:"500"}}>Alternative Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="altPhoneNumber"
                    placeholder="Enter alternative phone number"
                    value={formData.altPhoneNumber}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={6}>
                <Form.Group controlId="altEmailAddress">
                  <Form.Label style={{fontWeight:"500"}}>Alternative Email Address</Form.Label>
                  <Form.Control
                    type="mail"
                    name="altEmailAddress"
                    placeholder="Enter alternative phone number"
                    value={formData.altEmailAddress}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>


            </Row>
            

            <Row className="mb-3">

            <Col xs={12} sm={3}>
                <Form.Group controlId="addressPincode">
                  <Form.Label style={{fontWeight:"500"}}>Address - Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    name="addressPincode"
                    placeholder="Enter pincode"
                    value={formData.addressPincode}
                    onChange={handleChange}
                    isInvalid={!!errors.addressPincode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.addressPincode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} sm={3}>
                <Form.Group controlId="addressArea">
                  <Form.Label style={{fontWeight:"500"}}>Address - Area</Form.Label>
                  <Form.Control
                    type="text"
                    name="addressArea"
                    placeholder="Enter area"
                    value={formData.addressArea}
                    onChange={handleChange}
                    isInvalid={!!errors.addressArea}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.addressArea}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            

              <Col xs={12} sm={3}>
                <Form.Group controlId="addressState">
                  <Form.Label style={{fontWeight:"500"}}>Address - State</Form.Label>
                  <Form.Control
                    type="text"
                    name="addressState"
                    placeholder="Enter state"
                    value={formData.addressState}
                    onChange={handleChange}
                    isInvalid={!!errors.addressState}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.addressState}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} sm={3}>
                <Form.Group controlId="addressCity">
                  <Form.Label style={{fontWeight:"500"}}>Address - City</Form.Label>
                  <Form.Control
                    type="text"
                    name="addressCity"
                    placeholder="Enter city"
                    value={formData.addressCity}
                    onChange={handleChange}
                    isInvalid={!!errors.addressCity}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.addressCity}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

      
            </Row>

            <div style={{marginBottom: "20px",marginTop:"20px",textAlign:"center",fontSize:"1.5rem", fontWeight:"600"}}>Business Details</div>
            {/* <Form.Label style={{fontWeight:"500"}}>Have Gst</Form.Label> */}
                  <div>
                    <Form.Check
                      inline
                      label="Have GST"
                      type="checkbox"
                      value={isGst}
                      checked={formData.isGst}
                      onChange={showCompanyDataHandler}
                      isInvalid={!!errors.accolades}
                    />
                    </div>


          


            {isGst ? <div> <Row className="mb-3">
              
              <Col xs={12} sm={6}>
                <Form.Group controlId="gstNumber">
                  <Form.Label style={{fontWeight:"500"}}>GST Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="gstNumber"
                    placeholder="Enter GST number"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.gstNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.gstNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">

            <Col xs={12} sm={3}>
                <Form.Group controlId="companyAddressPincode">
                  <Form.Label style={{fontWeight:"500"}}>Company Address - Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyAddressPincode"
                    placeholder="Enter company address pincode"
                    value={formData.companyAddressPincode}
                    onChange={handleChange}
                    isInvalid={!!errors.companyAddressPincode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.companyAddressPincode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} sm={3}>
                <Form.Group controlId="companyAddressArea">
                  <Form.Label style={{fontWeight:"500"}}>Company Address - Area</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyAddressArea"
                    placeholder="Enter company address area"
                    value={formData.companyAddressArea}
                    onChange={handleChange}
                    isInvalid={!!errors.companyAddressArea}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.companyAddressArea}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
          

              <Col xs={12} sm={3}>
                <Form.Group controlId="companyAddressState">
                  <Form.Label style={{fontWeight:"500"}}>Company Address - State</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyAddressState"
                    placeholder="Enter company address state"
                    value={formData.companyAddressState}
                    onChange={handleChange}
                    isInvalid={!!errors.companyAddressState}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.companyAddressState}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} sm={3}>
                <Form.Group controlId="companyAddressCity">
                  <Form.Label style={{fontWeight:"500"}}>Company Address - City</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyAddressCity"
                    placeholder="Enter company address city"
                    value={formData.companyAddressCity}
                    onChange={handleChange}
                    isInvalid={!!errors.companyAddressCity}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.companyAddressCity}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

            </Row>
            <Row className="mb-3">
            
            
            </Row>
            </div>  :""}

          

    

        

            <div style={{marginBottom: "30px",marginTop:"20px",textAlign:"center",fontSize:"1.5rem", fontWeight:"600"}}>BNI Details</div>

            <Row className="mb-3">
              <Col xs={12} sm={6}>
                <Form.Group controlId="region">
                  <Form.Label style={{fontWeight:"500"}}>Region</Form.Label>
                  <Form.Control
                    as="select"
                    name="region"
                    value={formData.region}
                    onChange={handleRegionChange}
                    isInvalid={!!errors.region}
                  >
                    <option value="">Select Region</option>
                    <option value="West">West</option>
                    <option value="East">East</option>
                    <option value="North">North</option>
                    {/* <option value="South">South</option> */}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.region}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} sm={6}>
                <Form.Group controlId="chapterName">
                  <Form.Label style={{fontWeight:"500"}}>Chapter Name</Form.Label>
                  <Form.Control
                    as="select"
                    name="chapterName"
                    value={formData.chapterName}
                    onChange={handleChange}
                    isInvalid={!!errors.chapterName}
                    disabled={!formData.region}
                  >
                    <option value="">Select Chapter</option>
                    {formData.region &&
                      chapters[formData.region].map((chapter, index) => (
                        <option key={index} value={chapter}>
                          {chapter}
                        </option>
                      ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.chapterName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="accolades">
                  <Form.Label style={{fontWeight:"500"}}>Accolades</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="White Lion"
                      type="checkbox"
                      value="White Lion"
                      checked={formData.accolades.includes("White Lion")}
                      onChange={handleCheckboxChange}
                      isInvalid={!!errors.accolades}
                    />
                    <Form.Check
                      inline
                      label="Blue Lion"
                      type="checkbox"
                      value="Blue Lion"
                      checked={formData.accolades.includes("Blue Lion")}
                      onChange={handleCheckboxChange}
                      isInvalid={!!errors.accolades}
                    />
                    <Form.Check
                      inline
                      label="Red Lion"
                      type="checkbox"
                      value="Red Lion"
                      checked={formData.accolades.includes("Red Lion")}
                      onChange={handleCheckboxChange}
                      isInvalid={!!errors.accolades}
                    />
                    <Form.Check
                      inline
                      label="Golden Lion"
                      type="checkbox"
                      value="Golden Lion"
                      checked={formData.accolades.includes("Golden Lion")}
                      onChange={handleCheckboxChange}
                      isInvalid={!!errors.accolades}
                    />
                    <Form.Check
                      inline
                      label="Gold Club Member/Black Badge"
                      type="checkbox"
                      value="Gold Club Member/Black Badge"
                      checked={formData.accolades.includes(
                        "Gold Club Member/Black Badge"
                      )}
                      onChange={handleCheckboxChange}
                      isInvalid={!!errors.accolades}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.accolades}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} sm={6}>
                <Form.Group controlId="inductionDate">
                  <Form.Label style={{fontWeight:"500"}}>Induction Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="inductionDate"
                    value={formData.inductionDate}
                    onChange={handleChange}
                    isInvalid={!!errors.inductionDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.inductionDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12} sm={6}>
                <Form.Group controlId="companyCategory">
                  <Form.Label style={{fontWeight:"500"}}>Company Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyCategory"
                    placeholder="Enter company category"
                    value={formData.companyCategory}
                    onChange={handleChange}
                    isInvalid={!!errors.companyCategory}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.companyCategory}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

            </Row>
            <Row className="mb-3">
  
  </Row>
  <Row>

  </Row>
  <Row>
    <Col md={6}>
      <Form.Group controlId="formMembershipTimePeriod">
        <Form.Label>Membership Time Period</Form.Label>
        <Form.Control
          as="select"
          name="membershipTimePeriod"
          value={formData.membershipTimePeriod}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="1">1 Year</option>
          <option value="2">2 Years</option>
          <option value="5">5 Years</option>
        </Form.Control>
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group controlId="formRenewalDate">
        <Form.Label>Renewal Date</Form.Label>
        <Form.Control
          type="date"
          name="renewalDate"
          value={formData.renewalDate}
          readOnly
        />
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group controlId="formLastRenewableDate">
        <Form.Label>Renewable Due Date</Form.Label>
        <Form.Control
          type="date"
          name="lastRenewableDate"
          value={formData.lastRenewableDate}
          readOnly
        />
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group controlId="formRenewableDueDate">


        <Form.Label> Last Renewable Date</Form.Label>
        <Form.Control
          type="date"
          name="renewableDueDate"
          value={formData.renewableDueDate}
          readOnly
        />
      </Form.Group>
    </Col>


  </Row>
            {data && data.length !== null ? (
              formSunmitted ? (
                <Button variant="warning" style={{ textAlign: "center" }}>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden"></span>
                  </Spinner>
                </Button>
              ) : (
                <Button
                  variant="danger"
                  style={{ textAlign: "center",marginTop :"30px" ,width:"100%", }}
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              )
            ) : formSunmitted ? (
              <Button variant="primary" style={{ textAlign: "center" }}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden"></span>
                </Spinner>
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                style={{ textAlign: "center",marginTop :"30px",width:"100%", }}
              >
                Submit
              </Button>
            )}
          </Form>
        </div>
      </>
    )
  };

  export default RegistrationForm;
