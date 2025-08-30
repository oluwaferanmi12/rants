import {useTheme} from '@data';
import {DarkModeColors, LightModeColors, TestIds} from '@library';
import React, {ReactNode, useState} from 'react';
import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';
import {Text} from '../text';

export type InputProps = {
  label?: string;
  subLabelColor?: LightModeColors | DarkModeColors;
  subLabel?: string;
  placeholder?: string;
  infoText?: string;
  isError?: boolean;
  Icon?: ReactNode;
  iconPosition?: 'right' | 'left';
  flex?: number;
  height?: number;
  bw?: number;
};

const Container = styled.View<{flex?: number}>`
  border-radius: 8px;
  margin-bottom: 16px;
  flex: ${props => props.flex || 'none'};
`;

const Label = styled(Text)`
  margin-bottom: 8px;
`;

const InfoText = styled(Text)`
  margin-top: 8px;
`;

const InputWrapper = styled.View``;

const IconWrapper = styled.View<{
  position: 'right' | 'left';
}>`
  position: absolute;
  ${props => props.position}: 8px;
  top: 0;
  height: 48px;
  justify-content: center;
`;

const TextInput = styled.TextInput<{
  hasRightIcon: boolean;
  hasLeftIcon: boolean;
  isFocused: boolean;
  height?: number;
  bw?: number;
  colors: typeof LightModeColors | typeof DarkModeColors;
}>`
  color: ${props => props.colors.TEXT_ICON_PRIMARY};
  height: ${props => props.height || 48}px;
  border-color: ${({isFocused, value, colors}) =>
    isFocused || !!value
      ? colors.TEXT_ICON_PRIMARY
      : colors.TEXT_ICON_DISABLED};
  border-width: ${({isFocused, value, bw}) =>
    bw !== undefined ? bw : isFocused || !!value ? 1.5 : 1}px;
  border-radius: 4px;
  text-align: left;
  padding-left: ${props => (props.hasLeftIcon ? 32 : 8)}px;
  padding-right: ${props => (props.hasRightIcon ? 32 : 8)}px;
  font-size: 14px;
`;

export const Input = ({
  label,
  infoText,
  isError,
  flex,
  Icon,
  iconPosition = 'right',
  height,
  subLabel,
  subLabelColor,
  ...rest
}: InputProps & TextInputProps) => {
  const {Colors} = useTheme();
  const SubLabel = styled(Text)`
    margin-bottom: 8px;
    color: ${subLabelColor};
  `;

  const [isFocused, setIsFocused] = useState(false);
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);
  return (
    <Container testID={TestIds.Container + 'input'} flex={flex}>
      {label && (
        <Label color={Colors.TEXT_ICON_PRIMARY} type="FOOTNOTE">
          {label}
        </Label>
      )}
      {subLabel && (
        <SubLabel color={subLabelColor} type="CAPTION2">
          {subLabel}
        </SubLabel>
      )}
      <InputWrapper>
        <TextInput
          colors={Colors}
          isFocused={isFocused}
          hasRightIcon={!!Icon && iconPosition === 'right'}
          hasLeftIcon={!!Icon && iconPosition === 'left'}
          testID={TestIds.TextInput + label}
          placeholderTextColor={Colors.TEXT_ICON_DISABLED}
          onFocus={onFocus}
          onBlur={onBlur}
          autoCapitalize="none"
          height={height}
          {...rest}
        />
        {Icon && <IconWrapper position={iconPosition}>{Icon}</IconWrapper>}
      </InputWrapper>

      {infoText && (
        <InfoText
          color={isError ? Colors.ERROR_900 : Colors.TEXT_ICON_DISABLED}
          type="CAPTION2">
          {infoText}
        </InfoText>
      )}
    </Container>
  );
};
