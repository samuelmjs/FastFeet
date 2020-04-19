import styled from 'styled-components/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

const Placeholder = styled(ShimmerPlaceHolder).attrs({
  colorShimmer: ['#ddd', '#eee', '#ddd'],
  duration: 1000,
})``;

export const DeliveryCards = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const DeliveryCard = styled(LinearGradient).attrs({
  colors: ['#F7F7F7', '#F7F7F7'],
  start: { x: 0, y: 0.75 },
  end: { x: 1, y: 0.25 },
  locations: [0, 1],
})`
  padding: 20px;
  border-radius: 4px;
  margin: 10px 20px;
`;

export const DeliveryHeader = styled.View`
  margin-bottom: 30px;
`;

export const DeliveryText = styled(Placeholder)``;

export const DeliveryProgress = styled(Placeholder)`
  margin-bottom: 30px;
  width: 80%;
`;

export const DeliveryFooter = styled.View`
  justify-content: center;
`;
