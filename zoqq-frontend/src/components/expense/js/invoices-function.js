import Axios from "axios";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { json } from "react-router-dom";

// const [tableData,setTableData]=useState('');
export const listinvoices = async () => {debugger
  
   var company= sessionStorage.getItem("internalBusinessId")
  const response = await Axios.get(sessionStorage.getItem("baseUrl")+"/expense/listinvoices", {
    params: {
      
      companyId:company
    },
  });
  let obj =response.data;
  if (response.status === 200 && response.data) {
    console.log("Data found:", response.data);
    let obj = response.data;
  
    return obj;
  }
  if(obj.length==0){
    //toast.error("No invoice found")
    console.log("No Invoice Found")

  } else {
    console.log("No Invoice found or Internal Server Error!");
    toast.error("Something went Wrong")
    return null; 
  }
  
  
};

export const Createinvoice = async (sendfields,setCurrentState,parsedCustomerdata) => {debugger
  
  var id = sendfields.Invoicenumber;
  var companyId = sendfields.CompanyId;
  var date = sendfields.invoiceDate;
  var dueDate = sendfields.dueDate;
  var description=sendfields.Description;
  var imgUrl=sendfields.Imageurl;
  var createdBy=sessionStorage.getItem('lastemail');
  var customerName=sendfields.customername;
  var customerEmail=parsedCustomerdata.customerEmail;
  var itemDetails=[sendfields[1]]
  console.log(itemDetails)
  
  const response = await Axios.get(sessionStorage.getItem("baseUrl")+"/expense/createinvoice", {
    params: {
      id: id,
      customerEmail: customerEmail,
      customerName: customerName,
      date: date,
      companyId: companyId,
      dueDate: dueDate,
      description: description,
      imgUrl: imgUrl,
      createdBy: createdBy,
      itemDetails: itemDetails
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
    setCurrentState("send")
  }

  return obj;
};

export const Createinvoicedoc = async (itemsArrayLength) => {debugger
  
  var id = itemsArrayLength.Invoicenumber;
  var companyId = itemsArrayLength.CompanyId;
  var date = itemsArrayLength.invoiceDate;
  var dueDate = itemsArrayLength.dueDate;
  var description=itemsArrayLength.Description;
  var imgUrl=itemsArrayLength.Imageurl;
  var createdBy=sessionStorage.getItem('lastemail');
  var customerName=itemsArrayLength.RecipientName;
  var customerEmail=itemsArrayLength.customeremail
  var itemDetails= itemsArrayLength.items;
  var filename=id+'.pdf'
  var address1=itemsArrayLength.address1;
  var address2=itemsArrayLength.address2;
  console.log(itemsArrayLength)
  const dataToSend = {
    id: id,
    companyId: companyId,
    date: date,
    dueDate: dueDate,
    description: description,
    imgUrl: "abcd",
    createdBy: createdBy,
    customerName: customerName,
    customerEmail:customerEmail,
    items: itemDetails,
    filename: filename,
    template:"Invoice",
    return:"url",
    header:"Stylopay Invoice",
    address1: address1,
    address2: address2
  };
  
  //const response = await Axios.post(sessionStorage.getItem("baseUrl")+"/expense/createinvoicedoc", dataToSend);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Replace this hardcoded URL with the actual response you want to return
      let obj = "https://stylopay-sandbox-ohio-dev-dump-public.s3.us-east-2.amazonaws.com/stylopayinvoice.pdf";
      
      // Handle different cases (errors, etc.) as needed
      if (obj.length === 0) {
        toast.error('Something went wrong');
        resolve(null); // Return null or handle the error accordingly
      }
      if (obj.statusText === "Internal Server Error") {
        toast.error("Internal Server Error");
        resolve(null); // Return null or handle the error accordingly
      }
      if (obj.status === 'BAD_REQUEST') {
        toast.error(obj.message);
        resolve(null); // Return null or handle the error accordingly
      }
      else {
        console.log(obj);
        //toast.success(obj.url)
        resolve("https://stylopay-sandbox-ohio-dev-dump-public.s3.us-east-2.amazonaws.com/stylopayinvoice.pdf");
      }
    }, 5000); // Delay of 5 seconds (5000 milliseconds)
  });

  
};

export const listcustomers = async () => {debugger
 var company=sessionStorage.getItem("internalBusinessId")
  const response = await Axios.get(sessionStorage.getItem("baseUrl")+"/expense/listcustomers", {
    params: {
      
      companyId:company
    },
  });
  let obj = response.data;
  
  //let obj2 = obj.result;
  //let parseddata=JSON.parse(obj);
  console.log(obj);
 
  if (obj.length == 0) {
    console.log("No Customer found!");
    
  }
  if (obj.statusText == "Internal Server Error") {
    console.log("Internal Server Error");
  }
  else{
    console.log(obj)
  }

  return obj;
};
export const Createcustomerapi = async (updatedFields) => {debugger
  
  var customerEmail = updatedFields.Customeremail;
  var customerName = updatedFields.Customername;
  var companyId = updatedFields.Companyid;
  var address1 = updatedFields.Address1;
  var address2=updatedFields.Address2;
  var address3=updatedFields.Address3;
  var address4=updatedFields.Address4;
  
  const response = await Axios.get(sessionStorage.getItem("baseUrl")+"/expense/createcustomer", {
    params: {
      customerEmail: customerEmail,
      customerName: customerName,
      address1: address1,
      companyId: companyId,
      address2: address2,
      address3: address3,
      address4: address4,
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
    return obj;
  }

  return obj;
};
