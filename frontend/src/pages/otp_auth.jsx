import React, { useState } from 'react';
import styles from './otp_auth.module.css';
import api from '../libs/apiCalls.js';
import useStore from "../store/index.js"
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

function OtpAuth() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  // const [country, setCountry] = useState('IN');

  const [ checkMail, setCheckMail ] = useState(false);
  const [ checkOTP, setCheckOTP ] = useState(false);

  const navigate = useNavigate();
  const { user, setCredentials } = useStore((state) => state);

  useEffect(() => {
    if (user) {
      let now = new Date();
      let targetDate = new Date(user.created_at);

      // Difference in milliseconds
      let diffMs = now - targetDate;

      // Convert to days
      let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      console.log(`Difference is ${diffDays} days`);

      if(diffDays <= 1){
        navigate('/details');
      } else {
        navigate('/');
      }
    }
  }, [user]);

  const handleOTPRequest = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log("Email is: ", email);

      // setEmail(em.value);
      if (!email) {
        setMessage('Please enter a valid email address');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setMessage('Please enter a valid email address');
        return;
      }

      const response = await api.post('/auth/request-otp', { email });
      if (response.status === 200) {
        setOtpSent(true);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error(response?.data.message || 'Error sending OTP');

    } finally {
      setLoading(false);
    }
  }

  async function handleOTPSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post('/auth/verify-otp', { email, otp });
      if (response.status === 200) {
        toast.success(response.data.message);

        const userInfo = { ...response?.data.user, token: response?.data.token };

        // Store the token and user in local storage or context
        localStorage.setItem('jiouser', JSON.stringify(userInfo));
        setCredentials(userInfo);
        // Redirect to home page or perform any other action
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error(response?.data.message || 'Error verifying OTP');
      if (user) {
        localStorage.removeItem("jiouser");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className={styles.container} >
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.authContainer}>
        <h1>MOVIES</h1>
        <h2>Log In</h2>
        <h3>Sign in to your account to continue</h3>
        {!otpSent ? (
          <form onSubmit={handleOTPRequest}>
            <label>
              Email:
              <div></div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </label>
            {(email.endsWith(("@gmail.com") || email.endsWith("@yahoo.com") || email.endsWith("@outlook.com") || email.endsWith("@hotmail.com"))) ? (
              <button type="submit" disabled={loading}>Send OTP</button>
            ) : (
              <button disabled>Send OTP</button>
            )}
            
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit}>
            <label>
              Enter OTP:
              <div></div>
              <input
                type="password"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}  
                required
                placeholder='Enter the OTP sent'
              />
            </label>
            {(otp.length === 0) ? ( <button disabled>Verity OTP</button> ) : (<button type="submit">Verify OTP</button>)}
            
          </form>
        )}

      </div>
    </div>

  )
}

export default OtpAuth