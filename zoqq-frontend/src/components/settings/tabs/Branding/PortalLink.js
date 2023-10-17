import React, { useEffect, useState } from 'react'
import CustomTextField from '../../../structure/CustomText'
import { TextField } from '@mui/material'
import { handleCopy } from '../../../structure/handleCopy';

function PortalLink() {
    const [subDomain, setSubDomain] = useState("");
    const [isApply, setIsApply] = useState(false);

    useEffect(() => {
        setIsApply(false);
    }, [subDomain])

    return (
        <>
            <div className='border rounded-4 p-3 m-3 w-25 mx-auto d-flex flex-column'>
                <label>Customize your sub-domain</label>
                <div className="d-flex my-1">
                    <TextField variant='standard' className='w-100 py-3' onChange={(e) => setSubDomain(e.target.value)} />
                    <TextField variant='standard' className='w-100 py-3' value=".zoqq.com" readOnly={true} />
                </div>

                <button className='btn w-100 bg-blue100 text-white mt-3'>Apply</button>
            </div>
            {<div className='border rounded-4 p-3 m-3 w-75 mx-auto d-flex flex-column'>
                <label>Bind your own domain</label>

                <p className='mt-4'>Enter your custom external domain &#40;e.g. mydomain.com&#41; in the field below to bind it to the environment</p>
                <div>
                    <TextField placeholder='mydomain.com' variant='standard' className='w-25' />
                    <button className='btn bg-blue100 text-white ms-1' onClick={() => setIsApply(true)}>Bind</button>
                </div>


                {isApply && <>
                    <p className='mt-4'>In your domain registrar, add a CNAME or ANAME record for the required custom domain to point to the current domain</p>
                    <div className='d-flex'>
                        <TextField variant='standard' className='w-25' value={"zoqq-alb-public-webdns-93134598090.eu-west-1.elb.amazonaws.com"} />
                        <button className='ms-1 btn bg-blue100 text-white' onClick={e => handleCopy(e, "zoqq-alb-public-webdns-93134598090.eu-west-1.elb.amazonaws.com")}>Copy</button>
                    </div>

                </>}
            </div>}
        </>
    )
}

export default PortalLink