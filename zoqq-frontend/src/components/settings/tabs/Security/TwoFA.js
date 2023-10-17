import React, { useState } from 'react'
import CustomSelect from '../../../structure/CustomSelect'
import CustomTextField from '../../../structure/CustomText'

function TwoFA() {
    const options = [
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'caramel', label: 'Caramel' },
        { value: 'mint', label: 'Mint' },
        { value: 'blueberry', label: 'Blueberry' },
        { value: 'raspberry', label: 'Raspberry' },
        { value: 'hazelnut', label: 'Hazelnut' },
        { value: 'peanut_butter', label: 'Peanut Butter' }
    ]
    const [val, setVal] = useState("");

    return (
        <div className='row'>
            <div className='col-6 my-5 mx-auto'>
                <p className='fs-5 mb-0'>Two-factor authentication</p>
                <p className='fw-normal'>You will receive a login request on this phone number</p>

                <div className='d-flex border-bottom my-4'>
                    <div className='d-flex'>
                        <img src="/bank_outline.svg" width={40} className='border-end my-auto px-2' />
                    </div>
                    <div className="input-group containertext w-100 h-100">
                        <CustomTextField label="Phone Number" />
                    </div>
                </div>

                <div className='d-flex border-bottom my-4'>
                    <div className='d-flex'>
                        <img src="/payments/name.svg" width={40} className='border-end my-auto px-2' />
                    </div>
                    <div className="input-group containertext w-100 h-100">
                        <CustomSelect placeholder="Confirmation via" options={options} setValue={setVal} />
                    </div>
                </div>


                <button className='btn w-100 text-white bg-blue100 fw-500 py-3 my-3'>SAVE CHANGES</button>
            </div>
        </div>
    )
}

export default TwoFA
