import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdSearch, MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';
import { formatAdrress } from '~/utils/format';

import Button from '~/components/Button';

import RecipientItem from './RecipientItem';

import { Table, PageActions } from './styles';

export default function Repicients() {
  const [recipients, setRecipients] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  async function getRecipients() {
    const response = await api.get('recipients', {
      params: {
        q: searchValue,
        page,
      },
    });

    setRecipients(
      response.data.map((recipient) => ({
        ...recipient,
        address: formatAdrress(recipient),
      }))
    );
  }

  async function handleDeleteRecipient(id) {
    try {
      const confirm = window.confirm(
        'Você tem certeza que deseja deletar isso?'
      );

      if (!confirm) return;

      await api.delete(`recipients/${id}`);

      const data = recipients.filter((deliveryman) => deliveryman.id !== id);

      setRecipients(data);

      toast.success('Entregador deletado com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar entregador!');
    }
  }

  async function handlePage(action) {
    if (action === 'back') {
      setPage(page - 1);
      setTotal(total + 4);

      return;
    }

    setPage(page + 1);
    setTotal(total - 4);
  }

  useEffect(() => {
    getRecipients();
  }, [page, searchValue]);

  useEffect(() => {
    async function getTotal() {
      const response = await api.get('recipients', {
        params: { q: searchValue },
      });
      setTotal(response.headers['x-total-count']);
    }

    getTotal();
  }, [searchValue]);

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
            onChange={(e) => setSearchValue(e.target.value)}
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
          <RecipientItem
            key={recipient.id}
            recipient={recipient}
            onDelete={handleDeleteRecipient}
          />
        ))}
      </Table>

      <PageActions>
        <button
          type="button"
          disabled={page < 2}
          onClick={() => handlePage('back')}
        >
          Anterior
        </button>

        <span>{page}</span>

        <button
          type="button"
          disabled={total < 4}
          onClick={() => handlePage('next')}
        >
          Próximo
        </button>
      </PageActions>
    </>
  );
}
