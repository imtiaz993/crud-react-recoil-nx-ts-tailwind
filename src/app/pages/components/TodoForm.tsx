import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Todo, todoListState, selectedTodoState } from '../../state/todoState';
import { v4 as uuidv4 } from 'uuid';

const TodoForm: React.FC = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [selectedTodo, setSelectedTodo] = useRecoilState(selectedTodoState);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    date?: string;
  }>({});

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description);
      setDate(selectedTodo.date);
    } else {
      resetForm();
    }
  }, [selectedTodo]);

  const validateFields = () => {
    const newErrors: { title?: string; description?: string; date?: string } =
      {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (!date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    if (errors.description)
      setErrors((prev) => ({ ...prev, description: undefined }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
  };

  const addOrUpdateTodo = () => {
    if (!validateFields()) return;

    if (selectedTodo) {
      setTodoList(
        todoList.map((item) =>
          item.id === selectedTodo.id
            ? { ...item, title, description, date }
            : item
        )
      );
      setSelectedTodo(null);
    } else {
      const newTodo: Todo = {
        id: uuidv4(),
        title,
        description,
        date,
        completed: false,
      };
      setTodoList([newTodo, ...todoList]);
    }
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setErrors({});
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-5">
      <h2 className="text-xl font-bold mb-2">
        {selectedTodo ? 'Edit Todo' : 'Add New Todo'}
      </h2>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
        className={`w-full mb-2 p-2 border rounded ${
          errors.title ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {errors.title && (
        <p className="text-red-500 text-sm mb-5">{errors.title}</p>
      )}

      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Description"
        className={`w-full mb-2 p-2 border rounded ${
          errors.description ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {errors.description && (
        <p className="text-red-500 text-sm mb-5">{errors.description}</p>
      )}

      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className={`w-full mb-2 p-2 border rounded ${
          errors.date ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {errors.date && (
        <p className="text-red-500 text-sm mb-5">{errors.date}</p>
      )}

      <button
        onClick={addOrUpdateTodo}
        className="w-full bg-purple-500 text-white p-2 rounded"
      >
        {selectedTodo ? 'Update Todo' : 'Add Todo'}
      </button>
      {selectedTodo && (
        <button
          onClick={() => setSelectedTodo(null)}
          className="w-full mt-2 bg-gray-300 p-2 rounded"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default TodoForm;
