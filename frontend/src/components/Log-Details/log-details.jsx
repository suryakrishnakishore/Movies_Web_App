import React from 'react'
import styles from './log-details.module.css'
import { useState } from 'react';
import api from '../../libs/apiCalls.js';
import { useEffect } from 'react';
import JCLogo from '../../assets/jc_logo_v2.svg';
import Select from 'react-select';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import useStore from "../../store/index.js";

function LogDetails({ token }) {
  const { user, setCredentials } = useStore((state) => state);

  const [ name, setName ] = useState(user.name || '');
  const [ gender, setGender ] = useState('');
  const [ dob, setDob ] = useState('');
  const [ language, setLanguage ] = useState('');
  const [ checked, setChecked ] = useState(false);

  let navigate = useNavigate();

  // async function getUser(params) {
  //   try {
  //     const response = await api.get("/details/userInfo");
  //     if (response.status === 200) {
  //       const user = response.data.user;
  //       setName(user.name || '');
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //   }
  // }

  

  async function handleSubmit(e) {
    e.preventDefault();
    let user = {
      name, gender, dob, language
    }
    console.log("User: ", user);

    try {
      const response = await api.put("/details/userInfo", user);
      if (response.status === 200) {
        toast.success(response.data.message);
        const userInfo = { ...response?.data.user, token: token };
        localStorage.setItem('jiouser', JSON.stringify(userInfo));
        
        setCredentials(userInfo);
        navigate('/');
      } else {
        toast.error("Failed to update details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("An error occurred while updating details");
    }
    
    
  }
  const [ query, setQuery ] = useState(0);
  function handleNext(e) {
    e.preventDefault();
    if (!name) {
      alert("Please enter your name");
      return;
    }
    else {
      setQuery(query + 1);
    }
  }

  const Genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" }
  ];
  
  const Languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "chinese", label: "Chinese" },
    { value: "japanese", label: "Japanese" },
    { value: "korean", label: "Korean" },
    { value: "hindi", label: "Hindi" },
    { value: "arabic", label: "Arabic" },
    { value: "portuguese", label: "Portuguese" },
    { value: "russian", label: "Russian" },
    { value: "italian", label: "Italian" },
    { value: "dutch", label: "Dutch" },
    { value: "swedish", label: "Swedish" },
    { value: "norwegian", label: "Norwegian" },
    { value: "danish", label: "Danish" },
    { value: "finnish", label: "Finnish" },
    { value: "polish", label: "Polish" },
    { value: "turkish", label: "Turkish" },
    { value: "greek", label: "Greek" },
    { value: "hungarian", label: "Hungarian" },
    { value: "czech", label: "Czech" },
    { value: "romanian", label: "Romanian" },
    { value: "bulgarian", label: "Bulgarian" },
    { value: "ukrainian", label: "Ukrainian" },
    { value: "thai", label: "Thai" },
    { value: "vietnamese", label: "Vietnamese" },
    { value: "indonesian", label: "Indonesian" },
    { value: "malay", label: "Malay" },
    { value: "filipino", label: "Filipino" },
    { value: "swahili", label: "Swahili" },
    { value: "hebrew", label: "Hebrew" },
    { value: "persian", label: "Persian" },
    { value: "urdu", label: "Urdu" },
    { value: "bengali", label: "Bengali" },
    { value: "tamil", label: "Tamil" },
    { value: "telugu", label: "Telugu" },
    { value: "marathi", label: "Marathi" },
    { value: "gujarati", label: "Gujarati" },
    { value: "punjabi", label: "Punjabi" },
    { value: "malayalam", label: "Malayalam" },
    { value: "kannada", label: "Kannada" },
    { value: "odia", label: "Odia" },
  ];
  
  return (
    <>
        <div className={`${styles.container}`}>
            
            {/* Add more content or components as needed */}

            <div className={`${styles.detContainer}`}>
                <img src={JCLogo} className={styles.logo} alt="logo" />

                <div className={styles.welcome}>
                  <h1>Welcome Hoff</h1>
                  <p>Enjoy your time here</p>
                </div>
                

                <div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={query === 0 ? styles.formGroup : styles.formGroupInactive}>
                            <label htmlFor="name">Display Name:</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            <button onClick={handleNext}>Next</button>
                        </div>
                        <div className={query === 1 ? styles.formGroup : styles.formGroupInactive}>
                            <label htmlFor="gender">Gender</label>
                            <input list='genders' type="text" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                            <datalist id='genders' className={styles.dataList}>
                              
                                <option key={0}  value={"Male"}>Male</option>
                                <option key={1}  value={"Female"}>Female</option>
                                <option key={2}  value={"Other"}>Other</option>
                              
                            </datalist>
                            <button onClick={handleNext}>Next</button>
                        </div>
                        <div className={query === 2 ? styles.formGroup : styles.formGroupInactive}>
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" id="dob" pattern="\d{4}-\d{2}-\d{2}" value={dob} onChange={(e) => setDob(e.target.value)} />
                            <button onClick={handleNext}>Next</button>
                        </div>
                        <div className={query === 3 ? styles.formGroup : styles.formGroupInactive}>

                            <label htmlFor="language">Preferred Language:</label>
                            <input list='languages' type="text" id="language" value={language} onChange={(e) => setLanguage(e.target.value)} />
                            <datalist id='languages' className={styles.dataList}>
                                {Languages.map((lang, index) => (
                                    <option key={index} value={lang.label}>{lang.label}</option>
                                ))}
                            </datalist>
                            <button onClick={handleNext}>Next</button>
                        </div>
                        <div className={query === 4 ? styles.formGroup : styles.formGroupInactive}>
                            <h3>Terms and Conditions</h3>
                            <div className={styles.terms}>
                              <p>
                              

Welcome to MOVIES! These Terms and Conditions govern your access and use of our movie streaming platform, including our website and mobile application. By accessing or using MOVIES, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use our services.

1. Use of the Service
- You must be at least 13 years old, or have parental or guardian consent, to use this platform.
- You agree to use MOVIES for personal, non-commercial purposes only.
- You agree not to copy, reproduce, redistribute, or publicly display any content without express permission from MOVIES.

2. User Accounts
- To access certain features, you may need to register an account. You are responsible for maintaining the confidentiality of your login credentials.
- You agree to provide accurate, complete, and updated information for your account.
- You are responsible for all activity that occurs under your account.

3. Subscription and Billing 
- Some features or content may require a paid subscription.
- All prices, subscription terms, and billing details will be provided during sign-up.
- Subscriptions renew automatically unless canceled before the renewal date.
- All payments are non-refundable unless specified otherwise.

4. Content and Intellectual Property
- All movies, series, images, logos, text, and other content on MOVIES are the property of MOVIES or its content providers.
- You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, or create derivative works from any content without prior written permission.

5. Prohibited Conduct
You agree not to:
- Circumvent or attempt to bypass any security measures.
- Use automated scripts or bots to access the platform.
- Post or distribute any content that is harmful, illegal, abusive, or violates any laws.
- Share, resell, or sublicense access to the service.

6. Termination
We reserve the right to suspend or terminate your access at any time, without notice, if we believe you have violated these Terms or our policies.

7. Third-Party Links and Services
MOVIES may contain links to third-party websites or services. We do not endorse or assume responsibility for any third-party content, services, or practices. Use them at your own risk.

8. Disclaimers and Limitation of Liability
- MOVIES is provided “as is” and “as available” without warranties of any kind.
- We do not guarantee that the platform will be error-free or uninterrupted.
- We are not liable for any indirect, incidental, special, or consequential damages arising out of your use of the platform.

9. Changes to Terms
We may update these Terms from time to time. When we do, we will revise the “Last Updated” date. Continued use of the platform after changes are posted constitutes your acceptance of the revised Terms.

10. Contact Us
If you have any questions or concerns regarding these Terms, you can contact us at:
Email: movies@gmail.com

Thank you for using MOVIES!

                              </p>
                            </div>

                            <div className={styles.termsCheckbox}>
                              <label onClick={(e) => setChecked(!checked)}>
                                <input type="checkbox"  required />
                                <h3>I agree to the Terms and Conditions</h3>
                              </label>
                              {checked ? (
                                <button type='submit'>Submti</button>
                              ) : (
                                <button disabled>Submit</button>
                              )}
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default LogDetails