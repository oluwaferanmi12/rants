import {render} from '@config';
import React from 'react';
import {TestIds} from '@library';
import {ListModal} from './ListModal';

const TestProps = {
  isModalVisible: true,
  hideModal: jest.fn(),
  caution: false,
  title: 'Some title',
  modalList: [{text: 'List title'}],
  onPress: jest.fn(),
};

describe('Components > ListModal', () => {
  it('renders correctly', () => {
    const component = render(<ListModal {...TestProps} />);
    expect(component).toBeTruthy();
  });

  it('should not render modal', () => {
    const component = render(
      <ListModal {...TestProps} isModalVisible={false} />,
    );
    expect(component.getByTestId(TestIds.ModalId)).toBeEmptyElement();
  });
});
