import React, { ReactNode, useEffect } from 'react'
import { CloseIcon } from '../icons';

function Modal({children, hide}:{children:ReactNode, hide: () => void}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {document.body.style.overflow = "auto"};
  }, []);
  return (
    <div style={{position:"absolute", zIndex:"10", width:"100%", height:"100%"}} className="bg-slate-900">
      <div onClick={hide} style={{cursor:"pointer", position:"absolute", zIndex:"11", top:"15px", right:"15px"}}>
        {CloseIcon}
      </div>
      <center>
        {children}
      </center>
    </div>
  )
}

export default Modal