import {TickIcon, WarningIcon, XIcon} from '@assets';
import {AppContext, useTheme} from '@data';
import {TestIds} from '@library';
import React, {useContext, useEffect} from 'react';
import styled from 'styled-components/native';
import {Text} from '../text';

export enum AlertTypes {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}

export type AlertProps = {
  title: string;
  type: AlertTypes;
};

const StyledText = styled(Text)`
  margin-left: 8px;
  flex: 1;
`;

export const Alert = () => {
  const {Colors} = useTheme();
  const Wrapper = styled.View<{
    type: AlertTypes;
  }>`
    background-color: ${props => {
      if (props.type === AlertTypes.ERROR) {
        return Colors.ERROR_900;
      } else if (props.type === AlertTypes.SUCCESS) {
        return Colors.SUCCESS_900;
      } else {
        return Colors.CAUTION_900;
      }
    }};
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    position: absolute;
    width: 100%;
    top: 40px;
  `;
  const {showAlert, dispatch, alertConfig} = useContext(AppContext);
  const {type, title} = alertConfig;
  useEffect(() => {
    showAlert &&
      setTimeout(() => {
        dispatch({showAlert: false});
      }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAlert]);

  return (
    <>
      {showAlert && (
        <Wrapper type={type} testID={TestIds.AlertWrapper}>
          {type === AlertTypes.ERROR ? (
            <XIcon testID={TestIds.XIcon} />
          ) : type === AlertTypes.SUCCESS ? (
            <TickIcon testID={TestIds.TickIcon} />
          ) : (
            <WarningIcon testID={TestIds.WarningIcon} />
          )}
          <StyledText color={Colors.NEUTRAL_0} type="SUBHEAD">
            {title}
          </StyledText>
        </Wrapper>
      )}
    </>
  );
};
