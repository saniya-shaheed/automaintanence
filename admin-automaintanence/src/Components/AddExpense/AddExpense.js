import React from 'react'

function AddExpense() {
  return (
    <div>
        <h1> Add an Expense</h1>
      <div>
      <form action="">
  <label for="description">Description:</label><br />
  <input type="text" id="description" name="description" /><br/>

 
  
  <label for="date">Date:</label><br />
  <input type="text" id="date" name="date" /><br/>

  <label for="amount"> Amount :</label><br />
  <input type="number" id="amount" name="amount" /><br/>

  

  <button type="submit">Add Expense</button>
  
</form> 
    </div>
    </div>
  )
}

export default AddExpense
