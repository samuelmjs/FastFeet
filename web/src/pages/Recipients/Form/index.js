import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form as TFrom } from '@unform/web';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import Button from '~/components/Button';
import Input from '~/components/Input';

export default function Form({ match }) {
  const { id } = match.params;

  const formRef = useRef(null);

  async function handleCreateRecipient(recipient) {
    try {
      await api.post('recipients', recipient);
      toast.success('Entrega cadastrada com sucesso!');

      history.push('/recipients');
    } catch (error) {
      toast.error('Não foi possível cadastra destinatário!');
    }
  }

  async function handleUpdateRecipient(recipient) {
    try {
      await api.put(`recipients/${id}`, recipient);
      toast.success('Entregador atualiado com sucesso!');

      history.push('/recipients');
    } catch (error) {
      toast.error('Não foi possível atualizar entregador!');
    }
  }

  async function handleSubimit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome do destinatário é obrigatório'),
        street: Yup.string().required('A rua é obrigatória'),
        number: Yup.string().required('O número é obrigatório'),
        complement: Yup.string(),
        city: Yup.string().required('A cidade é obrigatória'),
        state: Yup.string().required('O estado é obrigatório'),
        cep: Yup.string()
          .test('cep', 'Deve conter 8 números', (cep) => cep.length === 8)
          .required('O cep é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        handleUpdateRecipient(data);
        return;
      }
      handleCreateRecipient(data);

      formRef.current.setErrors({});
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  async function getRecipients(recipientId) {
    const response = await api.get(`recipients/${recipientId}`);

    formRef.current.setData(response.data);
  }

  useEffect(() => {
    if (!id) return;
    getRecipients(id);
  }, [id]);

  return (
    <>
      <header>
        <strong>{id ? 'Editar ' : 'Cadastro de'} destinatário</strong>

        <div>
          <Button color="#ccc" type="button" onClick={history.goBack}>
            <MdKeyboardArrowLeft size={20} color="#fff" />
            Voltar
          </Button>
          <Button onClick={() => formRef.current.submitForm()} type="submit">
            <MdDone size={20} color="#fff" />
            Salvar
          </Button>
        </div>
      </header>

      <TFrom ref={formRef} onSubmit={handleSubimit}>
        <Input label="Nome" name="name" placeholder="João Silva" />
        <section id="firstFocus">
          <Input
            id="recipient"
            label="Rua"
            name="street"
            placeholder="Rua José Maciel "
          />
          <Input type="number" label="Número" name="number" placeholder="12" />
          <Input
            label="Complemento"
            name="complement"
            placeholder="Bloco C apto 186"
          />
        </section>

        <section>
          <Input label="Cidade" name="city" placeholder="Taboão da Serra" />
          <Input label="Estado" name="state" placeholder="São Paulo" />
          <Input label="CEP" name="cep" placeholder="06764-040" type="number" />
        </section>
      </TFrom>
    </>
  );
}

Form.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

Form.defaultProps = {
  match: {},
};
