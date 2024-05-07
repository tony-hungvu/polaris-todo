import { Card, ResourceList } from '@shopify/polaris';
import React, { useState } from 'react';

import Todo from '../todo/todo.js';
import TodoContext from '../../context/todoContext.js';
import TodoForm from '../../components/todoForm/TodoForm.js';
import { baseUrl } from '../../apis/apiUrl.js';
import { fetchApi } from '../../apis/fetchApi.js';
import useFetchApi from '../../hooks/useFetchApi.js';

const TodoList = ({ isShowModal, setIsShowModal, refButton }) => {
  const { data } = useFetchApi();
  const [selectedItems, setSelectedItems] = useState([]);

  const addTodo = async (text) => {
    try {
      const res = await fetchApi({
        url: `${baseUrl}/products`,
        method: 'POST',
        body: text,
      });
      console.log(res);
    } catch (err) {
      console.log('Error when add todo');
      console.log(err);
    } finally {
      console.log('Success');
    }
  };

  const completeTodo = async (id) => {
    try {
      const res = await fetchApi({
        url: `${baseUrl}/product/${id}`,
        method: 'PUT',
      });

      console.log(id);

      console.log(res);
    } catch (err) {
      console.log('Error when update todo');
    } finally {
      console.log('Success');
    }
  };

  const completeTodos = async () => {
    try {
      let updatedTodos = data.filter((todo) => selectedItems.includes(todo.id));

      updatedTodos = updatedTodos.map((e) => e.id);

      const res = await fetchApi({
        url: `${baseUrl}/products`,
        method: 'PUT',
        body: updatedTodos,
      });

      setSelectedItems([]);

      console.log(res);
    } catch (err) {
      console.log('Error when update todoes');
    } finally {
      console.log('Success');
    }
  };

  const removeTodo = async (id) => {
    try {
      const res = await fetchApi({
        url: `${baseUrl}/product/${id}`,
        method: 'DELETE',
      });

      console.log(res);
    } catch (err) {
      console.log('Error when delete todo');
    } finally {
      console.log('Success');
    }
  };

  const removeTodos = async () => {
    try {
      const res = await fetchApi({
        url: `${baseUrl}/products/d`,
        method: 'POST',
        body: selectedItems,
      });

      setSelectedItems([]);

      console.log(res);
    } catch (err) {
      console.log('Error when delete todoes');
    } finally {
      console.log('Success');
    }
  };

  const resourceName = {
    singular: 'todo',
    plural: 'todoes',
  };

  const promotedBulkActions = [
    {
      content: 'Complete',
      onAction: completeTodos,
    },
    {
      content: 'Delete',
      onAction: removeTodos,
    },
  ];

  return (
    <TodoContext.Provider value={{ removeTodo, completeTodo }}>
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={data}
          renderItem={Todo}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          promotedBulkActions={promotedBulkActions}
          totalItemsCount={data.length}
        />
      </Card>
      <TodoForm
        refButton={refButton}
        addTodo={addTodo}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
    </TodoContext.Provider>
  );
};

export default TodoList;
