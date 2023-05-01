let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
let checkAmountButton = document.getElementById("check-amount");
let totalAmountButton = document.getElementById("total-amount-button");
let productTitle = document.getElementById("product-title");
let errorMessage = document.getElementById("budget-error");
let productTitleError = document.getElementById("product-title-error");
let productCostError = document.getElementById("product-cost-error");
let amount = document.getElementById("amount");
let expenditureValue = document.getElementById("expenditure-value");
let balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

// set budget functions

totalAmountButton.addEventListener("click" , ()=>{
    tempAmount = totalAmount.value;
    if(tempAmount === "" || tempAmount< 0){
        errorMessage.classList.remove("hide");
        amount.innerText =0;
        balanceValue.innerText =0;
        expenditureValue.innerText =0;
    }else{
        errorMessage.classList.add("hide");
        amount.innerHTML = tempAmount;
        balanceValue.innerText = tempAmount - expenditureValue.innerText;
        totalAmount.value = "";
    }
});

// disable btn functions

const disableButtons = (bool) =>{
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((e)=>{
        e.disabled = bool;
    }); 
};

// Modify List

const modifyElement = (e , edit = false)=>{
    let parentDiv = e.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if(edit){
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();

};

// Create the List

const ListCreator = (expenseName , expenseValue) =>{
    let subListContent = document.createElement("div");
    subListContent.classList.add("sublist-content" , "flex-space");
    list.appendChild(subListContent);
    subListContent.innerHTML = `<p class ="product">${expenseName}</p><p class= "amount">${expenseValue}</p>`;
    let editBtn = document.createElement("button");
    editBtn.classList.add("bx" , "bxs-edit" , "edit");
    editBtn.style.fontSize = "1.2em";
    editBtn.addEventListener("click", ()=>{
        modifyElement(editBtn , true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("bx" , "bxs-trash" , "delete");
    deleteButton.style.fontSize = '1.2em';
    deleteButton.addEventListener("click" , ()=>{
        modifyElement(deleteButton);
    });
    subListContent.appendChild(editBtn);
    subListContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(subListContent);
};

// Add expenses function

checkAmountButton.addEventListener("click" , ()=>{
    if(amount.innerText == 0){
        errorMessage.classList.remove("hide");
        return false;
    }
    else if( !userAmount.value || !productTitle.value ){
        productTitleError.classList.remove("hide");
        return false;
    }
    else{
        
        // enable btns
         disableButtons(false);
         //Expense
         let expenditure = parseInt(userAmount.value);
         // Total expense ( existing + new)
         let sum = parseInt(expenditureValue.innerText) + expenditure;
         expenditureValue.innerText = sum;
         // Total balance = budget - total exp
         const totalBal = tempAmount - sum;
         balanceValue.innerText = totalBal;
         // Create List
         ListCreator(productTitle.value , userAmount.value);
         // clear inputs
         productTitle.value = "";
         userAmount.value = "";
    } 
});