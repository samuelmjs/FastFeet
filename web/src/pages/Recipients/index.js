import React from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import Button from '~/components/Button';
import RecipientItem from './RecipientItem';

import { Table } from './styles';

export default function Repicients() {
  return (
    <>
      <header>
        <strong>Gerenciando destinatários</strong>
      </header>

      <aside>
        <div>
          <MdSearch size={20} color="#999" />
          <input placeholder="Busca por encomenda" />
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
          <strong>Endereço</strong>
          <strong>Ações</strong>
        </section>

        <RecipientItem />
        <RecipientItem />
        <RecipientItem />
      </Table>
    </>
  );
}
