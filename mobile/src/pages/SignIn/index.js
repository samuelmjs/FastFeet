import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/mobile';

import { signInRequest } from '~/store/modules/auth/actions';

import Input from '~/components/Input';

import { Container, SubmitButton } from './styles';

export default function SignIn() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  function handleSubmit({ id }) {
    dispatch(signInRequest(id));
  }

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="id" placeholder="informe seu ID de cadastro" />
        <SubmitButton onPress={() => formRef.current.submitForm()}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
