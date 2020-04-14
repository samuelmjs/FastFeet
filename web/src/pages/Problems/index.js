import React from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import ProblemItem from './ProblemItem';

import { Table } from './styles';

export default function Problem() {
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
          <strong>Encomenda</strong>
          <strong>Problema</strong>
          <strong>Ações</strong>
        </section>

        <ProblemItem />
        <ProblemItem />
        <ProblemItem />
      </Table>
    </>
  );
}
