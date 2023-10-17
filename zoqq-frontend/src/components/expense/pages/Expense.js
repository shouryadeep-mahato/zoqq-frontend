import React, { useEffect, useState } from "react";
import * as functions from "../js/expense.js";
import SideBar from "../../SideBar.js";
import Expense from "./ExpenseDashboard.js";

// Create a function to import all files from a directory dynamically
async function importAll(r) {
  const files = {};
  for (const key of r.keys()) {
    const fileName = key.replace("./", "");
    files[fileName] = await r(key);
  }
  return files;
}

export default function Verification() {
  const [assets, setAssets] = useState(null);

  useEffect(() => {
    // Use require.context to get all files from the directory
    const requireContext = require.context(
      "../assets/Home/public",
      false,
      /\.(svg|png|jpg|jpeg|gif)$/
    );

    // Call the function and get all files in the directory
    importAll(requireContext).then((fetchedAssets) => {
      setAssets(fetchedAssets);
    });
    // clearPreviousStyleTags();
    importNewCss();
  }, []);

  // Function to clear previous style tags from the head element
  // const clearPreviousStyleTags = () => {
  //   const head = document.getElementsByTagName("head")[0];
  //   const styleTags = head.getElementsByTagName("style");

  //   // Remove each style tag from the head element
  //   while (styleTags.length > 0) {
  //     head.removeChild(styleTags[0]);
  //   }
  // };

  // Function to dynamically import the new CSS file
  const importNewCss = async () => {
    try {
      const css = await import("../css/global.css");
      const css1 = await import("../css/index.css");
      const css2 = await import("../css/index-copy.css");
      const css3 = await import("../css/global-copy.css");
      // You can also append the CSS to the head element if required
      // const styleElement = document.createElement("style");
      // styleElement.innerHTML = css.default;
      // document.head.appendChild(styleElement);
    } catch (error) {
      console.error("Error importing CSS:", error);
    }
  };

  if (!assets) {
    return <div>Loading...</div>;
  }
  return (
    <div className="d-flex">
      <SideBar />
      <div className="expences">
        
        <Expense />
        
      </div>
    </div>
  );
}
