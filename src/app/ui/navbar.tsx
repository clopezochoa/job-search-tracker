import React from 'react'
import Clock from './clock';

function Navbar() {
  return(
    <div className="navbar navbar-custom bg-base-300 z-10 flex justify-between">
      <div className="px-2">
        <a className="btn btn-ghost text-xl">Job Listing Tool</a>
      </div>
      <div className="px-2 grid text-center">
        <span className='text-xl subpixel-antialiased'>NOW</span>
        <Clock/>
      </div>
      <div className="flex justify-end px-2">
        <div className="flex items-stretch">
          <a className="btn btn-ghost rounded-btn">Button</a>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Menu</div>
            <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
              <li><label htmlFor="post-a-job" className="btn">Post a job</label></li>
              <li><a href='https://www.lopezochoa.com' target="_blank" rel="noopener noreferrer">Portfolio</a></li>
              <li><a>Linktree</a></li>
              <li><a>Linkedin</a></li>
              <li><a>Manfred</a></li>
              <li><a>Wellfound</a></li>
              <li><a>Joinrs</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar