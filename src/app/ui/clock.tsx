'use client'

import React, { useEffect, useState } from 'react';
import { getMomentFormatted } from '@/app/lib';
import { useIsClient } from '../providers/context';

export const Clock = () => {
  const client = useIsClient();
  const initTime = getMomentFormatted();
  const [time, setTime] = useState(initTime);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        getMomentFormatted()
      )
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span>{client ? time : ""}</span>
  )
};