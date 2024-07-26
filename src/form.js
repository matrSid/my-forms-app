// src/Form.js
import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Form.css'; // Import the CSS file for styling
import './App.css'; // Import App.css for notification styling

function Form() {
  const [formData, setFormData] = useState({
    parentFullName: '',
    studentName: '',
    studentClass: '',
    contact: '',
    email: ''
  });

  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState(''); // Success, error, or submitting

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!/^[a-zA-Z\s]+$/.test(formData.parentFullName)) {
      setNotification('Parent Full Name should contain only letters and spaces.');
      setNotificationType('error');
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(formData.studentName)) {
      setNotification('Student Name should contain only letters and spaces.');
      setNotificationType('error');
      return;
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(formData.studentClass)) {
      setNotification('Class should contain only letters and numbers.');
      setNotificationType('error');
      return;
    }
    if (!/^\d{1,12}$/.test(formData.contact)) {
      setNotification('Contact should be a maximum of 12 digits.');
      setNotificationType('error');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setNotification('Email address is invalid.');
      setNotificationType('error');
      return;
    }

    try {
      setNotification('Submitting...');
      setNotificationType('submitting');
      await addDoc(collection(db, 'submissions'), formData);
      setFormData({
        parentFullName: '',
        studentName: '',
        studentClass: '',
        contact: '',
        email: ''
      });
      setNotification('Thank you! Your form has been submitted successfully.');
      setNotificationType('success');
    } catch (e) {
      console.error('Error adding document: ', e);
      setNotification('An error occurred. Please try again later.');
      setNotificationType('error');
    } finally {
      // Hide notification after 5 seconds
      setTimeout(() => setNotification(''), 5000);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Registration Form</h2>
        <input
          type="text"
          name="parentFullName"
          value={formData.parentFullName}
          onChange={handleChange}
          placeholder="Parent Full Name"
          required
        />
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          placeholder="Student Name"
          required
        />
        <input
          type="text"
          name="studentClass"
          value={formData.studentClass}
          onChange={handleChange}
          placeholder="Class"
          required
        />
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {notification && (
        <div className={`notification ${notificationType} show`}>
          {notification}
        </div>
      )}
    </div>
  );
}

export default Form;
