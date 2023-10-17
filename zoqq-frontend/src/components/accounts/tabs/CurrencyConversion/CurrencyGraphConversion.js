import React, { useEffect, useState } from 'react';
import CustomSelect from '../../../structure/CustomSelect';
import { getRateGraph } from '../../../../data/accounts/globalAccounts';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "../../../../loading_Skeleton/Skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CurrencyGraph() {
  const options = [
    { label: 'GBP', value: 'GBP' },
    { label: 'EUR', value: 'EUR' },
    { label: 'AUD', value: 'AUD' },
    { label: 'HKD', value: 'HKD' },
    { label: 'SGD', value: 'SGD' },
  ];

  const [selectCurr, setSelectCurr] = useState('GBP');
  const [amount, setAmount] = useState('0');
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchRate = async () => {
      if (selectCurr) {
        try {
          const rate = await getRateGraph(1, selectCurr, "USD");
          setAmount(Number(rate ).toFixed(3));
          setIsLoading(false);
        } catch (error) {
          toast.error("Something went wrong! Please try again later.")
          setIsLoading(false);
        }
      }
    };
    
    fetchRate();
  }, [selectCurr]);

  return (
    <div className='mx-3 row border p-3 bg-white'>
    <div className='col-6 h4'>
      1 {selectCurr} = <SkeletonTheme color="#F0F0F0" highlightColor="#D4F1F4">
        {isLoading ? (
          <span className='fw-600'><Skeleton width={120} height={25} style={{borderRadius: "10px"}}/></span>
          
        ) : (
          `${amount} USD`
        )}
      </SkeletonTheme>
    </div>
      <div className='col-4 btn btn-outline-white border my-auto mx-auto grey1 rounded-3 text-nowrap'>
        <CustomSelect placeholder='Select' options={options} setValue={setSelectCurr} />
      </div>
      <p className='h5'>Today</p>
      <div className='row grey1 fw-normal'>
        <img src='/graph.svg' className='d-inline-block col-9' alt='Graph' />
        <p className='text-center col-3 my-3'>
          1,313
          <br />
          <br />
          1,291
          <br />
          <br />
          1,269
        </p>
      </div>
      <div className='d-flex justify-content-between grey1 fw-normal'>
        <p className='col-9'>Month ago</p>
        <p className='text-center col-3'>Today</p>
      </div>
    </div>
  );
}

export default CurrencyGraph;