'use client'

import React, { useEffect, useState } from 'react'
import { createSettings, useSettings } from '../providers/context'
import "@/app/style.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CalendarIcon, MinusIcon, PlusIcon } from '../icons'

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
  const settings = useSettings();

  const handleSetting = (value: string | Date, type: FilterType) => {
    if(settings) {
      var currentSettings = createSettings(settings.settings);
      switch (type) {
        case FilterType.include:
          if(typeof value === "string") currentSettings = createSettings(settings.settings, {include: value});
          break;
        case FilterType.exclude:
          if(typeof value === "string") currentSettings = createSettings(settings.settings, {exclude: value});
          break;
        case FilterType.dateStart:
          if(value instanceof Date) currentSettings = createSettings(settings.settings, {dateStart: value});
          break;
        case FilterType.dateEnd:
          if(value instanceof Date) currentSettings = createSettings(settings.settings, {dateEnd: value});
          break;
        default:
          break;
      }
      settings.updateSettings(currentSettings)
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

export function ToolsToggle() {
  const settings = useSettings();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    settings?.updateSettings(createSettings(settings.settings, {isTools: toggle}));
  }, [toggle]);

  return(
    <div>
      <label className="label cursor-pointer">
        <span className="label-text me-6 text-xl">Tools</span>
        <input type="checkbox" className="toggle" onChange={() => setToggle(toggle => !toggle)}/>
      </label>
    </div>
  )
}

export default function Tools() {
  const settings = useSettings();
  return (<>
    <ul className={`${!settings?.settings.isTools ? "animate-opacity-hidden" : "animate-opacity-visible"} z-[1] menu p-2 shadow bg-base-100 rounded-box w-52`}>
      <FilterToolComponent placeholder='Include' filterType={FilterType.include}/>
      <FilterToolComponent placeholder='Exclude' filterType={FilterType.exclude}/>
      <FilterToolComponent placeholder='Date Start' filterType={FilterType.dateStart} />
      <FilterToolComponent placeholder='Date End' filterType={FilterType.dateEnd} />
    </ul>
  </>)
}