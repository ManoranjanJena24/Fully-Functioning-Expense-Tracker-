var url = "http://localhost:3000"
let token;

function showReport() {
    console.log('report generated')
    document.getElementById('view-report-btn').style.display = 'none'

    document.getElementById('monthSelect').removeAttribute('hidden');

    const monthSelect = document.getElementById('monthSelect');
    const selectedMonth = monthSelect.options[monthSelect.selectedIndex].text;
    const selectedMonthValue = monthSelect.value;
    console.log(selectedMonth)


    const expensesPromise = axios.get(`${url}/expense/get-expenses`, { headers: { "Authorization": token } });
    const salariesPromise = axios.get(`${url}/salary/get-salaries`, { headers: { "Authorization": token } });

    Promise.all([expensesPromise, salariesPromise])
        .then(([expensesResponse, salariesResponse]) => {
            const expensesData = expensesResponse.data;
            const salariesData = salariesResponse.data;

            console.log('All expenses: ', expensesData);
            console.log('All salaries: ', salariesData);

            const reportData = expensesData.concat(salariesData);
            reportData.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
            console.log('Sorted report data: ', reportData);

            renderTable(reportData, selectedMonth);
        })
        .catch(err => {
            console.log(err);
        });


}

function renderTable(reportData, selectedMonth) {
    console.log('data to be rendered', reportData);

    let tableRows = '';
    let totalIncome = 0;
    let totalExpense = 0;
    let currentDate = null;
    let totalSavings = 0;
    let totalExpenseMonth = 0;
    let totalIncomeMonth = 0;
    console.log(selectedMonth)
    reportData.forEach(item => {
        const date = new Date(item.updatedAt);
        const month = date.toLocaleString('default', { month: 'long' });
        console.log(month)
        // Check if the date is in the selected month
        if (month === selectedMonth) {
            // Check if the date has changed
            if (date.toLocaleDateString() !== currentDate) {
                // Add total row for the previous date
                if (currentDate) {
                    tableRows += `<tr>
                                        <td colspan="3">Total for ${currentDate}</td>
                                        <td><strong>${totalIncome}</td>
                                        <td><strong>${totalExpense}</td>
                                      </tr>`;
                    // Reset total income and expense for the new date
                    totalIncome = 0;
                    totalExpense = 0;
                }
                currentDate = date.toLocaleDateString();
            }

            if ('amount' in item) { // Check if it's an expense
                tableRows += `<tr>
                                    <td>${date.toLocaleDateString()}</td>
                                    <td>${item.description}</td>
                                    <td>${item.category}</td>
                                    <td></td>
                                    <td>${item.amount}</td>
                                  </tr>`;
                totalExpense += item.amount;
                totalExpenseMonth += item.amount;
            } else { // It's a salary
                tableRows += `<tr>
                                    <td>${date.toLocaleDateString()}</td>
                                    <td></td>
                                    <td></td>
                                    <td>${item.salary}</td>
                                    <td></td>
                                  </tr>`;
                totalIncome += item.salary;
                totalIncomeMonth += item.salary;
            }
        }
    });

    // Add total row for the last date
    if (currentDate) {
        tableRows += `<tr>
                                <td colspan="3">Total for ${currentDate}</td>
                                <td><strong>${totalIncome}</td>
                                <td><strong>${totalExpense}</td>
                              </tr>`;
    }

    // Generate savings row
    totalSavings = totalIncomeMonth - totalExpenseMonth;
    tableRows += `<tr>
            <td colspan="3"></td>
            <td style="color: green;"><strong>${totalIncomeMonth}</td>
            <td style="color: red;"><strong>${totalExpenseMonth}</td>
             </tr>`;
    tableRows += `<tr>
            <td colspan="3"></td>
                            <td style="color: blue;"><strong>Total Savings</td>
                          
                            <td style="color: blue;"><strong>${totalSavings}</td>
                          </tr>`;

    const tableBody = document.getElementById('expenseSalaryTableBody');
    tableBody.innerHTML = tableRows;

    // Set the title of the table as the selected month
    document.getElementById('tableTitle').innerText = selectedMonth;

    // Show the table
    document.getElementById('expenseSalaryTable').removeAttribute('hidden');
}


window.addEventListener('DOMContentLoaded', () => { //changed
    token = localStorage.getItem('token')
    // checkPremium(localStorage.getItem('isPremium') === 'true')


});