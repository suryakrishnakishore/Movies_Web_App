import React, { useEffect, useRef, useState } from 'react';
import styles from './tags.module.css';

function Tags() {
    let [ tags, setTags ] = useState([
        'For you',
        "Action",
        "Comedy",
        "Cricket",
        "Football",
        "Drama",
        "Sci-Fi",
        "Basketball",
        "Superhero",
        "Romantic",
        "Horror",
        "Baseball",
        "Adventure",
        "Thriller",
        "Soccer",
        "Fantasy",
        "Golf"
    ]);

    const scrollRef = useRef(null);
    
      useEffect(() => {
        const el = scrollRef.current;
        if(!el) return;
        const onWheel = (e) => {
          e.preventDefault();
          if(e.deltaY !== 0) {
            el.scrollLeft += e.deltaY;
          }
        };
        el.addEventListener('wheel', onWheel, { passive: false });
        return () => {
          el.removeEventListener('wheel', onWheel);
        };
      }, []);

  return (
    <div ref={scrollRef} className={styles.tags}>
        {
            tags.map((tag) => {
                return <p className={styles.tag}>{tag}</p>
            })
        }
    </div>
  )
}

export default Tags