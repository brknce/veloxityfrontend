import './App.css';
import { useEffect, useState } from 'react';
import TodoItem from './components/todoItem';

function App() {
  const [todoItems, setTodoItems] = useState(null);

  useEffect(() => {
    if (!todoItems) {
      fetch("http://localhost:8080/api/todoItems")
        .then((response) => response.json())
        .then((data) => {
          setTodoItems(data);
        });
    }
  }, [todoItems]);


  function addNewTodoItem() {
    fetch("http://localhost:8080/api/todoItems", {
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((aTodoItem) => {
        setTodoItems([ ...todoItems, aTodoItem ]);
      });
  }

  function handleDeleteTodoItem(item) {
    const updatedTodoItems = todoItems.filter(
      (aTodoItem) => aTodoItem.id !== item.id);
    setTodoItems([...updatedTodoItems]);
  }

  return (
    <>
      <div>
        <button onClick={addNewTodoItem}>Yeni Görev Ekle</button>
      </div>
      <div>
        {todoItems
          ? todoItems.map((todoItem) => {
            return (
              <TodoItem
                key={todoItem.id}
                data={todoItem}
                emitDeleteTodoItem={handleDeleteTodoItem}
              />
            );
          })
          : "loading data..."}
      </div>
    </>
  );
}
export default App;
