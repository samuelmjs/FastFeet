import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';

import history from '~/services/history';
import api from '~/services/api';

import { formatStatus, formatDate } from '~/utils/format';

import Button from '~/components/Button';
import DeliveryItem from './DeliveryItem';

import { Table, PageActions } from './styles';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  async function getDeliveries() {
    const response = await api.get('deliveries', {
      params: {
        q: searchValue,
        page,
      },
    });

    setDeliveries(
      response.data.map((delivery) => ({
        ...delivery,
        status: formatStatus(delivery),
        start_dateFormatted: formatDate(delivery.start_date),
        end_dateFormatted: formatDate(delivery.end_date),
      }))
    );
  }

  async function handleDeleteDelivery(id) {
    try {
      await api.delete(`deliveries/${id}`);

      getDeliveries();

      toast.success('Entrega deletada com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar entrega!');
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
    getDeliveries();
  }, [page, searchValue]);

  useEffect(() => {
    async function getTotal() {
      const response = await api.get('deliveries', {
        params: { q: searchValue },
      });
      setTotal(response.headers['x-total-count']);
    }

    getTotal();
  }, [searchValue]);

  return (
    <>
      <header>
        <strong>Gerenciando encomendas</strong>
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
        <Button onClick={() => history.push('/deliveries/form')} type="button">
          <MdAdd size={20} color="#fff" />
          CADASTRAR
        </Button>
      </aside>

      <Table>
        <section>
          <strong>ID</strong>
          <strong>Destinatátio</strong>
          <strong>Entregador</strong>
          <strong>Cidade</strong>
          <strong>Estado</strong>
          <strong>Status</strong>
          <strong>Ações</strong>
        </section>

        {deliveries.map((delivery) => (
          <DeliveryItem
            key={delivery.id}
            delivery={delivery}
            onDelete={handleDeleteDelivery}
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
