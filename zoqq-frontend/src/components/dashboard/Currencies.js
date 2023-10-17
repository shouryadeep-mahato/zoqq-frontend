import React, { useEffect, useState } from "react";
import EachCurrencies from "./EachCurrencies";
import { Link } from "react-router-dom";
import { getBankAccountForCreate, getCurrenciesList } from "../../data/accounts/globalAccounts";
import Select from "react-select";

function Currencies({ isActivated }) {
  const [totalBal, setTotalBal] = useState("0.00");

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const currencies = await getCurrenciesList();
      if (currencies.length > 0) {
        // Map the retrieved data into the format expected by react-select
        const formattedOptions = currencies.map((currency) => ({
          value: currency.balance,
          label: currency.name,
        }));
        setOptions(formattedOptions);
      }
    };

    fetchCurrencies();
    
  }, []); // This effect runs only once on component mount

  useEffect(()=> {
    if (options.length > 0)
      handleSelectChange(options[0])
  }, [options])

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setTotalBal(selectedOption.value);
  };

  return (
    <div className="border-bottom bg-white pt-2 h-100">
      <div className="d-flex justify-content-between px-3 flex-wrap">
        <div className="d-flex align-items-center">
          <img src="/bank.svg" className="me-2" />
          <h3 className="text-nowrapd m-0 d-flex">
            Total Balance: {totalBal}
            <div style={{ width: "120px", fontSize: "15px", marginLeft: "8px" }}>
              {options.length > 0 && <Select options={options} defaultValue={options[0]} onChange={handleSelectChange} />}
            </div>
          </h3>
        </div>
      </div>
      <div className="d-flex overflow-auto">
        <EachCurrencies
          index={0}
          key={0}
          options="USD"
          type="USD"
          isActivated={isActivated}
          setShowDetails={() => { }}
          showArray={[]}
          handleShow={() => { }}
          handleActive={() => { }}
          activeArray={[]}
        />
        <EachCurrencies
          index={1}
          key={1}
          options="SGD"
          type="SGD"
          isActivated={isActivated}
          setShowDetails={() => { }}
          showArray={[]}
          handleShow={() => { }}
          handleActive={() => { }}
          activeArray={[]}
        />
        <EachCurrencies
          index={2}
          key={2}
          options="EUR"
          type="EUR"
          isActivated={isActivated}
          setShowDetails={() => { }}
          showArray={[]}
          handleShow={() => { }}
          handleActive={() => { }}
          activeArray={[]}
        />
        <EachCurrencies
          index={3}
          key={3}
          options="AUD"
          type="AUD"
          isActivated={isActivated}
          setShowDetails={() => { }}
          showArray={[]}
          handleShow={() => { }}
          handleActive={() => { }}
          activeArray={[]}
        />
        <EachCurrencies
          index={4}
          key={4}
          options="HKD"
          type="HKD"
          isActivated={isActivated}
          setShowDetails={() => { }}
          showArray={[]}
          handleShow={() => { }}
          handleActive={() => { }}
          activeArray={[]}
        />
        <EachCurrencies
          index={5}
          key={5}
          options="GBP"
          type="GBP"
          isActivated={isActivated}
          setShowDetails={() => { }}
          showArray={[]}
          handleShow={() => { }}
          handleActive={() => { }}
          activeArray={[]}
        />
      </div>
      {!isActivated && (
        <p className="px-3 mt-3">
          <span className="fw-normal">You will be able to create accounts in 6 currencies after </span>
          <Link to="/onboarding/Home" className="blue100 fw-bolder ms-0">
            Activating Your Account
          </Link>
          .
        </p>
      )}
    </div>
  );
}

export default Currencies;
