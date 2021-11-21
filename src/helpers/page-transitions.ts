import {
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
  StackNavigationOptions,
} from "@react-navigation/stack";

export function HorizontalSwipe({
  current,
  next,
  layouts: { screen },
}: StackCardInterpolationProps): StackCardInterpolatedStyle {
  return {
    cardStyle: {
      transform: [
        {
          translateX: !next
            ? current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [screen.width, 0],
              })
            : next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -screen.width],
              }),
        },
      ],
    },
  };
}

export function FadeIn({ current, next }: StackCardInterpolationProps): StackCardInterpolatedStyle {
  return {
    cardStyle: {
      opacity: current.progress,
      transform: [
        {
          scale: !next
            ? current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              })
            : next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              }),
        },
      ],
    },
  };
}
export function RotateIn({
  current,
  next,
}: StackCardInterpolationProps): StackCardInterpolatedStyle {
  return {
    cardStyle: {
      opacity: !next
        ? current.progress.interpolate({
            inputRange: [0, 0.5, 0.501, 1],
            outputRange: [0, 0, 1, 1],
          })
        : next.progress.interpolate({
            inputRange: [0, 0.5, 0.501, 1],
            outputRange: [1, 1, 0, 0],
          }),
      transform: [
        {
          rotateX: !next
            ? current.progress.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ["-90deg", "-90deg", "0deg"],
              })
            : next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "180deg"],
              }),
        },
      ],
    },
  };
}

export const horizontalSwipeOptions: StackNavigationOptions = {
  cardStyleInterpolator: HorizontalSwipe,
  transitionSpec: {
    open: {
      animation: "timing",
      config: {
        duration: 200,
      },
    },
    close: {
      animation: "timing",
      config: {
        duration: 200,
      },
    },
  },
};

export const OverlayOptions: StackNavigationOptions = {
  detachPreviousScreen: false,
  gestureDirection: "horizontal",
  gestureEnabled: true,
  cardStyleInterpolator: FadeIn,
  cardStyle: { backgroundColor: "transparent" },
  transitionSpec: {
    open: {
      animation: "timing",
      config: {
        duration: 200,
      },
    },
    close: {
      animation: "timing",
      config: {
        duration: 200,
      },
    },
  },
};

export const RotateInOptions: StackNavigationOptions = {
  cardStyleInterpolator: RotateIn,
  cardStyle: { backgroundColor: "transparent" },
  transitionSpec: {
    open: {
      animation: "timing",
      config: {
        duration: 200,
      },
    },
    close: {
      animation: "timing",
      config: {
        duration: 200,
      },
    },
  },
};
