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
 <strong>Criar imagem database</strong> (campo "nome", você derá inserir o que desejar)
 - `docker run --name "nome" -p 6379:6379 -d -t redis:alpine` 
 - `docker run --name "nome" -p 5432:5432 -d -t postgres` 
 - `docker ps` verificar imagens iniciadas
 - `docker pa -a` verificar todas as imagens criadas 

- A partir da raiz do projeto, entre na pasta rodando cd `backend`;
- Rode `yarn` para instalação das dependências;
- preencha o arquivo `.env` com <strong>suas variáveis ambiente</strong>;
- Rode `yarn sequelize db:migrate` para executar as migrations;
- Para executar somente a migration de admin-user rode o comando `yarn sequelize db:seed:all`
- Rode `yarn dev` para iniciar o servidor;
- Rode `yarn queue` para iniciar o redis;

Obs: Foi utiliado <strong>MailTrap</strong>(visualizados de e-mail), <strong>sentry</strong>(tratamento de exceções).
<strong>mantenha o backend rodando para executar o web e mobile</strong>

### Web
- A partir da raiz do projeto, entre na pasta web rodando `cd web`
- Rode `yarn` para instalar as dependências
- Rode `yarn start` para iniciar o client web


### Mobile (EXPO)
  Obs: Está aplicação foi testada somente em IOS
  
- Baixe o app Expo na loja do seu celular
- Rode `npm install --global expo-cli`
- A partir da raiz do projeto, entre na pasta mobile rodando `cd mobile`
- Rode `yarn` para instalar as dependências
- Rode `yarn start` para iniciar o client web
- A ponte a camera para o QRCode que irá paracer
- Edite o arquivo `mobile/src/services/api.js`, alterando baseURL para o IP correspondente consta no expo e inclua a porta do backend no final da URL

