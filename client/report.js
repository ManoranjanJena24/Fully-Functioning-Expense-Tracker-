var url = "http://localhost:3000"
let token;

function showReport() {
    console.log('report generated')
    document.getElementById('view-report-btn').style.display = 'none'

    let reportData = []

    axios.get(`${url}/expense/get-expenses`, { headers: { "Authorization": token } }).then((data) => { //todo: call the function getExpenses
        console.log('all expenses: ', data.data)
        reportData = reportData.concat(data.data)
        axios.get(`${url}/salary/get-salaries`, { headers: { "Authorization": token } }).then((data) => { //todo: call the function getExpenses
            console.log('all salaries: ', data.data)
            reportData = reportData.concat(data.data)
            console.log('report data', reportData)

            reportData.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
            console.log('sorted report data', reportData)

            renderTable(reportData)

        }).catch(err => { console.log(err) })

    }).catch(err => { console.log(err) })
  

}
function renderTable(reportData) {
    console.log('data to be rendered', reportData)

    let tableRows = '';
    let totalIncome = 0;
    let totalExpense = 0;
    let currentDate = null;
    let totalSavings = 0;
    let totalExpenseMonth = 0
    let totalIncomeMonth = 0

    reportData.forEach(item => {
        const date = new Date(item.updatedAt).toLocaleDateString();

        // Check if the date has changed
        if (date !== currentDate) {
            // Add total row for the previous date
            if (currentDate) {
                tableRows += `<tr>
                                        <td colspan="3">Total for ${currentDate}</td>
                                        <td><strong>${totalIncome}</td>
                                        <td ><strong>${totalExpense}</td>
                                      </tr>`;
                // Reset total income and expense for the new date
                totalIncome = 0;
                totalExpense = 0;
            }
            currentDate = date;
        }

        if ('amount' in item) { // Check if it's an expense
            tableRows += `<tr>
                                    <td>${date}</td>
                                    <td>${item.description}</td>
                                    <td>${item.category}</td>
                                    <td></td>
                                    <td>${item.amount}</td>
                                  </tr>`;
            totalExpense += item.amount;
            // totalSavings -= totalExpense
            totalExpenseMonth += item.amount;
        } else { // It's a salary
            tableRows += `<tr>
                                    <td>${date}</td>
                                    <td></td>
                                    <td></td>
                                    <td>${item.salary}</td>
                                    <td></td>
                                  </tr>`;
            totalIncome += item.salary;
            // totalSavings+=totalIncome
            totalIncomeMonth += item.salary;
        }
    });

    // Add total row for the last date
    if (currentDate) {
        tableRows += `<tr>
                                <td colspan="3">Total for ${currentDate}</td>
                                <td ><strong>${totalIncome}</td>
                                <td ><strong>${totalExpense}</td>
                              </tr>`;
    }

    // Generate savings row
    totalSavings = totalIncomeMonth - totalExpenseMonth
    tableRows += `<tr>
            <td colspan="3"></td>
            <td style="color: green;"><strong>${totalIncomeMonth}</td>
            <td style="color: red;"><strong>${totalExpenseMonth}</td>
             </tr>`;
    tableRows += `<tr>
            <td colspan="3"></td>
                            <td style="color: blue;"> <strong>Total Savings</td>
                          
                            <td style="color: blue;" ><strong>${totalSavings}</td>
                          </tr>`;
    const tableBody = document.getElementById('expenseSalaryTableBody');
    tableBody.innerHTML = tableRows;
    document.getElementById('expenseSalaryTable').removeAttribute('hidden');


}

window.addEventListener('DOMContentLoaded', () => { //changed
    token = localStorage.getItem('token')
    // checkPremium(localStorage.getItem('isPremium') === 'true')


});