import React, { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Form as TFrom } from '@unform/web';

import api from '~/services/api';
import history from '~/services/history';

import Button from '~/components/Button';
import Input from '~/components/Input';

// import { Container } from './styles';

export default function Form({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  async function handleCreateDeliveryman(data) {
    try {
      await api.post('deliverymen', data);
      toast.success('Entrega cadastrada com sucesso!');

      history.push('/deliverymans');
    } catch (error) {
      toast.error('Não foi possível criar entrega!');
    }
  }

  async function handleUpdateDeliveryman(data) {
    try {
      await api.put(`deliverymen/${id}`, data);
      toast.success('Entregador atualiado com sucesso!');

      history.push('/deliverymans');
    } catch (error) {
      toast.error('Não foi possível atualizar entregador!');
    }
  }

  async function getDeliveryman(id) {
    const response = await api.get(`deliverymen/${id}`);

    formRef.current.setData(response.data);
  }

  useEffect(() => {
    if (!id) return;
    getDeliveryman(id);
  }, [id]);

  return (
    <>
      <header>
        <strong>{id ? 'Editar ' : 'Cadastro de'} Encomendas</strong>

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

      <TFrom
        ref={formRef}
        onSubmit={
          id ? handleUpdateDeliveryman : () => handleCreateDeliveryman(id)
        }
      >
        <Input label="Nome" name="name" placeholder="João Silva" />
        <Input label="Email" name="email" placeholder="jsilva@fastfeet" />
      </TFrom>
    </>
  );
}
