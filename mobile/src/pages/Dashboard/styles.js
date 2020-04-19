import styled from 'styled-components/native';
import Constants from 'expo-constants';

import Filter from '~/components/Filter';

export const Container = styled.View`
  flex: 1;
`;

export const Profile = styled.View`
  padding: ${Constants.statusBarHeight + 10}px 20px 25px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileDetails = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const ProfileAvatar = styled.Image`
  height: 68px;
  width: 68px;
  border-radius: 35px;
  margin-right: 15px;
`;

export const ProfileInfo = styled.View`
  flex: 1;
`;

export const Welcome = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const ProfileName = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 22px;
  color: #444;
  font-weight: bold;
`;

export const DeliveriesHeader = styled.View`
  margin-bottom: 10px;
  padding: 0 20px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DeliveriesTitle = styled.Text`
  font-size: 22px;
  color: #444;
  font-weight: bold;
`;

export const DeliveriesFilterContainer = styled.View`
  flex-direction: row;
`;

export const DeliveriesFilter = styled(Filter)`
  margin-left: 10px;
`;

export const Deliveries = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;

export const LogoutButton = styled.TouchableOpacity``;
