import React from 'react'
import { Job } from '../ui/job'
import { getMomentFormatted } from '@/app/lib';

function Timeline() {
  const mockjobs = Array.from(Array(30));
  const time = getMomentFormatted();
  return (<>
    <ul className="timeline timeline-vertical">
      {mockjobs.map((job, index) => {
        if(index % 2 === 0) {
          return (<>
            <Job start date={time}/>
          </>)
        } else {
          return (<>
            <Job end date={time}/>
          </>)
        }
      })}
    </ul>
  </>
  )
}

export default Timeline