import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import ProblemItem from './ProblemItem';

import { Table, PageActions } from './styles';

export default function Problem() {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  async function getProblems() {
    const response = await api.get(`problems`, {
      params: {
        page,
      },
    });
    setProblems(response.data);
  }

  async function handleCancelProblem(id) {
    try {
      await api.delete(`problem/${id}/cancel-delivery`);

      getProblems();

      toast.success('Entrega cancelada com sucesso!');
    } catch (error) {
      toast.error('Erro ao cancelar entrega!');
    }
  }

  async function handlePage(action) {
    if (action === 'back') {
      setPage(page - 1);
      setTotal(total + 4);

      return;
    }

    setPage(page + 1);
    setTotal(total - 4);
  }

  useEffect(() => {
    getProblems();
  }, [page]);

  useEffect(() => {
    async function getTotal() {
      const response = await api.get('deliverymen');

      setTotal(response.headers['x-total-count']);
    }

    getTotal();
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
          <ProblemItem
            key={problem.id}
            problem={problem}
            onDelete={handleCancelProblem}
          />
        ))}
      </Table>

      <PageActions>
        <button
          type="button"
          disabled={page < 2}
          onClick={() => handlePage('back')}
        >
          Anterior
        </button>

        <span>{page}</span>

        <button
          type="button"
          disabled={total <= 4}
          onClick={() => handlePage('next')}
        >
          Próximo
        </button>
      </PageActions>
    </>
  );
}
