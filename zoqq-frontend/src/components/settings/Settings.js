import React from 'react'
import EachCard from '../structure/EachCard'
import BreadCrumbs from '../structure/BreadCrumbs'

function Settings() {
  const data = [{
    id: 1,
    color: "blue",
    title: "Global Accounts",
    subtitle: "Move funds across your currency accounts to facilitate payments in your desired currency.",
    img: "/accounts/globalAccounts.svg"
  }, {
    id: 2,
    color: "green",
    title: "Currency Conversation",
    subtitle: "Move funds across your currency accounts to facilitate payments in your desired currency.",
    img: "/accounts/currencyConversion.svg"
  }, {
    id: 3,
    color: "yellow",
    title: "Account Statements",
    subtitle: "Move funds across your currency accounts to facilitate payments in your desired currency.",
    img: "/accounts/accountStatement.svg"
  }]
  return (
    <>
      <BreadCrumbs data={{name:"Settings", img:"/accounts/accounts.svg", backurl:"/"}} />

      <div className='row'>
        {data.map((eachData) => (
          <EachCard key={eachData.id} data={eachData} />
        ))}
      </div>
    </>

  )
}

export default Settings