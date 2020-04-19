import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  padding: 20px;

  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ProfileAvatar = styled.Image`
  height: 136px;
  width: 136px;
  border-radius: 65px;
`;

export const ProfileContent = styled.View`
  align-self: stretch;
`;

export const ProfileInfo = styled.View`
  margin: 10px 0;
`;

export const ProfileText = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const ProfileDescription = styled.Text`
  font-size: 22px;
  color: #444;
  font-weight: bold;
`;

export const LogoutButton = styled(Button)`
  background: #e74040;
  margin-top: 10px;

  align-self: stretch;
`;
