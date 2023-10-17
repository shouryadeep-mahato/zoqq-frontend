import { TextField } from '@mui/material'
import React,{useState} from 'react'
import CustomSelect from '../../../structure/CustomSelect'
import Select from 'react-select'


function TableRow({ index, onAmountChange, onItemChange, onPriceChange, onQuantityChange, onTaxChange, onDiscountChange }) {
    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [tax, setTax] = useState('');
    const [discount, setDiscount] = useState('');
    const [amount, setAmount] = useState('');
    const options = [
      { value: '0', label: 'No Tax' },
      { value: 'Custom', label: 'Custom' }
    ]
    const placeholder =[
        "--Select--"
    ]
    const styles = {
        underline: {
            '&::before': {
                borderBottom: 'none',
            },
            '&::after': {
                borderBottom: 'none',
            },
        },
    };
    const customStyles = {
        control: (provided) => ({
          ...provided,
          border: 'none',
          boxShadow: 'none',
          '&:hover': {
            border: 'none',
          },
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: 2
        })
      };
  
    const handleAmountChange = (event) => {
      const newValue = event.target.value;
      setAmount(newValue);
      onAmountChange(index, parseFloat(newValue) || 0);
    };
  
    const handleItemChange = (event) => {
        const newValue = event.target.value;
        setItem(newValue);
        onItemChange(index, {
          description: newValue,
          price,
          quantity,
          tax,
          discount,
        });
      };
  
    const handlePriceChange = (event) => {
      const newValue = event.target.value;
      setPrice(newValue);
      onPriceChange(index, parseFloat(newValue) || 0);
    };
  
    const handleQuantityChange = (event) => {
      const newValue = event.target.value;
      setQuantity(newValue);
      onQuantityChange(index, parseFloat(newValue) || 0);
    };
  
    const handleTaxChange = (event) => {
      const newValue = event.target.value;
      setTax(newValue);
      onTaxChange(index, newValue);
    };
  
    const handleDiscountChange = (event) => {
      const newValue = event.target.value;
      setDiscount(newValue);
      onDiscountChange(index, parseFloat(newValue) || 0);
    };
    return (
        <tr>
          <th scope="row">{index}</th>
          <td>
            <TextField variant="standard" value={item} onChange={handleItemChange} />
          </td>
          <td>
            <TextField variant="standard" type='number' value={price} onChange={handlePriceChange} />
          </td>
          <td>
            <TextField variant="standard" type='number' value={quantity} onChange={handleQuantityChange} />
          </td>
          <td>
            <TextField variant="standard" type='number'  value={tax} onChange={handleTaxChange} />
            {/* <Select styles={customStyles} options={options} placeholder={placeholder || "--SELECT--"}   /> */}
          </td>
          <td>
            <TextField placeholder="%" variant='standard' type='number' value={discount} onChange={handleDiscountChange} />
          </td>
          <td>
            <TextField variant="standard" type='number' id={`amount-${index}`} value={amount} onChange={handleAmountChange} />
          </td>
        </tr>
      );
  }

  function Items({ setCurrentState,customername ,getitems, setUrl , parsedCustomerdata}) {
    const [rows, setRows] = useState([1]);
    const [amounts, setAmounts] = useState({});
    const [itemDetails, setItemDetails] = useState({});
    const [subtotal, setSubtotal] = useState('');
    const [totalTax, setTotalTax] = useState(0);
  
    const addNewRow = (e) => {
      e.preventDefault();
      const newindex = rows.length + 1;
      setRows([...rows, newindex]);
    };
  
    const handleAmountChange = (index, newValue) => {
      setAmounts((prevAmounts) => ({
        ...prevAmounts,
        [index]: newValue,
      }));
      setItemDetails((prevItemDetails) => ({
        ...prevItemDetails,
        [index]: { ...prevItemDetails[index], amount: newValue },
      }));
      const totalTaxAmount = calculateTotalTax();
      setTotalTax(totalTaxAmount);
    };
  
    const handleItemChange = (index, newItemDetails) => {
        // Add serial number (SL No) to the item details
        newItemDetails.slNo = index;
        setItemDetails((prevItemDetails) => ({
          ...prevItemDetails,
          [index]: newItemDetails,
        }));
      };
  
    const handlePriceChange = (index, newValue) => {
      setItemDetails((prevItemDetails) => ({
        ...prevItemDetails,
        [index]: { ...prevItemDetails[index], price: newValue },
      }));
    };
  
    const handleQuantityChange = (index, newValue) => {
      setItemDetails((prevItemDetails) => ({
        ...prevItemDetails,
        [index]: { ...prevItemDetails[index], quantity: newValue },
      }));
    };
  
    const handleTaxChange = (index, newValue) => {
      setItemDetails((prevItemDetails) => ({
        ...prevItemDetails,
        [index]: { ...prevItemDetails[index], tax: newValue },
      }));
    };
  
    const handleDiscountChange = (index, newValue) => {
      const intValue = newValue === "" || newValue === null ? 0 : parseInt(newValue, 10);
      setItemDetails((prevItemDetails) => ({
        ...prevItemDetails,
        [index]: { ...prevItemDetails[index], discount: intValue },
      }));
    };
   const calculateSubtotal = () => {
        let sum = 0;
        for (const index in amounts) {
          sum += amounts[index];
        }
        
        return sum.toFixed(2); // Format the sum with two decimal places
      };  

      const calculateTotalTax = () => {debugger
        let total = 0;
        for (const index in itemDetails) {
          const item = itemDetails[index];
          const amount = (item.amount);
          const taxPercentage = (item.tax);
          const taxAmount = (amount * taxPercentage /100);
          total += taxAmount;
        }
        return total.toFixed(2);
      };
      const calculatediscount = () =>{
        let total = 0;
        for (const index in itemDetails) {
          const item = itemDetails[index];
          const amount = (item.amount);
          const discount = (item.discount);
          const taxAmount = (amount * discount /100);
          total += taxAmount;
        }
        return total.toFixed(2);
      }
         
      const handleNextClick = () => {debugger
        // Get the length of itemDetails
  const itemDetailsLength = Object.keys(itemDetails).length;
  const itemDetailsArray = Object.values(itemDetails);

  // Create a JSON object with item details and amounts
  const itemsJSON = {
    items: itemDetailsArray,
    customername: customername, 
    length: itemDetailsLength,
    Subtotal: calculateSubtotal(),
    Discount : calculatediscount(),
    Tax:calculateTotalTax()
  };
        getitems(itemsJSON)
        // Do something with the JSON object, for example, log it
        console.log(itemsJSON);
    
        // Perform the next action
        //  setCurrentState("details");
      };
    return (
        <div>
            <div className='d-flex align-items-center my-4'>
                <p className='m-0 mx-3 blue100 fw-500'>1. Items</p>
                <img src="/payments/lineH_pending.svg" />
                <p className='m-0 mx-3 grey1 fw-normal'>2. Details</p>
                <img src="/payments/lineH_pending.svg" />
                <p className='m-0 mx-3 grey1 fw-normal'>3. Send</p>
            </div>

            <form className='border rounded-3 mb-3'>
                <table className="table mb-0">
                    <thead className="table-light py-3">
                        <tr className='grey1'>
                            <th scope="col">No</th>
                            <th scope="col">Item Description</th>
                            <th scope="col">Price </th>
                            <th scope="col">QTY</th>
                            <th scope="col">Tax(%)</th>
                            <th scope="col">Discount(%)</th>
                            <th scope="col">Amount </th>
                        </tr>
                    </thead>
                    <tbody className='border-top-0'>
                    {rows.map((rowIndex) => (
              <TableRow key={rowIndex} index={rowIndex} onAmountChange={handleAmountChange} onItemChange={(index, newItemDetails) => handleItemChange(index, newItemDetails)}
              onPriceChange={handlePriceChange}
              onQuantityChange={handleQuantityChange}
              onTaxChange={handleTaxChange}
              onDiscountChange={handleDiscountChange}/>
            ))}
                    </tbody>
                </table>
                <button className='btn w-100 blue100 fw-500 p-0 m-0 d-flex align-items-center justify-content-center py-2'  onClick={(e) => addNewRow(e)}>
                    <span className='h3 m-0 p-0'>+</span><span>&nbsp;New Item</span>
                    
                </button>
            </form>


            <div className='d-flex fw-normal align-items-center bg-light p-3 border rounded-3'>
                <div className='d-flex flex-fill justify-content-around'>
                    <div className='grey1'>Subtotal:</div>
                    <div>{calculateSubtotal()}  SGD</div>
                </div>
                <div className='d-flex flex-fill justify-content-around'>
                    <div className='grey1'>Discount:</div>
                    <div>- {calculatediscount()} SGD</div>
                </div>
                <div className='d-flex flex-fill justify-content-around'>
                    <div className='grey1'>Total Tax:</div>
                    <div className='fw-500'>{calculateTotalTax()} SGD</div>
                </div>
                <div className='d-flex flex-fill justify-content-around'>
                    {/* <div className='blue100 bg-white border btn fw-500 py-2 px-3 rounded-4'>
                        <img src='/expense/preview.svg' className='me-2' />
                        Preview
                    </div> */}
                </div>
            </div>

            <div className='d-flex justify-content-between mt-5'>
                <div>
                    <button className='btn fw-500 green100 border me-2 py-2 rounded-4'>Save as Draft
                        <img src='/payments/save.svg' className='ms-1' />
                    </button>
                    <button className='btn fw-500 yellow100 border me-2 py-2 rounded-4'>Delete
                        <img src='/payments/delete.svg' className='ms-1' />
                    </button>
                </div>

                <div>
                <button className='btn fw-500 bg-green100 text-white py-2 rounded-4' onClick={()=>{setUrl(""); handleNextClick();}}>Next to Details &gt;</button>
                </div>
            </div>
        </div>
    )
}

export default Items