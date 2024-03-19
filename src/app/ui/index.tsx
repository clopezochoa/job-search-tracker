'use client'

import React, { useEffect, useState } from 'react'
import { useIsClient, useSession } from '../providers/context'
import { Tools } from './tools';
import { Timeline } from '../timeline/timeline';
import Landing from './landing';
import PostModal from './post-modal';

function Main() {
  const session = useSession();
  const client = useIsClient();
  const [mainContent, setMainContent] = useState<React.JSX.Element>(<></>);
  const [togglePost, setTogglePost] = useState(false);

  useEffect(() => {
    if(client) {
      if(session?.session.isSession) {
        setMainContent(<main className="flex min-h-screen items-start justify-center">
          <div className="flex flex-start justify-start pt-20 min-w-96 fixed top-0 left-0">
            <Tools sessionContext={session}/>
          </div>
          <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <Timeline/>
          </div>
          <div className="grid justify-end pt-16 min-w-96 mt-4 mr-4 fixed top-0 right-0">
            <button onClick={() => setTogglePost(true)} className="btn justify-end w-fit self-end">Post a job</button>
            <ul tabIndex={0} className="right-panel p-2 rounded-box min-w-60 justify-end text-end">
              <li><a href='https://www.lopezochoa.com' target="_blank" rel="noopener noreferrer">Portfolio</a></li>
              <li><a>Linktree</a></li>
              <li><a>Linkedin</a></li>
              <li><a>Manfred</a></li>
              <li><a>Wellfound</a></li>
              <li><a>Joinrs</a></li>
            </ul>
          </div>
        </main>
        )
      } else {
        setMainContent(<Landing/>)
      }
    }
  }, [client, session])

  return (<>
    {togglePost ? <PostModal hide={() => setTogglePost(false)}/> : null}
    {mainContent}
  </>)
}

export default Main