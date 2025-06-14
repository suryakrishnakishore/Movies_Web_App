import React from 'react'
import LogDetails from '../components/Log-Details/log-details'
import { setAuthToken } from '../libs/apiCalls.js';
import useStore from '../store/index.js';

function Details() {
  const { user } = useStore((state) => state);
  return (
    <div >
        <LogDetails token={user?.token} />
    </div>
  )
}

export default Details