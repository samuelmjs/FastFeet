import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';

import Delivery from '~/components/Delivery';
import { signOut } from '~/store/modules/auth/actions';

import api from '~/services/api';

import {
  Container,
  Profile,
  ProfileDetails,
  LogoutButton,
  ProfileAvatar,
  ProfileInfo,
  ProfileName,
  Welcome,
  DeliveriesHeader,
  DeliveriesTitle,
  DeliveriesFilterContainer,
  DeliveriesFilter,
  Deliveries,
} from './styles';

export default function Dashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [filterActive, setFilterActive] = useState(true);

  const dispatch = useDispatch();

  const profile = useSelector((state) => state.user.profile);
  const deliverymanId = useSelector((state) => state.auth.id);

  const avatarName = useMemo(() => {
    const text = profile.name.split(' ');

    return {
      first: text[0],
      second: text.length > 1 ? text[1] : '',
    };
  }, [profile.name]);

  async function getDeliveries() {
    const response = await api.get(`deliverymen/${deliverymanId}/deliveries`, {
      params: {
        delivered: filterActive ? null : 'true',
      },
    });

    setDeliveries(
      response.data.map((delivery) => ({
        ...delivery,
        dateFormatted: format(parseISO(delivery.createdAt), 'dd/MM/yyyy'),
      }))
    );
  }

  function handleToggleFilter() {
    setFilterActive(!filterActive);
  }

  function handleLogout() {
    dispatch(signOut());
  }

  useEffect(() => {
    getDeliveries();
  }, [filterActive]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Container>
        <Profile>
          <ProfileDetails>
            <ProfileAvatar
              source={{
                uri: profile.avatar
                  ? profile.avatar.url
                  : `https://ui-avatars.com/api/?name=${avatarName.first}+${avatarName.second}&bold=true`,
              }}
            />
            <ProfileInfo>
              <Welcome>Bem vindo de volta,</Welcome>
              <ProfileName>{profile.name}</ProfileName>
            </ProfileInfo>
          </ProfileDetails>
          <LogoutButton onPress={handleLogout}>
            <MaterialIcons name="exit-to-app" size={24} color="#e74040" />
          </LogoutButton>
        </Profile>

        <DeliveriesHeader>
          <DeliveriesTitle>Entregas</DeliveriesTitle>

          <DeliveriesFilterContainer>
            <DeliveriesFilter
              onPress={handleToggleFilter}
              active={filterActive}
            >
              Pendente
            </DeliveriesFilter>
            <DeliveriesFilter
              onPress={handleToggleFilter}
              active={!filterActive}
            >
              Entregue
            </DeliveriesFilter>
          </DeliveriesFilterContainer>
        </DeliveriesHeader>

        <Deliveries
          data={deliveries}
          keyExtractor={(delivery) => String(delivery.id)}
          renderItem={({ item, index }) => (
            <Delivery key={item.id} delivery={item} index={index} />
          )}
        />
      </Container>
    </>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Entregas',
  tabBarIcon: ({ tintColor }) => (
    <MaterialIcons name="reorder" size={24} color={tintColor} />
  ),
};
