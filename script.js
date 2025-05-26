const form = document.getElementById('expense-form');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const list = document.getElementById('expense-list');
const balanceDisplay = document.getElementById('balance');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateBalance() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  balanceDisplay.textContent = total;
}

function renderExpenses() {
  list.innerHTML = '';
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.desc} - ₹${expense.amount}
      <button onclick="removeExpense(${index})">❌</button>
    `;
    list.appendChild(li);
  });
}

function removeExpense(index) {
  expenses.splice(index, 1);
  saveAndUpdate();
}

function saveAndUpdate() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
  updateBalance();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const desc = descInput.value;
  const amount = parseFloat(amountInput.value);

  if (desc && !isNaN(amount)) {
    expenses.push({ desc, amount });
    saveAndUpdate();
    descInput.value = '';
    amountInput.value = '';
  }
});

// Initialize
renderExpenses();
updateBalance();
