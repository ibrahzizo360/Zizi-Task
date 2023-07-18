import React, { useState, useEffect, useRef } from 'react';
import { Todo } from '../types';
import { BiEditAlt } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { MdOutlineDownloadDone } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';
import "../App.css"


interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos(todos.map((item) => (item.id === id ? { ...item, isDone: !item.isDone } : item)));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(todos.map((item) => (item.id === id ? { ...item, todo: editTodo } : item)));
    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          onSubmit={(e) => handleEdit(e, todo.id)}
          className={`flex justify-between px-2 py-4 mb-4 rounded-md w-full bg-yellow-500 shadow-todo ${
            snapshot.isDragging
              ? "transform scale-105 shadow-button transition duration-200"
              : ""
          }`}
        >
          {edit ? (
            <input
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              ref={inputRef}
              className="text-xl text-black p-1 outline-none"
            />
          ) : todo.isDone ? (
            <s className="text-xl text-black">{todo.todo}</s>
          ) : (
            <span className="text-xl text-black">{todo.todo}</span>
          )}

          <div className="flex gap-3 text-2xl text-black">
            <span
              className="cursor-pointer"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(true);
                }
              }}
            >
              <BiEditAlt />
            </span>
            <span className="cursor-pointer" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="cursor-pointer" onClick={() => handleDone(todo.id)}>
              <MdOutlineDownloadDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
