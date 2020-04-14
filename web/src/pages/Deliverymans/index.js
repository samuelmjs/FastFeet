import React from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import DeliverymanItem from './DeliverymanItem';

import { Table } from './styles';

export default function Deliverymans() {
  return (
    <>
      <strong>Gerenciando entregadores</strong>

      <aside>
        <div>
          <MdSearch size={20} color="#999" />
          <input placeholder="Busca por entregadores" />
        </div>
        <button type="button">
          <MdAdd size={20} color="#fff" />
          CADASTRAR
        </button>
      </aside>

      <Table>
        <section>
          <strong>ID</strong>
          <strong>Nome</strong>
          <strong>Foto</strong>
          <strong>Email</strong>
          <strong>Ações</strong>
        </section>

        <DeliverymanItem />
        <DeliverymanItem />
        <DeliverymanItem />
      </Table>
    </>
  );
}
