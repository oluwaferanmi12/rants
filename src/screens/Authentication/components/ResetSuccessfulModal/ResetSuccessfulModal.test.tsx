import {render} from '@config';
import React from 'react';
import {ResetSuccessfulModal} from './ResetSuccessfulModal';
import {TestIds} from '@library';

const TestProps = {
  isModalVisible: true,
  setIsModalVisible: jest.fn(),
  onSubmit: jest.fn(),
};

describe('Components > ResetSuccessfulModal', () => {
  it('renders correctly', () => {
    const component = render(<ResetSuccessfulModal {...TestProps} />);
    expect(component).toBeTruthy();
  });

  it('should not render modal', () => {
    const component = render(
      <ResetSuccessfulModal {...TestProps} isModalVisible={false} />,
    );
    expect(component.getByTestId(TestIds.ModalId)).toBeEmptyElement();
  });
});
