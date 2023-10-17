import Axios from "axios";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export const listbills = async () => {debugger
  try {
    const data = await callNodeAPI();
    return data;
  } catch (error) {
    // Handle errors
  }
};
// const [tableData,setTableData]=useState('');

 const callNodeAPI = async () => {
  // if (process.env.NODE_ENV === "development") {
  //  var baseUrl="https://demo-zoqq.stylopay.com:9000"
  // } else {
  //   var baseUrl ="https://demo-zoqq.stylopay.com:9000"
  // }
  var company= sessionStorage.getItem("internalBusinessId")
  const response = await Axios.get(sessionStorage.getItem("baseUrl")+"/expense/listbills", {
    params: {
      
      companyId:company
    },
  });
  
  let obj = response.data;
  
  
  //let parseddata=JSON.parse(obj);
  console.log(obj);
 
  if (obj.length == 0) {
    console.log("No Bills found!");
    //toast.error("No bill found")
    //sessionStorage.setItem("Billfound", "N");
    
  }
  if (obj.statusText == "Internal Server Error") {
    console.log("Internal Server Error");
  }
  //sessionStorage.setItem("Billfound", "Y");
  return obj;
};
export const docanalysis = async (selectedFileName) => {debugger
 console.log(selectedFileName)
 var objectkey = selectedFileName
 
  const response = await Axios.get(sessionStorage.getItem("baseUrl")+"/expense/docanalysis", {
    params: {
     objectKey: objectkey
    },
  });
  console.log(response);

  if (response.data.hasOwnProperty("query_results")) {
    let obj = response.data.query_results;
    console.log(obj);

    if (obj.length === 0) {
      console.log("No Doc found!");
    }

    return obj; // Return the obj
  } 
  else{debugger
    //toast.error("something went erong")
    console.log("Mock data")
    return {
      "InvoiceNumber": "# FAH4KH2300119141",
      "TotalAmount": "1000",
      "OrderNumber": "OD126075829427635000",
      "address": "Instakart Services Private Limited, Plot No A1,, Haringhata Industrial Park, District Nadia, West Bengal Pin- 741249, Nadia, WEST BENGAL, India 741249, IN-WB",
      "duedate": "2023-Oct-16",
      "invoicedate": "2023-Oct-16",
      "tax": NaN
  };
  }
  //let obj = response.data.query_results;
  
  
  //let parseddata=JSON.parse(obj);
  // console.log(obj);
 
  // if (obj.length == 0) {
  //   console.log("No Doc found!");
  // }
  // if (obj.statusText == "Internal Server Error") {
  //   console.log("Internal Server Error");
  // }

  // return obj;
};
export const createbill = async (reviewFields) => {debugger
  
  var id = reviewFields.Billnumber;
  var companyId = reviewFields.CompanyId;
  var date = reviewFields.Billdate;
  var dueDate = reviewFields.Duedate;
  var amount = reviewFields.TotalAmount;
  var currency=reviewFields.currency;
  var description=reviewFields.Description;
  var imgUrl=reviewFields.Imageurl;
  var createdBy=reviewFields.Createdby;
  var sourceOfFund=reviewFields.SourceofFunds;
  var recipientName=reviewFields.RecipientName;
 
 
  const response = await Axios.get(sessionStorage.getItem("baseUrl")+"/expense/createbill", {
    params: {
      id: id,
      companyId: companyId,
      date: date,
      dueDate: dueDate,
      amount: amount,
      currency: currency,
      description: description,
      imgUrl: imgUrl,
      createdBy: createdBy,
      sourceOfFund: sourceOfFund,
      recipientName: recipientName
    },
  });
  let obj = response.data;
  
  
  //let parseddata=JSON.parse(obj);
  console.log(obj);
 
  if (obj.length == 0) {
    toast.error('Something went wrong')
  }
  if (obj.statusText == "Internal Server Error") {
    toast.error("Internal Server Error");
  }
  if(obj.status=='BAD_REQUEST'){
    toast.error(obj.message)
  }
  else{
    console.log(obj)
    toast.success(obj.message)
    
  }

  return obj;
};

export const uploadtos3 = async (selectedFileName,base64EncodedFile) => {debugger
  console.log(base64EncodedFile)
  var file = base64EncodedFile;
  const dataToSend = {
    filename: selectedFileName,
    file: base64EncodedFile,
    
  };
  console.log(dataToSend);
  
  const response = await Axios.post(sessionStorage.getItem("baseUrl")+"/expense/uploadtos3",dataToSend);
  let obj = response.data;
  
  
  //let parseddata=JSON.parse(obj);
  console.log(obj);
 
  if (obj.length == 0) {
    //toast.error('Something went wrong')
    return "https://stylopay-sandbox-ohio-dev-dump-public.s3.amazonaws.com/OD126075829427635000%20(1).pdf";
  }
  if (obj.statusText == "Internal Server Error") {
    toast.error("Internal Server Error");
  }
  if(obj.status=='BAD_REQUEST'){
    toast.error(obj.message)
  }
  if(obj.hasOwnProperty("message")){
    toast.error(obj.message)
    return obj;
    
  }
  if(obj.hasOwnProperty("url")){
    return obj.url;

  }
  else{
    return "https://stylopay-sandbox-ohio-dev-dump-public.s3.amazonaws.com/OD126075829427635000%20(1).pdf"
  }

};