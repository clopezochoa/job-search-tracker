'use client'

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

const Clock = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        `${moment().format('dddd')} ${moment().format('Do')} ${moment().format('MMMM')} ${moment().format('h:mm:ss a')}`
      )
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <span>{time}</span>
    </div>
  );
};

export default Clock;