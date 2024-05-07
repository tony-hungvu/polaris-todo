import { Button } from '@shopify/polaris';
import { forwardRef } from 'react';

const CreateButton = forwardRef(({ setIsShowModal }, ref) => {
  const handleClick = () => {
    setIsShowModal(true);
  };

  return (
    <Button variant='primary' ref={ref} onClick={handleClick}>
      Create
    </Button>
  );
});

export default CreateButton;
