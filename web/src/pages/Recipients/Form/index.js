import React, { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Form as TFrom } from '@unform/web';

import api from '~/services/api';
import history from '~/services/history';

import Button from '~/components/Button';
import Input from '~/components/Input';

export default function Form({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  async function handleCreateRecipient(data) {
    try {
      await api.post('recipients', data);
      toast.success('Entrega cadastrada com sucesso!');

      history.push('/recipients');
    } catch (error) {
      toast.error('Não foi possível cadastra destinatário!');
    }
  }

  async function handleUpdateRecipient(data) {
    try {
      await api.put(`recipients/${id}`, data);
      toast.success('Entregador atualiado com sucesso!');

      history.push('/recipients');
    } catch (error) {
      toast.error('Não foi possível atualizar entregador!');
    }
  }

  async function getRecipients(id) {
    const response = await api.get(`recipients/${id}`);

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

      <TFrom
        ref={formRef}
        onSubmit={id ? handleUpdateRecipient : handleCreateRecipient}
      >
        <Input label="Nome" name="name" placeholder="João Silva" />
        <section id="firstFocus">
          <Input
            id="recipient"
            label="Rua"
            name="street"
            placeholder="Rua José Maciel "
          />
          <Input label="Número" name="number" placeholder="12" />
          <Input
            label="Complemento"
            name="complement"
            placeholder="Bloco C apto 186"
          />
        </section>

        <section>
          <Input label="Cidade" name="city" placeholder="Taboão da Serra" />
          <Input label="Estado" name="state" placeholder="São Paulo" />
          <Input label="CEP" name="cep" placeholder="06764-040" />
        </section>
      </TFrom>
    </>
  );
}
