const form = document.getElementById("novoItem");
const list = document.getElementById("lista");
const items = JSON.parse(localStorage.getItem("items")) || [];

items.forEach( (e) => {
   addElement(e)
});

form.addEventListener("submit", (e) => {
   e.preventDefault()

   const name = e.target.elements["nome"].value
   const quantity = e.target.elements["quantidade"].value

   const exists = items.find( (e) => e.name === name)

   const currentItem = {
      "name": name,
      "quantity": quantity
   }

   if (exists) {
      currentItem.id = exists.id
      updateElement(currentItem)
      items[exists.id] = currentItem
   }
   else {
      currentItem.id = items.length
      addElement(currentItem)    
      items.push(currentItem)
   }


   localStorage.setItem("items", JSON.stringify(items))

   name = ""
   quantity = ""
});

function addElement(item) { 
   const newItem = document.createElement("li")
   newItem.classList.add("item")

   const itemStats = document.createElement("strong")
   itemStats.innerHTML = item.quantity
   itemStats.dataset.id = item.id
   newItem.appendChild(itemStats)

   newItem.innerHTML += item.name

   list.appendChild(newItem)
};

function updateElement(item) {
   document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantity
};