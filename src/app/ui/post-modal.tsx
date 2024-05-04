'use client'

import React, { useRef, useState } from 'react'
import { CompanyIcon, EmailIcon, ExperienceIcon, KeyIcon, LocationIcon, RoleIcon } from '../icons'
import Modal from './modal'
import { CookieSymbol, createSession, createSettings, useSession } from '../providers/context';
import { useCookies } from 'react-cookie';
import { JobData, JobInput, UserData } from '../client-lib';
import { genSaltSync, hashSync } from 'bcrypt-ts';

function PostModal({hide}:{hide:() => void}) {
  const sessionContext = useSession();
  const [cookie, setCookie] = useCookies([CookieSymbol.jobs]);

  const formRef = useRef(null);

  const handlePost = async (e: any) => {
    e.preventDefault();
    // const jobsCookie = cookie[CookieSymbol.jobs];
    // if(jobsCookie) {
    //   if(jobsCookie.message !== "Error") {
    //     sessionContext?.updateSession(createSession(true, userSessionCookie));
    //     return;
    //   }
    // }

    var formData = {} as JobData;
    function storeInput(input: Element | null) {
      if(input) {
        switch (input.id) {
          case JobInput.company:
            formData = {
              role: (input as HTMLInputElement).value ?? "",
              company: formData.company
            } as JobData;
            console.log(formData)
            break;
          case JobInput.role:
            formData = {
              role: formData.role,
              company: (input as HTMLInputElement).value ?? "",
            } as JobData;
            break;
          default:
            break;
        }
      }
    }
    try {

      if(formRef.current) {
        const form = (formRef.current as HTMLInputElement).children;
        for(var i=0;i<form.length;i++){
          const child = form.item(i);
          if(child?.tagName === "LABEL"){
            const input = child.children.item(0);
            storeInput(input);
          }
        }
        console.log(formData)

        const body = formData;
        const token = await fetch('/api/post-job', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const response = await token.json();
        if(response && response.message !== "Error") {
          setCookie(CookieSymbol.jobs, JSON.stringify(formData as JobData), {
            path: "/",
            maxAge: 3600,
            sameSite: "strict",
          });
          hide();
        } else {
          throw new Error("Error while authenticating.")
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  interface FormItem {
    jsx: React.JSX.Element,
    icon?: React.JSX.Element
  }

  const company = {
    jsx: <input id={JobInput.company} required type="text" className="font-bold grow capitalize text-4xl text-center placeholder-opacity-0" placeholder={JobInput.company}  />,
  }
  const role = {
    jsx: <input id={JobInput.role} type="text" className="grow capitalize text-2xl text-center" placeholder={JobInput.role} />,
  }
  const keywords = {
    jsx: <input id={JobInput.keywords} type="text" className="grow capitalize text-sm text-center" placeholder={JobInput.keywords} />,
  }
  const exp = {
    jsx: 
      <div className='grid justify-center'>
        <input type="range" min={0} max={3} className="range w-full" step={1} />
        <div className='grid'>
          <div className="w-full flex justify-between text-xs mt-2 [&>*]:w-[26px]">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
          <div className="w-full flex justify-between text-xs mt-2 [&>*]:w-[26px] [&>*]:text-nowrap">
            <div className="grid justify-center [&>*]:w-12"><span>0</span></div>
            <div className="grid justify-center [&>*]:w-12"><span>&lt; 1</span></div>
            <div className="grid justify-center [&>*]:w-12"><span>1 - 2</span></div>
            <div className="grid justify-center [&>*]:w-12"><span>&gt; 2</span></div>
          </div>
        </div>
      </div>,
    // jsx: <input id={JobInput.exp} required type="number" className="grow" placeholder={JobInput.exp} />,
  }
  const location = {
    jsx: <input id={JobInput.location} type="text" className="grow" placeholder={JobInput.location} />,
  }
  const status = {
    jsx: <input id={JobInput.status} type="text" className="grow" placeholder={JobInput.status} />,
  }
  const notes = {
    jsx: <textarea id={JobInput.notes} className="grow textarea textarea-ghost" placeholder={JobInput.notes} />,
  }

  const formItem = (item: FormItem) => {
    return (
      <>
        <label className="flex justify-center items-center gap-2 p-10 [&>*]:bg-transparent [&>*]:capitalize [&>*]:text-center [&>*]:outline-none">
          {item.jsx}
        </label>
      </>
    )
  }

  const itemBundle = (list: Array<FormItem>) => {
    return (<>
      {list.map((item, index) => {
        return(
          <React.Fragment key={`form-item-bundled_${index.toString()}`}>
            {formItem(item)}
          </React.Fragment>
        )})
      }
    </>)
  }

  return (
    <Modal hide={hide}>
      <div ref={formRef} className='grid items-around justify-center'>
        {itemBundle([
          company,
          role,
          keywords,
          exp,
          location,
          status,
          notes
        ])}
        {/* {formItem(company)}
        {formItem(role)} */}
        <center>
          <button onClick={handlePost} className="btn btn-neutral w-full min-w-24 max-w-48">Post</button>
        </center>
      </div>
    </Modal>
  )

  // return (
  //   <div style={{position:"absolute"}}>
  //     <input type="checkbox" id="post-a-job" className="modal-toggle" />
  //     <div className="modal" role="dialog">
  //       <div className="modal-box">
  //         <h3 className="text-lg font-bold mb-4">Post a job</h3>
  //         <form style={{display:"grid", justifyContent:"center"}} action="">
  //           <label className='text-xs'>Date is registered automatically at submission time.</label><br />
  //           <label className='text-xs'>Status is automatically set to new at submission time.</label>
  //           <textarea placeholder="Company" className="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2" ></textarea>
  //           <textarea placeholder="Title" className="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2" ></textarea>
  //           <textarea placeholder="Link" className="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2" ></textarea>
  //           <textarea placeholder="Contact Name" className="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2" ></textarea>
  //           <textarea placeholder="Contact Profile Link" className="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2" ></textarea>
  //           <input type='number' placeholder="Years of experience" className="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2" ></input>
  //           <input type='number' placeholder="Other candidates" className="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2" ></input>
  //           <button className="btn mt-5">Post</button>
  //         </form>
  //       </div>
  //       <label className="modal-backdrop" htmlFor="post-a-job">Close</label>
  //     </div>
  //   </div>
  // )


}

export default PostModal