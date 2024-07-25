// src/Submissions.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const querySnapshot = await getDocs(collection(db, 'submissions'));
      setSubmissions(querySnapshot.docs.map((doc) => doc.data()));
    };

    fetchSubmissions();
  }, []);

  return (
    <div>
      <h2>Submissions</h2>
      <ul>
        {submissions.map((submission, index) => (
          <li key={index}>
            {submission.name} - {submission.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Submissions;
