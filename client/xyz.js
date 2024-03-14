// Global variables
var url = "http://localhost:3000";
var editMode = false;
let editId;
let editedExpense;
let token;
let currentPage = 1;
const expensesPerPage = 5;

function handleFormSubmit(event) {
event.preventDefault();
const expense = {
amount: event.target.amount.value,
description: event.target.description.value,
category: event.target.category.value,
};

if (editMode) {
editExpense(editId);
} else {
axios.post(`${url}/expense/add-expense`, expense, { headers: { "Authorization": token } })
.then(res => {
event.target.reset();
getExpenses();
})
.catch(err => console.log(err));
}
}

function getExpenses() {
axios.get(`${url}/expense/get-expenses?page=${currentPage}&limit=${expensesPerPage}`, { headers: { "Authorization":
token } })
.then((response) => {
renderExpenses(response.data.expenses);
updatePagination(response.data.totalExpenses);
})
.catch((error) => {
console.error('Error fetching expenses:', error);
});
}

function renderExpenses(expenses) {
const expensesList = document.getElementById('expensesList');
expensesList.innerHTML = '';

expenses.forEach((expense, index) => {
const id = expense.id;
const li = document.createElement('li');
li.className = 'list-group-item';
li.innerHTML = `
${expense.amount} - ${expense.description} - ${expense.category}
<button type="button" class="btn btn-danger btn-sm float-right ml-2" onclick="deleteExpense(${id})">Delete</button>
<button type="button" class="btn btn-warning btn-sm float-right"
    onclick="editButton1(${id}, ${JSON.stringify(expense)})">Edit</button>
`;
expensesList.appendChild(li);
});
}

function deleteExpense(id) {
const deleteUrl = `${url}/expense/delete-expense/${id}`;

axios.delete(deleteUrl, { headers: { "Authorization": token } })
.then(response => {
getExpenses();
showLeaderBoard();
})
.catch(error => {
console.error('Error deleting expense:', error);
});
}

function editButton1(index, expense) {
editId = index;
expense = JSON.parse(expense);
document.getElementById('amount').value = expense.amount;
document.getElementById('description').value = expense.description;
document.getElementById('category').value = expense.category;
}

function editExpense(id) {
const editUrl = `${url}/expense/edit-expense/${id}`;

axios.post(editUrl, {}, { headers: { "Authorization": token } })
.then(response => {
getExpenses();
})
.catch(error => {
console.error('Error editing expense:', error);
});
}

function updatePagination(totalExpenses) {
const totalPages = Math.ceil(totalExpenses / expensesPerPage);
const pagination = document.getElementById('pagination');
pagination.innerHTML = '';

for (let i = 1; i <= totalPages; i++) { const button=document.createElement('button'); button.textContent=i;
    button.addEventListener('click', ()=> {
    currentPage = i;
    getExpenses();
    });
    pagination.appendChild(button);
    }
    }

    window.addEventListener('DOMContentLoaded', () => {
    token = localStorage.getItem('token');
    checkPremium(localStorage.getItem('isPremium') === 'true');
    getExpenses();
    });