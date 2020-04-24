const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const addTransaction = (event) => {
  event.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert("Merci d'ajouter un nom et un montant");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);

    updateValues();
    updateLocalStorage();
    text.value = '';
    amount.value = '';
  }
};

const generateID = () => {
  return Math.floor(Math.random() * 100000000);
};

const addTransactionDOM = (transaction) => {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onClick="removeTransaction(${
      transaction.id
    })">X</button>
  `;
  list.appendChild(item);
};

const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -(1).toFixed(2);

  console.log(money_plus);
  console.log(money_minus);
  balance.innerText = `${total}€`;
  money_plus.innerText = `${income}€`;
  money_minus.innerText = `${expense}€`;
};

const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
};

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

const init = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
};

init();

form.addEventListener('submit', addTransaction);
