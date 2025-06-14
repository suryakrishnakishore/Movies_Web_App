import React, { useState } from 'react'
import styles from './header.module.css';
import JCLogo from '../../assets/movies-logo.png';
import Crown from '../../assets/crown.svg';
import SearchIcon from '../../assets/ic_search.svg';
import VoiceSearchIcon from '../../assets/voice-search.svg'
import JioIcon from '../../assets/jio-logo.png';
import UserPopUp from '../UserPopUp/user-pop-up';
import { useNavigate } from 'react-router-dom';

function Header({ name }) {

    let navLinks = ["Home", "Sports", "Movies", "TV Shows", "More"];
    const [ userPop, setUserPop ] = useState(false);
    async function handleUserClick() {
        setUserPop(!userPop);
        
    }
    console.log("userPop", userPop);

    let navigate = useNavigate();

  return (
    <div className={styles.headContainer}>
        <header className={styles.head}>
            
            <nav className={styles.navigation}> 
                <div className={styles.logo}>
                    <img src={JCLogo} className={styles.moviesIcon} onClick={() => navigate("/")} alt="logo" />
                    <div className={styles.premium}>
                        <img src={Crown} alt="crown" /> 
                        <p>Go Premium</p>
                    </div>
                </div>

                <ul className={styles.navLinks}>
                    {
                        navLinks.map((link) => {
                            return <li className={styles.navLink}>{link}</li>
                        })
                    }
                </ul>
            </nav>

            <div className={styles.search}>
                <div className={styles.searchbox}>
                    <div className={styles.headericon} >
                        <img src={SearchIcon} alt="search" />
                    </div>
                    
                    <input className={styles.searchInput} type="text" placeholder='Movies, Shows and More...'/>
                    
                    <div className={styles.headericon}>
                        <img src={VoiceSearchIcon} alt="voice-search" />
                    </div>
                    
                </div>

                <img src={JioIcon} className={styles.userIcon} alt="User" onClick={handleUserClick}/>
            </div>


        </header>

        
            {userPop && (
                <div className={styles.popUp}>
                    <UserPopUp name={name}></UserPopUp>
                </div>
            )}
    </div>
  )
}

export default Header