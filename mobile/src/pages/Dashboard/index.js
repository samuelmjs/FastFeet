import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';

import Delivery from '~/components/Delivery';
import Placeholder from './Placeholder';
import { signOut } from '~/store/modules/auth/actions';

import { formatAdrress, formatStatus, formatUri } from '~/utils/format';

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
  Empty,
} from './styles';

function Dashboard({ isFocused }) {
  const [deliveries, setDeliveries] = useState([]);
  const [filterActive, setFilterActive] = useState(true);
  const [loading, setLoading] = useState(false);

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

  const avatarUri = useMemo(
    () => profile.avatar && formatUri(profile.avatar),
    []
  );

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

      const data = response.data.map((delivery) => ({
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
      }));

      setDeliveries(data);
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
    setLoading(true);
    getDeliveries().then(() => {
      setLoading(false);
    });
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
                  ? avatarUri
                  : `https://ui-avatars.com/api/?name=${avatarName.first}+${avatarName.second}&bold=true&size=224`,
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

        {loading ? (
          <Placeholder />
        ) : (
          <Deliveries
            data={deliveries}
            showsVerticalScrollIndicator={false}
            keyExtractor={(delivery) => String(delivery.id)}
            onEndReachedThreshold={0.1}
            onEndReached={() => getDeliveries()}
            ListEmptyComponent={
              <Empty loading={loading}>Não Possui entregas :(</Empty>
            }
            renderItem={({ item }) => (
              <Delivery key={item.id} delivery={item} />
            )}
          />
        )}
      </Container>
    </>
  );
}

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
