import {render} from '@config';
import React from 'react';
import {VerificationModal} from './VerificationModal';
import {TestIds} from '@library';

const TestProps = {
  isModalVisible: true,
  setIsModalVisible: jest.fn(),
  onComplete: jest.fn(),
};

describe('Components > VerificationModal', () => {
  it('renders correctly', () => {
    const component = render(<VerificationModal {...TestProps} />);
    expect(component).toBeTruthy();
  });

  it('should not render modal', () => {
    const component = render(
      <VerificationModal {...TestProps} isModalVisible={false} />,
    );
    expect(component.getByTestId(TestIds.ModalId)).toBeEmptyElement();
  });
});
