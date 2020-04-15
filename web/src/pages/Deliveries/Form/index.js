import React from 'react';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';
import Button from '~/components/Button';

export default function Edit() {
  return (
    <>
      <header>
        <strong>Edição de Encomendas</strong>

        <div>
          <Button color="#ccc" type="submit">
            <MdKeyboardArrowLeft size={20} color="#fff" />
            Voltar
          </Button>
          <Button type="submit">
            <MdDone size={20} color="#fff" />
            Salvar
          </Button>
        </div>
      </header>

      <Form>
        <div>
          <p>Nome do produto</p>
          <Input name="product" placeholder="IPhone 11 Pro" />
        </div>
      </Form>
    </>
  );
}
