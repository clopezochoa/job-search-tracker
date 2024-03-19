'use client'

import React, { useEffect, useState } from 'react'
import { useIsClient, useSession } from '../providers/context'
import { Tools } from './tools';
import { Timeline } from '../timeline/timeline';
import Landing from './landing';
import PostModal from './post-modal';
import { ArrowUpLeftIcon, DocumentIcon } from '../icons';

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
          <div className="grid justify-end pt-16 mt-4 mr-4 fixed top-0 right-0">
            <button onClick={() => setTogglePost(true)} className="btn btn-primary ">Post a job</button>
            <ul tabIndex={0} className="[&>*]:mr-2 [&>*]:mt-2 p-2 rounded-box justify-end text-end">
              <li><h2 className='font-bold'>Documents</h2></li>
              <li><a className='flex justify-end [&>*]:ms-2' href='https://www.lopezochoa.com' target="_blank" rel="noopener noreferrer">{ArrowUpLeftIcon}<span>Portfolio</span></a></li>
              <li><a className='flex justify-end [&>*]:ms-2'>{DocumentIcon}<span>CV</span></a></li>
              <li className='flex justify-end [&>*]:ms-2'>
                <a href='https://www.linktr.ee/clopezochoa' target="_blank" rel="noopener noreferrer">{ArrowUpLeftIcon}</a>
                <span style={{cursor:"pointer"}} onClick={() => {navigator.clipboard.writeText("https://www.linktr.ee/clopezochoa")}}>Linktree</span>
              </li>
              <li className='flex justify-end [&>*]:ms-2'>
                <a href='https://www.linkedin.com/in/cloa' target="_blank" rel="noopener noreferrer">{ArrowUpLeftIcon}</a>
                <span style={{cursor:"pointer"}} onClick={() => {navigator.clipboard.writeText("https://www.linkedin.com/in/cloa")}}>LinkedIn</span>
              </li>
              <li><h2 className='font-bold'>Providers</h2></li>
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