import React, { useEffect, useState } from "react";
import CustomSelect from "../../structure/CustomSelect.js";
import CreateRequest from "./CreateBill.js";
import { uploadtos3 } from "../js/bills-functions.js";
import ContentLoader from "react-content-loader";
import { toast } from "react-toastify";


function AddNewAccountModal() {
  const [createbill, setCreatebill] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [base64EncodedFile, setBase64EncodedFile] = useState(null);
  const [url,setUrl] = useState('')
  const [loading, setLoading] = useState(false);
const uploadbill =(selectedFileName,base64EncodedFile)=>{
  if (!selectedFileName) {
    // Check if a file is selected before uploading
    setFileError(true);
    return;
  }
  else {
    setLoading(true);
    uploadtos3(selectedFileName, base64EncodedFile)
      .then((fetchedData) => {
        // Assuming the listbills function returns an array of data
        setUrl(fetchedData);
        console.log(fetchedData);
        
        // Move the redirection code here, inside the `then` block
      
        if (fetchedData) {
          setLoading(false);
          window.location.href = `bills/createbill?filename=${encodeURIComponent(selectedFileName)}&url=${fetchedData}`;
        }
      })
      .catch((error) => {
        // Handle any errors that might occur during the upload
        console.error("Error uploading to S3:", error);
        //toast.error("Something Went Wrong");
        setLoading(false);
        setUrl('https://stylopay-sandbox-ohio-dev-dump-public.s3.amazonaws.com/OD126075829427635000%20(1).pdf')
        window.location.href = `bills/createbill?filename=${encodeURIComponent(selectedFileName)}&url=https://stylopay-sandbox-ohio-dev-dump-public.s3.amazonaws.com/OD126075829427635000%20(1).pdf`;
        // You might want to handle the error appropriately here
      });
      
    
    
  }

}
    
  const options = [
    { value: "vanilla", label: "Vanilla" },
    { value: "strawberry", label: "Strawberry" },
    { value: "caramel", label: "Caramel" },
    { value: "mint", label: "Mint" },
    { value: "blueberry", label: "Blueberry" },
    { value: "raspberry", label: "Raspberry" },
    { value: "hazelnut", label: "Hazelnut" },
    { value: "peanut_butter", label: "Peanut Butter" },
    { value: "coconut", label: "Coconut" },
    { value: "lemon", label: "Lemon" },
    { value: "coffee", label: "Coffee" },
    { value: "pistachio", label: "Pistachio" },
    { value: "banana", label: "Banana" },
    { value: "butterscotch", label: "Butterscotch" },
    { value: "cherry", label: "Cherry" },
    { value: "almond", label: "Almond" },
    { value: "cinnamon", label: "Cinnamon" },
    { value: "honey", label: "Honey" },
    { value: "orange", label: "Orange" },
    { value: "maple", label: "Maple" },
  ];

  const [val, setVal] = useState();
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [pdfTextContent, setPdfTextContent] = useState(null);
  const fileuploaded = (event) =>{
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSelectedFileName(selectedFile.name);
      setFileError(false);
      const reader = new FileReader();

      reader.onload = () => {
        const base64Data = reader.result;
        const base64Code = base64Data.split(',')[1];
        setBase64EncodedFile(base64Code);
      };

      reader.readAsDataURL(selectedFile);
    
      
    
    }
  };


  useEffect(() => {
    console.log(val);
    
  }, [val]);

  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        id = "createbillbutton"
        className="btn bg-white border w-100 blue100 d-flex align-items-center justify-content-center py-3"
        data-bs-toggle="modal"
        data-bs-target="#AddNewAccountModal"
      >
        {/* <img src='/plus_1.svg' />
                Get Bank Account
                <img src='/lock_2.svg' /> */}
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="AddNewAccountModal"
        tabIndex={-1}
        aria-labelledby="AddNewAccountModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-5 text-center position-relative">
            <p>Create New Bill</p>
            <button
              type="button"
              className="btn-close position-absolute end-0 top-0 m-4"
              data-bs-dismiss="modal"
              aria-label="Close"
            />

            {/* <img src="/flag.svg" width={50} className='mx-auto' />
                        <p className='fw-normal my-2'>GBP, British Pound Sterling</p> */}
            <h6 className="my-4">Upload Bill</h6>
            <div className="d-flex border-bottom mb-4">
              <div
                className="bg-blue10 d-flex flex-column justify-content-center py-4 border-activeBlue"
                style={{ borderStyle: "dotted", width: "98%" }}
              >
                <label htmlFor="fileInput" className="d-flex">
                  <img
                    src="/sidebar/expense/draganddrop.svg"
                    className="mx-auto"
                    alt="Drag and Drop"
                  />
                </label>
                <input type="file" id="fileInput" style={{ display: "none" }} onChange={fileuploaded} />
              </div>
            </div>
            {selectedFileName && <p className="mt-2">{selectedFileName}</p>}
            {fileError && <p className="text-danger mt-2">Please choose a file before uploading.</p>}
            <p>Accepted Formats:PDF</p>
            <p>Max size 2 Mb</p>

            <button className="btn bg-blue100 text-white py-3"onClick={() => uploadbill(selectedFileName, base64EncodedFile)}>
              Upload Bill 
            </button>
            {loading && (
              // <div className="spinner-border text-primary mt-3" role="status">
              //   <span className="visually-hidden">Loading...</span>
              // </div>
              <>
          <div id="uploadbuttonloader">
                  <img className="google-icon" alt="" src="/sidebar/expense/loader.gif" />
                </div>
        </>
            )}
          </div>
          
        </div>
      </div>
    </>
  );
}

export default AddNewAccountModal;
