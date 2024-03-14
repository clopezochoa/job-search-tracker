import React from 'react'

function PostModal() {
  return (
    <div style={{position:"absolute"}}>
      <input type="checkbox" id="post-a-job" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold mb-4">Post a job</h3>
          <form style={{display:"grid", justifyContent:"center"}} action="">
            <label className='text-xs'>Date is registered automatically at submission time.</label><br />
            <label className='text-xs'>Status is automatically set to new at submission time.</label>
            <textarea placeholder="Company" className="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2" ></textarea>
            <textarea placeholder="Title" className="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2" ></textarea>
            <textarea placeholder="Link" className="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2" ></textarea>
            <textarea placeholder="Contact Name" className="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2" ></textarea>
            <textarea placeholder="Contact Profile Link" className="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2" ></textarea>
            <input type='number' placeholder="Years of experience" className="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2" ></input>
            <input type='number' placeholder="Other candidates" className="textarea textarea-bordered textarea-xs w-full max-w-xs mt-2" ></input>
            <button className="btn mt-5">Post</button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="post-a-job">Close</label>
      </div>
    </div>
  )
}

export default PostModal