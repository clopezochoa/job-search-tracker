import React from 'react'
import Icon from './timeline/icon'

export enum JobStatus {
  new = "new",
  waiting = "waiting",
  inactive = "inactive",
  rejected = "rejected"
}

export interface Job {
  date?: string,
  status?: JobStatus,
  link?: string,
  company?: string,
  title?: string,
  exp?: number,
  candidacies?: number,
  contactName?: string,
  contactLink?: string,

}

export function JobStart(props: Job) {
  const propsSecure = {
    date: props.date ?? "?",
    status: props.status ?? "?",
    link: props.link ?? "",
    company: props.company ?? "?",
    title: props.title ?? "",
    exp: props.exp?.toString() ?? "?",
    candidacies: props.candidacies?.toString() ?? "?",
    contactName: props.contactName ?? "",
    contactLink: props.contactLink ?? "",
  }
  return (
    <li>
      <div className="timeline-middle">
        <Icon/>
      </div>
      <div className="timeline-start md:text-end mb-10">
        <time className="font-mono italic">{propsSecure.date}</time>
        <div>
          <details className="collapse bg-base-200">
            <summary className="collapse-title text-lg font-black">
              <button className="btn btn-warning me-5">
                <a href={propsSecure.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {propsSecure.status}
                </a>
              </button>
              {propsSecure.company}
            </summary>
            <div className="collapse-content"> 
              <ul>
                <li>
                  {propsSecure.title}
                </li>
                <li>
                  {propsSecure.exp} Years of exp.
                </li>
                <li>
                  {propsSecure.candidacies} solicitudes.
                </li>
                <li>
                  <a href={propsSecure.contactLink}>
                    {propsSecure.contactName}
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
      <hr/>
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

export function JobEnd(props: Job) {
  const propsSecure = {
    date: props.date ?? "?",
    status: props.status ?? "?",
    link: props.link ?? "",
    company: props.company ?? "?",
    title: props.title ?? "",
    exp: props.exp?.toString() ?? "?",
    candidacies: props.candidacies?.toString() ?? "?",
    contactName: props.contactName ?? "",
    contactLink: props.contactLink ?? "",
  }
  return (
    <li>
      <div className="timeline-middle">
        <Icon/>
      </div>
      <div className="timeline-end mb-10">
        <time className="font-mono italic">{propsSecure.date}</time>
        <div>
          <details className="collapse bg-base-200">
            <summary className="collapse-title text-lg font-black">
              <button className="btn btn-warning me-5">
                <a href={propsSecure.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {propsSecure.status}
                </a>
              </button>
              {propsSecure.company}
            </summary>
            <div className="collapse-content"> 
              <ul>
                <li>
                  {propsSecure.title}
                </li>
                <li>
                  {propsSecure.exp} Years of exp.
                </li>
                <li>
                  {propsSecure.candidacies} solicitudes.
                </li>
                <li>
                  <a href={propsSecure.contactLink}>
                    {propsSecure.contactName}
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
      <hr/>
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