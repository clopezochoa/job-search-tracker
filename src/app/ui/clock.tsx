'use client'

import React, { useEffect, useState } from 'react';
import { useIsClient } from '../providers/context';
import moment from 'moment';

function getTime(){
  return `${moment().format('dddd')} ${moment().format('Do')} ${moment().format('MMMM')} ${moment().format('h:mm:ss a')}`;
}
 
export const Clock = () => {
  const client = useIsClient();
  const initTime = getTime();
  const [time, setTime] = useState(initTime);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        getTime()
      )
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span>{client ? time : ""}</span>
  )
};