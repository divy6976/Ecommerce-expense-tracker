document.addEventListener("DOMContentLoaded", function() {


    const expenseForm=document.getElementById("expense-form");
    const expenseName=document.getElementById("expense-name");
    const expenseAmount=document.getElementById("expense-amount");
    const expenseList=document.getElementById("expense-list");
   const totalAmountDisplay=document.getElementById("total-amount");
   
   let expense=[];

   
   expenseForm.addEventListener("submit", function(e) {
e.preventDefault();
 const Name=expenseName.value.trim();
 const Amount=parseFloat(expenseAmount.value.trim());
 if(Name !=="" && !isNaN(Amount) && Amount>0){

const newExpense={
    id: Date.now(),
    name: Name,
    amount: Amount
};

expense.push(newExpense);

saveStorage();

renderList();
expenseName.value="";
expenseAmount.value="";


 }

   });

function renderList(){
    expenseList.innerHTML="";
    let totalAmount=0;
    if(expense.length>0){
    expense.forEach(e => {
       const List= document.createElement("li");
       totalAmount+=e.amount;
       List.innerHTML=`
       <span>${e.name} - $${e.amount.toFixed(2)}</span>
       <button data-id="${e.id}">Delete</button>`;
         expenseList.appendChild(List);
    });
    totalAmountDisplay.textContent=`${totalAmount.toFixed(2)}`;
    }
}

expenseList.addEventListener("click",function(e){
if(e.target.tagName==="BUTTON"){
 const expensedelete=parseInt(e.target.getAttribute("data-id"));
 const expenseIndex=expense.findIndex(e =>e.id===expensedelete);

 expense.splice(expenseIndex,1);
    saveStorage();
    renderList();



}


});





function saveStorage() {
    localStorage.setItem("expense", JSON.stringify(expense));
};











});