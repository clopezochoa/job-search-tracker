import React from 'react'
import { EventData, JobData } from '../client-lib'

export enum Side {
  left = "timeline-start",
  right = "timeline-end",
}

export function Event({job, event, side}:{job: JobData, event: EventData, side: Side}) {
  return (
    <li key={`job_`}>
      <div className={`${side} timeline-box`}>
        <time className="font-mono italic">{event.time.toString()}</time>
        <div>
          <details className="collapse bg-base-200">
            <summary className="collapse-title text-lg font-black">
              <button className="btn btn-warning me-5">
                <a href={job.provider}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {event.status}
                </a>
              </button>
              {job.company}
            </summary>
            <div className="collapse-content"> 
              <ul>
                <li>
                  {job.role}
                </li>
                <li>
                  {job.exp} Years of exp.
                </li>
                <li>
                  {job.candidacies} solicitudes.
                </li>
                <li>
                  <a href={job.provider}>
                    {job.provider}
                  </a>
                </li>
                <li>
                  <label htmlFor="details" className="btn">Details</label>
                </li>
              </ul>
            </div>
          </details>
        </div>
      </div>
      <input type="checkbox" id="details" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Job title</h3>
          <p className="py-4">This are the details</p>
        </div>
        <label className="modal-backdrop" htmlFor="details">Close</label>
      </div>
    </li>
  )
}