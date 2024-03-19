'use client'

import React, { useState } from 'react'
import {Clock} from './clock';
import { CookieSymbol, createSession, useIsClient, useSession } from '../providers/context';
import { useCookies } from 'react-cookie';
import { ToolsToggle } from './tools';
import PostModal from './post-modal';

function Navbar() {
  const client = useIsClient();
  const sessionCtx = useSession();
  const cookies = useCookies([CookieSymbol.session]);
  const removeCookie = cookies[2];

  const handleLogout = () => {
    sessionCtx?.updateSession(createSession(false));
    removeCookie(CookieSymbol.session);
    window.location.reload();
  }

  return(<>
    <div className="navbar navbar-custom bg-base-300 z-[1] flex justify-between">
      <div className="px-2 min-w-96">
      {client && sessionCtx?.session.isSession ? 
        <ToolsToggle sessionContext={sessionCtx}/>
      :<></>}
      </div>
      <div className="px-2 grid text-center">
        <Clock/>
      </div>
      <div className="flex justify-end px-6 min-w-96">
        <div className="flex items-stretch">
          {
            client && sessionCtx?.session.isSession ?
            <button onClick={handleLogout} className="btn btn-ghost rounded-btn">Logout</button>
            : null
          }
        </div>
      </div>
    </div>
  </>
  )
}

export default Navbar