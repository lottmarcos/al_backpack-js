const form = document.getElementById("novoItem");
const list = document.getElementById("lista");
const items = JSON.parse(localStorage.getItem("items")) || [];

items.forEach( (e) => {
   addElement(e)
});

form.addEventListener("submit", (e) => {
   e.preventDefault()

   const name = e.target.elements["nome"]
   const quantity = e.target.elements["quantidade"]

   const exists = items.find( (e) => e.name === name.value)

   const currentItem = {
      "name": name.value,
      "quantity": quantity.value
   }

   if (exists) {
      currentItem.id = exists.id
      updateElement(currentItem)
      items[items.findIndex(e => e.id === exists.id)] = currentItem
   }
   else {
      currentItem.id = items[items.length -1] ? (items[items.length - 1]).id + 1 : 0
      addElement(currentItem)    
      items.push(currentItem)
   }

   localStorage.setItem("items", JSON.stringify(items))

   name.value = ""
   quantity.value = ""
});

function addElement(item) { 
   const newItem = document.createElement("li")
   newItem.classList.add("item")

   const itemStats = document.createElement("strong")
   itemStats.innerHTML = item.quantity
   itemStats.dataset.id = item.id
   newItem.appendChild(itemStats)

   newItem.innerHTML += item.name

   newItem.appendChild(deleteElement(item.id))

   list.appendChild(newItem)
};

function updateElement(item) {
   document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantity
};

function deleteElement(id) {
   const deleteButton = document.createElement("button")
   deleteButton.classList.add("delete-button")
   deleteButton.innerText = "X"

   deleteButton.addEventListener("click", function() {
      this.parentNode.remove()
      items.splice(items.findIndex(e => e.id === id, 1))
      localStorage.setItem("items", JSON.stringify(items))
   })

   return deleteButton
};