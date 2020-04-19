<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-09/blob/master/.github/logo.png" width="300px" />
</h1>

<h3 align="center">
 Desafio 10: Aplicação de Transpotadora 
</h3>

<p align="center"> Aplicação de cetificação da <a href="https://rocketseat.com.br/">Rocketseat</a></p> 
<br/>

<p align="center">
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação-execução-e-desenvolvimento">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-entrega">Entrega</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>
<br/>
<br/>

## 🚀 Principais Tecnologias
- React
- Node.js
- PostgreSQL
- Docker
- Docker Compose
- Express
- Redis
- Bee-Queue

## 💻 Instalação, execução e desenvolvimento

### Pré Requisitos
- <a href='https://www.docker.com/'>Docker</a>
- Clone repositório

### Backend

- A partir da raiz do projeto, entre na pasta rodando cd `backend`;
- Rode `yarn` para instalação das dependências;
- Rode `cp .env.example .env` e preencha o arquivo `.env` com <strong>suas variáveis ambiente</strong>;
- Rode `docker-compose up -d` para montar o ambiente;
- Rode `yarn sequelize db:migrate` para executar as migrations;
- Para executar somente a migration de admin-user rode o comando `yarn sequelize db:seed --seed 20200409140138-admin-userr.js`
- Rode `yarn dev` para iniciar o servidor;
