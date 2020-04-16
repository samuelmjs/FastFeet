import React, { useState, useEffect } from 'react';

import api from '~/services/api';

import ProblemItem from './ProblemItem';

import { Table } from './styles';

export default function Problem() {
  const [problems, setProblems] = useState([]);

  async function getProblems() {
    const response = await api.get('problems');

    setProblems(response.data);
  }

  useEffect(() => {
    getProblems();
  }, []);

  return (
    <>
      <header>
        <strong>Gerenciando problemas</strong>
      </header>

      <Table>
        <section>
          <strong>Encomenda</strong>
          <strong>Problema</strong>
          <strong>Ações</strong>
        </section>

        {problems.map((problem) => (
          <ProblemItem key={problem.id} problem={problem} />
        ))}
      </Table>
    </>
  );
}
