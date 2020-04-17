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

import AvatarInput from '../AvatarInput';

export default function Form({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  async function handleCreateDeliveryman(deliveryman, avatar) {
    try {
      await api.post('deliverymen', {
        ...deliveryman,
        avatar_id: avatar,
      });
      toast.success('Entrega cadastrada com sucesso!');

      history.push('/deliverymen');
    } catch (error) {
      toast.error('Não foi possível criar entrega!');
    }
  }

  async function handleUpdateDeliveryman(deliveryman, avatar) {
    try {
      await api.put(`deliverymen/${id}`, {
        ...deliveryman,
        avatar_id: avatar,
      });
      toast.success('Entregador atualiado com sucesso!');

      history.push('/deliverymen');
    } catch (error) {
      toast.error('Não foi possível atualizar entregador!');
    }
  }

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatário'),
        email: Yup.string()
          .email('Digite um email válido')
          .required('O nome é obrigatário'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const dataFile = new FormData();

      dataFile.append('file', data.avatar);

      const responseFile = data.avatar
        ? await api.post('files', dataFile)
        : null;

      if (id) {
        handleUpdateDeliveryman(data, responseFile?.data?.id);
        return;
      }
      handleCreateDeliveryman(data, responseFile?.data?.id);

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

  async function getDeliveryman(deliverymanId) {
    const response = await api.get(`deliverymen/${deliverymanId}`);

    formRef.current.setData(response.data);
    formRef.current.setFieldValue('avatar', response?.data?.avatar?.url);
  }

  useEffect(() => {
    if (!id) return;
    getDeliveryman(id);
  }, [id]);

  return (
    <>
      <header>
        <strong>{id ? 'Editar ' : 'Cadastro de'} Entregadores</strong>

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

      <TFrom ref={formRef} onSubmit={handleSubmit}>
        <AvatarInput name="avatar" />
        <Input label="Nome" name="name" placeholder="João Silva" />
        <Input label="Email" name="email" placeholder="jsilva@fastfeet" />
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
