import React from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import DeliveryItem from './DeliveryItem';

import { Table } from './styles';

export default function Deliveries() {
  return (
    <>
      <strong>Gerenciando encomendas</strong>

      <aside>
        <div>
          <MdSearch size={20} color="#999" />
          <input placeholder="Busca por encomenda" />
        </div>
        <button type="button">
          <MdAdd size={20} color="#fff" />
          CADASTRAR
        </button>
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

        <DeliveryItem />
        <DeliveryItem />
        <DeliveryItem />
        <DeliveryItem />
      </Table>
    </>
  );
}
