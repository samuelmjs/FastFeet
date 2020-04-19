import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import { StatusBar, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';

import Delivery from '~/components/Delivery';
import { signOut } from '~/store/modules/auth/actions';

import { formatAdrress, formatStatus } from '~/utils/format';

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

function Dashboard({ isFocused }) {
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
    try {
      const response = await api.get(
        `deliverymen/${deliverymanId}/deliveries`,
        {
          params: {
            delivered: filterActive ? null : 'true',
          },
        }
      );

      setDeliveries(
        response.data.map((delivery) => ({
          ...delivery,
          dateFormatted: format(parseISO(delivery.createdAt), 'dd/MM/yyyy'),
          startDateFormatted:
            delivery.start_date &&
            format(parseISO(delivery.start_date), 'dd/MM/yyyy'),
          endDateFormatted:
            delivery.end_date &&
            format(parseISO(delivery.end_date), 'dd/MM/yyyy'),
          addressFormatted: formatAdrress(delivery.recipient),
          status: formatStatus(delivery),
        }))
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        'Ocorreu um problema as buscar entregas, tente mais tarde'
      );
    }
  }

  function handleToggleFilter() {
    setFilterActive(!filterActive);
  }

  function handleLogout() {
    dispatch(signOut());
  }

  useEffect(() => {
    getDeliveries();
  }, [filterActive, isFocused]);

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
          renderItem={({ item }) => <Delivery key={item.id} delivery={item} />}
        />
      </Container>
    </>
  );
}

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
