import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const symbol = {
  USD: "$",
  SGD: "S$",
  GBP: "£",
  EUR: "€",
  HKD: "HK$",
  AUD: "A$",
};

export const fullform = {
  USD: "United States dollar",
  SGD: "Singapore dollar",
  GBP: "Great Britain Pound",
  EUR: "The Euro",
  HKD: "Hong Kong dollar",
  AUD: "Australian dollar",
};

export const flag = {
  AUD: "https://stylopay-sandbox-us-east-1-dev-dump.s3.amazonaws.com/flags/flag/AUD.svg",
  EUR: "https://stylopay-sandbox-us-east-1-dev-dump.s3.amazonaws.com/flags/flag/EUR.svg",
  GBP: "https://stylopay-sandbox-us-east-1-dev-dump.s3.amazonaws.com/flags/flag/GBP.svg",
  HKD: "https://stylopay-sandbox-us-east-1-dev-dump.s3.amazonaws.com/flags/flag/HKD.svg",
  SGD: "https://stylopay-sandbox-us-east-1-dev-dump.s3.amazonaws.com/flags/flag/SGD.svg",
  USD: "https://stylopay-sandbox-us-east-1-dev-dump.s3.amazonaws.com/flags/flag/USD.svg",
};

export const getCurrenciesList = async () => {
  const custHashId = sessionStorage.getItem("customerHashId");

  if (custHashId == "" || custHashId == null) {
    return [];
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/AccountsRoutes/fetchBalance",
        {
          params: {
            custHashId: custHashId,
          },
        }
      );
      const currencyList = response.data;
      if (currencyList && currencyList.length > 0) {
        const filterData = currencyList.map((item) => ({
          name: item.curSymbol,
          balance: item.balance,
        }));

        // setSelect(newSelect);
        console.warn(filterData, 1212);

        return filterData;
      } else if (currencyList && currencyList.length == 0) {
        const filterData = currencyList.map((item) => ({
          name: "No currency available",
          balance: 0.0,
        }));

        // setSelect(newSelect);
        console.warn(filterData, 1212);

        return filterData;
      } else {
        toast.error("Something went wrong, unable to load Bank Name list.");
      }
    } catch (error) {
      toast.error("Something went wrong, try again later!");
    }
  }
};

// get account Details

export const getActivatedBankAccount = async (currencyCode) => {
  const custHashId = sessionStorage.getItem("customerHashId");

  if (custHashId == "" || custHashId == null) {
    return [];
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") +
          "/AccountsRoutes/fetchAccountDetails",
        {
          params: {
            currencyCode: currencyCode,
            custHashId: custHashId,
          },
        }
      );
      const filterData = response.data;
      var filter = filterData.length;
      if (filterData && filterData.length > 0) {
        console.log(filterData);
        return filterData;
      } else if (filterData && filterData.length == 0) {
        toast.error("No account available!");
      } else {
        toast.error("Something went wrong, unable to load Bank Name list.");
      }
    } catch (error) {
      toast.error("Something went wrong, try again later!");
    }
  }
};

//Bank names

export const getBankAccountForCreate = async (currencyCode) => {
  try {
    const response = await Axios.get(
      sessionStorage.getItem("baseUrl") + "/AccountsRoutes/bankName",
      {
        params: {
          currencyCode: currencyCode,
        },
      }
    );
    const bankList = response.data;
    if (bankList && bankList.length > 0) {
      const reFormat = bankList.map((item) => ({
        value: item.bankName,
        label: item.fullBankName,
      }));

      // setSelect(newSelect);
      console.log(bankList);

      return reFormat;
    } else {
      toast.error("Something went wrong, unable to load Bank Name list.");
    }
  } catch (error) {
    toast.error("Something went wrong, try again later!");
  }
};

//Create Account

export const createAccount = async (formData) => {
  var closeButton = document.getElementById("addAccountModalCloseButton");

  const custHashId = sessionStorage.getItem("customerHashId");

  if (custHashId == "" || custHashId == null) {
    return [];
  } else {
    try {
      if (formData.bankName == "") {
        toast.error("Please select a bank!");
      } else if (formData.label == "") {
        toast.error("Please enter label!");
      } else {
        var buttonText = document.getElementById("button-text");
        var buttonLoader = document.getElementById("button-loader");

        buttonText.style.display = "none";
        buttonLoader.style.display = "flex";

        const response = await Axios.get(
          sessionStorage.getItem("baseUrl") + "/AccountsRoutes/createAccount",
          {
            params: {
              bankName: formData.bankName,
              currencyCode: formData.currencyCode,
              label: formData.label,
              custHashId: custHashId,
            },
          }
        );

        let obj = response.data;
        console.log(obj);

        buttonText.style.display = "flex";
        buttonLoader.style.display = "none";

        if (obj.hasOwnProperty("uniquePaymentId")) {
          toast.success("Account Created Succesfully!");
          closeButton.click();
          setTimeout(() => {
            window.location.href = `/accounts/global-accounts`;
          }, 5000);
          //#Currency=${formData.currencyCode}
          // Log before calling getActivatedBankAccount
          console.log(
            "Calling getActivatedBankAccount with currencyCode:",
            formData.currencyCode
          );

          // Call getActivatedBankAccount and return its result
          const activatedBankAccount = await getActivatedBankAccount(
            formData.currencyCode
          );
          console.log(
            "Response from getActivatedBankAccount:",
            activatedBankAccount
          );

          return activatedBankAccount;
        } else if (obj.status == "BAD_REQUEST") {
          toast.error(obj.message);
        } else {
          toast.error(obj.message);
        }
      }
    } catch (error) {
      // Handle any errors here
      console.error("Error:", error);
      toast.error("An error occurred while creating the account.");
    }
  }
};

// get rate

export const getRate = async (convAmount, fromRate, toRate) => {
  var convertAmount = convAmount;
  var convertCurrency = fromRate;
  var destinationCurrency = toRate;

  if (convertAmount == "" || convertAmount == 0 || convertAmount == undefined) {
    toast.error("Please Enter Valid Amount!");
  } else if (convertCurrency == "" || convertCurrency == undefined) {
    toast.error("Please Select Convert Currency!");
  } else if (destinationCurrency == "" || destinationCurrency == undefined) {
    toast.error("Please Select Destination Currency!");
  } else {
    const response = await Axios.get(
      sessionStorage.getItem("baseUrl") + "/AccountsRoutes/exchangerate",
      {
        params: {
          convertAmount: convertAmount,
          convertCurrency: convertCurrency,
          destinationCurrency: destinationCurrency,
        },
      }
    );

    let obj = response.data;
    console.log(obj);
    if (obj.exchangeRate !== "") {
      return obj;
    } else if (obj.status == "BAD_REQUEST") {
      toast.error(obj.message);
    } else {
      toast.error(obj.message);
    }
  }
};

// get rate for currency graph

export const getRateGraph = async (convAmount, fromRate, toRate) => {
  var convertAmount = convAmount;
  var convertCurrency = fromRate;
  var destinationCurrency = toRate;

  const response = await Axios.get(
    sessionStorage.getItem("baseUrl") + "/AccountsRoutes/exchangerate",
    {
      params: {
        convertAmount: convertAmount,
        convertCurrency: convertCurrency,
        destinationCurrency: destinationCurrency,
      },
    }
  );

  let obj = response.data;
  console.log(obj);

  if (obj) {
    if (obj.destinationAmount !== "") {
      return obj?.destinationAmount;
    } else {
      toast.error("Something went wrong. Please try again later");
    }
  } else if (obj.status == "BAD_REQUEST") {
    toast.error(obj.message);
  } else {
    toast.error(obj.message);
  }
};

//Convert Amount

export const convertAmount = async (formData) => {
  const custHashId = sessionStorage.getItem("customerHashId");

  if (custHashId == "" || custHashId == null) {
    toast.error("Please activate your account first!");
  } else if (formData.fromAmount == "" || formData.fromAmount == undefined) {
    toast.error("Please enter valid amount!");
  } else if (formData.fromVal == "" || formData.fromVal == undefined) {
    toast.error("Please select source currency!");
  } else if (formData.toVal == "" || formData.toVal == undefined) {
    toast.error("Please select destination currency!");
  } else {
    const custHashId = sessionStorage.getItem("customerHashId");

    var buttonText = document.getElementById("button-textTwo");
    var buttonLoader = document.getElementById("button-loaderTwo");

    buttonText.style.display = "none";
    buttonLoader.style.display = "flex";

    const response = await Axios.get(
      sessionStorage.getItem("baseUrl") + "/AccountsRoutes/amountConversion",
      {
        params: {
          amount: formData.fromAmount,
          destinationAmount: null,
          destinationCurrency: formData.toVal,
          sourceCurrency: formData.fromVal,
          customerComments: null,
          custHashId: custHashId,
        },
      }
    );

    let obj = response.data;
    console.log(obj);

    buttonText.style.display = "flex";
    buttonLoader.style.display = "none";

    if (obj.hasOwnProperty("systemReferenceNumber")) {
      toast.success("Amount Converted Succesfully!");
      setTimeout(() => {
        window.location.href = "/accounts/conversion";
      }, 5000);
    } else if (obj.status == "BAD_REQUEST") {
      toast.error(obj.message);
    } else {
      toast.error(obj.message);
    }
  }
};

// recent Conversion List

export const recentConversionData = async (limit) => {
  const size = limit || 5;

  const custHashId = sessionStorage.getItem("customerHashId");

  if (custHashId == "" || custHashId == null) {
    return [];
  } else {
    try {
      const endDate = new Date().toISOString();

      console.log("Current Date:", endDate);

      var endDateParse = Date.parse(endDate);

      var endDateObj = new Date(endDateParse);

      var endDD = String(endDateObj.getDate()).padStart(2, "0");
      var endMM = String(endDateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
      var endYYYY = endDateObj.getFullYear();

      var endDateFormat = endYYYY + "-" + endMM + "-" + endDD;

      console.log(`End Date: ${endDateFormat}`);

      const startDateSevenDaysAgo = new Date(
        endDateParse - 7 * 24 * 60 * 60 * 1000
      ); // Subtract 7 days in milliseconds

      var startDateObj = new Date(startDateSevenDaysAgo);

      const startDD = String(startDateObj.getDate()).padStart(2, "0");
      const startMM = String(startDateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
      const startYYYY = startDateObj.getFullYear();

      const startDateFormat = startYYYY + "-" + startMM + "-" + startDD;

      console.log(`Start Date: ${startDateFormat}`);

      const initialData = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/AccountsRoutes/transactionHistory",
        {
          params: {
            page: 0,
            size: size,
            startDate: startDateFormat, // Use currentDate here
            endDate: endDateFormat,
            transactionType: "Wallet_Fund_Transfer",
            custHashId: custHashId,
          },
        }
      );

      const obj = initialData.data;
      console.log(obj);

      if (obj.length === 0) {
        toast.error("No Data Found!");
      } else if (obj.status === "BAD_REQUEST") {
        toast.error(obj.message);
      } else {
        var contents = obj.content;
        const groupedData = contents.reduce((groups, dataItem) => {
          const date = dataItem.dateOfTransaction;
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(dataItem);
          return groups;
        }, {});

        const groupedArray = Object.entries(groupedData).map(
          ([date, items]) => ({
            dateOfTransaction: date,
            data: items,
          })
        );

        return groupedArray;
      }
    } catch (error) {
      console.log("An error occurred:", error);
      // Handle the error as needed
    }
  }
};

// recent transactions List

export const recentTransactionData = async (limit) => {
  const size = limit || 5;

  const custHashId = sessionStorage.getItem("customerHashId");

  if (custHashId == "" || custHashId == null) {
    return [];
  } else {
    try {
      const endDate = new Date().toISOString();

      console.log("Current Date:", endDate);

      var endDateParse = Date.parse(endDate);

      var endDateObj = new Date(endDateParse);

      var endDD = String(endDateObj.getDate()).padStart(2, "0");
      var endMM = String(endDateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
      var endYYYY = endDateObj.getFullYear();

      var endDateFormat = endYYYY + "-" + endMM + "-" + endDD;

      console.log(`End Date: ${endDateFormat}`);

      const startDateSevenDaysAgo = new Date(
        endDateParse - 7 * 24 * 60 * 60 * 1000
      ); // Subtract 7 days in milliseconds

      var startDateObj = new Date(startDateSevenDaysAgo);

      const startDD = String(startDateObj.getDate()).padStart(2, "0");
      const startMM = String(startDateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
      const startYYYY = startDateObj.getFullYear();

      const startDateFormat = startYYYY + "-" + startMM + "-" + startDD;

      console.log(`State Date: ${startDateFormat}`);

      const initialData = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/AccountsRoutes/transactionHistory",
        {
          params: {
            page: 0,
            size: size,
            startDate: startDateFormat, // Use currentDate here
            endDate: endDateFormat,
            transactionType: "",
            custHashId: custHashId,
          },
        }
      );

      const obj = initialData.data;
      console.log(obj);

      if (obj.length === 0) {
        toast.error("No Data Found!");
      } else if (obj.status === "BAD_REQUEST") {
        toast.error(obj.message);
      } else {
        var contents = obj.content;
        const groupedData = contents.reduce((groups, dataItem) => {
          const date = dataItem.dateOfTransaction;
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(dataItem);
          return groups;
        }, {});

        const groupedArray = Object.entries(groupedData).map(
          ([date, items]) => ({
            dateOfTransaction: date,
            data: items,
          })
        );

        return groupedArray;
      }
    } catch (error) {
      console.log("An error occurred:", error);
      // Handle the error as needed
    }
  }
};

// recent transactions List for payments

export const transactionDetailsPayments = async (formData) => {
  const size = 10;
  
  const custHashId = sessionStorage.getItem("customerHashId");

  if (custHashId == "" || custHashId == null) {
    return [];
  } 
  else {
    try {
      const endDate = new Date().toISOString();

      console.log("Current Date:", endDate);

      var endDateParse = Date.parse(endDate);

      var endDateObj = new Date(endDateParse);

      var endDD = String(endDateObj.getDate()).padStart(2, "0");
      var endMM = String(endDateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
      var endYYYY = endDateObj.getFullYear();

      var endDateFormat = endYYYY + "-" + endMM + "-" + endDD;

      console.log(`End Date: ${endDateFormat}`);

      const startDateSevenDaysAgo = new Date(
        endDateParse - 7 * 24 * 60 * 60 * 1000
      ); // Subtract 7 days in milliseconds

      var startDateObj = new Date(startDateSevenDaysAgo);

      const startDD = String(startDateObj.getDate()).padStart(2, "0");
      const startMM = String(startDateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
      const startYYYY = startDateObj.getFullYear();

      const startDateFormat = startYYYY + "-" + startMM + "-" + startDD;

      console.log(`State Date: ${startDateFormat}`);

      const initialData = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/AccountsRoutes/transactionHistory",
        {
          params: {
            page: 0,
            size: size,
            startDate: formData?.fromDate || startDateFormat, // Use currentDate here
            endDate: formData?.toDate || endDateFormat,
            transactionType: formData?.txnType || "",
            custHashId: custHashId,
          },
        }
      );

      const obj = initialData.data;
      console.log(obj);

      if (obj.length === 0) {
        toast.error("No Data Found!");
      } 
      else if (obj.status === "BAD_REQUEST") {
        toast.error(obj.message);
      }
       else {
        var contents = obj.content;
        const groupedData = contents.reduce((groups, dataItem) => {
          const date = dataItem.dateOfTransaction;
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(dataItem);
          return groups;
        }, {});

        const groupedArray = Object.entries(groupedData).map(
          ([date, items]) => ({
            dateOfTransaction: date,
            data: items,
          })
        );

        return groupedArray;
      }
    } catch (error) {
      console.log("An error occurred:", error);
      // Handle the error as needed
    }
  }
};


// recent transactions List for payments by date

export const transactionDetailsPaymentsByDate = async (formData) => {
  const size = 10;

  const custHashId = sessionStorage.getItem("customerHashId");


  if (custHashId == "" || custHashId == null) {
    return [];
  } 
  else if(((formData.fromDate=="")&&(formData.fromDate!==""))||((formData.fromDate!=="")&&(formData.fromDate==""))){
    
  }
  else {
    try {
      const endDate = new Date().toISOString();

      console.log("Current Date:", endDate);

      var endDateParse = Date.parse(endDate);

      var endDateObj = new Date(endDateParse);

      var endDD = String(endDateObj.getDate()).padStart(2, "0");
      var endMM = String(endDateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
      var endYYYY = endDateObj.getFullYear();

      const endDateFormat = endYYYY + "-" + endMM + "-" + endDD;

      console.log(`End Date: ${endDateFormat}`);

      const startDateSevenDaysAgo = new Date(
        endDateParse - 7 * 24 * 60 * 60 * 1000
      ); // Subtract 7 days in milliseconds

      var startDateObj = new Date(startDateSevenDaysAgo);

      const startDD = String(startDateObj.getDate()).padStart(2, "0");
      const startMM = String(startDateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
      const startYYYY = startDateObj.getFullYear();

      const startDateFormat = startYYYY + "-" + startMM + "-" + startDD;

      console.log(`State Date: ${startDateFormat}`);

      let fromDate = "";
      let toDate = "";
      let txnType = "";

      if((formData.fromDate!=="")&&(formData.toDate!=="")){
        fromDate = formData.fromDate;
        toDate = formData.toDate;
      }
      else{
        fromDate = startDateFormat;
        toDate = endDateFormat;
      }

      if(formData.txnType!==""){
        txnType=formData.txnType;
      }
      else{
        txnType = "";
      }

      const initialData = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/AccountsRoutes/transactionHistory",
        {
          params: {
            page: 0,
            size: size,
            startDate: fromDate, // Use currentDate here
            endDate: toDate,
            transactionType: txnType,
            custHashId: custHashId,
          },
        }
      );

      const obj = initialData.data;
      console.log(obj);

      if (obj.length === 0) {
        toast.error("No Data Found!");
      } 
      else if (obj.status === "BAD_REQUEST") {
        toast.error(obj.message);
      }
       else {
        var contents = obj.content;
        const groupedData = contents.reduce((groups, dataItem) => {
          const date = dataItem.dateOfTransaction;
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(dataItem);
          return groups;
        }, {});

        const groupedArray = Object.entries(groupedData).map(
          ([date, items]) => ({
            dateOfTransaction: date,
            data: items,
          })
        );

        return groupedArray;
      }
    } catch (error) {
      console.log("An error occurred:", error);
      // Handle the error as needed
    }
  }
};
