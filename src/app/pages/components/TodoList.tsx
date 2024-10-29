import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { todoListState } from '../../state/todoState';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList: React.FC = () => {
  const todoList = useRecoilValue(todoListState);
  const [activeTab, setActiveTab] = useState<'notDone' | 'completed'>(
    'notDone'
  );

  const filteredTodos =
    activeTab === 'notDone'
      ? todoList.filter((todo) => !todo.completed)
      : todoList.filter((todo) => todo.completed);

  return (
    <div className="max-w-md mx-auto space-y-4">
      <TodoForm />
      <div className="flex space-x-4 border-b">
        <button
          className={`py-2 px-4 ${
            activeTab === 'notDone' ? 'border-b-2 border-purple-500' : ''
          }`}
          onClick={() => setActiveTab('notDone')}
        >
          Not Done
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'completed' ? 'border-b-2 border-purple-500' : ''
          }`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-500">
            No {activeTab === 'completed' ? 'completed' : ''} todos available
          </p>
        ) : (
          filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
};

export default TodoList;
