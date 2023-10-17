import React, { useState } from "react";
import CustomDate from "../../structure/CustomDate";
import CustomSelect from "../../structure/CustomSelect";
import CustomDateRange from "../../structure/CustomDateRangePicker"

function TableRow({ index, data, setShowDetails, setSelectedRowData }) {
  const colorList = [
    " blue100 bg-blue10",
    " green100 bg-green10",
    " yellow100 bg-yellow10",
  ];
  const row = data[index];
  function getColorClass(status) {
    if (row.status === "P") {
      return "yellow100 bg-yellow10";
    } else if (status === "A") {
      return "green100 bg-green10";
    } else if (status === "R") {
      return "blue100 bg-blue10";
    } else {
      return "blue100 bg-blue10";
    }
  }
  
  // Calculate the number of days overdue
  const dueDate = new Date(row.dueDate);
  const currentDate = new Date();
  const timeDifference = currentDate - dueDate;
  const daysRemaining = Math.floor(timeDifference / (1000 * 3600 * 24));

  let overdueText = "";
  let overdueClass = "d-inline-block py-1 px-3 rounded-pill fw-500 yellow100 bg-yellow10 ";

  if (daysRemaining > 0) {
    overdueText = `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} overdue`;
    overdueClass = "overdue"; // Change color for overdue
  } else if (daysRemaining === 0) {
    overdueText = "Due today";
    overdueClass = "due-today"; // Change color for due today
  } else {
    overdueText = `Due in ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? "s" : ""}`;
    overdueClass = "due-future"; // Change color for due in the future
  }

  return (
    <tr
      onClick={() => {
        setShowDetails(true);
        setSelectedRowData(row);
      }}
      className="blueHover"
      role="button"
    >

      <td scope="row">{row.id.slice(0,10)}</td>
      <td>
        <div
          className={`d-inline-block py-1 px-3 rounded-pill fw-500 ${getColorClass(
            row.status
          )}`}
        >
          {row.status === "P"
            ? "Pending"
            : row.status === "A"
              ? "Approved"
              : row.status === "R"
                ? "Rejected"
                : row.status}
        </div>
      </td>
      <td>{row.recipientName}</td>

      <td>{row.sourceOfFund}</td>
      <td className={overdueClass}>{overdueText}</td>
      
      <td><b>{row.amount}</b></td>
    </tr>
  );
}

function TableRowinvoice({ index, data, setShowDetails, setSelectedRowData }) {
  const colorList = [" blue100 bg-blue10", " green100 bg-green10", " yellow100 bg-yellow10"]
  const row = data[index];
  function getColorClass(status) {
    if (row.status === 'P') {
      return 'yellow100 bg-yellow10';
    } else if (status === 'A') {
      return 'green100 bg-green10';
    } else if (status === 'R') {
      return 'blue100 bg-blue10';
    } else {
      return 'blue100 bg-blue10';
    }
  }

  return (
    <tr
      onClick={() => {
        setShowDetails(true);
        setSelectedRowData(row);
      }}
      className="blueHover"
      role="button"
    >

      <td scope="row">{row.customerName}</td>
      <td>
        <div
          className={`d-inline-block py-1 px-3 rounded-pill fw-500 ${getColorClass(
            row.status
          )}`}
        >
          {row.status === "P"
            ? "Pending"
            : row.status === "A"
              ? "Approved"
              : row.status === "R"
                ? "Rejected"
                : row.status}
        </div>
      </td>
      <td>{row.description}</td>

      <td>{row.date}</td>
      <td>{row.dueDate}</td>
      <td>{row.customerEmail}</td>
      <td>{row.createdBy}</td>
      <td>{row.companyId}</td>
    </tr>
  );
}

function Tablelist({
  setShowDetails,
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  headers,
  setSelectedRowData,
  pagename,
}) {
  const options = [
    { value: "Date", label: "Date" },
    { value: "PaymentStatus", label: "Payment Status" },
    { value: "Billnumber", label: "Billnumber" },
  ];
  const [val, setVal] = useState([]);

  return (
    <div>
      <div className='row mt-3 mb-5 d-flex align-items-center'>
        <div className="col-12 col-md-4 my-2 my-lg-0">
          <div className='d-flex ms-md-3 me-md-1 border rounded-3 flex-fill py-2'>
            <button className="btn" type="submit" disabled  >
              <img src='/search.svg' />
            </button>
            <input
              className="form-control border-0"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </div>
        <div className='col-12 col-md-4 my-2'>
          <div className='rounded-3 mx-md-1 border'>
            <CustomDateRange className="w-100" />
          </div>
        </div>
        <div className='col-12 col-md-4 my-2'>
          <div className='ms-md-1 me-md-3 h-100 py-2 border rounded-3'>
            <CustomSelect placeholder="Status" options={options} setValue={setVal} />
          </div>
        </div>

        <div className='col-12 blue100 text-center'>
          More Filters 
        </div>
        
      </div>

      <div className='mx-3 overflow-auto'>
        <table className="table border">
          <thead className="table-light py-3">
            <tr className='grey1'>
              {headers.map((header, index) => (
                <th key={index} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='border-top-0'>
            {pagename === "Bills" ? (
              data.map((item, index) => (
                <TableRow
                  key={index}
                  data={data}
                  index={index}
                  setShowDetails={setShowDetails}
                  setSelectedRowData={setSelectedRowData}
                />
              ))
            ) : pagename === "Invoices" ? (
              data.map((item, index) => (
                <TableRowinvoice
                  key={index}
                  data={data}
                  index={index}
                  setShowDetails={setShowDetails}
                  setSelectedRowData={setSelectedRowData}
                />
              ))
            ) : pagename === "Cards" ? (
              data.map((item, index) => (
                <TableRow
                  key={index}
                  data={data}
                  index={index}
                  setShowDetails={setShowDetails}
                  setSelectedRowData={setSelectedRowData}
                />
              ))
            ) : (
              <tr>
                <td colSpan={headers.length}>
                  Rows are not available based on the conditions.
                </td>
              </tr>
            )}
          </tbody>


        </table>
        {/* <div className="pagination mt-3">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-3 border p-2 rounded-3">{currentPage}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div> */}
        <div className="btn-group mb-3" role="group" aria-label="Basic example">
          <button onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1} type="button" className="btn btn-outline-success">
            Previous
          </button>
          <p type="button" className="btn m-0">
            1
          </p>
          <button onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages} type="button" className="btn btn-outline-success">
            Next
          </button>
        </div>
      </div>
    </div>

  );
}

export default Tablelist;
