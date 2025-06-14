import React, { useEffect, useRef } from 'react'
import styles from './channels.module.css';
import Channel1 from '../../assets/channel1.jpg';
import Channel2 from '../../assets/channel2.png';
import Channel3 from '../../assets/channel3.jpg';
import Channel4 from '../../assets/channel4.jpg';
import Channel5 from '../../assets/channel5.jpg';
import Channel6 from '../../assets/channel6.jpg';
import Channel7 from '../../assets/channel7.jpg';

function Channels() {
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
    <div ref={scrollRef} className={styles.channels}> 
        <img src={Channel1} alt="channel" />
        <img src={Channel2} alt="channel" />
        <img src={Channel3} alt="channel" />
        <img src={Channel4} alt="channel" />
        <img src={Channel5} alt="channel" />
        <img src={Channel6} alt="channel" />
        <img src={Channel7} alt="channel" />
        <img src={Channel1} alt="channel" />
        <img src={Channel2} alt="channel" />
        <img src={Channel3} alt="channel" />
    </div>
  )
}

export default Channels