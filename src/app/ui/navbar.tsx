'use client'

import React, { useState } from 'react'
import {Clock} from './clock';
import { CookieSymbol, createSession, useIsClient, useSession } from '../providers/context';
import { Login, Signup } from './auth';
import { useCookies } from 'react-cookie';
import { ToolsToggle } from './tools';
import PostModal from './post-modal';

function Navbar() {
  const client = useIsClient();
  const sessionCtx = useSession();
  const [toggleSignup, setToggleSignup] = useState(false);
  const [toggleLogin, setToggleLogin] = useState(false);
  const [togglePost, setTogglePost] = useState(false);
  const cookies = useCookies([CookieSymbol.session]);
  const removeCookie = cookies[2];

  const handleLogout = () => {
    sessionCtx?.updateSession(createSession(false));
    removeCookie(CookieSymbol.session);
    window.location.reload();
  }

  return(<>
    {
      client ? <>
      {toggleSignup ? <Signup hide={() => setToggleSignup(false)} /> : null}
      {toggleLogin ? <Login hide={() => setToggleLogin(false)} /> : null}
      {togglePost ? <PostModal hide={() => setTogglePost(false)}/> : null}
      </> : <></>
    }
    <div className="navbar navbar-custom bg-base-300 z-[1] flex justify-between">
      <div className="px-2 min-w-96">
      {client && sessionCtx?.session.isSession ? 
        <ToolsToggle sessionContext={sessionCtx}/>
      :<></>}
      </div>
      <div className="px-2 grid text-center">
        <span className='text-xl subpixel-antialiased'>NOW</span>
        <Clock/>
      </div>
      <div className="flex justify-end px-4 min-w-96">
        <div className="flex items-stretch">
          {
            client && sessionCtx?.session.isSession ? 
            <button onClick={handleLogout} className="btn btn-ghost rounded-btn">Logout</button> :
            <button onClick={() => setToggleSignup(toggleSignup => !toggleSignup)} className="btn btn-ghost rounded-btn">Signup</button>
          }
          <div className="dropdown dropdown-end ms-2">
            {
              client && sessionCtx?.session.isSession ? 
              <>
                <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Menu</div>
                <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                  <li><button onClick={() => setTogglePost(true)} className="btn">Post a job</button></li>
                  <li><a href='https://www.lopezochoa.com' target="_blank" rel="noopener noreferrer">Portfolio</a></li>
                  <li><a>Linktree</a></li>
                  <li><a>Linkedin</a></li>
                  <li><a>Manfred</a></li>
                  <li><a>Wellfound</a></li>
                  <li><a>Joinrs</a></li>
                </ul>
              </> :
              <button onClick={() => setToggleLogin(toggleLogin => !toggleLogin)} className="btn btn-ghost rounded-btn">Login</button>
            }
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Navbar