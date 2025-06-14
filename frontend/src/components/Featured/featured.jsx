import React from 'react'
import styles from './featured.module.css';
import FeaturedShow from '../Featured-Show/featured-show';
import api from '../../libs/apiCalls.js'
import { useState } from 'react';
import { useEffect } from 'react';

function Featured() {

  const [ shows, setShows ] = useState([]);
  async function fetchFeaturedShows() {
    try {
      const response = await api.get('/shows/featured/');
      if (response.status === 200) {
        setShows(response.data.shows);
      } else {
        console.error('Failed to fetch featured shows:', response.statusText);
      }

    } catch (error) {
      console.error('Error fetching featured shows:', error);
    }
  }

  useEffect(() => {
    fetchFeaturedShows();
  }, [1]);

  console.log(shows);
  
  return (
    <>
        <section className={styles.featured}>
            <h1 className={styles.sectionTitle}>Hot Right Now </h1>
            <div className={styles.shows}>
                
            {shows.map((show, index) => (
              <FeaturedShow show={show}/>
            ))}

            {/* <FeaturedShow image={"https://c8.alamy.com/comp/RR5MCX/avengers-infinity-war-2018-directed-by-anthony-russo-and-joe-russo-and-starring-robert-downey-jr-chris-evans-mark-ruffalo-chris-hemsworth-and-scarlett-johansson-the-avengers-team-up-with-heroes-across-the-marvel-universe-to-stop-thanos-collecting-the-remaining-infinity-stones-and-destroying-earth-RR5MCX.jpg"} id={"1"} name={"Avengers Infinity War"}></FeaturedShow>
            <FeaturedShow image={"https://lh4.googleusercontent.com/proxy/1_3I95hu8ZdT_3c6w7UNngly3lJrf3bKJVT7wturWG2XDSoVdxQEko5McOvnG9IiMiJMkVCJmRkWNvw5-OlWpWlv5huL6GOsMA"} id={"2"} name={"Robot"}></FeaturedShow>
            <FeaturedShow image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqsPvZkmmeqVQsk6udlnP6vhWHx8QF_0EI5A&s"} id={"3"} name="Lion King"></FeaturedShow> */}

            </div>
        </section>
    </>
  )
}

export default Featured