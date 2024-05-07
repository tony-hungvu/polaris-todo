import {
  Badge,
  Box,
  InlineGrid,
  PageActions,
  ResourceItem,
  Text,
} from '@shopify/polaris';
import React, { useContext } from 'react';

import TodoContext from '../../context/todoContext';

const Todo = ({ item }) => {
  const { completeTodo, removeTodo } = useContext(TodoContext);
  const { id, text, isCompleted } = item;

  const handleComplete = () => {
    completeTodo(id);
  };

  const handleDelete = () => {
    removeTodo(id);
  };

  return (
    <ResourceItem id={id} isCompleted={isCompleted}>
      <InlineGrid columns={3} alignItems='center'>
        <Text variant='bodyMd' as='h3'>
          {text}
        </Text>
        <Box>
          <Badge tone={isCompleted ? 'success' : 'attention'}>
            {isCompleted ? 'Complete' : 'Incomplete'}
          </Badge>
        </Box>
        <PageActions
          primaryAction={{
            content: 'Complete',
            onAction: handleComplete,
          }}
          secondaryActions={[
            {
              content: 'Delete',
              destructive: true,
              onAction: handleDelete,
            },
          ]}
        />
      </InlineGrid>
    </ResourceItem>
  );
};

export default Todo;
