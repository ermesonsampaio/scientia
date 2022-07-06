import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { THEME } from '../../theme';
import { Line } from './styles';
const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

export interface BottomSheetProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

export interface BottomSheetRef {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
}

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ children, onClose }: BottomSheetProps, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;
      if (destination === 0 && onClose) runOnJS(onClose);

      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => active.value, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo]);

    const context = useSharedValue({ y: SCREEN_HEIGHT / 1.5 });
    const gesture = Gesture.Pan()
      .onStart(() => (context.value = { y: translateY.value }))
      .onUpdate(({ translationY }) => {
        translateY.value = translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value < -SCREEN_HEIGHT / 2.8) scrollTo(MAX_TRANSLATE_Y);
        else if (translateY.value > -SCREEN_HEIGHT / 3) scrollTo(0);
      });

    const BottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP
      );

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              height: '100%',
              width: '100%',
              backgroundColor: THEME.colors.text,
              position: 'absolute',
              top: SCREEN_HEIGHT,
              borderRadius: 25,
            },
            BottomSheetStyle,
          ]}
        >
          <Line />

          {children}
        </Animated.View>
      </GestureDetector>
    );
  }
);

export default BottomSheet;
