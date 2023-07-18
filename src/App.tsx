/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './types';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

function App() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log(result);

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add;
    const active = todos.slice();
    const complete = completedTodos.slice();

    if (source.droppableId === 'active') {
      add = active.splice(source.index, 1)[0];
    } else {
      add = complete.splice(source.index, 1)[0];
    }

    if (destination.droppableId === 'active') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col bg-gray-400 text-white items-center gap-7">
        <h1 className="text-4xl font-bold text-center mt-4 font-custom text-teal-950 sm:mt-8">ZIZI-TASK</h1>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <DragDropContext onDragEnd={onDragEnd}>
          <TodoList
            todos={todos}
            setTodos={setTodos}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
