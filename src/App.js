import './index.css';

import { AppProvider, Page } from '@shopify/polaris';
import React, { useRef, useState } from 'react';

import CreateButton from '../src/components/buttons/Button';
import Header from '../src/components/header/header';
import TodoList from '../src/components/todoList/TodoList';

function App() {
  const button = useRef(null);
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <AppProvider>
      <div className='app'>
        <Header />
        <Page
          narrowWidth
          title='Todoes'
          secondaryActions={
            <CreateButton setIsShowModal={setIsShowModal} refs={button} />
          }
        >
          <TodoList
            refButton={button}
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
          />
        </Page>
      </div>
    </AppProvider>
  );
}

export default App;
