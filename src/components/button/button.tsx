import {DarkModeColors, LightModeColors, useTheme} from '@data';
import {TestIds} from '@library';
import React, {ReactNode} from 'react';
import {TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import {Text, TextVariants} from '../text';

export enum ButtonTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SOCIAL = 'social',
}

export type ButtonProps = {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonTypes;
  withIcon?: boolean;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  textColor?: LightModeColors | DarkModeColors;
  m?: string;
  p?: string;
  textType?: keyof typeof TextVariants;
  bg?: LightModeColors | DarkModeColors;
  bc?: LightModeColors | DarkModeColors;
  flex?: number | string;
};

export const Button = ({
  title,
  loading = false,
  disabled,
  type = ButtonTypes.PRIMARY,
  textType = 'CALLOUT',
  rightIcon = null,
  leftIcon = null,
  textColor,
  flex = 'none',
  m = '0',
  p = '16',
  bg,
  bc,
  ...rest
}: ButtonProps & TouchableOpacityProps) => {
  const {Colors} = useTheme();
  const Container = styled.TouchableOpacity`
    background-color: ${disabled
      ? Colors.PRIMARY_100
      : bg
      ? bg
      : type === ButtonTypes.PRIMARY
      ? Colors.PRIMARY_900
      : type === ButtonTypes.SECONDARY
      ? Colors.TRANSPARENT
      : type === ButtonTypes.SOCIAL
      ? Colors.NEUTRAL_200
      : Colors.TRANSPARENT};
    border: ${type === ButtonTypes.SECONDARY
      ? `1.5px solid ${Colors.PRIMARY_900}`
      : disabled
      ? Colors.NEUTRAL_0
      : bc
      ? `1.5px solid ${bc}`
      : type === ButtonTypes.SOCIAL
      ? 'none'
      : Colors.PRIMARY_900};
    border-radius: 4px;
    margin: ${m?.split(' ').join('px ')}px;
    padding: ${p?.split(' ').join('px ')}px;
    flex: ${flex};
  `;

  const StyledText = styled(Text)<{
    hasRightIcon: boolean;
    hasLeftIcon: boolean;
    color: string;
  }>`
    text-align: center;
    margin-right: ${({hasRightIcon}) => (hasRightIcon ? 8 : 0)}px;
    margin-left: ${({hasLeftIcon}) => (hasLeftIcon ? 8 : 0)}px;
    color: ${({color}) => color};
  `;

  const ActivityIndicator = styled.ActivityIndicator`
    color: ${Colors.NEUTRAL_0};
  `;

  const TextWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `;
  return (
    <Container {...rest} disabled={disabled} testID={TestIds.Container}>
      {loading ? (
        <ActivityIndicator testID={TestIds.ActivityIndicator} />
      ) : (
        <TextWrapper>
          {leftIcon}
          <StyledText
            type={textType}
            hasRightIcon={!!rightIcon}
            hasLeftIcon={!!leftIcon}
            color={
              disabled
                ? Colors.LINE_DARK
                : textColor
                ? textColor
                : type === ButtonTypes.SECONDARY
                ? Colors.PRIMARY_900
                : type === ButtonTypes.SOCIAL
                ? Colors.TEXT_ICON_PRIMARY
                : Colors.NEUTRAL_0
            }>
            {title}
          </StyledText>
          {rightIcon}
        </TextWrapper>
      )}
    </Container>
  );
};
