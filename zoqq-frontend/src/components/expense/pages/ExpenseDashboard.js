import React from 'react'
import EachCard from './EachCard'

function Expense() {
  const data = [{
    id: 1,
    color: "blue",
    title: "Invoices",
    subtitle: "Seamless Invoicing  to facilitate payments in your desired currency.",
    img: "/sidebar/expense/invoices.svg",
    url:"invoices"
  }, {
    id: 2,
    color: "green",
    title: "Bills",
    subtitle: "Simplify Your Finances with Our Bill Management Feature All Your Bills.",
    img: "/sidebar/expense/bills.svg",
    url:"bills"
  }, {
    id: 3,
    color: "yellow",
    title: "Cards",
    subtitle: "Empower Your Team with Corporate Cards,A New Era of Employee Benefits.",
    img: "/sidebar/expense/corporateCards.svg",
    url:"cards"
  }]
  return (
    <>
      <div className='d-flex border bg-white'>
        <img className='py-3 px-4 border-end' src='/accounts/accounts.svg' />
        <h6 className='p-4 m-0'>Expense</h6>
      </div>

      <div className='row'>
        {data.map((eachData) => (
          <EachCard key={eachData.id} data={eachData} />
        ))}
      </div>
    </>

  )
}

export default Expense