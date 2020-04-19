import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/mobile';

import { signInRequest } from '~/store/modules/auth/actions';

import Input from '~/components/Input';

import logo from '../../../assets/logo.png';
import { Container, Logo, SubmitButton } from './styles';

export default function SignIn() {
  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();
  const formRef = useRef(null);

  function handleSubmit({ id }) {
    dispatch(signInRequest(id));
  }

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Logo source={logo} />

        <Input
          name="id"
          placeholder="informe seu ID de cadastro"
          keyboardType="numbers-and-punctuation"
          returnKeyType="send"
          onSubmitEditing={() => formRef.current.submitForm()}
        />
        <SubmitButton
          loading={loading}
          onPress={() => formRef.current.submitForm()}
        >
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
