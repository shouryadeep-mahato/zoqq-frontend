import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../../structure/BreadCrumbs'
import EachCurrencies from '../../structure/EachCurrencies'
import DetailsBar from './GlobalAccounts/DetailsBar'
import { AiFillBank } from 'react-icons/ai'
import { flag, getActivatedBankAccount, getBankAccountForCreate, getCurrenciesList, symbol } from '../../../data/accounts/globalAccounts'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import AccountsFetchSkeleton from '../../../loading_Skeleton/gloabalAccounts_Skeleton';
import { useLocation } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';


function GlobalAccounts() {
  const [showDetails, setShowDetails] = useState(false);
  const [currencies, setCurrencies] = useState([])
  const [balance, setBalance] = useState(0);
  const card = [true, true, true, true, false, false]
  const [showArray, setShowArray] = useState(new Array(currencies.length).fill(false));
  const [activeArray, setActiveArray] = useState(new Array(currencies.length).fill(false));
  const [bankDetails, setAccountDetails] = useState([]);
  const [bankAccountForCreate, setBankAccountForCreate] = useState([]);
  const [type, setType] = useState("");
  const [ isLoading, setIsLoading ] = useState(true);
  const custHashId = sessionStorage.getItem("customerHashId");
  
  //const location = useLocation()
  

//  useEffect(() => {
//   const hashParams = new URLSearchParams(location.hash);
//   const currency = hashParams.get('Currency');

//   if (currency) {
//     // Do something with the 'currency' value, such as setting it in state
//     // Assuming `setType` is a state updater function for a state variable named `type`
//     setType(currency.toUpperCase());
//   }
// }, [location]);

if ((custHashId=="")||(custHashId==null)||(custHashId==undefined)){
  return (
    <div className='d-flex '>
    <div className='m-3 w-100'>
      <div className='row bg-white border p-4 d-flex rounded-3 w-100'>
      <h3 className='m-0 ms-2'>Global Accounts</h3>
        <div className='p-3'>
          <div className='bg-blue10 p-3 rounded-4 border d-inline-block'>
          <AiFillBank className='blue100' size={50} />
            </div>
          <br/>
          <div className='d-flex justify-content-center'>
                <div>
                    <img src='/lock_3.svg' className=' border p-3 bg-grey' />
                </div>
            </div>

            <p className='text-center pb-5 mb-5 mt-2 p-3'>
                <span className='fw-normal'>You don't have any account yet.
                <br />
                To create a account, you need to </span><a href='/onboarding/Home' className='blue100'>Activate Your Account</a><span className='fw-normal'> first.</span>
            </p>
        </div>
      </div>
    </div>
  </div>
    
)
}

else{

  useEffect(() => {
    if (!showDetails)
      setShowArray(new Array(currencies.length).fill(false));
    setActiveArray(new Array(currencies.length).fill(false));
  }, [showDetails?.show])

  useEffect(() => {
    if (currencies) {
      setType(currencies[0]?.name);
      changeCurrency(currencies[0]?.name);
    }
  }, [currencies])

  const changeCurrency = (type) => {
    setType(type);
    currencies?.map((currency) => {
      if (currency.name === type)
        setBalance(symbol[type] + " " + currency.balance);
    })

    setShowDetails(false);
    // setBankDetails(getActivatedBankAccount(type));
    //setBankAccountForCreate(getBankAccountForCreate(type));
  }

  const handleShow = (idx) => {
    const array = new Array(currencies.length).fill(false);
    array[idx] = true;
    setShowArray(array);
  }

  const handleActive = (idx) => {
    const array = new Array(currencies.length).fill(false);
    array[idx] = true;
    setActiveArray(array);
  }

  useEffect(() => {

    const getData = async () => {
      const list = await getCurrenciesList();
      setCurrencies(list);
      setIsLoading(true);

    }

    getData();
  
  }, [])


  const getAccountDetails = async () => {
    const list = await getActivatedBankAccount(type);
    setAccountDetails(list);
    setIsLoading(false)
  }

  useEffect(() => {
    setAccountDetails([]);
    

      if(type){
        setIsLoading(true)
        getAccountDetails();
      }

  }, [type])

  useEffect(() => {
    setBankAccountForCreate([]);
    const getbankNames = async () => {
      const list = await getBankAccountForCreate(type);
      setBankAccountForCreate(list);
    }

      if(type)
      getbankNames();

  }, [type])

  return (
    <>
      <BreadCrumbs
        data={{
          name: "Global Accounts",
          img: "/arrows/arrowLeft.svg",
          backurl: "/accounts",
          info: true,
        }}
      />
  
      <div className='d-flex '>
        <div className='m-3 w-100'>
          <div className='row bg-white border p-4 d-flex rounded-3 w-100'>
            <div className='p-3'>
              <div className='bg-blue10 p-3 rounded-4 border d-inline-block'>
                <AiFillBank className='blue100' size={50} />
              </div>
              <br />
              <SkeletonTheme baseColor="#E0E0E0"  highlightColor="#D4F1F4">
                {isLoading ? (
                  <>
                   <h5 className='text-nowrap m-0 mt-3 d-inline-block fw-500'>
                   Total Balance: <span className='fw-600'><Skeleton width={200} height={25} style={{borderRadius: "10px"}}/></span>
                 </h5>
                  <div className='d-flex flex-wrap'>
                    <AccountsFetchSkeleton /><AccountsFetchSkeleton /><AccountsFetchSkeleton />
                  </div>
                  </>
                ) : (
                  <>
                    <h5 className='text-nowrap m-0 mt-3 d-inline-block fw-500'>
                      Total Balance: <span className='fw-600'>{balance}</span>
                    </h5>
                    <select
                      className='ms-1 px-1 bg-white fw-500 rounded-3'
                      value={type}
                      onChange={(e) => changeCurrency(e.target.value)}
                    >
                      {currencies?.map((currency, index) => (
                        <option key={index}>
                          <div>
                            <img src={flag[type]} width={30} alt={currency.name} />
                            {currency.name}
                          </div>
                        </option>
                      ))}
                    </select>
                    <img src="/info_circle.svg" className='ms-2 mb-2' alt='info' />
                  </>
                )}
              </SkeletonTheme>
            </div>
  
            { !isLoading && <div className='w-100 row '>
              <EachCurrencies
                getAccountDetails={getAccountDetails}
                isActivated={true}
                type={type}
                setShowDetails={setShowDetails}
                showArray={showArray}
                handleShow={handleShow}
                handleActive={handleActive}
                activeArray={activeArray}
                cardActivated={false}
                options={bankAccountForCreate}
              />
              {bankDetails?.map((currency, index) => (
                <EachCurrencies
                  type={type}
                  data={currency}
                  key={index}
                  index={index}
                  isActivated={true}
                  setShowDetails={setShowDetails}
                  showArray={showArray}
                  handleShow={handleShow}
                  handleActive={handleActive}
                  activeArray={activeArray}
                  cardActivated={true}
                />
              ))}
            </div>}
          </div>
        </div>

        {
          showDetails && <DetailsBar setShowDetails={setShowDetails} handleShow={handleShow} handleActive={handleActive} data={showDetails?.data}/>
        }
      </div>
      {/* Close SkeletonTheme here */}
    </>
  );
  
  
      }
    }
export default GlobalAccounts