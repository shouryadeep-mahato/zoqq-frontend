import React, { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

export const listCountry = async () => {
  try {
    const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/CommonRoutes/listCountry");
    let obj = response.data;
    var List = obj.result;
    if (List) {
      return List;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
};

export const listCountryCode = async () => {
  try {
    const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/CommonRoutes/listCountryCode");
    let obj = response.data;
    var List = obj.result;
    if (List) {
      return List;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
};

export const listNationality = async () => {
  try {
    const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/CommonRoutes/listNationality");
    let obj = response.data;
    var List = obj.result;
    if (List) {
      return List;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
};

export const FetchEnumValues = async (category) => {
  if (category == "") {
    toast.warn("Category Must Not Be Empty");
  } else {
    try {
      const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/CommonRoutes/fetchenumvalues", {
        params: {
          category: category,
        },
      });

      let obj = response.data;
      if (obj.data) {
        return obj.data;
      } else {
        console.error("Fetch Failed: " + obj.message);
        return [];
      }
    } catch (error) {
      console.error("Something went wrong: " + error);
      return [];
    }
  }
};
