import React from 'react'
import EachCard from '../structure/EachCard'
import BreadCrumbs from '../structure/BreadCrumbs'

function Accounts() {
  const data = [{
    id: 1,
    color: "blue",
    title: "Global Accounts",
    subtitle: "These accounts are designed to manage financial and operational aspects on a global scale.",
    img: "/accounts/globalAccounts.svg",
    url: "/accounts/global-accounts"
  }, {
    id: 2,
    color: "green",
    title: "Currency Conversion",
    subtitle: "Move funds across your currency accounts to facilitate payments in your desired currency.",
    img: "/accounts/currencyConversion.svg",
    url: "/accounts/conversion"
  }, {
    id: 3,
    color: "yellow",
    title: "Account Statements",
    subtitle: "It's a summary of the financial transactions related to a specific account over a defined period of time.",
    img: "/accounts/accountStatement.svg",
    url: "/accounts/statements"
  }]
  return (
    <>
      <BreadCrumbs data={{name:"Accounts", img:"/accounts/accounts.svg", backurl:"/"}} />

      <div className='row'>
        {data.map((eachData) => (
          <EachCard key={eachData.id} data={eachData} />
        ))}
      </div>
    </>

  )
}

export default Accounts