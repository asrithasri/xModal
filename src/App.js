import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    const { username, email, dob, phone } = formData;

    // Check if fields are empty
    if (!username) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    if (!dob) newErrors.dob = 'Date of Birth is required';
    if (!phone) newErrors.phone = 'Phone number is required';

    // Additional validations
    if (email && !email.includes('@')) newErrors.email = 'Invalid email. Please check your email address.';
    if (phone && phone.length !== 10) newErrors.phone = 'Invalid phone number. Please enter a 10-digit phone number.';
    if (dob && new Date(dob) > new Date()) newErrors.dob = 'Invalid Date of Birth. Please select a past date.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
      closeModal(); // Close the modal after submission
      setFormData({ username: '', email: '', dob: '', phone: '' }); // Reset form data
      setErrors({});
    }
  };

  // Close modal when clicking outside of the modal content
  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal') {
      closeModal();
    }
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button onClick={openModal}>Open Form</button>

      {showModal && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <h2>Fill Details</h2>
              <div>
                <label>Username: </label>
                <br/>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}
              </div>

              <div>
                <label>Email: </label>
                <br/>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div>
                <label>Date of Birth: </label>
                <br/>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                {errors.dob && <p className="error">{errors.dob}</p>}
              </div>

              <div>
                <label>Phone Number: </label>
                <br/>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>
              <br></br>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
