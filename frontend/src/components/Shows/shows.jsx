import React from 'react'
import styles from './shows.module.css';
import Show from '../Show/show';

function Shows() {
  return (
    <div>
        <section className={styles.shows}>
            <h1>Hindi Movies</h1>
            <div className={styles.showsParent}>
                <Show image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIFFM1ps7SomzBDNd-NnnP1LAO_dJa5CSRXw&s"}></Show>
                <Show image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIFFM1ps7SomzBDNd-NnnP1LAO_dJa5CSRXw&s"}></Show>
                <Show image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIFFM1ps7SomzBDNd-NnnP1LAO_dJa5CSRXw&s"}></Show>
                <Show image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIFFM1ps7SomzBDNd-NnnP1LAO_dJa5CSRXw&s"}></Show>
                <Show image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIFFM1ps7SomzBDNd-NnnP1LAO_dJa5CSRXw&s"}></Show>
                <Show image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIFFM1ps7SomzBDNd-NnnP1LAO_dJa5CSRXw&s"}></Show>
            </div>
        </section>
    </div>
  )
}

export default Shows