import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomSelect from '../../../structure/CustomSelect'
import {Createinvoice} from '../../js/invoices-function.js'

function Attachment({ filename, setFiles }) {
    const [name, setName] = useState("");
    const [extension, setExtension] = useState("");

    useEffect(() => {
        if (filename) {
            const data = filename.split("\\");
            const file = data[data.length - 1].split(".");
            setExtension(file[file.length - 1].toUpperCase());
            setName(file.slice(0, file.length - 1).join("."));
        }
    }, [filename])

    return (
        <>
            {
                filename ? <div className='d-flex border-bottom border-dark pb-1 align-items-center mt-3'>
                    <label for="files" className='fw-normal me-2'>
                        File:
                    </label>
                    <div className="d-flex flex-fill align-items-center justify-content-between bg-blue10 py-2 border rounded-2">
                        < div className='d-flex' >
                            <img src="/payments/attachment.svg" width={40} className='px-2 me-2' />
                            <p className='fw-500 m-0 me-2'>{extension}</p>
                            <p className='fw-normal m-0'>{name}</p>
                        </div >
                        <img src="/delete_blue.svg" width={40} className='px-2' onClick={() => setFiles("")} role='button' />
                    </div ></div> : <label for="files" className='fw-normal mt-3 border-bottom border-dark pb-2'>
                    File:
                </label>
            }
        </>
    )
}

function Send({ setCurrentState,sendfields,parsedCustomerdata }) {
    console.log(sendfields)
    const[isLoading,setIsLoading]=useState(false)
    const [files, setFiles] = useState();
    const handleCreateInvoice = async () => {
        try {
          setIsLoading(true);
          await Createinvoice(sendfields,parsedCustomerdata);
          // Handle success, e.g., redirect or show a success message
        } catch (error) {
          // Handle error, e.g., show an error message
        } finally {
          setIsLoading(false);
        }
      };

      const options = [
        { value: 'user1@example.com', label: 'user1@example.com' },
        { value: 'user2@example.com', label: 'user2@example.com' },
        { value: 'user3@example.com', label: 'user3@example.com' },
        { value: 'user4@example.com', label: 'user4@example.com' },
        { value: 'user5@example.com', label: 'user5@example.com' },
        // Add more sample email addresses as needed
      ];
      //You can continue to add more email addresses to the options array as required. Each object in the array should have both value and label properties with the same email address value for both.
      
      
      
      
      
      
    const [from, setFrom] = useState(sessionStorage.getItem("lastemail"));
    const [to, setTo] = useState("");

    return (
        <div>
            <div className='d-flex align-items-center my-4'>
                <p className='m-0 mx-3 blue100 fw-normal'>1. Items</p>
                <img src="/payments/lineH.svg" />
                <p className='m-0 mx-3 blue100 fw-normal'>2. Details</p>
                <img src="/payments/lineH.svg" />
                <p className='m-0 mx-3 blue100 fw-500'>3. Send</p>
            </div>

            <div className='opacity-50 m-3' onClick={() => setCurrentState("details")} role='button'>
                <img src='/arrows/arrowLeft.svg' width={10} />
                &nbsp; back
            </div>


            <div className='d-flex flex-column p-3'>
                {(from.length) ? <label className='grey1 fw-normal'>From:</label> : ""}
                <TextField variant='standard' label="Subject:" className='my-3'defaultValue={sessionStorage.getItem("lastemail")} />
                {/* <CustomSelect placeholder="From:" className="border-bottom border-dark mb-3" setValue={setFrom} options={options} /> */}
                {(to.length) ? <label className='grey1 fw-normal'>To:</label> : ""}
                <CustomSelect placeholder="To:" className="border-bottom border-dark" setValue={setTo} multiple={true} options={options} />
                <TextField variant='standard' label="Subject:" className='my-3' />
                <input id='files' type='file' className='mt-3' onChange={(e) => setFiles(e.target.value)} title="File:" hidden />
                <Attachment filename={files} setFiles={setFiles} />
                <TextField variant='standard' label="Message:" className='mt-3' />
            </div>
            


            <div className='d-flex justify-content-between mt-4'>
                <div>
                    <button className='btn fw-500 green100 border me-2'>Save as Draft
                        <img src='/payments/save.svg' className='ms-1' />
                    </button>
                    <button className='btn fw-500 yellow100 border me-2'>Delete
                        <img src='/payments/delete.svg' className='ms-1' />
                    </button>
                </div>



                <div>
                    <button
                        type="button"
                        className='btn bg-green100 text-white border w-100 rounded-3 d-flex align-items-center justify-content-center py-2 fw-500'
                        onClick={handleCreateInvoice}
                        disabled={isLoading}
                    >
                         {isLoading ? 'Loading...' : 'Send Invoice '} &gt;
                        
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Send