import { useState, useRef, useEffect } from 'react'

const getLocalStorage = () => {
  const list = localStorage.getItem("todoList");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const [inputText, setInputText] = useState('')
  const [todo, setTodo] = useState(getLocalStorage())
  const localDataRef = useRef([])

  const saveData = (list) => {
    localDataRef.current = list
  }

    useEffect(() => {
      localStorage.setItem("todoList", JSON.stringify(todo));
    }, [localDataRef.current]);

  const addHandler = (e) => {
    e.preventDefault();
    if(inputText){
      const todoObj = {
        todo: inputText,
        id: new Date().getTime().toString(),
        status: 'incomplete'
      };
      saveData([...todo, todoObj])
      setTodo([...todo, todoObj]);
      setInputText('');
      
    }
  }

  const deleteTodo = (id) => {
    const updatedArr = todo.filter((item) => item.id !== id);
    setTodo(updatedArr);
    saveData(deleteTodo)
  }

  const filterShow = (filter) => {
    if(filter === 'all'){
      setTodo(getLocalStorage())
    } else if(filter === 'active') {
      const todoList = getLocalStorage()
      const updatedArr = todoList.filter((item) => item.status === 'incomplete');
      setTodo(updatedArr)
    } else if(filter === 'completed') {
      const todoList = getLocalStorage();
      const updatedArr = todoList.filter((item) => item.status === "complete");
      setTodo(updatedArr);
    }
  }

  const toggleStatus = (id) => {
    const updatedArr = todo.map((item) => {
      if(item.id === id){
        return (item.status === 'complete' ? {...item, status : 'incomplete'} : {...item, status : 'complete'} )
      } else {
        return {...item}
      }
    })
    saveData(updatedArr)
    setTodo(updatedArr)
  }

  const deleteCompleted = () => {
    const todoList = getLocalStorage()
    const updatedArr = todoList.filter((item) => item.status === 'incomplete');
    saveData(updatedArr)
    setTodo(updatedArr);
  }

  return (
    <div className="App">
      <form onSubmit={addHandler}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </form>
      <div>
        {todo.map((item) => {
          const { id, todo, status } = item;
          return (
            <div className="todo-item">
              <button onClick = {() => toggleStatus(id)}>{status === 'complete' ? 'C' : 'NC'}</button>
              <p>{todo}</p>
              <button onClick={() => deleteTodo(id)}>X</button>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={() => filterShow("all")}>All</button>
        <button onClick={() => filterShow("active")}>Active</button>
        <button onClick={() => filterShow("completed")}>Completed</button>
        <button onClick = {deleteCompleted}>Clear Completed</button>
      </div>
    </div>
  );
}

export default App
