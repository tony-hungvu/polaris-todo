import { Card, ResourceList } from '@shopify/polaris';
import React, { useState } from 'react';

import Todo from '../todo/todo.js';
import TodoContext from '../../context/todoContext.js';
import TodoForm from '../../components/todoForm/TodoForm.js';
import { baseUrl } from '../../apis/apiUrl.js';
import { fetchApi } from '../../apis/fetchApi.js';
import useFetchApi from '../../hooks/useFetchApi.js';

const TodoList = ({ isShowModal, setIsShowModal, refButton }) => {
  const { data, setData } = useFetchApi();
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const addTodo = async (text) => {
    try {
      setLoading(true);
      const { todoes } = await fetchApi({
        url: `${baseUrl}/todoes`,
        method: 'POST',
        body: text,
      });
      setData([...data, todoes]);
      setLoading(false);
      setFetched(true);
    } catch (err) {
      console.log('Error when add todo');
      console.log(err);
    } finally {
      console.log('Success');
      setLoading(false);
    }
  };

  const completeTodo = async (id) => {
    try {
      setLoading(true);
      const { updatedTodo } = await fetchApi({
        url: `${baseUrl}/todoes/${id}`,
        method: 'PUT',
      });
      setData((prevData) =>
        prevData.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
      setLoading(false);
      setFetched(true);
    } catch (err) {
      console.log('Error when update todo');
    } finally {
      console.log('Success');
      setLoading(false);
    }
  };

  const completeTodoList = async () => {
    try {
      setLoading(true);
      const updatedTodoIds = data
        .filter((todo) => selectedItems.includes(todo.id))
        .map((todo) => todo.id);

      const { updatedList } = await fetchApi({
        url: `${baseUrl}/todoes/updateTodoList`,
        method: 'PUT',
        body: updatedTodoIds,
      });

      setData((prevData) =>
        prevData.map((todo) =>
          updatedTodoIds.includes(todo.id)
            ? updatedList.find((updatedTodo) => updatedTodo.id === todo.id) ||
              todo
            : todo
        )
      );

      setSelectedItems([]);
      setLoading(false);
      setFetched(true);
    } catch (err) {
      console.log('Error when updating todos');
    } finally {
      console.log('Success');
      setLoading(false);
    }
  };

  const removeTodo = async (id) => {
    try {
      setLoading(true);
      await fetchApi({
        url: `${baseUrl}/todoes/${id}`,
        method: 'DELETE',
      });

      setData((prevData) => prevData.filter((todo) => todo.id !== id));
      setLoading(false);
      setFetched(true);
    } catch (err) {
      console.log('Error when delete todo');
    } finally {
      console.log('Success');
      setLoading(false);
    }
  };

  const removeTodoList = async () => {
    try {
      setLoading(true);
      await fetchApi({
        url: `${baseUrl}/todoes/deleteTodoList`,
        method: 'POST',
        body: selectedItems,
      });

      setData((prevData) =>
        prevData.filter((todo) => !selectedItems.includes(todo.id))
      );
      setSelectedItems([]);
      setLoading(false);
      setFetched(true);
    } catch (err) {
      console.log('Error when delete todoes');
    } finally {
      console.log('Success');
      setLoading(false);
    }
  };

  const resourceName = {
    singular: 'todo',
    plural: 'todoes',
  };

  const promotedBulkActions = [
    {
      content: 'Complete',
      onAction: completeTodoList,
    },
    {
      content: 'Delete',
      onAction: removeTodoList,
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
          loading={loading}
          fetched={fetched}
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
