'use client'

import React, { useRef, useState } from 'react'
import { EmailIcon, KeyIcon } from '../icons'
import Modal from './modal'
import { CookieSymbol, createSession, createSettings, useSession } from '../providers/context';
import { useCookies } from 'react-cookie';
import { UserData } from '../client-lib';
import { genSaltSync, hashSync } from 'bcrypt-ts';

export function Login({hide}:{hide:() => void}) {
  const sessionContext = useSession();
  const [cookie, setCookie] = useCookies([CookieSymbol.session]);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const userSessionCookie = cookie[CookieSymbol.session];
    if(userSessionCookie) {
      if(userSessionCookie.message !== "Error") {
        sessionContext?.updateSession(createSession(true, userSessionCookie));
        return;
      }
    }
    
    try {
      if(emailRef.current && passwordRef.current) {
        const email = (emailRef.current as HTMLInputElement).value;
        const password = (passwordRef.current as HTMLInputElement).value;
        const body = {email, password} as UserData;
        const token = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const user = await token.json();
        if(user && user.message !== "Error") {
          setCookie(CookieSymbol.session, JSON.stringify(user as UserData), {
            path: "/",
            maxAge: 3600,
            sameSite: "strict",
          });
          sessionContext?.updateSession(createSession(true, user));
          hide();
        } else {
          throw new Error("Error while authenticating.")
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const [passwordVisible, setPasswordVisible] = useState(false);

  const email = {
    jsx: <input ref={emailRef} required type="text" className="grow" placeholder="Email" />,
    icon: EmailIcon
  }
  const password = {
    jsx: <input ref={passwordRef} required type={passwordVisible ? "text" : "password"} className="grow" placeholder='Password'/>,
    icon: <i onClick={() => setPasswordVisible(passwordVisible => !passwordVisible)}>{KeyIcon}</i>
  }

  const formItem = (item: {jsx: React.JSX.Element, icon: React.JSX.Element}) => {
    return (
      <>
        <label className="input input-bordered flex items-center gap-2">
          {item.jsx}
          {item.icon}
        </label>
      </>
    )
  }
  return (
    <Modal hide={hide}>
      <div style={{position: "absolute", top:"25%", right:"25%", width:"50%", height:"50%", display:"grid", alignItems:"space-around"}}>
        {formItem(email)}
        {formItem(password)}
        <button onClick={handleLogin} className="btn btn-neutral">Login</button>
      </div>
    </Modal>
  )
}

export function Signup({hide}:{hide:() => void}) {
  const sessionContext = useSession();
  const [cookie, setCookie] = useCookies([CookieSymbol.session]);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const userSessionCookie = cookie[CookieSymbol.session];
    if(userSessionCookie) {
      if(userSessionCookie.message !== "Error") {
        sessionContext?.updateSession(createSession(true, userSessionCookie));
        return;
      }
    }
    
    try {
      if(emailRef.current && passwordRef.current && nameRef.current) {
        const settings = createSettings();
        const key = genSaltSync(4);
        const name = (nameRef.current as HTMLInputElement).value;
        const email = (emailRef.current as HTMLInputElement).value;
        var password = (passwordRef.current as HTMLInputElement).value;
        const salt = genSaltSync(10);
        password = hashSync(password, salt);  
        const body = {key, name, email, password, settings} as UserData;
        const token = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const response = await token.json();
        if(response) {
          setCookie(CookieSymbol.session, JSON.stringify(body), {
            path: "/",
            maxAge: 3600,
            sameSite: "strict",
          });
          sessionContext?.updateSession(createSession(true, body));
          hide();
        }
      } else {
        throw new Error("No email or password HTML element was found.")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const [passwordVisible, setPasswordVisible] = useState(false);
  const name = {
    jsx: <input ref={nameRef} type="text" className="grow" placeholder="Name" />,
    icon: <></>
  }
  const email = {
    jsx: <input ref={emailRef} required type="text" className="grow" placeholder="Email" />,
    icon: EmailIcon
  }
  const password = {
    jsx: <input ref={passwordRef} required type={passwordVisible ? "text" : "password"} className="grow" placeholder='Password'/>,
    icon: <i onClick={() => setPasswordVisible(passwordVisible => !passwordVisible)}>{KeyIcon}</i>
  }

  const formItem = (item: {jsx: React.JSX.Element, icon: React.JSX.Element}) => {
    return (
      <>
        <label className="input input-bordered flex items-center gap-2">
          {item.jsx}
          {item.icon}
        </label>
      </>
    )
  }
  return (
    <Modal hide={hide}>
      <div style={{position: "absolute", top:"25%", right:"25%", width:"50%", height:"50%", display:"grid", alignItems:"space-around"}}>
        {formItem(name)}
        {formItem(email)}
        {formItem(password)}
        <button onClick={handleSignup} className="btn btn-neutral">Login</button>
      </div>
    </Modal>
  )
}