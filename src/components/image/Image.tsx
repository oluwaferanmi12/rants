import React from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import styled from 'styled-components/native';
import {DarkModeColors, LightModeColors} from '../../libs';

type Props = {
  height: number;
  width?: number;
  br?: string;
  bw?: string;
  bc?: LightModeColors | DarkModeColors;
} & FastImageProps;

const Image = styled(FastImage)<Props>`
  width: ${props => (props.width ? props.width + 'px' : '100%')};
  height: ${props => (props.height ? props.height + 'px' : '100%')};
  resize-mode: cover;
  border-radius: ${props => props.br || 0}px;
  border-color: ${props => props.bc || 'transparent'};
  border-width: ${props => props.bw || 0}px;
  background-color: #aaa;
`;

export const Picture = (props: Props) => {
  return <Image {...props} />;
};
