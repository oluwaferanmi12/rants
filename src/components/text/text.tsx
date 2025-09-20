import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {TextProps} from 'react-native';
import {DarkModeColors, LightModeColors, useTheme} from '@data';

export const TextVariants = {
  H1: {
    fontSize: 42,
    lineHeight: 41,
    fontFamily: 'Lexend-Bold',
  },
  H2: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: 'Lexend-SemiBold',
  },
  H3: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: 'Lexend-SemiBold',
  },
  H4: {
    lineHeight: 28,
    fontSize: 24,
    fontFamily: 'Lexend-SemiBold',
  },
  HEADLINE: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: 'Lexend-SemiBold',
  },
  BODY: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: 'Lexend-Regular',
  },
  CALLOUT: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'Lexend-Regular',
  },
  SUBHEAD: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Lexend-Regular',
  },
  FOOTNOTE: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Lexend-Regular',
  },
  CAPTION1: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Lexend-Regular',
  },
  CAPTION2: {
    fontSize: 11,
    lineHeight: 13,
    fontFamily: 'Lexend-Regular',
  },
  CAPTION3: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: 'Lexend-Regular',
  },
};

export type StyledTextProps = {
  color?: LightModeColors | DarkModeColors;
  type?: keyof typeof TextVariants;
  children: string | ReactNode;
  m?: string;
  p?: string;
  ta?: 'center' | 'left' | 'right';
  br?: string;
  opacity?: number;
  bg?: LightModeColors | DarkModeColors;
};

const StyledText = styled.Text<StyledTextProps>`
  color: ${props => props.color};
  font-size: ${props => TextVariants[props.type!].fontSize}px;
  border-radius: ${props => props.br?.split(' ').join('px ') ?? 0}px;
  font-family: ${props => TextVariants[props.type!].fontFamily};
  line-height: ${props => TextVariants[props.type!].lineHeight}px;
  margin: ${props => props.m?.split(' ').join('px ')}px;
  padding: ${props => props.p?.split(' ').join('px ')}px;
  text-align: ${props => props.ta};
  opacity: ${props => props.opacity ?? 1};
  background-color: ${props => props.bg || 'transparent'};
`;

export const Text = ({
  children,
  color,
  type = 'BODY',
  m = '0',
  p = '0',
  ta = 'left',
  ...props
}: StyledTextProps & TextProps) => {
  const {Colors} = useTheme();
  return (
    <StyledText
      m={m}
      p={p}
      ta={ta}
      color={color || Colors.TEXT_ICON_PRIMARY}
      type={type}
      {...props}>
      {children}
    </StyledText>
  );
};
