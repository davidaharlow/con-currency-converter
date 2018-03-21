import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FeesTable from '../components/FeesTable';
import Conversion from '../components/Conversion';

Enzyme.configure({ adapter: new Adapter() });
 
function setup() {
  const props = {
    conversionRate: 0,
    fee: 0,
    originCurrency: 'USD',
    total: 0,
    destinationCurrency: ''
  }
 
  const enzymeWrapper = mount(<FeesTable {...props} />)
 
  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('FeesTable', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup()
 
      expect(enzymeWrapper.find('table').hasClass('mui-table')).toBe(true)
      expect(enzymeWrapper.find('.td-title').text()).toBe('Conversion Rate')
      expect(enzymeWrapper.find('.total-label').text()).toBe('Total Cost')
      expect(enzymeWrapper.find('.fee').text()).toBe('0.00 USD')
       
    })
 
    // it('should call addTodo if length of text is greater than 0', () => {
    //   const { enzymeWrapper, props } = setup()
    //   const input = enzymeWrapper.find('TodoTextInput')
    //   input.props().onSave('')
    //   expect(props.addTodo.mock.calls.length).toBe(0)
    //   input.props().onSave('Use Redux')
    //   expect(props.addTodo.mock.calls.length).toBe(1)
    // })
  })
})


      // const todoInputProps = enzymeWrapper.find('TodoTextInput').props()
      // expect(todoInputProps.newTodo).toBe(true)
      // expect(todoInputProps.placeholder).toEqual('What needs to be done?')

describe('A suite', () => {

  it('should render without throwing an error', () => {
    expect(true).toBe(true);
  });

});