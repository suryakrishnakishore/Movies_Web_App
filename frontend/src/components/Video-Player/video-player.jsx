import React from 'react'
import ReactPlayer from 'react-player';
import styles from './video-player.module.css';

function VideoPlayer() {
  return (
    <div className={styles.container}> 
        <ReactPlayer url={"https://www.youtube.com/watch?v=QwievZ1Tx-8"} controls={true} width={"100%"} height={"700px"}/>
    </div>
  )
}

export default VideoPlayer