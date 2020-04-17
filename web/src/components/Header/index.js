import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import logo from '~/assets/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector((state) => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="fastfeet" />

          <NavLink to="/deliveries">ENCOMENDAS</NavLink>
          <NavLink to="/deliverymen">ENTREGADORES</NavLink>
          <NavLink to="/recipients">DESTINATÁRIOS</NavLink>
          <NavLink to="/problems">PROBLEMAS</NavLink>
        </nav>

        <Profile>
          <strong>{profile.name}</strong>
          <Link to="/">sair do sistema</Link>
        </Profile>
      </Content>
    </Container>
  );
}
