
 const BASE_URL = 'https://jsonplaceholder.typicode.com/todos/'         // 7 items from db 


 const form = document.querySelector('#form');
 const todoList = document.querySelector('#todo-list')
 const todos = []
 
 const output = document.querySelector('#output');
 
 
 const getTodos = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
    const data = await res.json()
  
    // console.log(data)
  
    // Loopar igenom Post som kommer från databasen
    data.forEach(todo => {
        
        todos.push(todo)
        
        //Lägg till ett nytt element i output
        //   output.appendChild(createItemElement(todo))
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


  const createTodoElement = (todo) => {

    const item = document.createElement('div')
    item.classList.add('item')
    item.id = todo.id
  
    const p = document.createElement('p')
    p.innerText = todo.title
  
    const button = document.createElement('button')
    button.innerText = 'delete'
    button.className = 'btn btn-outline-secondary'
    // button.id = todo.id
  
    // button.addEventListener('click', () => {
    //   button.parentElement.remove()
    // })
  
  
    item.appendChild(p)
    item.appendChild(button)
  
    return item
  }

// Delete item from todo list  

const removeTodo = (e) => {
    e.preventDefault();
  
     fetch(BASE_URL + e.target.parentElement.id, {
      method: 'DELETE'
    })
      .then(res => {
        console.log(res)
        if(res.ok){
            // e.target.remove()
            if(e.target.innerText === 'delete'){
                e.target.parentElement.remove()
                const index = todos.findIndex(todo => todo.id == e.target.id)
                todos.splice(index, 1)
            }
            console.log(todos)
        }
      })
     
  }

//   Add item to list 

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


            form.reset();
        });
        
        
   
}



todoList.addEventListener('click', removeTodo)
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