// let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
var url = "http://localhost:3000"
var editMode = false;
let editId;
let editedExpense
let token;

function handleFormSubmit(event) {
    event.preventDefault();
    const expense = {
        amount: event.target.amount.value,
        description: event.target.description.value,
        category: event.target.category.value,
        // userId: 1 //this is user Id //change the 1 later
    };
    // expenses.push(expense);
    // localStorage.setItem('expenses', JSON.stringify(expenses));
    // event.target.reset();//Always reset after data Added :)
    // renderExpenses();
    if (editMode) {
        editExpense(editId)
    }
    else {
        axios.post(`${url}/expense/add-expense`, expense, { headers: { "Authorization": token } }).then(res => { //changes
            // console.log(res.data)
            console.log('token', token)
            event.target.reset();
            getExpenses();
            // renderExpenses();
        })
            .catch(err => console.log(err))
    }

}

function getExpenses() { //
    axios.get(`${url}/expense/get-expenses`, { headers: { "Authorization": token } }).then((data) => { //changed
        console.log(data)
        console.log(token)
        renderExpenses(data.data)//changed
    })
}

function renderExpenses(expenses) {//changed line 56 and 57 also
    console.log(expenses)
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const id = expense.id;
        console.log(expense.id)
        console.log(expense)
        let newExpense = JSON.stringify(expense)
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
      ${expense.amount} - ${expense.description} - ${expense.category} 
      <button type="button" class="btn btn-danger btn-sm float-right ml-2" onclick="deleteExpense(${id})">Delete</button>
      <button type="button" class="btn btn-warning btn-sm float-right" onclick="editExpense(${id},${newExpense})">Edit</button>
    `;
        expensesList.appendChild(li);
    });
}

function deleteExpense(id) {//changes
    // expenses.splice(index, 1);
    // localStorage.setItem('expenses', JSON.stringify(expenses));
    // renderExpenses();

    console.log(id)
    const deleteUrl = `${url}/expense/delete-expense/${id}`;

    axios.delete(deleteUrl) //chamged
        .then(response => {
            console.log('Expense deleted successfully:', response.data);
            getExpenses(); // Refresh the expenses list after deletion
        })
        .catch(error => {
            console.error('Error deleting expense:', error);
        });
}

function editButton1(index, expense) {
    editId = index
    console.log(editId)
    console.log(expense)
    expense = JSON.parse(expense)
    document.getElementById('amount').value = expense.amount; // start displaying on input fields
    document.getElementById('description').value = expense.description;
    document.getElementById('category').value = expense.category;

}

function editExpense(id) { //changes
    const editUrl = `${url}/expense/edit-expense/${id}`;
    console.log(id)
    console.log(token)


    axios.post(editUrl, { headers: { "Authorization": token } }) //chamged
        .then(response => {
            console.log('Expense deleted successfully:', response.data);
            getExpenses(); // Refresh the expenses list after deletion
        })
        .catch(error => {
            console.error('Error deleting expense:', error);
        });
}

window.addEventListener('DOMContentLoaded', () => { //changed
    token = localStorage.getItem('token')
    // console.log(token)
    getExpenses()
});