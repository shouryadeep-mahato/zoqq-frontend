import React, { useState } from "react";
import CustomSelect from "../../../structure/CustomSelect";
import CustomDateRange from "../../../structure/CustomDateRangePicker";

function TableRow({ index, setShowDetails }) {
  const colorList = [
    " blue100 bg-blue10",
    " green100 bg-green10",
    " yellow100 bg-yellow10",
  ];

  return (
    <tr
      onClick={() => setShowDetails(true)}
      className="blueHover"
      role="button"
    >
      <td scope="row">
        {" "}
        <div className="bg-green100 text-white  pe-2 pt-4 rounded-4 pb-2 text-end">
          *2655
        </div>
      </td>

      <td className="text-center align-middle">
        <span className="fw-500">Travel Card</span>
        <br />
        Travels in Europe
      </td>
      <td className="text-center align-middle">DM</td>
      <td className="text-center align-middle my-auto">
        <img className="bg-grey m-0 mx-1" src="/expense/card/helicopter.svg" />
        <span className="align-middle">Travel</span>
      </td>
      <td className="text-center align-middle">
        <div
          className={
            "d-inline-block py-1 px-3 rounded-pill fw-500" +
            colorList[index % 3]
          }
        >
          Status
        </div>
      </td>
      <td>
        <div className="progress" style={{ height: "4px" }}>
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: "25%" }}
            aria-valuenow={25}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="d-flex justify-content-between">
          <div>
            spend:
            <br />
            <span className="fw-500">300.00 USD</span>
          </div>
          <div>
            Limit:
            <br />
            <span className="fw-500">900.00 USD</span>
          </div>
        </div>
      </td>
    </tr>
  );
}

function CardList({ setShowDetails }) {
  const rows = [1, 2, 3];
  const [val, setVal] = useState();
  const options = [
    { value: "vanilla", label: "Vanilla" },
    { value: "strawberry", label: "Strawberry" },
    { value: "caramel", label: "Caramel" },
    { value: "mint", label: "Mint" },
    { value: "blueberry", label: "Blueberry" },
    { value: "raspberry", label: "Raspberry" },
    { value: "hazelnut", label: "Hazelnut" },
    { value: "peanut_butter", label: "Peanut Butter" },
    { value: "coconut", label: "Coconut" },
    { value: "lemon", label: "Lemon" },
    { value: "coffee", label: "Coffee" },
    { value: "pistachio", label: "Pistachio" },
    { value: "banana", label: "Banana" },
    { value: "butterscotch", label: "Butterscotch" },
    { value: "cherry", label: "Cherry" },
    { value: "almond", label: "Almond" },
    { value: "cinnamon", label: "Cinnamon" },
    { value: "honey", label: "Honey" },
    { value: "orange", label: "Orange" },
    { value: "maple", label: "Maple" },
  ];
  return (
    <div>
      <div className="row mt-3 mb-5 d-flex align-items-center">
        <div className="col-12 col-md-4 my-2 my-lg-0">
          <div className="d-flex ms-md-3 me-md-1 border rounded-3 flex-fill py-2">
            <button className="btn" type="submit" disabled>
              <img src="/search.svg" />
            </button>
            <input
              className="form-control border-0"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </div>
        <div className="col-12 col-md-4 my-2">
          <div className="rounded-3 mx-md-1 border">
            <CustomDateRange className="w-100" />
          </div>
        </div>
        <div className="col-12 col-md-4 my-2">
          <div className="ms-md-1 me-md-3 h-100 py-2 border rounded-3">
            <CustomSelect
              placeholder="Status"
              options={options}
              setValue={setVal}
            />
          </div>
        </div>

        <div className="col-12 blue100 text-center">More Filters &#8964;</div>
      </div>

      <div className="mx-3 text-center align-middle">
        <table className="table border">
          <thead className="table-light py-3">
            <tr className="grey1">
              <th scope="col">Card</th>
              <th scope="col">Card Details</th>
              <th scope="col">User</th>
              <th scope="col">Budget</th>
              <th scope="col">Status</th>
              <th scope="col">Card Limit</th>
            </tr>
          </thead>
          <tbody className="border-top-0">
            <TableRow index={1} setShowDetails={setShowDetails} />
            <TableRow index={2} setShowDetails={setShowDetails} />
            <TableRow index={3} setShowDetails={setShowDetails} />
            <TableRow index={4} setShowDetails={setShowDetails} />
            <TableRow index={5} setShowDetails={setShowDetails} />
            <TableRow index={6} setShowDetails={setShowDetails} />
            <TableRow index={1} setShowDetails={setShowDetails} />
            <TableRow index={2} setShowDetails={setShowDetails} />
            <TableRow index={3} setShowDetails={setShowDetails} />
            <TableRow index={4} setShowDetails={setShowDetails} />
            <TableRow index={5} setShowDetails={setShowDetails} />
            <TableRow index={6} setShowDetails={setShowDetails} />
            <TableRow index={1} setShowDetails={setShowDetails} />
            <TableRow index={2} setShowDetails={setShowDetails} />
            <TableRow index={3} setShowDetails={setShowDetails} />
            <TableRow index={4} setShowDetails={setShowDetails} />
            <TableRow index={5} setShowDetails={setShowDetails} />
            <TableRow index={6} setShowDetails={setShowDetails} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CardList;
