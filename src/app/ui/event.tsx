import React from 'react'
import { EventData, JobData, JobStatus } from '../client-lib'

export enum Side {
  left = "timeline-start",
  right = "timeline-end",
}

export interface EventCardProps {
  job?: JobData,
  event: EventData,
  side: Side
}

export function statusButtonSelector(status: JobStatus){
  var color = "default";
  switch (status) {
    case JobStatus.new:
      color = "btn-neutral"
      break;
    case JobStatus.applied:
      color = "btn-ghost";
      break;
    case JobStatus.interview:
      color = "btn-accent"
      break;
    case JobStatus.offer:
      color = "btn-primary"
      break;
    case JobStatus.rejected:
      color = "btn-secondary"
      break;
    default:
      break;
  }
  return color;
}

export function EventCard({job, event, side}: EventCardProps) {
  return (
    <li>
      <div className={`${side} timeline-box p-6`}>
        <div className='mb-4'>
          <time className="font-mono italic">{event.time.toString()}</time>
        </div>
        <div>
          <details className="collapse bg-base-200">
            <summary className="collapse-title text-lg font-black">
              <button className={`btn ${statusButtonSelector(event.status)} me-5`}>
                <a href={job?.provider}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {event.status}
                </a>
              </button>
              {job?.company}
            </summary>
            <div className="collapse-content"> 
              <ul>
                <li>
                  {job?.role}
                </li>
                <li>
                  {job?.exp} Years of exp.
                </li>
                <li>
                  {job?.candidacies} solicitudes.
                </li>
                <li>
                  <a href={job?.provider}>
                    {job?.provider}
                  </a>
                </li>
                <li>
                  <label htmlFor={`notes_${event.time}`} className="btn">Details</label>
                </li>
              </ul>
            </div>
          </details>
        </div>
      </div>
      <input type="checkbox" id={`notes_${event.time}`} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Notes</h3>
          <p className="py-4">{event.notes}</p>
        </div>
        <label className="modal-backdrop" htmlFor={`notes_${event.time}`} >Close</label>
      </div>
    </li>
  )
}