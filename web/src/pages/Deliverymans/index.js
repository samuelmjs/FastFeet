import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import Button from '~/components/Button';
import DeliverymanItem from './DeliverymanItem';

import { Table } from './styles';

export default function Deliverymans() {
  const [deliverymen, setDeliverymen] = useState([]);

  async function getDeliverymen() {
    const response = await api.get('deliverymen');

    setDeliverymen(response.data);
  }

  async function handleSearchDeliverymen(e) {
    const response = await api.get('deliverymen', {
      params: {
        q: e.target.value,
      },
    });

    setDeliverymen(response.data);
  }

  useEffect(() => {
    getDeliverymen();
  }, []);

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
            onChange={handleSearchDeliverymen}
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
          <DeliverymanItem deliveryman={deliveryman} />
        ))}
      </Table>
    </>
  );
}
