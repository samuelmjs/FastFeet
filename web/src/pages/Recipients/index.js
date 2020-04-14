import React from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import RecipientItem from './RecipientItem';

import { Table } from './styles';

export default function Repicients() {
  return (
    <>
      <strong>Gerenciando estinatários</strong>

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
