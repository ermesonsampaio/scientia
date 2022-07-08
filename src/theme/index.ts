import { DarkTheme } from '@react-navigation/native';

export const THEME = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primaryLite: '#9c95db',
    background: '#1b1c1f',
    card: '#393A3D',
    border: '#393A3D',
    text: '#fff',
    placeholder: '#7b7d85',
    primary: '#6356D7',
    secondaryText: '#ddd',
    contrastText: '#fff',
    correct: '#cdf77b',
    incorrect: '#ff5454',
    darkText: '#111',
  },
  fonts: {
    thin: 'Jost_100Thin',
    light: 'Jost_300Light',
    regular: 'Jost_400Regular',
    medium: 'Jost_500Medium',
    semiBold: 'Jost_600SemiBold',
    bold: 'Jost_700Bold',
  },
};
