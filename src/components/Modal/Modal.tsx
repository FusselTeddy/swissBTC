import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React, {
  ComponentProps,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { Animated, Easing, Modal as RootModal } from "react-native";
import { ArrayOrSingle } from "ts-essentials";
import { Button, KeyboardAvoidingView, Pressable } from "@components";
import { ScrollView } from "react-native";
import { useIsScreenSizeMin } from "@hooks";
import { SBPModalContext, platform } from "@config";
import { useTheme } from "styled-components";
import * as S from "./styled";

const { isNative } = platform;

const ANIMATION_DURATION = 250;

const animationValues = {
  opacity: [0, 1],

  scale: [0.96, 1],
  translateY: [5, 0]
};

const AnimatedModalBackground = Animated.createAnimatedComponent(
  S.ModalBackground
);
const AnimatedModalContent = Animated.createAnimatedComponent(S.ModalContent);

type ModalProps = {
  title?: string;
  onClose: () => void;
  isOpen: boolean;
  children: ArrayOrSingle<React.ReactElement>;
  submitButton?: ComponentProps<typeof Button>;
  noScrollView?: boolean;
};

export const Modal = ({
  title,
  onClose,
  isOpen,
  children,
  submitButton,
  noScrollView = false
}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const isExtraLarge = useIsScreenSizeMin("extraLarge");
  const { overlayComponent } = useContext(SBPModalContext);
  const { colors } = useTheme();

  const opacity = useRef(
    new Animated.Value(animationValues.opacity[+isOpen])
  ).current;

  const scale = useRef(
    new Animated.Value(animationValues.scale[+isOpen])
  ).current;
  const translateY = useRef(
    new Animated.Value(animationValues.translateY[+isOpen])
  ).current;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsVisible(true);
      }, 0);
    }

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: animationValues.opacity[+isOpen],
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease)
      }),
      Animated.timing(scale, {
        toValue: animationValues.scale[+isOpen],
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease)
      }),
      Animated.timing(translateY, {
        toValue: animationValues.translateY[+isOpen],
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease)
      })
    ]).start(() => {
      if (!isOpen) {
        setIsVisible(false);
      }
    });
  }, [isOpen]);

  return (
    <RootModal
      visible={isVisible}
      transparent
      statusBarTranslucent
      hardwareAccelerated
      onRequestClose={() => {
        // TODO: Ask confirmation?
        onClose();
      }}
    >
      <KeyboardAvoidingView>
        <AnimatedModalBackground style={{ opacity }}>
          <AnimatedModalContent
            isScreenExtraLarge={isExtraLarge}
            style={{ transform: [{ scale }, { translateY }] }}
          >
            <S.ModalHeader>
              <S.HeaderText weight={700}>{title}</S.HeaderText>
              <Pressable onPress={onClose}>
                <S.HeaderIcon size={24} icon={faTimes} color={colors.white} />
              </Pressable>
            </S.ModalHeader>
            {!noScrollView ? (
              <ScrollView
                keyboardShouldPersistTaps="always"
                style={{
                  overflow: isNative ? "hidden" : undefined,
                  zIndex: 1
                }}
                contentContainerStyle={{ overflow: "hidden" }}
              >
                {children}
              </ScrollView>
            ) : (
              children
            )}
            {submitButton && (
              <S.SubmitButton type="bitcoin" {...submitButton} />
            )}
          </AnimatedModalContent>
          {overlayComponent}
        </AnimatedModalBackground>
      </KeyboardAvoidingView>
    </RootModal>
  );
};
