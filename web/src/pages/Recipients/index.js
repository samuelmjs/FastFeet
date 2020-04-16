import React, { useState, useEffect } from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';
import { formatAdrress } from '~/utils/format';

import Button from '~/components/Button';

import RecipientItem from './RecipientItem';

import { Table } from './styles';

export default function Repicients() {
  const [recipients, setRecipients] = useState([]);

  async function getRecipients() {
    const response = await api.get('recipients');

    setRecipients(
      response.data.map((recipient) => ({
        ...recipient,
        address: formatAdrress(recipient),
      }))
    );
  }

  async function handleSearchRecipients(e) {
    const response = await api.get('recipients', {
      params: {
        q: e.target.value,
      },
    });

    setRecipients(
      response.data.map((recipient) => ({
        ...recipient,
        address: formatAdrress(recipient),
      }))
    );
  }

  useEffect(() => {
    getRecipients();
  }, []);

  return (
    <>
      <header>
        <strong>Gerenciando destinatários</strong>
      </header>

      <aside>
        <div>
          <MdSearch size={20} color="#999" />
          <input
            type="text"
            onChange={handleSearchRecipients}
            placeholder="Busca por encomenda"
          />
        </div>
        <Button onClick={() => history.push('/recipients/form')} type="button">
          <MdAdd size={20} color="#fff" />
          CADASTRAR
        </Button>
      </aside>

      <Table>
        <section>
          <strong>ID</strong>
          <strong>Nome</strong>
          <strong>Endereço</strong>
          <strong>Ações</strong>
        </section>

        {recipients.map((recipient) => (
          <RecipientItem key={recipient.id} recipient={recipient} />
        ))}
      </Table>
    </>
  );
}
