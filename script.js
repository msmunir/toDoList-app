
 const BASE_URL = 'https://jsonplaceholder.typicode.com/todos/'         // 7 items from db 


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
        // buttonDone.id = 'done'
        buttonDone.className = 'btn btn-outline-secondary done'


        const buttonDelete = document.createElement('button')
        buttonDelete.innerText = 'delete'
        buttonDelete.className = 'btn btn-outline-secondary delete'




        // DELETE - remove item from list and db

        buttonDelete.addEventListener("click", (e) => {
          e.preventDefault();
        
           fetch(BASE_URL + todoData.id, {
            method: 'DELETE'
          })
            .then(res => {
              console.log(res)
              if(res.ok){
                      item.remove()
                      const index = todos.findIndex(todo => todo.id == todoData.id)
                      todos.splice(index, 1)
                  // }
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
        
            console.log(data) 
            todoData.completed = data.completed 
            console.log(todoData) 
            
              if(todoData.completed === true) {
                // p.classList.toggle('completed')
                p.style.textDecoration = 'line-through'
                buttonDone.innerText = 'reset'
                buttonDone.style.backgroundColor = '#0876b5'
                buttonDone.style.color = '#fff'
  
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
      alert('It can not be empty')
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
            // console.log(data)
            data.id = crypto.randomUUID()
  
            todos.push(data)
            // listTodos();
            const todoElemnet = createTodoElement(data)
            todoList.appendChild(todoElemnet)
            // form.reset();
        });
        form.reset();  
}

form.addEventListener('submit', addItem)












// document.querySelector('#todo-list').appendChild(item);




//   document.querySelector('#output').addEventListener('click', e => {
//     if(e.target.innerText === 'delete'){
//       e.target.parentElement.remove()
//     //   items = items.filter(item => item.id !== e.target.id)
//     //   localStorage.setItem('itemList', JSON.stringify(items))
//     }
//     // if(e.target.innerText === 'edit'){
  
//     // }
  
//     if(e.target.nodeName === 'P') {
//       e.target.style.textDecoration = 'line-through'
//     }
//     if(e.target.nodeName === 'DIV') {
//       // e.target.style.textDecoration = 'line-through'
//       // console.log(e.target.firstElementChild)
//       e.target.querySelector('p').classList.toggle('completed')
//     }
//   })

//   form.addEventListener('submit', e => {
//     e.preventDefault();
//     const input = form.querySelector('input[type=text]');
//     const inputValue = input.value;
  
//     if(inputValue.trim() === '') {
//       return
//     }
  
//     const newItem = {
//       id: crypto.randomUUID(),
//       title: inputValue,
//       complete: false
//     }
//     items.push(newItem)
  
//     const item = createItemElement(inputValue, newItem.id);
//     document.querySelector('#output').appendChild(item);
//     localStorage.setItem('itemList', JSON.stringify(items))
  
  
//     // input.value = '';
//     form.reset()
  
//   })