import React from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import Button from '~/components/Button';
import DeliverymanItem from './DeliverymanItem';

import { Table } from './styles';

export default function Deliverymans() {
  return (
    <>
      <header>
        <strong>Gerenciando entregadores</strong>
      </header>

      <aside>
        <div>
          <MdSearch size={20} color="#999" />
          <input placeholder="Busca por entregadores" />
        </div>
        <Button type="button">
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

        <DeliverymanItem />
        <DeliverymanItem />
        <DeliverymanItem />
      </Table>
    </>
  );
}
