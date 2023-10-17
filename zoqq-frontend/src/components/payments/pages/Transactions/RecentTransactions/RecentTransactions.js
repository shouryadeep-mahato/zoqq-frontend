import React, {useState,useEffect} from 'react'
import EachDayTransaction from './EachDayTransaction'
import {Link} from 'react-router-dom'
import { transactionDetailsPayments } from '../../../../../data/accounts/globalAccounts'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "../../../../accounts/css/accounts.css";

function RecentTransactions({transactions, isLoading}) {
   
    // const [isLoading,setIsLoading] = useState(true);
    // const [transactions, setTransactions] = useState([]);

    
  
if( transactions && ((transactions=="")||(transactions==[]))){
    if(transactions == "**No transactions found**" ){
        return (
          <div>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                <img src='/refresh.svg' alt="Refresh Icon" />
                <h5 className='m-0 ms-2'>Recent Transactions</h5>
              </div>
            </div>
        
            <SkeletonTheme baseColor="#F0F0F0" highlightColor="#D4F1F4">
              {isLoading ? (
                <div className='recentTransaction'>
                 <h5><hr/><Skeleton width={120} style={{marginLeft: '-67%'}}/></h5>
                 <h2><Skeleton/></h2>
                 <h5><hr/><Skeleton width={120} style={{marginLeft: '-67%'}}/></h5>
                 <h2><Skeleton/></h2>
                 </div>
              ) : (
              
                  <EachDayTransaction data={transactions} />
        
              )}
            </SkeletonTheme>
          </div>
        );
      }
      else{
      return (
        <div>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
              <img src='/refresh.svg' alt="Refresh Icon" />
              <h5 className='m-0 ms-2'>Recent Transactions</h5>
            </div>
          </div>
      
          <SkeletonTheme baseColor="#F0F0F0" highlightColor="#D4F1F4">
            {isLoading ? (
              <div className='recentTransaction'>
               <h5><hr/><Skeleton width={120} style={{marginLeft: '-67%'}}/></h5>
               <h2><Skeleton/></h2>
               <h5><hr/><Skeleton width={120} style={{marginLeft: '-67%'}}/></h5>
               <h2><Skeleton/></h2>
               </div>
            ) : (
                transactions?.map((transaction, key) => (
                <EachDayTransaction key={key} data={transaction} />
              ))
            )}
          </SkeletonTheme>
      
          {/* <p className='yellow100 text-center mt-5' role='button' onClick={() => recentTransactionData(10)}>Show More</p> */}
        </div>
      );
              }

}
else{
      if(transactions == "**No transactions found**" ){
        return (
          <div>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                <img src='/refresh.svg' alt="Refresh Icon" />
                <h5 className='m-0 ms-2'>Recent Transactions</h5>
              </div>
            </div>
        
            <SkeletonTheme baseColor="#F0F0F0" highlightColor="#D4F1F4">
              {isLoading ? (
                <div className='recentTransaction'>
                 <h5><hr/><Skeleton width={120} style={{marginLeft: '-67%'}}/></h5>
                 <h2><Skeleton/></h2>
                 <h5><hr/><Skeleton width={120} style={{marginLeft: '-67%'}}/></h5>
                 <h2><Skeleton/></h2>
                 </div>
              ) : (
              
                  <EachDayTransaction data={transactions} />
        
              )}
            </SkeletonTheme>
          </div>
        );
      }
      else{
      return (
        <div>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
              <img src='/refresh.svg' alt="Refresh Icon" />
              <h5 className='m-0 ms-2'>Recent Transactions</h5>
            </div>
          </div>
      
          <SkeletonTheme baseColor="#F0F0F0" highlightColor="#D4F1F4">
            {isLoading ? (
              <div className='recentTransaction'>
               <h5><hr/><Skeleton width={120} style={{marginLeft: '-67%'}}/></h5>
               <h2><Skeleton/></h2>
               <h5><hr/><Skeleton width={120} style={{marginLeft: '-67%'}}/></h5>
               <h2><Skeleton/></h2>
               </div>
            ) : (
                transactions?.map((transaction, key) => (
                <EachDayTransaction key={key} data={transaction} />
              ))
            )}
          </SkeletonTheme>
      
          {/* <p className='yellow100 text-center mt-5' role='button' onClick={() => recentTransactionData(10)}>Show More</p> */}
        </div>
      );
              }
      
}
}

export default RecentTransactions