import React from 'react'
import { getMomentFormatted } from '@/app/client-lib';
import useJobs from '../hooks/useJobs';

export function Timeline() {
  const jobs = useJobs();
  const events = jobs.flatMap((job) => job.events).sort((a, b) => a.time.getMilliseconds() - b.time.getMilliseconds());
  const time = getMomentFormatted();

  return (<>
    <ul className="timeline timeline-vertical">

    </ul>
  </>
  )
}