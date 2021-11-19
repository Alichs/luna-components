import React from 'react';
class FormStore {
  constructor(forceReRender: any) {
    this.forceReRender = forceReRender;
    this.store = {};
    this.callbacks = {};
  }
  forceReRender = null;
  store: any = {};
  callbacks: any = {};
  setFieldsValue = (newStore: any) => {
    this.store = { ...this.store, ...newStore };
  };
  getFiledValue = (name: any) => {
    return this.store[name];
  };
  setCallbacks = (callbacks: any) => {
    this.callbacks = callbacks;
  };
  submit = () => {
    let { onFinish } = this.callbacks;
    if (onFinish) {
      onFinish(this.store);
    }
  };
  getForm() {
    return {
      setFieldsValue: this.setFieldsValue,
      getFiledValue: this.getFiledValue,
      setCallbacks: this.setCallbacks,
      submit: this.submit,
    };
  }
}

export default function useForm() {
  let formRef = React.useRef<any>();
  let [, forceUpdate] = React.useState({});
  if (!formRef.current) {
    const forceReRender = () => {
      forceUpdate({});
    };
    let formStore = new FormStore(forceReRender);
    let formInstance = formStore.getForm();
    formRef.current = formInstance;
  }
  return [formRef.current];
}
