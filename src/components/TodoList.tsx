import React from 'react';
import { Todo } from '../types';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';
import '../App.css';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
  return (
    <div className="flex w-11/12 mt-2 justify-between items-start gap-8 flex-col md:flex-row">
      <Droppable droppableId="active">
        {(provided, snapshot) => (
          <div
            className={`flex flex-col w-full p-3 rounded-md md:w-1/2 ${
              snapshot.isDraggingOver ? 'bg-green-500' : 'bg-green-700'
            } md:w-1/2`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="text-white text-2xl p-2 font-custom">Active Tasks</span>
            <div className="flex flex-col">
              {todos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  setTodos={setTodos}
                  todos={todos}
                />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      <Droppable droppableId="complete">
        {(provided, snapshot) => (
          <div
          className={`flex flex-col w-full p-3 rounded-md md:w-1/2 ${
            snapshot.isDraggingOver ? 'bg-red-400' : 'bg-red-500'
          } md:w-1/2`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="text-white text-2xl p-2 font-custom">Completed Tasks</span>
            <div className="flex flex-col">
              {completedTodos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  setTodos={setCompletedTodos}
                  todos={completedTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
