import React from 'react'

function Navbar() {
  return (
    <div className="navbar-custom">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Job Listing Tool</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>
                  Menu
                </summary>
                <ul className="right p-2 bg-base-100 rounded-t-none">
                  <li><label htmlFor="post-a-job" className="btn">Post a job</label></li>
                  <li><a href='https://www.lopezochoa.com' target="_blank" rel="noopener noreferrer">Portfolio</a></li>
                  <li><a>Linktree</a></li>
                  <li><a>Linkedin</a></li>
                  <li><a>Manfred</a></li>
                  <li><a>Wellfound</a></li>
                  <li><a>Joinrs</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar