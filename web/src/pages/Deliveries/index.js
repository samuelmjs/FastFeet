import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';

import history from '~/services/history';
import api from '~/services/api';

import { formatStatus, formatDate } from '~/utils/format';

import Button from '~/components/Button';
import DeliveryItem from './DeliveryItem';

import { Table } from './styles';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  async function getDeliveries() {
    const response = await api.get('deliveries');

    setDeliveries(
      response.data.map((delivery) => ({
        ...delivery,
        status: formatStatus(delivery),
        start_dateFormatted: formatDate(delivery.start_date),
        end_dateFormatted: formatDate(delivery.end_date),
      }))
    );
  }

  async function handleSearchDeliveries(e) {
    const response = await api.get('deliveries', {
      params: {
        q: e.target.value,
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

  useEffect(() => {
    getDeliveries();
  }, []);

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
            onChange={handleSearchDeliveries}
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
    </>
  );
}
