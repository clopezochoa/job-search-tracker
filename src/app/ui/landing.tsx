import React, { useRef, useState } from 'react'
import { CookieSymbol, createSession, createSettings, useSession } from '../providers/context';
import { useCookies } from 'react-cookie';
import { UserData } from '../client-lib';
import { EmailIcon, KeyIcon } from '../icons';
import { genSaltSync, hashSync } from 'bcrypt-ts';

function Landing() {

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
        } else {
          throw new Error("Error while authenticating.")
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

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
      if(emailRef.current && passwordRef.current) {
        const settings = createSettings();
        const key = genSaltSync(4);
        const email = (emailRef.current as HTMLInputElement).value;
        var password = (passwordRef.current as HTMLInputElement).value;
        const salt = genSaltSync(10);
        password = hashSync(password, salt);  
        const body = {key, email, password, settings} as UserData;
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
        }
      } else {
        throw new Error("No email or password HTML element was found.")
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
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse" style={{alignItems:"baseline"}}>
          <div className="text-center lg:text-left  ms-4">
            <h1 className="text-5xl font-bold">Welcome!</h1>
            <p className="py-6">Track your candidacies today, get the job you deserve tomorrow.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                {formItem(email)}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                {formItem(password)}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button onClick={(e) => handleLogin(e)} className="btn btn-primary">Login</button>
                <button onClick={(e) => handleSignup(e)} className="btn btn-secondary mt-3">Signup</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Landing