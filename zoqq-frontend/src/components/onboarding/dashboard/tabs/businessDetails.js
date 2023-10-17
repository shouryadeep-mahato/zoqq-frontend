import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import ContentLoader from "react-content-loader";
import * as functions from "./functions/business-details-functions.js";
import * as utilities from "./functions/utility-details-function.js";
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    // Styles for the control (not focused)
    ...provided,
    border: state.isFocused ? "none" : "none",
    boxShadow: state.isFocused ? "none" : "none",
    // You can apply additional styles as needed
  }),
};

const FetchEnumData = async () => {
  var listedExchange = await utilities.FetchEnumValues("listedExchange");
  var totalEmployees = await utilities.FetchEnumValues("totalEmployees");
  var annualTurnover = await utilities.FetchEnumValues("annualTurnover");
  var industrySector = await utilities.FetchEnumValues("industrySector");
  var intendedUseOfAccount = await utilities.FetchEnumValues("intendedUseOfAccount");

  var result = {};
  result.listedExchange = listedExchange;
  result.totalEmployees = totalEmployees;
  result.annualTurnover = annualTurnover;
  result.industrySector = industrySector;
  result.intendedUseOfAccount = intendedUseOfAccount;

  return result;
};

function businessDetails() {
  const list = ["progress", "pending", "approve"];
  const [status, setStatus] = useState(list[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const SetPage = async () => {
      const FetchConstantValues = await FetchEnumData();
      var listedExchange = FetchConstantValues.listedExchange;
      var totalEmployees = FetchConstantValues.totalEmployees;
      var annualTurnover = FetchConstantValues.annualTurnover;
      var industrySector = FetchConstantValues.industrySector;
      var intendedUseOfAccount = FetchConstantValues.intendedUseOfAccount;
      var listCountry = await utilities.listCountry();

      //Closing the loader
      setIsLoading(false);

      //Setting Enum values
      var listedExchangeId = document.getElementById("listedExchange");
      var totalEmployeesId = document.getElementById("totalEmployees");
      var annualTurnoverId = document.getElementById("annualTurnover");
      var industrySectorId = document.getElementById("industrySector");
      var intendedUseOfAccountId = document.getElementById("intendedUseOfAccount");

      // Clear existing options (excluding the initial option)
      if (listedExchangeId && totalEmployeesId && annualTurnoverId && industrySectorId && intendedUseOfAccountId) {
        listedExchangeId.innerHTML = "";
        totalEmployeesId.innerHTML = "";
        annualTurnoverId.innerHTML = "";
        industrySectorId.innerHTML = "";
        intendedUseOfAccountId.innerHTML = "";

        // Create an initial or default option
        const initialOption = document.createElement("option");
        initialOption.text = ""; // Customize the text as needed
        initialOption.value = ""; // Optionally set a value for the initial option (can be an empty string)

        // Append the initial option to the select element
        listedExchangeId.appendChild(initialOption.cloneNode(true));
        totalEmployeesId.appendChild(initialOption.cloneNode(true));
        annualTurnoverId.appendChild(initialOption.cloneNode(true));
        industrySectorId.appendChild(initialOption.cloneNode(true));
        intendedUseOfAccountId.appendChild(initialOption.cloneNode(true));

        // Append the fetched options to the select element
        listedExchange.forEach((item) => {
          const optionElement = document.createElement("option");
          optionElement.text = item.description;
          optionElement.value = item.code;
          listedExchangeId.appendChild(optionElement);
        });

        listedExchangeId.value = "EX080";

        totalEmployees.forEach((item) => {
          const optionElement = document.createElement("option");
          optionElement.text = item.description;
          optionElement.value = item.code;
          totalEmployeesId.appendChild(optionElement);
        });

        annualTurnover.forEach((item) => {
          const optionElement = document.createElement("option");
          optionElement.text = item.description;
          optionElement.value = item.code;
          annualTurnoverId.appendChild(optionElement);
        });

        industrySector.forEach((item) => {
          const optionElement = document.createElement("option");
          optionElement.text = item.description;
          optionElement.value = item.code;
          industrySectorId.appendChild(optionElement);
        });

        intendedUseOfAccount.forEach((item) => {
          const optionElement = document.createElement("option");
          optionElement.text = item.description;
          optionElement.value = item.code;
          intendedUseOfAccountId.appendChild(optionElement);
        });
      }

      //Setting Country Lists
      var response = listCountry;

      //React-Select

      // Assuming response is an array of objects
      if (response.length > 0) {
        const countryList = response.map((item) => ({
          label: item.country_name,
          value: item.ISOcc_2char,
          dataCountryCode: item.ISD_country_code, // Custom data attribute
        }));
        setOptions(countryList);
      }

      if (response.length > 0) {
        var registeredCountry = document.getElementById("registeredCountry");
        var taxNumber = document.getElementById("taxCountry");
        var countryOfOperation = document.getElementById("countryOfOperation");
        var restrictedCountries = document.getElementById("restrictedCountries");
        var transactionCountries = document.getElementById("transactionCountries");
        if (registeredCountry && taxNumber && countryOfOperation && restrictedCountries && transactionCountries) {
          if (registeredCountry.options.length > 1) {
            registeredCountry.innerHTML = "";
          }

          if (taxNumber.options.length > 1) {
            taxNumber.innerHTML = "";
          }

          // if (countryOfOperation.options.length > 1) {
          //   countryOfOperation.innerHTML = "";
          // }

          if (restrictedCountries.options.length > 1) {
            restrictedCountries.innerHTML = "";
          }

          // if (transactionCountries.options.length > 1) {
          //   transactionCountries.innerHTML = "";
          // }

          // Create an initial or default option
          const initialOption = document.createElement("option");
          initialOption.text = ""; // Set the text for the initial option
          initialOption.value = ""; // Optionally set a value for the initial option (can be an empty string)

          // Append the initial option to the select element
          registeredCountry.appendChild(initialOption.cloneNode(true));
          taxNumber.appendChild(initialOption.cloneNode(true));
          // countryOfOperation.appendChild(initialOption.cloneNode(true));
          restrictedCountries.appendChild(initialOption.cloneNode(true));
          // transactionCountries.appendChild(initialOption.cloneNode(true));

          //Appending the actual list here
          response.forEach((item) => {
            const optionElement = document.createElement("option");
            optionElement.text = item.country_name;
            optionElement.value = item.ISOcc_2char;
            // Set a custom attribute for the optionElement
            optionElement.setAttribute("data-country-code", item.ISD_country_code);
            registeredCountry.appendChild(optionElement.cloneNode(true));
            taxNumber.appendChild(optionElement.cloneNode(true));
            // countryOfOperation.appendChild(optionElement.cloneNode(true));
            restrictedCountries.appendChild(optionElement.cloneNode(true));
            // transactionCountries.appendChild(optionElement.cloneNode(true));
          });
        }
      } else {
        console.log("Unable to generate country list dropdown");
      }

      document.getElementById("div7").style.width = "20%";

      var internalBusinessId = sessionStorage.getItem("internalBusinessId");
      var lastScreenCompleted = sessionStorage.getItem("lastScreenCompleted");
      if (internalBusinessId && Number(lastScreenCompleted) == 8) {
        document.querySelectorAll(".submit-btn").forEach((item) => {
          item.style.display = "none";
        });
        document.querySelectorAll(".update-btn").forEach((item) => {
          item.style.display = "";
        });

        var userStatus = sessionStorage.getItem("userStatus");
        if (Number(lastScreenCompleted) >= 18) {
          if (Number(lastScreenCompleted) === 22 && userStatus == "C") {
            setStatus(list[2]);
          } else {
            setStatus(list[1]);
          }
        }
        functions.GetAdditionalBusinessCorporationDetails(internalBusinessId);
      } else {
        setStatus(list[0]);
        var brn = sessionStorage.getItem("businessRegistrationNumber");
        functions.FillAdditionalBusinessDetails(brn);

        document.querySelectorAll(".update-btn").forEach((item) => {
          item.style.display = "none";
        });
      }

      var listedExchangeLabel = document.getElementById("listedExchangeLabel");
      var listedExchangeDiv = document.getElementById("listedExchangeDiv");
      var businessType = sessionStorage.getItem("businessType");

      //Conditions for listed exchange
      if (listedExchangeLabel && listedExchangeDiv) {
        if (businessType != "" && businessType == "PUBLIC_COMPANY") {
          listedExchangeDiv.classList.remove("d-none");
          listedExchangeLabel.innerText = "*";
        } else {
          listedExchangeDiv.classList.add("d-none");
          listedExchangeLabel.innerText = "";
        }
      }

      //Conditions for regulatory details
      var regDetailsDiv = document.getElementById("regulatoryDetailsDiv");
      if (regDetailsDiv) {
        if (businessType != "" && businessType == "TRUST") {
          regDetailsDiv.classList.remove("d-none");
        } else {
          regDetailsDiv.classList.add("d-none");
        }
      }
    };

    SetPage();
  }, []);

  const [copValues, setCopValues] = useState([]);

  const handleCopChange = (selectedOptions) => {
    setCopValues(selectedOptions);
  };

  const selectedCopValues = copValues.map((option) => option.value).join(", ");

  const [tCValues, setTCValues] = useState([]);

  const handleTCChange = (selectedOptions) => {
    setTCValues(selectedOptions);
  };

  const selectedTCValues = tCValues.map((option) => option.value).join(", ");

  return (
    <>
      {isLoading ? (
        <>
          <ContentLoader
            speed={1}
            width={400}
            height={160}
            viewBox="-20 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          ></ContentLoader>

          <ContentLoader
            speed={1}
            width={400}
            height={160}
            viewBox="-20 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          ></ContentLoader>

          <ContentLoader
            speed={1}
            width={400}
            height={160}
            viewBox="-20 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          ></ContentLoader>
        </>
      ) : (
        <>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item border-0">
              <button
                className="accordion1 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <div className={status}>
                  <div className="file-zip-parent">
                    <ReactSVG
                      src="/onboarding/accounts/businessDetails/legDet.svg"
                      beforeInjection={(svg) => {
                        svg.setAttribute("style", "stroke: yellow");
                        const paths = svg.querySelectorAll("path");
                        paths.forEach((path) => {
                          path.setAttribute(
                            "stroke",
                            status === "pending" ? "#E0990C" : status == "progress" ? "#299E58" : "#099cbc"
                          );
                        });
                      }}
                      className="file-zip-icon"
                    />
                    <img className="edit-circle-icon1" alt="" src={"/onboarding/accounts/" + status + ".svg"} />
                  </div>
                </div>
                <div className="title4">
                  <div className="add-details-to1">
                    Legal Details
                    <span className="mx-1" style={{ color: "red" }}>
                      *
                    </span>
                  </div>
                  <div className={"bg-" + status + " text-start"}>
                    {status === "pending" ? "Pending" : status == "progress" ? "In Progress" : "Approved"}
                  </div>
                </div>
                <div className="icon-open2">
                  <div className="chevron-up1">
                    <img className="arrow-icon15" alt="" src="/onboarding/arrow2.svg" />
                  </div>
                </div>
              </button>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <select id="registeredCountry" name="country" className="form-input my-0 pb-0">
                        <option value="IN">India</option>
                        <option value="SG">Singapore</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Registered Country
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input type="date" id="registeredDate" name="country" className="form-input my-0 pb-0" />
                      <label htmlFor="country" className="form-input-label ps-1">
                        Registered Date
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-100 pb-0 d-none" id="listedExchangeDiv">
                      <select id="listedExchange" name="country" className="form-input my-0 pb-0" defaultValue="EX080">
                        <option value="">Select Exchange</option>
                        <option value="EX001">4Africa Exchange</option>
                        <option value="EX002">Abu Dhabi Securities Exchange</option>
                        <option value="EX003">Amman Stock Exchange</option>
                        <option value="EX004">Asia Pacific Exchange (APEX)</option>
                        <option value="EX005">Astana International Exchange</option>
                        <option value="EX006">Athens Stock Exchange (ATHEX)</option>
                        <option value="EX007">Australian Securities Exchange</option>
                        <option value="EX008">B3 - Brasil Bolsa BalcÃ£o</option>
                        <option value="EX009">Bahrain Bourse</option>
                        <option value="EX010">Baku Stock Exchange</option>
                        <option value="EX011">Beirut Stock Exchange</option>
                        <option value="EX012">Bermuda Stock Exchange</option>
                        <option value="EX013">BME Spanish Exchanges</option>
                        <option value="EX014">Bolsa de Comercio de Buenos Aires</option>
                        <option value="EX015">Bolsa de Santiago</option>
                        <option value="EX016">Bolsa de Valores de Colombia</option>
                        <option value="EX017">Bolsa de Valores de Lima</option>
                        <option value="EX018">Bolsa Mexicana de Valores</option>
                        <option value="EX019">Borsa Ä°stanbul</option>
                        <option value="EX020">Borsa Italiana S.p.A.</option>
                        <option value="EX021">Botswana Stock Exchange</option>
                        <option value="EX022">Boursa Kuwait</option>
                        <option value="EX023">Bourse de Casablanca</option>
                        <option value="EX024">Bourse RÃ©gionale des Valeurs MobiliÃ¨res S.A</option>
                        <option value="EX025">Bursa Malaysia</option>
                        <option value="EX026">Cboe Global Markets</option>
                        <option value="EX027">China Financial Futures Exchange</option>
                        <option value="EX028">China Securities Depository and Clearing Corporation Ltd.</option>
                        <option value="EX029">Chittagong Stock Exchange Ltd.</option>
                        <option value="EX030">CME Group</option>
                        <option value="EX031">Colombo Stock Exchange</option>
                        <option value="EX032">Cyprus Stock Exchange</option>
                        <option value="EX033">Dalian Commodity Exchange</option>
                        <option value="EX034">Dar es Salaam Stock Exchange PLC</option>
                        <option value="EX035">Deutsche BÃ¶rse AG</option>
                        <option value="EX036">Dhaka Stock Exchange Ltd.</option>
                        <option value="EX037">Dubai Financial Market</option>
                        <option value="EX038">Dubai Gold & Commodities Exchange</option>
                        <option value="EX039">Dutch Caribbean Securities Exchange (DCSX)</option>
                        <option value="EX040">Euronext N.V</option>
                        <option value="EX041">FMDQ Group</option>
                        <option value="EX042">Ghana Stock Exchange</option>
                        <option value="EX043">Hanoi Stock Exchange</option>
                        <option value="EX044">Hochiminh Stock Exchange</option>
                        <option value="EX045">Hong Kong Exchanges and Clearing</option>
                        <option value="EX046">Indonesia Stock Exchange</option>
                        <option value="EX047">Intercontinental Exchange, Inc.</option>
                        <option value="EX048">Japan Exchange Group, Inc.</option>
                        <option value="EX049">Johannesburg Stock Exchange</option>
                        <option value="EX050">Kazakhstan Stock Exchange</option>
                        <option value="EX051">Korea Exchange</option>
                        <option value="EX052">Latinex - Latin American Stock Exchange</option>
                        <option value="EX053">London Stock Exchange Group</option>
                        <option value="EX054">Luxembourg Stock Exchange</option>
                        <option value="EX055">Malta Stock Exchange</option>
                        <option value="EX056">MERJ Exchange Limited</option>
                        <option value="EX057">MIAX Options</option>
                        <option value="EX058">Moscow Exchange</option>
                        <option value="EX059">Muscat Stock Exchange</option>
                        <option value="EX060">Nairobi Securities Exchange</option>
                        <option value="EX061">Namibian Stock Exchange</option>
                        <option value="EX062">Nasdaq</option>
                        <option value="EX063">National Equities Exchange and Quotations</option>
                        <option value="EX064">National Stock Exchange of India Limited</option>
                        <option value="EX065">Neo Exchange</option>
                        <option value="EX066">Nepal Stock Exchange Limited</option>
                        <option value="EX067">New York Stock Exchange LLC</option>
                        <option value="EX068">New Zealand Exchange Limited</option>
                        <option value="EX069">Nigerian Exchange Group</option>
                        <option value="EX070">NZX Limited</option>
                        <option value="EX071">OCC - The Options Clearing Corporation</option>
                        <option value="EX072">Pakistan Stock Exchange Ltd.</option>
                        <option value="EX073">Palestine Exchange</option>
                        <option value="EX074">Philippine Stock Exchange</option>
                        <option value="EX075">Qatar Stock Exchange</option>
                        <option value="EX076">Saudi Tadawul Group (STG)</option>
                        <option value="EX077">Shanghai Futures Exchange</option>
                        <option value="EX078">Shanghai Stock Exchange</option>
                        <option value="EX079">Shenzhen Stock Exchange</option>
                        <option value="EX080">Singapore Exchange</option>
                        <option value="EX081">SIX Swiss Exchange</option>
                        <option value="EX082">SIX Swiss Exchange Limited</option>
                        <option value="EX083">St. Petersburg International Mercantile Exchange (SPIMEX)</option>
                        <option value="EX084">Stock Exchange of Mauritius</option>
                        <option value="EX085">Taipei Exchange</option>
                        <option value="EX086">Taiwan Futures Exchange</option>
                        <option value="EX087">Taiwan Stock Exchange</option>
                        <option value="EX088">Tel-Aviv Stock Exchange</option>
                        <option value="EX089">The Depository Trust and Clearing Corporation</option>
                        <option value="EX090">The Egyptian Exchange</option>
                        <option value="EX091">The International Stock Exchange</option>
                        <option value="EX092">
                          The National Association of Securities Dealers Automated Quotations (NASDAQ) OMX Group, Inc
                        </option>
                        <option value="EX093">The Stock Exchange of Thailand</option>
                        <option value="EX094">TMX Group, Inc</option>
                        <option value="EX095">Tokyo Stock Exchange Group, Inc</option>
                        <option value="EX096">Tunis Stock Exchange</option>
                        <option value="EX097">Zhengzhou Commodity Exchange</option>
                        <option value="EX098">Domestic Exchange</option>
                        <option value="EX099">International Exchange</option>
                        <option value="EX100">Not Listed</option>
                        <option value="EX101">New York Stock Exchange</option>
                        <option value="EX102">American Stock Exchange</option>
                        <option value="EX103">Nasdaq Stock Exchange</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Listed Exchange
                        <span className="mx-1" style={{ color: "red" }} id="listedExchangeLabel"></span>
                      </label>
                    </div>

                    {/* Hiding registration type */}
                    <div className="input-group w-50 ms-2 pb-0 d-none">
                      <input type="text" id="registrationType" name="country" className="form-input my-0 pb-0" />
                      <label htmlFor="country" className="form-input-label ps-1">
                        Registration Type
                      </label>
                    </div>
                    {/* Hiding registration type */}
                  </div>

                  {/* Hiding Legislation name and type */}
                  <div className="d-flex align-self-stretch d-none">
                    <div className="input-group w-50 me-2 pb-0">
                      <input type="text" id="legislationName" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Legislation Name
                      </label>
                      <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input type="text" id="legislationType" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Legislation Type
                      </label>
                      <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
                    </div>
                  </div>
                  {/* Hiding Legislation name and type */}

                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-100 pb-0">
                      <input type="text" id="website" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Website
                      </label>
                      <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
                    </div>
                  </div>

                  {/* <button
                    id="submitLegalDetails"
                    className="button-main btn outline-none submit-btn"
                    type="button"
                    onClick={functions.PostLegalDetails}
                  >
                    <img className="check-double-icon" alt="" src="/onboarding/check-double.svg" />
                    <div className="label7 submitBtn">Submit</div>
                  </button>
                  <button
                    id="updateLegalDetails"
                    className="button-main btn outline-none update-btn"
                    type="button"
                    onClick={functions.PatchLegalDetails}
                  >
                    <img className="check-double-icon" alt="" src="/onboarding/edit-icon.png" />
                    <div className="label7 submitBtn">Update</div>
                  </button> */}
                </form>
              </div>
            </div>

            <div className="accordion-item border-0 d-none">
              <button
                className="accordion1 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <div className={status}>
                  <div className="file-zip-parent">
                    <ReactSVG
                      src="/onboarding/accounts/businessDetails/webDet.svg"
                      beforeInjection={(svg) => {
                        svg.setAttribute("style", "stroke: yellow");
                        const paths = svg.querySelectorAll("path");
                        paths.forEach((path) => {
                          path.setAttribute(
                            "stroke",
                            status === "pending" ? "#E0990C" : status == "progress" ? "#299E58" : "#099cbc"
                          );
                        });
                      }}
                      className="file-zip-icon"
                    />
                    <img className="edit-circle-icon1" alt="" src={"/onboarding/accounts/" + status + ".svg"} />
                  </div>
                </div>
                <div className="title4">
                  <div className="add-details-to1">
                    Website Details
                    <span className="mx-1" style={{ color: "red" }}>
                      *
                    </span>
                  </div>
                  <div className={"bg-" + status + " text-start"}>
                    {status === "pending" ? "Pending" : status == "progress" ? "In Progress" : "Approved"}
                  </div>
                </div>
                <div className="icon-open2">
                  <div className="chevron-up1">
                    <img className="arrow-icon15" alt="" src="/onboarding/arrow2.svg" />
                  </div>
                </div>
              </button>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-100 pb-0">
                      <input type="text" id="website25" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Website
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
                    </div>
                  </div>
                  {/* <button
                    id="submitWebsiteDetails"
                    className="button-main btn outline-none submit-btn"
                    type="button"
                    onClick={functions.PostWebsiteDetails}
                  >
                    <img className="check-double-icon" alt="" src="/onboarding/check-double.svg" />
                    <div className="label7 submitBtn">Submit</div>
                  </button>
                  <button
                    id="updateWebsiteDetails"
                    className="button-main btn outline-none update-btn"
                    type="button"
                    onClick={functions.PatchWebsiteDetails}
                  >
                    <img className="check-double-icon" alt="" src="/onboarding/edit-icon.png" />
                    <div className="label7 submitBtn">Update</div>
                  </button> */}
                </form>
              </div>
            </div>

            <div className="accordion-item border-0 d-none">
              <button
                className="accordion1 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="true"
                aria-controls="collapseThree"
              >
                <div className={status}>
                  <div className="file-zip-parent">
                    <ReactSVG
                      src="/onboarding/accounts/businessDetails/taxDet.svg"
                      beforeInjection={(svg) => {
                        svg.setAttribute("style", "stroke: yellow");
                        const paths = svg.querySelectorAll("path");
                        paths.forEach((path) => {
                          path.setAttribute(
                            "stroke",
                            status === "pending" ? "#E0990C" : status == "progress" ? "#299E58" : "#099cbc"
                          );
                        });
                      }}
                      className="file-zip-icon"
                    />
                    <img className="edit-circle-icon1" alt="" src={"/onboarding/accounts/" + status + ".svg"} />
                  </div>
                </div>
                <div className="title4">
                  <div className="add-details-to1">
                    Tax Details
                    <span className="mx-1" style={{ color: "red" }}>
                      *
                    </span>
                  </div>
                  <div className={"bg-" + status + " text-start"}>
                    {status === "pending" ? "Pending" : status == "progress" ? "In Progress" : "Approved"}
                  </div>
                </div>
                <div className="icon-open2">
                  <div className="chevron-up1">
                    <img className="arrow-icon15" alt="" src="/onboarding/arrow2.svg" />
                  </div>
                </div>
              </button>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <select id="taxCountry" name="country" className="form-input my-0 pb-0">
                        <option value="IN">India</option>
                        <option value="SG">Singapore</option>
                        <option value="AU">Australia</option>
                        <option value="US">United States</option>
                        <option value="AE">United Arab Emirates</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Country
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input type="text" id="taxNumber" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Tax Number
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
                    </div>
                  </div>
                  {/* <button
                    id="submitTaxDetails"
                    className="button-main btn outline-none submit-btn"
                    type="button"
                    onClick={functions.PostTaxDetails}
                  >
                    <img className="check-double-icon" alt="" src="/onboarding/check-double.svg" />
                    <div className="label7 submitBtn">Submit</div>
                  </button>
                  <button
                    id="updateTaxDetails"
                    className="button-main btn outline-none update-btn"
                    type="button"
                    onClick={functions.PatchTaxDetails}
                  >
                    <img className="check-double-icon" alt="" src="/onboarding/edit-icon.png" />
                    <div className="label7 submitBtn">Update</div>
                  </button> */}
                </form>
              </div>
            </div>

            <div className="accordion-item border-0 d-none" id="regulatoryDetailsDiv">
              <button
                className="accordion1 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="true"
                aria-controls="collapseFour"
              >
                <div className={status}>
                  <div className="file-zip-parent">
                    <ReactSVG
                      src="/onboarding/accounts/businessDetails/regDet.svg"
                      beforeInjection={(svg) => {
                        svg.setAttribute("style", "stroke: yellow");
                        const paths = svg.querySelectorAll("path");
                        paths.forEach((path) => {
                          path.setAttribute(
                            "stroke",
                            status === "pending" ? "#E0990C" : status == "progress" ? "#299E58" : "#099cbc"
                          );
                        });
                      }}
                      className="file-zip-icon"
                    />
                    <img className="edit-circle-icon1" alt="" src={"/onboarding/accounts/" + status + ".svg"} />
                  </div>
                </div>
                <div className="title4">
                  <div className="add-details-to1">
                    Regulatory Details
                    <span className="mx-1" style={{ color: "red" }}>
                      *
                    </span>
                  </div>
                  <div className={"bg-" + status + " text-start"}>
                    {status === "pending" ? "Pending" : status == "progress" ? "In Progress" : "Approved"}
                  </div>
                </div>
                <div className="icon-open2">
                  <div className="chevron-up1">
                    <img className="arrow-icon15" alt="" src="/onboarding/arrow2.svg" />
                  </div>
                </div>
              </button>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-100 pb-0">
                      <input
                        type="text"
                        id="regulatedTrustType"
                        className="form-input my-0 pb-0"
                        // placeholder="Not Required"
                      />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Regulated Trust Type
                      </label>
                      <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
                    </div>
                  </div>
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-100 pb-0">
                      <select id="unregulatedTrustType" name="country" className="form-input my-0 pb-0">
                        <option value="">Select</option>
                        <option value="TT001">Family Trust</option>
                        {/* <option value="TT002">Charitable Trust</option>
                        <option value="TT003">Testmentary Trust</option>
                        <option value="TT004">Unit Trust</option>
                        <option value="TT005">Other</option>
                        <option value="TT006">Living Trust</option>
                        <option value="TT007">Irrevocable Trust</option>
                        <option value="TT008">Revocable Trust</option> */}
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Unregulated Trust Type
                        <span className="mx-1" style={{ color: "red" }} id="unregulatedTrustTypeLabel">
                          *
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="d-flex align-self-stretch d-none">
                    <div className="input-group w-50 me-2 pb-0">
                      <input id="searchId" name="country" className="form-input my-0 pb-0" />
                      <label htmlFor="country" className="form-input-label ps-1">
                        Search Id
                      </label>
                    </div>
                  </div>
                  {/* <button
                    id="submitRegulatoryDetails"
                    className="button-main btn outline-none submit-btn"
                    type="button"
                    onClick={functions.PostRegulatoryDetails}
                  >
                    <img className="check-double-icon" alt="" src="/onboarding/check-double.svg" />
                    <div className="label7 submitBtn">Submit</div>
                  </button>
                  <button
                    id="updateRegulatoryDetails"
                    className="button-main btn outline-none update-btn"
                    type="button"
                    onClick={functions.PatchRegulatoryDetails}
                  >
                    <img className="check-double-icon" alt="" src="/onboarding/edit-icon.png" />
                    <div className="label7 submitBtn">Update</div>
                  </button> */}
                </form>
              </div>
            </div>

            <div className="accordion-item border-0">
              <button
                className="accordion1 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="true"
                aria-controls="collapseFive"
              >
                <div className={status}>
                  <div className="file-zip-parent">
                    <ReactSVG
                      src="/onboarding/accounts/businessDetails/riskAssInfo.svg"
                      beforeInjection={(svg) => {
                        svg.setAttribute("style", "stroke: yellow");
                        const paths = svg.querySelectorAll("path");
                        paths.forEach((path) => {
                          path.setAttribute(
                            "stroke",
                            status === "pending" ? "#E0990C" : status == "progress" ? "#299E58" : "#099cbc"
                          );
                        });
                      }}
                      className="file-zip-icon"
                    />
                    <img className="edit-circle-icon1" alt="" src={"/onboarding/accounts/" + status + ".svg"} />
                  </div>
                </div>
                <div className="title4">
                  <div className="add-details-to1">
                    Risk Assessment Info
                    <span className="mx-1" style={{ color: "red" }}>
                      *
                    </span>
                  </div>
                  <div className={"bg-" + status + " text-start"}>
                    {status === "pending" ? "Pending" : status == "progress" ? "In Progress" : "Approved"}
                  </div>
                </div>
                <div className="icon-open2">
                  <div className="chevron-up1">
                    <img className="arrow-icon15" alt="" src="/onboarding/arrow2.svg" />
                  </div>
                </div>
              </button>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#accordionExample"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <select id="totalEmployees" name="country" className="form-input my-0 pb-0">
                        <option value="">Select</option>
                        <option value="EM001">Less than or equal 5</option>
                        <option value="EM002">Between 6 to 24</option>
                        <option value="EM003">Between 25 to 49</option>
                        <option value="EM004">Between 50 to 99</option>
                        <option value="EM005">More than 100</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Total Employees
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <select id="annualTurnover" name="country" className="form-input my-0 pb-0">
                        <option value="">Select</option>
                        <option value="GB001">Less than GBP 10,000</option>
                        <option value="GB002">GBP 10,000 to GBP 25,000</option>
                        <option value="GB003">GBP 25,000 to GBP 50,000</option>
                        <option value="GB004">GBP 50,000 to GBP 100,000</option>
                        <option value="GB005">GBP 100,000 to GBP 250,000</option>
                        <option value="GB006">GBP 250,000 to GBP 500,000</option>
                        <option value="GB007">GBP 500,000+</option>
                        <option value="SG001">Less than SGD 10,000</option>
                        <option value="SG002">SGD 10,000 to SGD 25,000</option>
                        <option value="SG003">SGD 25,000 to SGD 50,000</option>
                        <option value="SG004">SGD 50,000 to SGD 100,000</option>
                        <option value="SG005">SGD 100,000 to SGD 250,000</option>
                        <option value="SG006">SGD 250,000 to SGD 500,000</option>
                        <option value="SG007">SGD 500,000+</option>
                        <option value="EU001">Less than EUR 10,000</option>
                        <option value="EU002">EUR 10,000 to EUR 25,000</option>
                        <option value="EU003">EUR 25,000 to EUR 50,000</option>
                        <option value="EU004">EUR 50,000 to EUR 100,000</option>
                        <option value="EU005">EUR 100,000 to EUR 250,000</option>
                        <option value="EU006">EUR 250,000 to EUR 500,000</option>
                        <option value="EU007">EUR 500,000+</option>
                        <option value="AU001">Less than AUD 10,000</option>
                        <option value="AU002">AUD 10,000 to AUD 25,000</option>
                        <option value="AU003">AUD 25,000 to AUD 50,000</option>
                        <option value="AU004">AUD 50,000 to AUD 100,000</option>
                        <option value="AU005">AUD 100,000 to AUD 250,000</option>
                        <option value="AU006">AUD 250,000 to AUD 500,000</option>
                        <option value="AU007">AUD 500,000+</option>
                        <option value="US001">Less than USD 10,000</option>
                        <option value="US002">USD 10,000 to USD 25,000</option>
                        <option value="US003">USD 25,000 to USD 50,000</option>
                        <option value="US004">USD 50,000 to USD 100,000</option>
                        <option value="US005">USD 100,000 to USD 250,000</option>
                        <option value="US006">USD 250,000 to USD 500,000</option>
                        <option value="US007">USD 500,000+</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Annual Turnover
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <select id="industrySector" name="country" className="form-input my-0 pb-0">
                        <option value="">Select</option>
                        <option value="IS057">Accountancy firm</option>
                        <option value="IS001">Aerospace/Defense</option>
                        <option value="IS002">Agricultural Services & Products</option>
                        <option value="IS003">Agriculture</option>
                        <option value="IS004">Banks/Building Societies/Credit Unions</option>
                        <option value="IS005">Beverage providers/suppliers (Alcoholic, spirits)</option>
                        <option value="IS006">Beverage providers/suppliers (non-alcoholic)</option>
                        <option value="IS007">Charitable organization</option>
                        <option value="IS008">Chemicals sales, distribution</option>
                        <option value="IS009">Chemical & related manufacturing</option>
                        <option value="IS010">Computer Software</option>
                        <option value="IS011">Construction</option>
                        <option value="IS012">Consultancy</option>
                        <option value="IS013">Designers/Engineers</option>
                        <option value="IS014">Doctors & Other Health Care professionals</option>
                        <option value="IS015">
                          Drugs manufacturing/supplies (including legal cannabis, marijuana trade)
                        </option>
                        <option value="IS016">Education Providers</option>
                        <option value="IS017">Entertainment Industry</option>
                        <option value="IS018">Farming</option>
                        <option value="IS019">
                          Financial Services provider (adviser, mortgage broker, Loan consultant, debt recovery
                          consultant, pension, etc)
                        </option>
                        <option value="IS020">Food suppliers</option>
                        <option value="IS021">Freelancer</option>
                        <option value="IS022">Gaming houses/Casinos</option>
                        <option value="IS023">Government organization (Public sector)</option>
                        <option value="IS024">Health Care Services</option>
                        <option value="IS025">High Value Goods - Jewellery/Gold/Commodities</option>
                        <option value="IS026">Insurance providers</option>
                        <option value="IS027">Legal Services (Lawyers, External Counsels etc.)</option>
                        <option value="IS028">Logistics firms (trucks, transportation, freight)</option>
                        <option value="IS029">
                          Manufacturing (Auto, Car, Clothing, Electronics, Food Products, Furniture)
                        </option>
                        <option value="IS030">Media/Marketing</option>
                        <option value="IS031">Migration agent</option>
                        <option value="IS032">Miscellaneous</option>
                        <option value="IS033">MSBs/Remittance Providers</option>
                        <option value="IS034">Music Industry (music production, suppliers, recording)</option>
                        <option value="IS035">Not for Profit Organizations (Government Incentivized entities)</option>
                        <option value="IS036">Online Gaming developers/Providers</option>
                        <option value="IS037">Online shopping providers/suppliers</option>
                        <option value="IS038">Online suppliers of Adult Content</option>
                        <option value="IS039">Payment Platforms Providers</option>
                        <option value="IS040">Payrolls provider and payroll solution providers</option>
                        <option value="IS041">Pharmaceutical/Health Products &amp; supplies</option>
                        <option value="IS042">Power/Energy Providers</option>
                        <option value="IS043">Real Estates/Property providers</option>
                        <option value="IS044">Recreation/Live Entertainment</option>
                        <option value="IS045">Recruiting firms, suppliers/providers</option>
                        <option value="IS046">Religious organizations</option>
                        <option value="IS047">Securities &amp; Investment</option>
                        <option value="IS048">Security firms</option>
                        <option value="IS049">Superannuation funds providers</option>
                        <option value="IS050">Technology providers</option>
                        <option value="IS051">Telecommunication providers</option>
                        <option value="IS052">
                          Tobacco suppliers/manufacturers (including e-cigarettes, vapors, etc)
                        </option>
                        <option value="IS053">Travel &amp; Tourism suppliers/providers</option>
                        <option value="IS054">Trust funds providers</option>
                        <option value="IS055">Undisclosed</option>
                        <option value="IS056">Universities/Colleges</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Industry Sector
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <Select
                        id="countryOfOperation"
                        name="country"
                        className="form-input my-0 pb-0"
                        value={copValues}
                        options={options}
                        styles={customStyles}
                        isMulti
                        onChange={handleCopChange}
                      ></Select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Country Of Operation
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Hiding travel restricted country and restricted countries */}
                  <div className="d-flex align-self-stretch d-none">
                    <div className="input-group w-50 me-2 pb-0">
                      <select id="travelRestrictedCountry" name="country" className="form-input my-0 pb-0">
                        <option value=""></option>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Travel Restricted Country
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <select id="restrictedCountries" name="country" className="form-input my-0 pb-0"></select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Restricted Countries
                      </label>
                    </div>
                  </div>
                  {/* Hiding travel restricted country and restricted countries */}

                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0 d-none">
                      <select id="ofacLicencePresent" className="form-input my-0 pb-0">
                        <option value=""></option>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </select>
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        OFAC Licence
                      </label>
                      <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
                    </div>
                    <div className="input-group w-100 pb-0">
                      <select id="intendedUseOfAccount" name="country" className="form-input my-0 pb-0">
                        <option value="IS057">Accountancy firm</option>
                        <option value="IS001">Aerospace/Defense</option>
                        <option value="IS002">Agricultural Services & Products</option>
                        <option value="IS003">Agriculture</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Intended Use of Account
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <Select
                        id="transactionCountries"
                        name="country"
                        className="form-input my-0 pb-0"
                        options={options}
                        styles={customStyles}
                        isMulti
                        value={tCValues}
                        onChange={handleTCChange}
                      ></Select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Transaction Countries
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                  </div>
                  <button
                    id="submitRiskAssessmentInfo"
                    className="button-main btn outline-none submit-btn"
                    type="button"
                    onClick={() => {
                      functions.PostRiskAssessmentInfo(selectedCopValues, selectedTCValues);
                    }}
                  >
                    <img className="check-double-icon" alt="" src="/onboarding/check-double.svg" />
                    <div className="label7 submitBtn">Submit</div>
                  </button>
                  <button
                    id="updateRiskAssessmentInfo"
                    className="button-main btn outline-none update-btn"
                    type="button"
                    onClick={() => {
                      functions.PatchRiskAssessmentInfo(selectedCopValues, selectedTCValues);
                    }}
                  >
                    <img className="check-double-icon" alt="" src="/onboarding/edit-icon.png" />
                    <div className="label7 submitBtn">Update</div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default businessDetails;
