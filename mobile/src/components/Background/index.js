import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export default styled(LinearGradient).attrs({
  colors: ['#fff', '#7D40E7'],
  start: [1, 0.25],
  end: [1, 0.249],
})`
  flex: 1;
`;
