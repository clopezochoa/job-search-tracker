'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { UserData } from "../client-lib";
import { useCookies } from "react-cookie";
import { CookiesProvider } from "react-cookie";

export enum CookieSymbol {
  session = "job-query-session",
  jobs = "job-query-jobs",
}

export interface SettingsModel {
  isTools?: boolean,
  include?: string,
  exclude?: string,
  dateStart?: Date,
  dateEnd?: Date,
}

export function createSettings(
  clone?: SettingsModel,
  args?: {
    isTools?: boolean,
    include?: string,
    exclude?: string,
    dateStart?: Date,
    dateEnd?: Date
  }
  ) {  
  return {
    isTools: (args?.isTools !== undefined ? args.isTools : clone?.isTools) ?? false,
    include: (args?.include !== undefined ? args.include : clone?.include) ?? "",
    exclude: (args?.exclude !== undefined ? args.exclude : clone?.exclude) ?? "",
    dateStart: (args?.dateStart !== undefined ? args.dateStart : clone?.dateStart) ?? new Date(),
    dateEnd: (args?.dateEnd !== undefined ? args.dateEnd : clone?.dateEnd) ?? new Date(),
  }
}

export type SessionContextModel = {
  session: Session;
  updateSession: (session: Session) => void;
  updateSettings: (settings: SettingsModel) => void;
}

export interface Session {
  isSession: boolean;
  user: UserData | null;
}

export function createSession(isSession: boolean = false, user?: UserData){
  return { isSession: isSession, user: user } as Session;
}

const ClientLoadCtx = createContext(false);
export const SessionCtx = createContext<SessionContextModel | null>(null);

export const ContextProvider = ({ children }:{children: ReactNode}) => {
  const [clientLoad, setClientLoad] = useState(false);

  useEffect(() => setClientLoad(true), []);

  const [cookie, setCookie] = useCookies([CookieSymbol.session]);

  let isSessionInitial = { isSession: false, user: null } as Session;
  const userSessionCookie = cookie[CookieSymbol.session];
  if (userSessionCookie) {
    if(userSessionCookie.message !== "Error") {
      isSessionInitial = userSessionCookie;
    }
  }
  
  const [currentSessionContext, setCurrentSessionContext] = useState(isSessionInitial);

  const updateSession = (session: Session) => {
    setCurrentSessionContext(session);
  }

  const updateSettings = (settings: SettingsModel) => { 
    if(currentSessionContext && currentSessionContext.isSession && currentSessionContext.user) {
      setCurrentSessionContext(
        {
          isSession: currentSessionContext.isSession,
          user: {
            key: currentSessionContext.user.key,
            name: currentSessionContext.user.name,
            email: currentSessionContext.user.email,
            password: currentSessionContext.user.password,
            settings: createSettings(currentSessionContext.user.settings, settings)  
          }
        } as Session
      )
    }
  }

  return (
    <CookiesProvider>
      <SessionCtx.Provider value={{session: currentSessionContext, updateSession, updateSettings}}>
        <ClientLoadCtx.Provider value={clientLoad}>
          {children}
        </ClientLoadCtx.Provider>
      </SessionCtx.Provider>
    </CookiesProvider>
  );
};

export function useIsClient() {
  return useContext(ClientLoadCtx);
}

export function useSession() {
  return useContext(SessionCtx);
}