import {render} from '@config';
import React from 'react';
import {PasswordResetModal} from './PasswordResetModal';
import {TestIds} from '@library';

const TestProps = {
  isModalVisible: true,
  setIsModalVisible: jest.fn(),
};

describe('Components > PasswordResetModal', () => {
  it('renders correctly', () => {
    const component = render(<PasswordResetModal {...TestProps} />);
    expect(component).toBeTruthy();
  });

  it('should not render modal', () => {
    const component = render(
      <PasswordResetModal {...TestProps} isModalVisible={false} />,
    );
    expect(component.getByTestId(TestIds.ModalId)).toBeEmptyElement();
  });
});
