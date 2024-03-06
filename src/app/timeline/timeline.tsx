import React from 'react'
import Icon from './icon'
import { JobEnd, JobStart } from '../job'

function Timeline() {
  return (
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
      <JobStart date={new Date(Date.now()).toString().slice(0, 30)}/>
      <JobEnd date={new Date(Date.now()).toString().slice(0, 30)}/>
    </ul>
  )
}

export default Timeline