import { TextField } from '@mui/material'
import React from 'react'

function Password() {
  return (
    <div className='row'>
        <div className='col-6 my-5 mx-auto'>
            <p className='fs-5 mb-0'>Password</p>
            <p><span className='fw-normal'>Last changed: </span> 20 May, 2023</p>

            <TextField variant='standard' className='w-100 my-3' label="Old Password" type='password' />
            <TextField variant='standard' className='w-100 my-3' label="New Password" type='password' />
            <TextField variant='standard' className='w-100 my-3' label="Comfirm New Password" type='password' />

            <button className='btn w-100 text-white bg-blue100 fw-500 py-3 my-3'>SAVE CHANGES</button>
        </div>
    </div>
  )
}

export default Password