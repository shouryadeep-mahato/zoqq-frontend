import React, {useState,useEffect} from 'react'
import EachDayTransaction from './EachDayTransaction'
import {Link} from 'react-router-dom'
import { recentTransactionData } from '../../../data/accounts/globalAccounts'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "../../../loading_Skeleton/Skeleton.css";

function RecentTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchTransactionData() {
          try {
            const data = await recentTransactionData();
            if(data.length==0){
              setTransactions("**No recent transactions in the last 7 days**");
              setIsLoading(false);
            }
            else{
            setTransactions(data);
            setIsLoading(false);
            }
          } catch (error) {
            console.error("Error fetching recent conversion data:", error);
          }
        }
    
        fetchTransactionData();
      }, [])

      if(transactions == "**No recent transactions in the last 7 days**" ){
        return (
          <div>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                <img src='/refresh.svg' alt="Refresh Icon" />
                <h5 className='m-0 ms-2'>Recent Transactions</h5>
              </div>
              <Link to="/payments/transactions" className='text-decoration-none grey1 m-0'>
                View All &gt;
              </Link>
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
            <Link to="/payments/transactions" className='text-decoration-none grey1 m-0'>
              View All
            </Link>
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

export default RecentTransactions