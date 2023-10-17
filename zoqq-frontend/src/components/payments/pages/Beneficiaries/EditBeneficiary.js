import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CustomTextField from '../../../structure/CustomText';
import CustomSelect from '../../../structure/CustomSelect';
import NumberField from '../../../structure/NumberField';
import { CiEdit } from 'react-icons/ci';
// import CustomSelect from './CustomSelect'

function BasicInfo({ setCurrentState }) {
    const [isBusiness, setIsBusiness] = useState(false);

    return (
        <>

            <h5 className='text-dark'>{isBusiness ? "Business" : "Personal"} Info</h5>

            <div className='d-flex my-3'>
                <div className={!isBusiness ? 'border-bottom border-dark py-2 text-dark w-50' : 'border-bottom grey1 w-50 py-2'} onClick={() => setIsBusiness(false)} role='button'>
                    Personal
                </div>
                <div className={isBusiness ? 'border-bottom border-dark py-2 text-dark w-50' : 'border-bottom grey1 w-50 py-2'} onClick={() => setIsBusiness(true)} role='button'>
                    Business
                </div>
            </div>

            <form className='overflow-auto border py-3 px-2 rounded-4' style={{ maxHeight: "50vh" }}>
                <div className='d-flex'>
                    <div className='d-flex border-bottom mb-4 w-50 me-1'>
                        <div className='d-flex'>
                            <img src="/payments/name.svg" width={40} className='border-end my-auto px-2' />
                        </div>
                        <div className="input-group containertext w-100 h-100">
                            <CustomTextField label={isBusiness ? "Business Name" : "Name"} />
                        </div>
                    </div>

                    <div className='d-flex border-bottom mb-4 w-50 ms-1'>
                        <div className='d-flex'>
                            <img src="/payments/email.svg" width={40} className='border-end my-auto px-2' />
                        </div>
                        <div className="input-group containertext w-100 h-100">
                            <CustomTextField label={isBusiness ? "Business Email" : "Email"} />
                        </div>
                    </div>
                </div>

                <div className='d-flex'>
                    {!isBusiness && <div className='d-flex border-bottom mb-4 w-100 me-1'>
                        <div className='d-flex'>
                            <img src="/payments/phone.svg" width={40} className='border-end my-auto px-2' />
                        </div>
                        <div className="input-group containertext w-100 h-100">
                            <div className="w-25">
                                <CustomSelect placeholder="Code" />
                            </div>
                            <CustomTextField label="Phone" className="w-75" />
                        </div>
                    </div>}

                    <div className='d-flex border-bottom mb-4 w-100 ms-1'>
                        <div className='d-flex'>
                            <img src="/payments/iban.svg" width={40} className='border-end my-auto px-2' />
                        </div>
                        <div className="input-group containertext w-100 h-100">
                            <CustomTextField label="IBAN" />
                        </div>
                    </div>
                </div>

                <div className='d-flex border-bottom mb-4'>
                    <div className='d-flex'>
                        <img src="/payments/iban.svg" width={40} className='border-end my-auto px-2' />
                    </div>
                    <div className="input-group containertext w-100 h-100">
                        <CustomTextField label="Address" />
                    </div>
                </div>

                <div className='d-flex'>
                    <div className='d-flex border-bottom mb-4 w-100 me-1'>
                        <div className='d-flex'>
                            <img src="/payments/iban.svg" width={40} className='border-end my-auto px-2' />
                        </div>
                        <div className="input-group containertext w-100 h-100">
                            <CustomSelect placeholder="Country" />
                        </div>
                    </div>

                    <div className='d-flex border-bottom mb-4 w-100 mx-1'>
                        <div className='d-flex'>
                            <img src="/payments/iban.svg" width={40} className='border-end my-auto px-2' />
                        </div>
                        <div className="input-group containertext w-100 h-100">
                            <CustomSelect placeholder="State" />
                        </div>
                    </div>

                    <div className='d-flex border-bottom mb-4 w-100 ms-1'>
                        <div className='d-flex'>
                            <img src="/payments/iban.svg" width={40} className='border-end my-auto px-2' />
                        </div>
                        <div className="input-group containertext w-100 h-100">
                            <CustomSelect placeholder="City" />
                        </div>
                    </div>
                </div>

                <div className='d-flex'>
                    <div className='d-flex border-bottom mb-4 w-100 me-1'>
                        <div className='d-flex'>
                            <img src="/payments/iban.svg" width={40} className='border-end my-auto px-2' />
                        </div>
                        <div className="input-group containertext w-100 h-100">
                            <NumberField label="Postcode" />
                        </div>
                    </div>

                    <div className='d-flex border-bottom mb-4 w-100 ms-1'>
                        <div className='d-flex'>
                            <img src="/payments/iban.svg" width={40} className='border-end my-auto px-2' />
                        </div>
                        <div className="input-group containertext w-100 h-100">
                            <CustomSelect placeholder="Destination Country" />
                        </div>
                    </div>
                </div>


            </form>
            <button className='btn bg-green100 fw-500 text-white py-3 w-100 mt-3' onClick={() => setCurrentState("account")}>Next</button>

        </>
    )
}

function AccountInfo({ setCurrentState }) {
    const [isBusiness, setIsBusiness] = useState(false);

    return (
        <>

            <h5 className='text-dark mb-3'>Account Info</h5>

            <form className='overflow-auto border py-3 px-2 rounded-4' style={{ maxHeight: "50vh" }}>
                <div className='d-flex'>
                    <div className='d-flex border-bottom mb-4 w-100 me-1'>
                        <div className='d-flex'>
                            <img src="/payments/name.svg" width={40} className='border-end my-auto px-2' />
                        </div>
                        <div className="input-group containertext w-100 h-100">
                            <CustomSelect placeholder="Benificiary Account Type" />
                        </div>
                    </div>

                    <div className='d-flex border-bottom mb-4 w-100 ms-1'>
                        <div className='d-flex'>
                            <img src="/payments/name.svg" width={40} className='border-end my-auto px-2' />
                        </div>
                        <div className="input-group containertext w-100 h-100">
                            <CustomSelect placeholder="Destination Currency" />
                        </div>
                    </div>
                </div>

                <div className='d-flex'>
                    <div className='d-flex border-bottom mb-4 w-50 me-1'>
                        <div className='d-flex'>
                            <img src="/payments/email.svg" width={40} className='border-end my-auto px-2' />
                        </div>
                        <div className="input-group containertext w-100 h-100">
                            <NumberField label="Benificiary Account Number" />
                        </div>
                    </div>

                    <div className='d-flex border-bottom mb-4 w-50 ms-1'>
                        <div className='d-flex'>
                            <img src="/payments/iban.svg" width={40} className='border-end my-auto px-2' />
                        </div>
                        <div className="input-group containertext w-100 h-100">
                            <CustomTextField label="Routing Code Type 1" />
                        </div>
                    </div>
                </div>

                <div className='d-flex'>
                    <div className='d-flex border-bottom mb-4 w-100 me-1'>
                        <div className='d-flex'>
                            <img src="/payments/iban.svg" width={40} className='border-end my-auto px-2' />
                        </div>
                        <div className="input-group containertext w-100 h-100">
                            <CustomTextField label="Routing Code Value 1" />
                        </div>
                    </div>

                    <div className='d-flex border-bottom mb-4 w-100 ms-1'>
                        <div className='d-flex'>
                            <img src="/payments/iban.svg" width={40} className='border-end my-auto px-2' />
                        </div>
                        <div className="input-group containertext w-100 h-100">
                            <CustomSelect placeholder="Payment Method" />
                        </div>
                    </div>
                </div>

            </form>
            <div className='d-flex mt-3'>
                <button className='btn bg-blue100 fw-500 text-white py-3 w-100 mt-3 me-2' onClick={() => setCurrentState("basic")}>Back</button>
                <button className='btn bg-green100 fw-500 text-white py-3 w-100 mt-3 ms-2' onClick={() => setCurrentState("account")}>Submit</button>
            </div>

        </>
    )
}

function EditBeneficiary() {

    const [currentState, setCurrentState] = useState("basic");

    const options = [
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'caramel', label: 'Caramel' },
        { value: 'mint', label: 'Mint' },
        { value: 'blueberry', label: 'Blueberry' },
        { value: 'raspberry', label: 'Raspberry' },
        { value: 'hazelnut', label: 'Hazelnut' },
        { value: 'peanut_butter', label: 'Peanut Butter' },
        { value: 'coconut', label: 'Coconut' },
        { value: 'lemon', label: 'Lemon' },
        { value: 'coffee', label: 'Coffee' },
        { value: 'pistachio', label: 'Pistachio' },
        { value: 'banana', label: 'Banana' },
        { value: 'butterscotch', label: 'Butterscotch' },
        { value: 'cherry', label: 'Cherry' },
        { value: 'almond', label: 'Almond' },
        { value: 'cinnamon', label: 'Cinnamon' },
        { value: 'honey', label: 'Honey' },
        { value: 'orange', label: 'Orange' },
        { value: 'maple', label: 'Maple' }
    ]

    return (
        <>
            {/* Button trigger modal */}
            <button
                type="button"
                className='btn border rounded-3 my-2 py-3 bg-yellow100 text-white fw-500'
                data-bs-toggle="modal"
                data-bs-target="#EditBenificiaryModal"
            >
                <CiEdit size={40} className='me-2' />
                Edit
            </button>


            {/* Modal */}
            <div
                className="modal fade"
                id="EditBenificiaryModal"
                tabIndex={-1}
                aria-labelledby="EditBenificiaryModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content p-5 text-center">
                        <div className='d-flex justify-content-between my-2'>
                            <h5 className='text-dark'>
                                Edit Beneficiary
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>


                        <div className='d-flex my-2'>
                            <img src='/payments/createBeneficiaries.svg' className='mx-auto' />
                        </div>

                        {(currentState === "basic") ? <BasicInfo setCurrentState={setCurrentState} /> : <AccountInfo setCurrentState={setCurrentState} />}

                    </div>
                </div>
            </div>
        </>

    )
}

export default EditBeneficiary