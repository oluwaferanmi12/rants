import {DarkModeColors, LightModeColors, useTheme} from '@data';
import React, {ReactNode} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components/native';

type Props = {
  children?: ReactNode;
  m?: string;
  p?: string;
  fd?: 'row' | 'column';
  jc?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  ai?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | undefined;
  als?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'auto'
    | 'baseline'
    | undefined;
  renderItem?: ListRenderItem<any>;
  data?: any[];
  bg?: LightModeColors | DarkModeColors;
  colors?: typeof LightModeColors | typeof DarkModeColors;
  flex?: number;
  fg?: number;
  withBorder?: boolean;
  bw?: number | string;
  br?: string;
  gap?: number;
  smh?: number | string;
  fw?: 'wrap' | 'nowrap' | 'wrap-reverse';
  mh?: number;
  opacity?: number;
  bs?: 'solid' | 'none' | 'dashed' | 'dotted';
  bc?: LightModeColors | DarkModeColors;
  position?: 'relative' | 'absolute';
  top?: number;
  right?: number;
  zIndex?: number;
  bottom?: number;
  left?: number;
  height?: number;
  sd?: 'h' | 'v';
  st?: 'flatlist' | 'scrollview';
  width?: number | string;
  onPress?: () => void;
  disabled?: boolean;
  expand?: boolean;
  ccpl?: number;
  ccpr?: number;
};

const Clickable = styled.Pressable<Omit<Props, 'renderItem' | 'data'>>`
  margin: ${props => props.m?.split(' ').join('px ') ?? 0}px;
  padding: ${props => props.p?.split(' ').join('px ') ?? 0}px;
  border-radius: ${props => props.br?.split(' ').join('px ') ?? 0}px;
  justify-content: ${props => props.jc || 'flex-start'};
  align-items: ${props => props.ai || 'stretch'};
  align-self: ${props => props.als || 'auto'};
  flex-direction: ${props => props.fd || 'column'};
  background-color: ${props => props.bg || props.colors?.NEUTRAL_100};
  flex: ${props => props.flex || 'none'};
  ${props => (props.fg ? 'flex-grow: ' + props.fg : '')};
  border-color: ${props => props.bc || props.colors?.NEUTRAL_300};
  gap: ${props => props.gap || 0}px;
  border-style: ${props => props.bs || 'solid'};
  opacity: ${props => props.opacity ?? 1};
  position: ${props => props.position ?? 'relative'};
  top: ${props => (props.top !== undefined ? `${props.top}px` : 'auto')};
  left: ${props => (props.left !== undefined ? `${props.left}px` : 'auto')};
  right: ${props => (props.right !== undefined ? `${props.right}px` : 'auto')};
  height: ${props => (props.height ? `${props.height}px` : 'auto')};
  min-height: ${props => (props.mh ? `${props.mh}px` : 'auto')};
  width: ${props =>
    typeof props.width === 'string'
      ? `${props.width}`
      : props.width
      ? `${props.width}px`
      : 'auto'};
  bottom: ${props =>
    props.bottom !== undefined ? `${props.bottom}px` : 'auto'};
  z-index: ${props => (props.zIndex ? props.zIndex : 0)};
  ${props => {
    if (props.withBorder) {
      return 'border-top-width: 0; border-right-width: 0; border-bottom-width: 0.5px; border-left-width: 0';
    } else if (typeof props.bw === 'number') {
      return `border-width: ${props.bw}px`;
    } else if (
      typeof props.bw === 'string' &&
      props.bw.split(' ').length === 2
    ) {
      const array = props.bw.split(' ');
      const firstItem = array[0];
      const secondItem = array[1];
      return `border-top-width: ${firstItem}; border-right-width: ${firstItem}; border-bottom-width: ${secondItem}; border-left-width: ${secondItem}`;
    } else if (
      typeof props.bw === 'string' &&
      props.bw.split(' ').length === 4
    ) {
      const array = props.bw.split(' ');
      const firstItem = array[0];
      const secondItem = array[1];
      const thirdItem = array[2];
      const fourthItem = array[2];
      return `border-top-width: ${firstItem}; border-right-width: ${secondItem}; border-bottom-width: ${thirdItem}; border-left-width: ${fourthItem}`;
    }
  }}
`;

const Wrapper = styled.View<
  Omit<Props, 'onPress' | 'disabled' | 'renderItem' | 'data'>
>`
  margin: ${props => props.m?.split(' ').join('px ') ?? 0}px;
  padding: ${props => props.p?.split(' ').join('px ') ?? 0}px;
  border-radius: ${props => props.br?.split(' ').join('px ') ?? 0}px;
  justify-content: ${props => props.jc || 'flex-start'};
  align-items: ${props => props.ai || 'stretch'};
  align-self: ${props => props.als || 'auto'};
  flex-direction: ${props => props.fd || 'column'};
  background-color: ${props => props.bg || props.colors?.NEUTRAL_100};
  flex: ${props => props.flex || 'none'};
  flex-wrap: ${props => props.fw || 'nowrap'};
  border-color: ${props => props.bc || props.colors?.NEUTRAL_300};
  gap: ${props => props.gap || 0}px;
  border-style: ${props => props.bs || 'solid'};
  opacity: ${props => props.opacity ?? 1};
  position: ${props => props.position ?? 'relative'};
  top: ${props => (props.top !== undefined ? `${props.top}px` : 'auto')};
  left: ${props => (props.left !== undefined ? `${props.left}px` : 'auto')};
  right: ${props => (props.right !== undefined ? `${props.right}px` : 'auto')};
  height: ${props => (props.height ? `${props.height}px` : 'auto')};
  min-height: ${props => (props.mh ? `${props.mh}px` : 'auto')};
  width: ${props =>
    typeof props.width === 'string'
      ? `${props.width}`
      : props.width
      ? `${props.width}px`
      : 'auto'};
  z-index: ${props => (props.zIndex ? props.zIndex : 0)};
  bottom: ${props =>
    props.bottom !== undefined ? `${props.bottom}px` : 'auto'};
  ${props => {
    if (props.withBorder) {
      return 'border-top-width: 0; border-right-width: 0; border-bottom-width: 0.5px; border-left-width: 0';
    } else if (typeof props.bw === 'number') {
      return `border-width: ${props.bw}px`;
    } else if (
      typeof props.bw === 'string' &&
      props.bw.split(' ').length === 2
    ) {
      const array = props.bw.split(' ');
      const firstItem = array[0];
      const secondItem = array[1];
      return `border-top-width: ${firstItem}; border-right-width: ${firstItem}; border-bottom-width: ${secondItem}; border-left-width: ${secondItem}`;
    } else if (
      typeof props.bw === 'string' &&
      props.bw.split(' ').length === 4
    ) {
      const array = props.bw.split(' ');
      const firstItem = array[0];
      const secondItem = array[1];
      const thirdItem = array[2];
      const fourthItem = array[2];
      return `border-top-width: ${firstItem}; border-right-width: ${secondItem}; border-bottom-width: ${thirdItem}; border-left-width: ${fourthItem}`;
    }
  }}
`;

export const Container = ({
  children,
  sd,
  st = 'scrollview',
  fg,
  data,
  renderItem,
  smh,
  expand = false,
  ccpl = 0,
  ...rest
}: ScrollViewProps & Props) => {
  const {Colors} = useTheme();

  const renderChildren = () => {
    return expand ? (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {children}
      </KeyboardAvoidingView>
    ) : st === 'flatlist' && sd ? (
      <FlatList
        data={data}
        horizontal={sd === 'h'}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(_, i) => `${i}`}
      />
    ) : sd ? (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: fg || undefined,
          minHeight: smh,
          paddingLeft: ccpl,
          paddingRight: ccpl,
        }}
        horizontal={sd === 'h'}>
        {children}
      </ScrollView>
    ) : (
      children
    );
  };
  return rest.onPress ? (
    <Clickable {...rest} colors={Colors}>
      {renderChildren()}
    </Clickable>
  ) : (
    <Wrapper {...rest} colors={Colors}>
      {renderChildren()}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
