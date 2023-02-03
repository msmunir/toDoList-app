 const BASE_URL = 'https://jsonplaceholder.typicode.com/todos/'  
 const inputModal = new bootstrap.Modal('#exampleModal');
 const deleteModal = new bootstrap.Modal('#deleteModal');
 const form = document.querySelector('#form');
 const todoList = document.querySelector('#todo-list')
 const todos = []

//  GET - Show items in a list from db
 const getTodos = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=7')
    const data = await res.json()
  
    // console.log(data)
    data.forEach(todo => { 
        todos.push(todo)
    })
    listTodos()
    console.log(todos)
  }
  getTodos()

  const listTodos = () => {
    todoList.innerHTML = ''
    todos.forEach(todo => {
        const todoElemnet = createTodoElement(todo)
        todoList.appendChild(todoElemnet)
    })
  }
                  
  const createTodoElement = (todoData) => {
    const item = document.createElement('div')
    item.classList.add('item')
    item.id = todoData.id

        const p = document.createElement('p')
        p.innerText = todoData.title
    
    const button = document.createElement('div')
    button.classList.add('button')

        const buttonDone = document.createElement('button')
        buttonDone.innerText = 'done'
        buttonDone.className = 'btn btn-outline-secondary btn-sm done'

        const buttonDelete = document.createElement('button')
        buttonDelete.innerText = 'delete'
        buttonDelete.className = 'btn btn-outline-secondary btn-sm delete'

        // DELETE - remove item from list and db
        buttonDelete.addEventListener("click", (e) => {
          e.preventDefault();
           fetch(BASE_URL + todoData.id, {
            method: 'DELETE'
          })
            .then(res => {
              console.log(res)
              if(res.ok){
                if(todoData.completed){
                  item.remove()
                  const index = todos.findIndex(todo => todo.id == todoData.id)
                  todos.splice(index, 1)
                }
                else{
                  // console.log("Please complete the task before remove from the list.")
                  deleteModal.show();
                }
                  console.log(todos)
              }
            })
           
        })

        // PATCH - update data 
        if(todoData.completed){
          p.style.textDecoration = 'line-through'
          buttonDone.innerText = 'reset'
        }
        buttonDone.addEventListener("click", (e) => {
          e.preventDefault()
          fetch(BASE_URL + todoData.id, {
            method: "PATCH",
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              },
              body: JSON.stringify({
                completed: !todoData.completed
              })
          })
          .then(res => res.json())
          .then(data => {
            // console.log(data) 
            todoData.completed = data.completed 
            console.log(todoData) 
            
              if(todoData.completed === true) {
                p.style.textDecoration = 'line-through'
                buttonDone.innerText = 'reset'
              }else if(todoData.completed === false){
                buttonDone.innerText = 'done'
                p.style.textDecoration = 'none'
              }
          }) 
        })
        button.appendChild(buttonDone)
        button.appendChild(buttonDelete)
        item.appendChild(p)
        item.appendChild(button)
    return item
  }
//   POST - Add item to list
const addItem = (e) => {
  e.preventDefault();
    const input = document.querySelector('.input').value;   
    if(input.trim() === '') {
      // console.log("Cannot add empty todo to the list.")
      inputModal.show();
        return
    }
    const newItem = {
      userId: 1,  
      title: input,
      completed: false
    }
    // console.log(newItem)
    fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            data.id = crypto.randomUUID()
            todos.push(data)
            const todoElemnet = createTodoElement(data)
            todoList.appendChild(todoElemnet)
        });
        form.reset();  
}
form.addEventListener('submit', addItem)




