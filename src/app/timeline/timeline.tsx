import React from 'react'
import { JobEnd, JobStart } from '../ui/job'

function Timeline() {
  const mockjobs = Array.from(Array(30));
  return (<>
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
      {mockjobs.map((job, index) => {
        if(index % 2 === 0) {
          return (<>
            <JobStart date={new Date(Date.now()).toString().slice(0, 30)}/>
          </>)
        } else {
          return (<>
            <JobEnd date={new Date(Date.now()).toString().slice(0, 30)}/>
          </>)
        }
      })}
    </ul>
  </>
  )
}

export default Timeline