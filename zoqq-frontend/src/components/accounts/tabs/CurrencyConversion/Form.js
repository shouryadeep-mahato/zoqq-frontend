import React, { useEffect, useState } from 'react'
import CustomSelect from '../../../structure/CustomSelect'
import { DatePicker } from '@mui/x-date-pickers';
import CustomDate from '../../../structure/CustomDate';
import { TextField } from '@mui/material';
import NumberField from '../../../structure/NumberField';
import { symbol, getRate, convertAmount, getCurrenciesList } from '../../../../data/accounts/globalAccounts'
import "../../../accounts/css/accounts.css"
import Loader from "../../../Signup/assets/Signup/public/loader.gif";

function Form() {
    const options = [
        { value: 'EUR', label: 'EUR' },
        { value: 'HKD', label: 'HKD' },
        { value: 'USD', label: 'USD' },
        { value: 'SGD', label: 'SGD' },
        { value: 'AUD', label: 'AUD' },
        { value: 'GBP', label: 'GBP' },
    ]

    const [convertFrom, setConvertFrom] = useState(options);
    const [convertTo, setConvertTo] = useState(options);
    const [fromVal, setFromVal] = useState();
    const [toVal, setToVal] = useState();
    const [currentBal, setCurrentBal] = useState();
    const [currentBal2, setCurrentBal2] = useState();
    const [fxFees, setFxFees] = useState(0);
    const [convAmount, setConvAmount] = useState(0);
    const [currRate, setCurrRate] = useState(0);
    const [fromAmount, setFromAmount] = useState();
    const [toAmount, setToAmount] = useState();
    const [currencies, setCurrencies] = useState([]);
    const [type, setType] = useState("");

    useEffect(() => {
        if (fromAmount && fromVal) {
            setConvAmount(fromAmount - fxFees);     
            setToAmount(((fromAmount -fxFees) * currRate));
        }
    }, [fromAmount, fromVal, fxFees, currRate]);

    useEffect(()=>{

        const innerFunc = async () => {
          setCurrRate("---")
          const data = await getRate(1, fromVal, toVal);
          setCurrRate(Number(data.exchangeRate));
          setFxFees(Number(data.markupRate));
        }

        if(fromVal && toVal) {
          innerFunc()            
        }
    }, [fromVal, toVal])

    useEffect(()=> {
        if(currRate)
            setToAmount(((fromAmount - fxFees) * currRate));
    }, [currRate])

    useEffect(() => {
        const opt = options.filter((option) => option.value !== fromVal)
        setConvertTo(opt);
    }, [fromVal])

    useEffect(() => {
        const opt = options.filter((option) => option.value !== toVal)
        setConvertFrom(opt);
    }, [toVal])

    useEffect(() => {
      const getData = async () => {
        const list = await getCurrenciesList();
        setCurrencies(list);
      };
  
      getData();
    }, []);

    useEffect(() => {
        if (currencies) {
          setType(currencies[0]?.name);
          changeCurrency(currencies[0]?.name);
        }
      }, [currencies]);
    
      const changeCurrency = (type) => {
        currencies?.map((currency) => {
          if (currency.name === type)
          setCurrentBal(symbol[type] + " " + currency.balance);
        })
    
        setCurrentBal(currencies.balance);
      };
    
      useEffect(() => {
        currencies?.map((currency) => {
            if (currency.name === fromVal)
            setCurrentBal(symbol[currency.name] + " " + currency.balance);
          })
      }, [fromVal]);
    
      useEffect(() => {
        currencies?.map((currency) => {
            if (currency.name === toVal)
            setCurrentBal2(symbol[currency.name] + " " + currency.balance);
          })
      }, [toVal]);
    


    return (
        <form className='row mt-4'>
            <label className='mb-2'>Convert</label>
            <div className='col-12 d-flex border-bottom mb-1'>
                <div className="input-group containertext w-75 h-100 d-flex">
                    <NumberField className="flex-fill" setValue={setFromAmount} defaultValue={fromAmount} />
                    <p className="m-auto me-2">{symbol[fromVal]}</p>
                </div>
                <div className="input-group containertext w-25 h-100 d-flex flex-nowrap">
                    {/* <img src="/accounts/currency.svg" className='py-3 pe-2' />   */}
                    <div className='border-start my-2 w-100'>
                        <CustomSelect options={convertFrom} setValue={setFromVal} placeholder={"Select"} />
                    </div>
                </div>
            </div>

        

                <p className='mb-4'><span className='fw-normal'>Current balance: </span>{fromVal ? currentBal : "0.00"} {fromVal}{" "}</p>

                {toVal && fromAmount && fromVal && <div className='d-flex justify-content-around my-4 animation'>
                    <div>
                        <p className='m-0 d-flex flex-column justify-content-center align-items-center'>
                            <span className='grey1'>
                                Fx fees
                            </span>
                            <span>
                                {fxFees} {fromVal}
                            </span>
                        </p>

                    </div>
                    <div>
                        <p className='m-0 d-flex flex-column justify-content-center align-items-center'>
                            <span className='grey1'>
                                Exchange rate
                            </span>
                            <span>
                                {currRate} {fromVal} / {toVal}
                            </span>
                        </p>
                    </div>
                </div>}



                <label className='mb-2'>To</label>
                <div className='col-12 d-flex border-bottom mb-1'>
                    <div className="input-group containertext w-75 h-100">
                        <TextField readOnly={true} className="flex-fill" value={toAmount?toAmount:0} />
                        <p className="m-auto me-2">{symbol[toVal]}</p>
                    </div>
                    <div className="input-group containertext w-25 h-100 d-flex flex-nowrap">
                        <div className='border-start my-2 w-100'>
                            <CustomSelect options={convertTo} setValue={setToVal} placeholder={"Select"} />
                        </div>
                    </div>
                </div>
                {toVal && <p className='mb-4'><span className='fw-normal'>Current balance: </span>{currentBal2} {toVal}</p>}


                <button onClick={(e)=>{e.preventDefault(); convertAmount({fromAmount, fromVal, toVal});}} style={{marginTop:"10px"}} className='w-100 btn bg-success py-3 text-white fw-500'>
                <div id="button-textTwo">
               <div className="addAccountButtonText" style={{marginLeft:"50px", fontWeight:"500"}}>Convert</div>
               </div>
                <div id="button-loaderTwo">
                  <img className="addAccountButtonLoader" alt="" src={Loader}/>
                </div>
                </button>

            

        </form>
    )
}

export default Form