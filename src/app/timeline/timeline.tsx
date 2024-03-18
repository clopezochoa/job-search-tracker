import React, { useEffect, useState } from 'react'
import { EventData, getMomentFormatted } from '@/app/client-lib';
import useJobs from '../hooks/useJobs';
import { EventCard, Side } from '../ui/event';

export function Timeline() {
  const jobs = useJobs();
  const [events, setEvents] = useState<React.JSX.Element>(<></>)
  useEffect(() => {
    var eventData: Array<EventData> = [];
    jobs.forEach(job => {
      job.events.forEach(event => {
        const signedEvent = {
          status: event.status,
          time: event.time,
          notes: event.notes,
          signature: job._id
        } as EventData;
        eventData.push(signedEvent);
      });
    });
    const eventJSXList: React.JSX.Element = <>{eventData.map((event, index) =>
      <React.Fragment key={event.time.toString()}>
        <EventCard
          job={jobs.find(job => job._id === event.signature)}
          event={event}
          side={index % 2 == 0 ? Side.left : Side.right}
        />
      </React.Fragment>
    )}</>;
    setEvents(eventJSXList);
  }, [jobs]);

  return (<>
    <ul className="timeline timeline-vertical">
      {events}
    </ul>
  </>
  )
}