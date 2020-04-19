import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

import { signOut } from '~/store/modules/auth/actions';

import { formatUri } from '~/utils/format';

import {
  Container,
  ProfileAvatar,
  ProfileContent,
  ProfileInfo,
  ProfileText,
  ProfileDescription,
  LogoutButton,
} from './styles';

export default function Profile() {
  const profile = useSelector((state) => state.user.profile);

  const dispatch = useDispatch();

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

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <ProfileAvatar
        source={{
          uri: profile.avatar
            ? avatarUri
            : `https://ui-avatars.com/api/?name=${avatarName.first}+${avatarName.second}&bold=true&size=224`,
        }}
      />

      <ProfileContent>
        <ProfileInfo>
          <ProfileText>Name</ProfileText>
          <ProfileDescription>{profile.name}</ProfileDescription>
        </ProfileInfo>

        <ProfileInfo>
          <ProfileText>Email</ProfileText>
          <ProfileDescription>{profile.email}</ProfileDescription>
        </ProfileInfo>

        <ProfileInfo>
          <ProfileText>Data de Cadastro</ProfileText>
          <ProfileDescription>{profile.created_at}</ProfileDescription>
        </ProfileInfo>
      </ProfileContent>

      <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
    </Container>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <MaterialIcons name="account-circle" size={24} color={tintColor} />
  ),
};
