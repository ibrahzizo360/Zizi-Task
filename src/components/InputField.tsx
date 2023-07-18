import React, { useRef } from 'react';
import "../App.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="flex w-11/12 gap-4 items-center relative"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        className="w-full rounded-full py-4 px-6 border-0 text-black text-xl 
        transition duration-200 shadow-custom outline-none"
        ref={inputRef}
        placeholder="Enter a task"
        type="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        onClick={handleAdd}
        className="absolute w-12 h-12 right-0 bg-gray-400 rounded-full m-3 text-black
        shadow-button transition duration-200 hover:bg-gray-300 transform active:scale-75"
      >
        GO
      </button>
    </form>
  );
};

export default InputField;
