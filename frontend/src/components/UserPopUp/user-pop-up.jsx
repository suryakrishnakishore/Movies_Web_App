import React from 'react'
import styles from './user-pop-up.module.css';
import JioIcon from '../../assets/jio-logo.png';
import Crown from '../../assets/crown.svg';
import useStore from '../../store/index.js';
import { useNavigate } from 'react-router-dom';

function UserPopUp({ name }) {
    const { user, signOut } = useStore((state) => (state));
    console.log("user", user);

    async function handleLogOut() {
        localStorage.removeItem("jiouser");
        signOut();
        window.location.reload();
    }

    let navigate = useNavigate();

    return (
        <>
            <div className={styles.userPop}>
                <div className={styles.userDetails}>
                    <img src={JioIcon} className={styles.userIcon} alt="User" />
                    <div className={styles.userInfo}>
                        <h3 className={styles.userName}>{ name || "Jio User"}</h3>
                        <div className={styles.premium}>
                            <img src={Crown} alt="crown" /> 
                            <p>Go Premium</p>
                        </div>
                    </div>
                    
                </div>
                <ul className={styles.userLinks}>
                    <li className={styles.userLink} onClick={() => navigate(`/account/${user.name}`)}>My Account</li>
                    <li className={styles.userLink}>My Favourites</li>
                    <li className={styles.userLink}>My Downloads</li>
                    <li className={styles.userLink}>Settings</li>
                    <li className={styles.userLink} onClick={handleLogOut}>Logout</li>
                </ul>
            </div>
        </>
    )
}

export default UserPopUp