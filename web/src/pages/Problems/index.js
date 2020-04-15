import React from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import Button from '~/components/Button';
import ProblemItem from './ProblemItem';

import { Table } from './styles';

export default function Problem() {
  return (
    <>
      <header>
        <strong>Gerenciando problemas</strong>
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
