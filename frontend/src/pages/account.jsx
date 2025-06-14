import React, { useState } from 'react'
import Header from '../components/navigation/header';
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
import styles from "./account.module.css";
import JioUserLogo from '../assets/jio-logo.png'
import useStore from '../store';
import { MdModeEditOutline } from "react-icons/md";
import EditDetails from '../components/Edit-Details/edit-dertails';
import { IoIosClose } from "react-icons/io";
import UserHistory from '../components/UserHistory/user-history';

function Account() {
  const { user_name } = useParams();
  const { user } = useStore((state) => state);
  console.log("Account User", user);
  const [edit, setEdit] = useState(false);
  const [Key, setKey] = useState(null);
  const [close, setClose] = useState(true);

  function handleEdit(e) {
    setEdit(true);
    setClose(false);
    console.log(e.target.dataset.key);

    setKey(e.target.dataset.key);
  }

  return (
    <div>
      <Helmet>
        <title>{user_name}</title>
      </Helmet>
      <Header></Header>
      <div className={styles.container}>
        <div className={styles.headData}>
          <img className={styles.userLogo} src={JioUserLogo} alt="Movies_App_Logo" />
          <h1>{user_name}</h1>
        </div>

        <div className={styles.userDetails}>
          <div><strong>Email: </strong> <p>{user.email}</p></div>
          <div><strong>Age: </strong> <p>{Math.floor((new Date() - new Date(user.dob)) / (1000 * 60 * 60 * 24 * 365))} <MdModeEditOutline data-key={'1'} className={styles.editIcon} onClick={handleEdit} /></p></div>
          <div><strong>Gender: </strong> <p>{user.gender} <MdModeEditOutline data-key={'2'} className={styles.editIcon} onClick={handleEdit} /></p></div>
          <div><strong>Language: </strong> <p>{user.language} <MdModeEditOutline data-key={'3'} className={styles.editIcon} onClick={handleEdit} /></p></div>
        </div>

        {edit && (
          <>
            <div
              className={styles.backdrop}
              onClick={() => setEdit(false)}
            />
            <EditDetails keyVal={Key} />
          </>
        )}

        <UserHistory />
      </div>
        
    </div>
  )
}

export default Account