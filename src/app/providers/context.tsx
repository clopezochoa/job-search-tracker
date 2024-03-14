'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

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
    isTools: args?.isTools !== undefined ? args.isTools : clone?.isTools,
    include: args?.include ? args.include : clone?.include,
    exclude: args?.exclude ? args.exclude : clone?.exclude,
    dateStart: args?.dateStart ? args.dateStart : clone?.dateStart,
    dateEnd: args?.dateEnd ? args.dateEnd : clone?.dateEnd,
  }
}

export function cloneSettings(
  settings: SettingsModel
) {
  return {
    isTools: settings.isTools,
    include: settings.include,
    exclude: settings.exclude,
    dateStart: settings.dateStart,
    dateEnd: settings.dateEnd,
  }
}

type SettingsContextModel = {
  settings: SettingsModel;
  updateSettings: (settings: SettingsModel) => void;
}

const defaultSettings = {
  isTools: false,
  include: "",
  exclude: "",
  dateStart: new Date(),
  dateEnd: new Date(),
} as SettingsModel;

const ClientLoadCtx = createContext(false);
export const SettingsCtx = createContext<SettingsContextModel | null>(null);

export const ContextProvider = ({ children }:{children: ReactNode}) => {
  const [clientLoad, setClientLoad] = useState(false);
  const [currentSettingsContext, setCurrentSettingsContext] = useState(defaultSettings);

  const updateSettings = (settings: SettingsModel) => {
    setCurrentSettingsContext(settings);
  }

  useEffect(() => setClientLoad(true), []);

  return (
    <ClientLoadCtx.Provider value={clientLoad}>
      <SettingsCtx.Provider value={{settings: currentSettingsContext, updateSettings}}>
        {children}
      </SettingsCtx.Provider>
    </ClientLoadCtx.Provider>
  );
};

export function useIsClient() {
  return useContext(ClientLoadCtx);
}

export function useSettings() {
  return useContext(SettingsCtx);
}