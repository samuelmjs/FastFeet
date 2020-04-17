import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form as TForm } from '@unform/web';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import AsyncSelectInput from '~/components/AsyncSelectInput';
import Input from '~/components/Input';
import Button from '~/components/Button';

export default function Form({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  const customStylesSelectInput = {
    control: (styles) => ({
      ...styles,
      paddingLeft: 5,
      height: 45,
      borderColor: '#ddd',
    }),
    placeholder: (styles) => ({
      ...styles,
      color: '#999',
    }),
  };

  async function getDelivery(deliveryId) {
    const response = await api.get(`deliveries/${deliveryId}`);

    formRef.current.setFieldValue('recipient_id', {
      value: response.data.recipient.id,
      label: response.data.recipient.name,
    });

    formRef.current.setFieldValue('deliveryman_id', {
      value: response.data.deliveryman.id,
      label: response.data.deliveryman.name,
    });
    formRef.current.setFieldValue('product', response.data.product);
  }

  async function handleCreateDelivery(delivery) {
    try {
      await api.post('deliveries', delivery);

      toast.success('Entrega cadastrada com sucesso!');
      history.push('/deliveries');
    } catch (error) {
      toast.error('Não foi possível criar entrega!');
    }
  }

  async function handleUpdateDelivery(Delivery) {
    try {
      await api.put(`deliveries/${id}`, Delivery);

      toast.success('Encomenda atualizada com sucesso!');
      history.push('/deliveries');
    } catch (error) {
      toast.error('Não foi possível atualizar encomenda!');
    }
  }

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        product: Yup.string().required('O nome do produto é obrigatório'),
        recipient_id: Yup.string().required('O destinatário é obrigatório'),
        deliveryman_id: Yup.string().required('O entregador é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        handleUpdateDelivery(data);
        return;
      }
      handleCreateDelivery(data);

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

  async function loadDeliverymen(inputValue, callback) {
    const response = await api.get('deliverymen', {
      params: {
        q: inputValue,
      },
    });

    const data = response.data.map((deliverymen) => ({
      value: deliverymen.id,
      label: deliverymen.name,
    }));

    callback(data);

    return data;
  }

  async function loadRecipients(inputValue, callback) {
    const response = await api.get('recipients', {
      params: {
        q: inputValue,
      },
    });

    const data = response.data.map((recipient) => ({
      value: recipient.id,
      label: recipient.name,
    }));

    callback(data);

    return data;
  }

  useEffect(() => {
    if (!id) return;
    getDelivery(id);
  }, [id]);

  return (
    <>
      <header>
        <strong>{id ? 'Editar' : 'Cadastro'} de Encomendas</strong>

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

      <TForm onSubmit={handleSubmit} ref={formRef}>
        <section id="twoRows">
          <AsyncSelectInput
            type="text"
            label="Destinatário"
            name="recipient_id"
            placeholder="Samuel Monteiro"
            defaultOptions
            loadOptions={loadRecipients}
            noOptionsMessage={() => 'Nenhum destinatário encontrado'}
            styles={customStylesSelectInput}
          />
          <AsyncSelectInput
            type="text"
            label="Entregador"
            name="deliveryman_id"
            placeholder="João Silva"
            defaultOptions
            loadOptions={loadDeliverymen}
            noOptionsMessage={() => 'Nenhum destinatário encontrado'}
            styles={customStylesSelectInput}
          />
        </section>

        <Input
          label="Nome do Produto"
          name="product"
          placeholder="IPhone 11 Pro"
        />
      </TForm>
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
