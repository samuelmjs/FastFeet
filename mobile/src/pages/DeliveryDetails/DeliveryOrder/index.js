import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  CameraContainer,
  Preview,
  Camera,
  CameraButton,
  SubmitButton,
} from './styles';

export default function DeliveryOrder({ navigation }) {
  const deliverymanId = useSelector((state) => state.auth.id);
  const deliveryId = useMemo(() => navigation.getParam('deliveryId'), [
    navigation,
  ]);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [uri, setUri] = useState(null);

  const cameraRef = useRef(null);

  async function handleTakePicture() {
    const options = { quality: 0.5, base64: true };
    const data = await cameraRef.current.takePictureAsync(options);
    await setUri(data.uri);
  }

  async function handleSubmit() {
    try {
      const data = new FormData();

      data.append('file', {
        type: 'image/jpeg',
        uri,
        name: uri.split('/').pop(),
      });

      const response = await api.post('files', data);
      await api.post(
        `deliverymen/${deliverymanId}/deliveries/${deliveryId}/end`,
        {
          signature_id: response.data.id,
          endDate: new Date(),
        }
      );

      Alert.alert(
        'Sucesso!',
        'Tudo certo com a entrega, podemos seguir para a proxima',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Delivery'),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Erro!',
        'Não foi possivel concluir a entrega, tente  mais tarde'
      );
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Background>
      <Container>
        <CameraContainer>
          {uri ? (
            <Preview source={{ uri }}>
              <CameraButton onPress={() => setUri(null)}>
                <MaterialIcons name="close" color="#fff" size={30} />
              </CameraButton>
            </Preview>
          ) : (
            <Camera
              ref={cameraRef}
              type={type}
              autoFocus={Camera.Constants.AutoFocus.on}
            >
              <CameraButton onPress={handleTakePicture}>
                <MaterialIcons name="photo-camera" color="#fff" size={30} />
              </CameraButton>
            </Camera>
          )}
        </CameraContainer>
        <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
      </Container>
    </Background>
  );
}

DeliveryOrder.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};

DeliveryOrder.navigationOptions = {
  headerTitle: 'Confirmar entrega',
};
