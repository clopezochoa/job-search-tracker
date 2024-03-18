'use client'

import { useEffect, useState } from 'react'
import { CookieSymbol, useSession } from '../providers/context';
import { useCookies } from 'react-cookie';
import { JobData } from '../client-lib';

function useJobs() {
  const sessionContext = useSession();
  const [cookie, setCookie, deleteCookie] = useCookies([CookieSymbol.jobs]);
  const [jobs, setJobs] = useState<Array<JobData>>([]);

  async function getJobs() {
    const jobsCookie = cookie[CookieSymbol.jobs];

    if(jobsCookie) {
      if(jobsCookie.message !== "Error") {
        setJobs(jobs);
      }
    }
    const body = sessionContext?.session.user?.key;
    try {
      const token = await fetch('/api/get-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const jobs = await token.json() as Array<JobData>;
      if(jobs && jobs.length > 0) {
        setCookie(CookieSymbol.jobs, JSON.stringify(jobs), {
          path: "/",
          maxAge: 3600,
          sameSite: "strict",
        });
        setJobs(jobs);
      } else {
        throw new Error("No jobs were found.")
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    if(sessionContext?.session.user?.key) getJobs();
  }, [sessionContext?.session])
  
  return jobs;
}

export default useJobs