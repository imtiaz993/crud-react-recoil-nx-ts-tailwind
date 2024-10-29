import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Todo, todoListState, selectedTodoState } from '../../state/todoState';
import DeleteConfirmationModal from 'src/app/common/DeleteConfirmationModal';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const setSelectedTodo = useSetRecoilState(selectedTodoState);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleComplete = () => {
    setTodoList(
      todoList.map((item) =>
        item.id === todo.id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTodo = () => {
    setTodoList(todoList.filter((item) => item.id !== todo.id));
    setModalOpen(false);
  };

  const editTodo = () => {
    setSelectedTodo(todo);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded shadow-sm bg-white">
      <div>
        <h3 className={`text-lg font-semibold`}>{todo.title}</h3>
        <p className="text-gray-600">{todo.description}</p>
        <p className="text-sm text-gray-400">{todo.date}</p>
      </div>
      <div className="flex space-x-2">
        {!todo.completed && (
          <button onClick={toggleComplete} className="text-green-500">
            ✓
          </button>
        )}
        {!todo.completed && (
          <button onClick={editTodo} className="text-blue-500">
            ✎
          </button>
        )}
        <button onClick={() => setModalOpen(true)} className="text-red-500">
          ✗
        </button>
      </div>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={deleteTodo}
      />
    </div>
  );
};

export default TodoItem;
