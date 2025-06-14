import React from 'react'
import styles from './show.module.css';

function Show({ image }) {
  return (
    <div className={styles.show}>
      <img src={image} alt="Poster" />
    </div>
  )
}

export default Show