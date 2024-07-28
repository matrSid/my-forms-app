import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Ensure this matches the exported name in your firebase.js file
import './App.css';

const FormWithRating = () => {
  const [formData, setFormData] = useState({
    parentFullName: '',
    studentName: '',
    studentClass: '',
    contact: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState('');
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [rating, setRating] = useState(0);

  const validate = (fieldName, value) => {
    let newErrors = { ...errors };
    const namePattern = /^[a-zA-Z\s]+$/;
    const contactPattern = /^\d{1,12}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (fieldName) {
      case 'parentFullName':
        newErrors.parentFullName = namePattern.test(value) ? '' : 'Please enter alphabets only';
        break;
      case 'studentName':
        newErrors.studentName = namePattern.test(value) ? '' : 'Please enter alphabets only';
        break;
      case 'studentClass':
        newErrors.studentClass = value ? '' : 'Class is required';
        break;
      case 'contact':
        newErrors.contact = contactPattern.test(value) ? '' : 'Contact must be a number with up to 12 digits';
        break;
      case 'email':
        newErrors.email = !value || emailPattern.test(value) ? '' : 'Invalid email address';
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = Object.keys(errors).every((key) => !errors[key]);

    if (!isValid) {
      return; // If validation fails, do not submit the form
    }

    setNotification('Submitting...');

    // Simulate form submission
    setTimeout(() => {
      addDoc(collection(db, 'formData'), formData)
        .then(() => {
          setNotification('Thank you! Your form has been submitted successfully.');
          setShowRatingPopup(true); // Show rating popup after submission

          // Hide notification after 10 seconds
          setTimeout(() => {
            setNotification('');
          }, 10000);
        })
        .catch((error) => {
          setNotification('Failed to submit the form. Please try again.');
          console.error('Error writing to Firestore:', error);
        });
    }, 2000); // Simulate a delay for form submission
  };

  const handleRating = (star) => {
    setRating(star);
  };

  const handleRateClick = () => {
    setShowRatingPopup(false);

    // Simulate sending the rating to the server
    setTimeout(() => {
      // Reset rating after submission
      setRating(0);
      // Clear form data
      setFormData({
        parentFullName: '',
        studentName: '',
        studentClass: '',
        contact: '',
        email: ''
      });
    }, 500); // Delay to allow the transition effect to complete
  };

  return (
    <div className="App">
      <div className={`notification ${notification ? 'show' : ''}`}>
        {notification}
      </div>
      <div className={`rating-popup ${showRatingPopup ? 'show' : 'hide'}`}>
        <h2>Rate us!</h2>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? 'filled' : ''}`}
              onClick={() => handleRating(star)}
            >
              ☆
            </span>
          ))}
        </div>
        <button onClick={handleRateClick}>Rate</button>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <h2>Registration Form</h2>
        <input
          type="text"
          name="parentFullName"
          value={formData.parentFullName}
          onChange={handleChange}
          placeholder="Parent Full Name"
          required
        />
        {errors.parentFullName && <div className="error-message">{errors.parentFullName}</div>}
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          placeholder="Student Name"
          required
        />
        {errors.studentName && <div className="error-message">{errors.studentName}</div>}
        <input
          type="text"
          name="studentClass"
          value={formData.studentClass}
          onChange={handleChange}
          placeholder="Class"
          required
        />
        {errors.studentClass && <div className="error-message">{errors.studentClass}</div>}
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact"
          required
        />
        {errors.contact && <div className="error-message">{errors.contact}</div>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email (optional)"
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormWithRating;
