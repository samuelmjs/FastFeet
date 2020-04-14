import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import logo from '~/assets/logo.svg';

import { Container, Content, Profile } from './styles';

const currentRouteStyle = {
  color: '#444',
};

export default function Header() {
  const location = useLocation();

  console.tron.log(location.pathname);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="fastfeet" />

          <NavLink activeStyle={currentRouteStyle} to="deliveries">
            ENCOMENDAS
          </NavLink>
          <NavLink activeStyle={currentRouteStyle} to="deliverymans">
            ENTREGADORES
          </NavLink>
          <NavLink activeStyle={currentRouteStyle} to="recipients">
            DESTINATÁRIOS
          </NavLink>
          <NavLink activeStyle={currentRouteStyle} to="problems">
            PROBLEMAS
          </NavLink>
        </nav>

        <Profile>
          <strong>Distribuidora FastFeet</strong>
          <Link to="/">sair do sistema</Link>
        </Profile>
      </Content>
    </Container>
  );
}
