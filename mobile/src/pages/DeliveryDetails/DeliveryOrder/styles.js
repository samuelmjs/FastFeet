import styled from 'styled-components/native';

import { Camera as TCamera } from 'expo-camera';

import Button from '~/components/Button';

export const Container = styled.View`
  padding: 30px 20px 15px;

  flex: 1;
`;

export const CameraContainer = styled.View`
  flex: 1;
  border-radius: 4px;
`;

export const Preview = styled.ImageBackground`
  padding: 25px;

  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const Camera = styled(TCamera)`
  padding: 25px;

  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const CameraButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.3);
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;
