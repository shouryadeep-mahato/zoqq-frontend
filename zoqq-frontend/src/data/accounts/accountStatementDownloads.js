import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';




export const getTransactionHistory = async (formData) => {
  var filetype = formData.fileFormat;
  const fileFormat = filetype || "CSV";
  var fromDate = formData.startDate;
  var fromDateParseValue = Date.parse(fromDate);

  var fromDateObj = new Date(fromDateParseValue);

  var startDD = String(fromDateObj.getDate()).padStart(2, '0');
  var startMM = String(fromDateObj.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based
  var startYYYY = fromDateObj.getFullYear();

  var startDateFormat = startYYYY + '-' + startMM + '-' + startDD;

  console.log(`Start Date: ${startDateFormat}`);

  var toDate = formData.endDate;
  var toDateParseValue = Date.parse(toDate);

  var toDateObj = new Date(toDateParseValue);

  var endDD = String(toDateObj.getDate()).padStart(2, '0');
  var endMM = String(toDateObj.getMonth() + 1).padStart(2, '0');
  var endYYYY = toDateObj.getFullYear();

  var endDateFormat = endYYYY + '-' + endMM + '-' + endDD;

  console.log(`End Date: ${endDateFormat}`);

  var header = "Transaction Type," + "Transaction Currency," + "Transaction Amount," + "Previous Balanace," + "Date Of Transaction,";

  const custHashId = sessionStorage.getItem("customerHashId");
  var expFormat=formData.exportFormat;

  if (custHashId == "" || custHashId == null) {
    toast.error("Please Activate Your Account First!");
  } 

  else if((formData.startDate=="")||(formData.endDate=="")){
    toast.error("Please Select A Date Range!");
  }
  else if((expFormat=="Xero")||(expFormat=="QuickBooks")||(expFormat=="Osome")||(expFormat=="NetSuite")||(expFormat=="BusinessOne")){
    toast.info("This export format will be coming soon! Please select Default format for now.")
  }
else{
  var buttonText = document.getElementById("button-text");
  var buttonLoader = document.getElementById("button-loader");

  buttonText.style.display = "none";
  buttonLoader.style.display = "flex";

      const response = await Axios.get(sessionStorage.getItem("baseUrl")+"/AccountsRoutes/transactionHistory", {
        params : {
          page: 1,
          size: 10,
          startDate: startDateFormat,
          endDate: endDateFormat,
          transactionType: formData.txnType,
          custHashId:custHashId
        },
      });
  
      let obj = response.data;

      buttonText.style.display = "flex";
      buttonLoader.style.display = "none";

      console.log(obj);

        if (obj.content.length==0) {
          toast.error("No Data Found!");
         
        }
       else if (obj.status=="BAD_REQUEST") {
        toast.error(obj.message);
        }  else {
          console.log(obj);
          toast.success("Account Statement Downloaded Successfully!");
          if(fileFormat=="CSV"){
          return JSONToCSVConvertorTransactions(obj, header, true);
          }
          else if(fileFormat=="PDF"){
           return JSONToPDFConvertorTransactions(obj, 'Account Statement', true);

          }
          else if(fileFormat=="XLSX"){
            return JSONToXLSXConvertorTransactions(obj, 'Account Statement', true);
 
           }

          
}
    } 
  };

// ----------------------------------------CSV Report Download---------------------------------------

  function JSONToCSVConvertorTransactions(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';
    //Set Report title in first row or line

    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {

        var row = "";


        //This loop will extract the label from 1st index of on array
        for (var index in arrData['content']) {

            var arr = arrData['content'][index];

            //Now convert each value to string and comma-seprated

            var transactionType = arr['transactionType'];
			      var txnType = transactionType.replace(/_/g, " ");
				
				
			 row += `${[txnType]},${arr['transactionCurrencyCode']},${arr['cardTransactionAmount']},${arr['previousBalance']},${arr['dateOfTransaction']}\n`;

				
			}
            //Now convert each value to string and comma-seprated
            
        
        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //Generate a file name


    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    var fileName = 'Account Statement';
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// --------------------------PDF Download Format---------------------------

function JSONToPDFConvertorTransactions(JSONData, ReportTitle, ShowLabel) {
  // Extract data from the JSON
  const data = JSONData.content;

  // Create a PDF document
  const doc = new jsPDF();

  // Set Report title
     doc.setFontSize(20);
     doc.setTextColor(0, 0, 255); // Set text color to blue (RGB values)
     doc.setFont('Helvetica', 'bolditalic');// Set text style to bold
     doc.text(ReportTitle, 10, 10);


  if (ShowLabel) {
    const columns = ["Transaction Type", "Transaction Currency", "Transaction Amount", "Previous Balance", "Date Of Transaction"];
    const rows = data.map(item => [
      item.transactionType.replace(/_/g, " "),
      item.transactionCurrencyCode,
      item.cardTransactionAmount,
      item.previousBalance,
      item.dateOfTransaction,
    ]);

    // Build the table
    doc.autoTable({
      head: [columns],
      body: rows,
    });
  }

  // Save the PDF with a file name
  const fileName = 'Account Statement.pdf';
  doc.save(fileName);
}

// ------------------------------------XLSX Download Format--------------------------------------

function JSONToXLSXConvertorTransactions(JSONData, ReportTitle, ShowLabel) {
  var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;

  // Create a new Workbook and Worksheet
  var wb = XLSX.utils.book_new();
  var ws = XLSX.utils.json_to_sheet([]);

  // Add the Worksheet to the Workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Add the data (if ShowLabel is true)
  if (ShowLabel) {
    var data = [];

    // Add header row
    data.push(['Transaction Type', 'Transaction Currency Code', 'Transaction Amount', 'Previous Balance', 'Date of Transaction']);

    // Add data rows
    for (var index in arrData['content']) {
      var arr = arrData['content'][index];

      var transactionType = arr['transactionType'];
      var txnType = transactionType.replace(/_/g, " ");

      data.push([[txnType], arr['transactionCurrencyCode'], arr['cardTransactionAmount'], arr['previousBalance'], arr['dateOfTransaction']]);
    }

    // Add the data to the Worksheet
    XLSX.utils.sheet_add_aoa(ws, data);
  }

  // Generate the XLSX file as an array buffer
  var xlsxArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Convert the array buffer to a Blob
  var xlsxBlob = new Blob([xlsxArrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Save the Blob as a file using file-saver
  saveAs(xlsxBlob, ReportTitle + '.xlsx');
}

