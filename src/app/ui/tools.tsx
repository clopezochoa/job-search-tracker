'use client'

import React, { useEffect, useState } from 'react'
import { CookieSymbol, SessionContextModel, createSettings, useSession } from '../providers/context'
import "@/app/style.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CalendarIcon, MinusIcon, PlusIcon } from '../icons'
import useSettings from '../hooks/useSettings'
import { useCookies } from 'react-cookie'

export function ToolsToggle({sessionContext}: {sessionContext: SessionContextModel}) {
  const cookie = useCookies([CookieSymbol.session]);
  const setSettings = useSettings;
  const initialToggle = sessionContext?.session.user?.settings?.isTools;
  const [toggle, setToggle] = useState<boolean>(initialToggle !== undefined ? initialToggle : false);

  return(
    <div>
      <label className="label cursor-pointer">
        <span className="label-text me-6 text-xl">Tools</span>
        <input checked={toggle} type="checkbox" className="toggle" onChange={() => {
          setToggle(toggle => !toggle);
          if(sessionContext?.session.isSession) setSettings({isTools: !toggle}, sessionContext, cookie);
        }}/>
      </label>
    </div>
  )
}

enum FilterType {
  include = "include",
  exclude = "exclude",
  dateStart = "date-start",
  dateEnd = "date-end",
  keywords = "keywords",
}

interface FilterModel {
  jsx: React.JSX.Element,
  icon: React.JSX.Element
}

interface FilterToolProps {
  placeholder:string,
  filterType:FilterType,
}

function DatePickerComponent(key: string, onChange?: (date: Date) => void) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    onChange ? onChange(date) : null;
  }, [date]);
  
  return(
    <div key={key}>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={date}
        onChange={(dateEvt: Date) => setDate(dateEvt)}
      />
    </div>
  );
}

function FilterToolComponent({placeholder, filterType}:FilterToolProps) {
  const sessionContext = useSession();
  const setSettings = useSettings;
  const cookie = useCookies([CookieSymbol.session]);
  const settings = sessionContext?.session.user?.settings;

  const handleSetting = (value: string | Date, type: FilterType) => {
    if(settings && sessionContext.session.isSession) {
      var currentSettings = createSettings(settings);
      switch (type) {
        case FilterType.include:
          if(typeof value === "string") currentSettings = createSettings(settings, {include: value});
          break;
        case FilterType.exclude:
          if(typeof value === "string") currentSettings = createSettings(settings, {exclude: value});
          break;
        case FilterType.dateStart:
          if(value instanceof Date) currentSettings = createSettings(settings, {dateStart: value});
          break;
        case FilterType.dateEnd:
          if(value instanceof Date) currentSettings = createSettings(settings, {dateEnd: value});
          break;
        default:
          break;
      }
      setSettings(currentSettings, sessionContext, cookie);
    }
  }  

  const getFilter = (filterType:FilterType): FilterModel => {
    switch (filterType) {
      case FilterType.include:
        return({
          jsx:<input type="text" className="grow" placeholder={placeholder} onChange={(e) => handleSetting(e.target.value, FilterType.include)} />,
          icon: PlusIcon
        });

      case FilterType.exclude:
        return({
          jsx:<input type="text" className="grow" placeholder={placeholder} onChange={(e) => handleSetting(e.target.value, FilterType.exclude)} />,
          icon: MinusIcon
        });

      case FilterType.dateStart:
        return({
          jsx: DatePickerComponent(FilterType.dateStart, (date: Date) => {handleSetting(date, FilterType.dateStart)}),
          icon: CalendarIcon
        });

      case FilterType.dateEnd:
        return({
          jsx: DatePickerComponent(FilterType.dateEnd, (date: Date) => {handleSetting(date, FilterType.dateEnd)}),
          icon: CalendarIcon
        });

      default:
        return({
          jsx:<></>,
          icon:<></>,
        });
    }
  }

  const filter = getFilter(filterType);
  return (<>
    <label className="input input-bordered flex items-center gap-2">
      {filter.jsx}
      {filter.icon}
    </label>
  </>
  )
}

export function Tools({sessionContext}: {sessionContext: SessionContextModel}) {
  const initialToggle = sessionContext?.session.user?.settings?.isTools;
  const [toggle, setToggle] = useState(initialToggle !== undefined ? initialToggle : false);
  useEffect(() => {
    if(sessionContext?.session.user?.settings?.isTools !== undefined) setToggle(sessionContext.session.user.settings.isTools)
  }, [sessionContext]);

  return (<>
  {sessionContext?.session.isSession ? 
    <ul className={`${!toggle ? "animate-opacity-hidden" : "animate-opacity-visible"} z-[1] menu p-2 shadow bg-base-100 rounded-box w-52`}>
      <FilterToolComponent placeholder='Include' filterType={FilterType.include}/>
      <FilterToolComponent placeholder='Exclude' filterType={FilterType.exclude}/>
      <FilterToolComponent placeholder='Date Start' filterType={FilterType.dateStart} />
      <FilterToolComponent placeholder='Date End' filterType={FilterType.dateEnd} />
    </ul>
:
<></>
  }
  </>)
}