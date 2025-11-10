import React, { useEffect, useState } from 'react';
import axios from 'axios';

const check = ({ districtId }) => {
     const [rentals, setRentals] = useState([]);
      const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchrentals = async () => {
    try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/rentals/${districtId}`);
        setRentals(response.data);
      } catch (err) {
        console.error("Error fetching rentals:", err);
        setError("Failed to load rentals. Please try again later.");
      } finally {
        setLoading(false);
      }
  }
  useEffect(() => {
    fetchrenatls();
  },[districtId])
  return (
    <div>
      
    </div>
  )
}

export default check
