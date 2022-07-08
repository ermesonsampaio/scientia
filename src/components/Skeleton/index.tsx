import React, { useEffect } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { THEME } from '../../theme';

interface SkeletonProps {
  width: number;
  height: number;
  style?: ViewStyle;
}

export default function Skeleton({ width, height, style }: SkeletonProps) {
  const translateX = useSharedValue(-width);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: translateX.value }],
    }),
    [translateX]
  );

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, { duration: 1000 }),
      -1,
      false
    );
  }, [width]);

  return (
    <View
      style={StyleSheet.flatten([
        {
          width,
          height,
          backgroundColor: THEME.colors.card,
          overflow: 'hidden',
        },
        style,
      ])}
    >
      <Animated.View
        style={[
          {
            height: '100%',
            width: '100%',
          },
          animatedStyle,
        ]}
      >
        <LinearGradient
          style={{ width: '100%', height: '100%' }}
          colors={['transparent', 'rgba(255, 255, 255, .1)', 'transparent']}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
}
