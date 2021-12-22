import React, { useState, useEffect } from "react";



function TodoList() {
  //to get the data  from Local-Storage
  const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};
 
  const LocalItems = getLocalItems()
  const [todo, setTodo] = useState([...LocalItems]);
  console.log(todo);
  const [input, setInput] = useState("");
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const todoHandler = (input) => {
    if (!input) {
      alert("please fill data");
    } else if (input && !toggleSubmit) {
      setTodo(
        todo.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: input };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInput("");
      setIsEditItem(null);
    } else {
      const AllInput = { id: new Date().getTime().toString(), name: input };
      console.log(AllInput);
      // const updatedTodo = [AllInput, ...todo];
      setTodo((xyz) => {
        return [...xyz, AllInput];
      });

      setInput("");
    }
  };

  const removeHandler = (index) => {
    console.log(index);
    const updatedItems = todo.filter((elem) => {
      return index !== elem.id;
    });
    setTodo(updatedItems);
  };

  const editItem = (id) => {
    let newEditItem = todo.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);
    setToggleSubmit(false);
    setInput(newEditItem.name);
    setIsEditItem(id);
  };

  //add data to local-storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todo));
  }, [todo]);


  return (
    <div className="todo-app">
      <h1>Hello TodoList</h1>
      <input className= "todo-input edit"
        value={input}
        onChange={inputHandler}
        type="text"
        placeholder="what is the todo?"
      />
      {toggleSubmit ? (
        <button className="todo-button" onClick={() => todoHandler(input)}>Add to do</button>
      ) : (
        <button className="todo-button edit" onClick={() => todoHandler(input)}>Update Item</button>
      )}

      {todo.map((elem) => {
        return (
          
          <div className="todo-row" key={elem.id}>
            <h3>{elem.name}</h3>

            <div className="icons"> 
            <button className="todo-button delete-icon"  onClick={() => removeHandler(elem.id)}>Delete</button>
            <button className="todo-button edit edit-icon" onClick={() => editItem(elem.id)}> Edit</button>
            </div>
          </div>
         
        );
      })}
    </div>
  );
}

export default TodoList;
