import { Form, FormLayout, Modal, TextField } from '@shopify/polaris';
import React, { useCallback } from 'react';

const TodoForm = ({
  addTodo,
  isShowModal = false,
  setIsShowModal,
  refButton,
}) => {
  const [value, setValue] = React.useState('');

  const handleChangeTextField = (newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
    setIsShowModal(false);
  };

  const handleClose = useCallback(() => {
    setIsShowModal(false);
    requestAnimationFrame(() => {
      refButton.current?.querySelector('button')?.focus();
    });
  }, [setIsShowModal, refButton]);

  return (
    <Modal
      instant
      open={isShowModal}
      onClose={handleClose}
      title='Create todo'
      primaryAction={{
        content: 'Add',
        onAction: handleSubmit,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: handleClose,
        },
      ]}
    >
      <Modal.Section>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={value}
              onChange={handleChangeTextField}
              label='Title'
              type='text'
              autoComplete='off'
            />
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
};

export default TodoForm;
