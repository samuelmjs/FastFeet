import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Form as TForm } from '@unform/web';

import api from '~/services/api';
import history from '~/services/history';

import AsyncSelectInput from '~/components/AsyncSelectInput';
import Input from '~/components/Input';
import Button from '~/components/Button';

export default function From() {
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

  async function handleCreateDelivery(data) {
    try {
      await api.post('deliveries', data);
      toast.error('Entrega cadastrada com sucesso!');
      history.push('/deliveries');
    } catch (error) {
      toast.error('Não foi possível criar entrega!');
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
  }

  return (
    <>
      <header>
        <strong>Cadastro de Encomendas</strong>

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

      <TForm onSubmit={handleCreateDelivery} ref={formRef}>
        <section id="twoRows">
          <AsyncSelectInput
            type="text"
            label="Destinatário"
            name="recipient_id"
            placeholder="Samuel Monteiro"
            loadOptions={loadRecipients}
            defaultOptions
            noOptionsMessage={() => 'Nenhum destinatário encontrado'}
            styles={customStylesSelectInput}
          />
          <AsyncSelectInput
            type="text"
            label="Entregador"
            name="deliveryman_id"
            placeholder="João Silva"
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
