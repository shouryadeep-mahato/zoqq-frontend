import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import Accounts from './Accounts'
import { useLocation } from 'react-router-dom'
import GlobalAccounts from './tabs/GlobalAccounts';
import CurrencyConversion from './tabs/CurrencyConversion';
import AccountStatement from './tabs/AccountStatement';

function AccountsHome() {
    const location = useLocation();
    const [url, setUrl] = useState();

    useEffect(() => {
        const { pathname } = location;
        if (pathname.endsWith('/')) {
          const newPathname = pathname.slice(0, -1);
          setUrl(newPathname);
        } else {
            setUrl(pathname);
        }
      }, [location.pathname]);

    return (
        <div>
            <div className='d-flex'>
                <SideBar />
                <div className="container-fluid px-0 bg-light clear-left overflow-auto" style={{ height: "100vh" }}>
                    {
                        (url==="/accounts") ? <Accounts /> : (url==="/accounts/global-accounts") ? <GlobalAccounts/>:(url==="/accounts/conversion") ? <CurrencyConversion/>:(url==="/accounts/statements") ? <AccountStatement/>:""
                    }
                </div>
            </div>
        </div>
    )
}

export default AccountsHome