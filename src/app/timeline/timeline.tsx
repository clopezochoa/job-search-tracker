import React from 'react'
import { Job } from '../ui/job'

function Timeline() {
  const mockjobs = Array.from(Array(30));
  return (<>
    <ul className="timeline timeline-vertical">
      {mockjobs.map((job, index) => {
        if(index % 2 === 0) {
          return (<>
            <Job start date={new Date(Date.now()).toString().slice(0, 30)}/>
          </>)
        } else {
          return (<>
            <Job end date={new Date(Date.now()).toString().slice(0, 30)}/>
          </>)
        }
      })}
    </ul>
  </>
  )
}

export default Timeline