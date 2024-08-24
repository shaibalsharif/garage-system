import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase'; // Assuming you have your Firebase setup in a firebase.js file
import { useNavigate } from 'react-router-dom';
import { showToast } from '../components/toast';
import { doc, setDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';

const roles = [
  { name: "Admin", value: "admin" },
  { name: "Sales", value: "sales" },
  { name: "Mechanic", value: "mechanic" },
];

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        email: formData.email,
        role: formData.role
      });

      showToast({message:"User Registered",});
      // You can also add the role to your database if needed
      const token = await userCredential.user.getIdToken();
      Cookies.set('accessToken', token, { expires: 1 }); // Store token in a cookie for 1 day
      Cookies.set('userRole', formData.role, { expires: 1 }); 
      navigate('/dashboard');
    } catch (error) {
      console.error("Error registering user:", error);
      alert(error.message);
    }
  };

  return (
    <div className="container-outer overflow-y-scroll pb-40">
      <h2 className="text-title">Create an Account</h2>
      <div className="container-inner grid lg:grid-cols-2 gap-3">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
