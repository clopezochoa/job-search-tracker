'use client'

import React from 'react'
import { useIsClient, useSession } from '../providers/context'
import { Tools } from './tools';
import { Timeline } from '../timeline/timeline';

function Main() {
  const session = useSession();
  const client = useIsClient();
  return (<>
    {client && session?.session.isSession ? 
      <main className="flex min-h-screen items-start justify-between">
        <div className="flex flex-start justify-start pt-20 min-w-96">
          <Tools sessionContext={session}/>
        </div>
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <Timeline/>
        </div>
        <div className="flex flex-end justify-start pt-20 min-w-96">
        </div>
      </main>
    :
      <></>
    }
  </>)
}

export default Main