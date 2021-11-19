import React from 'react';

import FieldContext from '../fieldContext';
import useForm from '../useForm';
type Props = {
  initalValuse?: any;
  onFinish?: any;
};
const Form: React.FC<Props> = (props) => {
  let [formInstance]: any = useForm();
  formInstance.setCallbacks({
    onFinish: props.onFinish,
  });
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        formInstance.submit();
      }}
    >
      <FieldContext value={formInstance}></FieldContext>
      {props.children}
    </form>
  );
};
export default Form;
