{activeStep === 1 && (
    <div className="col-md-6 col-lg-5 col-xl-4">
    <div className="my-auto py-4 bg-white shadow-lg rounded">
      <div className="row mt-2">
        <div className="col-10 mx-auto">
          <form id="registerForm" className="form-border" onSubmit={addressFormHandleSubmit}>
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="companyName" className="form-label">
                Company Name
              </label>
              <div className="d-flex align-items-center">
                <span className="icon-inside text-danger me-2">
                  <i className="fas fa-building"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  value={addressFormValues.companyName}
                  onChange={addressFormHandleChange}
                  required
                  placeholder="Enter your company name"
                />
              </div>
            </div>
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="businessType" className="form-label">
                Business Type
              </label>
              <div className="d-flex align-items-center">
                <span className="icon-inside text-danger me-2">
                  <i className="fas fa-briefcase"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="businessType"
                  value={addressFormValues.businessType}
                  onChange={addressFormHandleChange}
                  required
                  placeholder="Enter your business type"
                />
              </div>
            </div>
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="subBusinessType" className="form-label">
                Sub Business Type
              </label>
              <div className="d-flex align-items-center">
                <span className="icon-inside text-danger me-2">
                  <i className="fas fa-tags"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="subBusinessType"
                  value={addressFormValues.subBusinessType}
                  onChange={addressFormHandleChange}
                  required
                  placeholder="Enter your sub business type"
                />
              </div>
            </div>
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <div className="d-flex align-items-center">
                <span className="icon-inside text-danger me-2">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={addressFormValues.address}
                  onChange={addressFormHandleChange}
                  required
                  placeholder="Enter your address"
                />
              </div>
            </div>
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <div className="d-flex align-items-center">
                <span className="icon-inside text-danger me-2">
                  <i className="fas fa-city"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={addressFormValues.city}
                  onChange={addressFormHandleChange}
                  required
                  placeholder="Enter your city"
                />
              </div>
            </div>
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <div className="d-flex align-items-center">
                <span className="icon-inside text-danger me-2">
                  <i className="fas fa-flag"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  value={addressFormValues.state}
                  onChange={addressFormHandleChange}
                  required
                  placeholder="Enter your state"
                />
              </div>
            </div>
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <div className="d-flex align-items-center">
                <span className="icon-inside text-danger me-2">
                  <i className="fas fa-globe"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  value={addressFormValues.country}
                  onChange={addressFormHandleChange}
                  required
                  placeholder="Enter your country"
                />
              </div>
            </div>
            <div className="mb-3 d-flex flex-column">
              <label htmlFor="pincode" className="form-label">
                Pincode
              </label>
              <div className="d-flex align-items-center">
                <span className="icon-inside text-danger me-2">
                  <i className="fas fa-code"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  value={addressFormValues.pincode}
                  onChange={addressFormHandleChange}
                  required
                  placeholder="Enter your pincode"
                  pattern="[0-9]{6}" // Assuming pincode is a 6-digit number
                  title="Pincode must be 6 digits"
                />
              </div>
            </div>
            <div className="d-flex flex-row justify-content-around">
              <button type="button" className="btn btn-danger text-uppercase" onClick={handleBack}>
                Back
              </button>
              <button type="submit" className="btn btn-success text-uppercase">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <p className="text-2 text-white fw-300 text-center mt-4 mb-0">
      Copyright © 2024 <a className="text-white fw-600" href="#">
        Oxyy
      </a>
      . All Rights Reserved.
    </p>
  </div>
    )}

    {activeStep === 2 && (
  <div className="col-md-6 col-lg-5 col-xl-4">
  <div className="my-auto py-4 bg-white shadow-lg rounded">
    <div className="row mt-2">
      <div className="col-10 mx-auto">
        <form id="registerForm" className="form-border" onSubmit={BNIFormDataSubmitHandler}>
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="companyName" className="form-label">
              Company Name
            </label>
            <div className="d-flex align-items-center">
              <span className="icon-inside text-danger me-2">
                <i className="fas fa-building"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="companyName"
                value={BNIFormData.companyName}
                onChange={handleChange}
                required
                placeholder="Enter your company name"
              />
            </div>
          </div>
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="companyAddress" className="form-label">
              Company Address
            </label>
            <div className="d-flex align-items-center">
              <span className="icon-inside text-danger me-2">
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="companyAddress"
                value={BNIFormData.companyAddress}
                onChange={handleChange}
                required
                placeholder="Enter your company address"
              />
            </div>
          </div>
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="pincode" className="form-label">
              Pincode
            </label>
            <div className="d-flex align-items-center">
              <span className="icon-inside text-danger me-2">
                <i className="fas fa-code"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="pincode"
                value={BNIFormData.pincode}
                onChange={handleChange}
                required
                placeholder="Enter your pincode"
                pattern="[0-9]{6}"
                title="Pincode must be 6 digits"
              />
            </div>
          </div>
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <div className="d-flex align-items-center">
              <span className="icon-inside text-danger me-2">
                <i className="fas fa-city"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="city"
                value={BNIFormData.city}
                onChange={handleChange}
                required
                placeholder="Enter your city"
              />
            </div>
          </div>
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <div className="d-flex align-items-center">
              <span className="icon-inside text-danger me-2">
                <i className="fas fa-flag"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="state"
                value={BNIFormData.state}
                onChange={handleChange}
                required
                placeholder="Enter your state"
              />
            </div>
          </div>
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="region" className="form-label">
              Region
            </label>
            <div className="d-flex align-items-center">
              <span className="icon-inside text-danger me-2">
                <i className="fas fa-globe"></i>
              </span>
              <select
                id="region"
                className="form-control"
                value={BNIFormData.region}
                onChange={handleChange}
                required
              >
                <option value="">Select Region</option>
                <option value="east">East</option>
                <option value="west">West</option>
                <option value="north">North</option>
                <option value="south">South</option>
              </select>
            </div>
          </div>
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="chapter" className="form-label">
              Chapter
            </label>
            <div className="d-flex align-items-center">
              <span className="icon-inside text-danger me-2">
                <i className="fas fa-chapter"></i>
              </span>
              <select
                id="chapter"
                className="form-control"
                value={BNIFormData.chapter}
                onChange={handleChange}
                required
              >
                <option value="">Select Chapter</option>
                <option value="east">East</option>
                <option value="west">West</option>
                <option value="north">North</option>
                <option value="south">South</option>
              </select>
            </div>
          </div>
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="companyGstNo" className="form-label">
              Company GST Number
            </label>
            <div className="d-flex align-items-center">
              <span className="icon-inside text-danger me-2">
                <i className="fas fa-credit-card"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="companyGstNo"
                value={BNIFormData.companyGstNo}
                onChange={handleChange}
                required
                placeholder="Enter your GST number"
              />
            </div>
          </div>
          <div className="mb-3 d-flex flex-column">
            <label className="form-label">
              Select Color Option
            </label>
            <div className="d-flex flex-column">
              <label>
                <input
                  type="radio"
                  name="colorOptions"
                  value="blue"
                  checked={BNIFormData.colorOptions === 'blue'}
                  onChange={handleChange}
                />
                Blue
              </label>
              <label>
                <input
                  type="radio"
                  name="colorOptions"
                  value="red"
                  checked={BNIFormData.colorOptions === 'red'}
                  onChange={handleChange}
                />
                Red
              </label>
              <label>
                <input
                  type="radio"
                  name="colorOptions"
                  value="gold"
                  checked={BNIFormData.colorOptions === 'gold'}
                  onChange={handleChange}
                />
                Gold
              </label>
              <label>
                <input
                  type="radio"
                  name="colorOptions"
                  value="silver"
                  checked={BNIFormData.colorOptions === 'silver'}
                  onChange={handleChange}
                />
                Silver
              </label>
              <label>
                <input
                  type="radio"
                  name="colorOptions"
                  value="millenium"
                  checked={BNIFormData.colorOptions === 'millenium'}
                  onChange={handleChange}
                />
                Millenium
              </label>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-around">
            <button type="button" className="btn btn-danger text-uppercase" onClick={handleBack}>
              Back
            </button>
            <button type="submit" className="btn btn-success text-uppercase">
              Sign Up2
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <p className="text-2 text-white fw-300 text-center mt-4 mb-0">
    Copyright © 2024 <a className="text-white fw-600" href="#">
      Oxyy
    </a>
    . All Rights Reserved.
  </p>
</div>
    )}