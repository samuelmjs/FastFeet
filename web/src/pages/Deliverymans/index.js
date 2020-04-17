import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import Button from '~/components/Button';
import DeliverymanItem from './DeliverymanItem';

import { Table, PageActions } from './styles';

export default function Deliverymans() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  async function getDeliverymen() {
    const response = await api.get('deliverymen', {
      params: {
        q: searchValue,
        page,
      },
    });

    setDeliverymen(response.data);
  }

  async function handleDeleteDeliveryman(id) {
    try {
      await api.delete(`deliverymen/${id}`);

      const data = deliverymen.filter((deliveryman) => deliveryman.id !== id);

      setDeliverymen(data);

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
    getDeliverymen();
  }, [page, searchValue]);

  useEffect(() => {
    async function getTotal() {
      const response = await api.get('deliverymen', {
        params: { q: searchValue },
      });
      setTotal(response.headers['x-total-count']);
    }

    getTotal();
  }, [searchValue]);

  return (
    <>
      <header>
        <strong>Gerenciando entregadores</strong>
      </header>

      <aside>
        <div>
          <MdSearch size={20} color="#999" />
          <input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Busca por entregadores"
          />
        </div>
        <Button type="button" onClick={() => history.push('/deliverymen/form')}>
          <MdAdd size={20} color="#fff" />
          CADASTRAR
        </Button>
      </aside>

      <Table>
        <section>
          <strong>ID</strong>
          <strong>Nome</strong>
          <strong>Foto</strong>
          <strong>Email</strong>
          <strong>Ações</strong>
        </section>

        {deliverymen.map((deliveryman) => (
          <DeliverymanItem
            deliveryman={deliveryman}
            onDelete={handleDeleteDeliveryman}
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
          disabled={total <= 4}
          onClick={() => handlePage('next')}
        >
          Próximo
        </button>
      </PageActions>
    </>
  );
}
