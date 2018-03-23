import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { ActionTypes as types } from '../helpers/constants';
import Adapter from 'enzyme-adapter-react-16';
import FeesTable from '../components/FeesTable';
import Conversion from '../components/Conversion';

Enzyme.configure({ adapter: new Adapter() });
 
function setupFeesTable() {
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


function setupConversion() {
  const defaultState = {
    originAmount: 10,
    destinationAmount: 10,
    originCurrency: 'USD',
    destinationCurrency: 'USD',
    conversionRate: 1,
    feeAmount: 0,
    totalCost: 0,
    username: 'David Harlow',
    mostRecentUsername: 'David Harlow',
    date: 11052018,
    mostRecentOriginAmount: 10,
    mostRecentOriginCurrency: 'USD',
    mostRecentDestinationAmount: 10,
    mostRecentDestinationCurrency: 'USD',
    errorMsg: null,
  }

  const props = defaultState

  const order Reducer = (state = defaultState, action) => {
    switch (action.type) {
      case (types.CHANGE_USERNAME):
        return {
          ...state,
          username: action.data.username
       }
      default:
        return state;
    }
  }

  const store = createStore(orderReducer);
 
  const enzymeWrapper = mount(<Provider store={store}><Conversion {...props}/></Provider>)
 
  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('FeesTable', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setupFeesTable()
 
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

  describe('Conversion', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setupConversion()
 
      // expect(enzymeWrapper.find('titlePT1').hasClass('mui-table')).toBe(true)
      expect(enzymeWrapper.find('.titlePT1').text()).toBe('Bank of Harlow')
      // expect(enzymeWrapper.find('.total-label').text()).toBe('Total Cost')
      // expect(enzymeWrapper.find('.fee').text()).toBe('0.00 USD')
       
    })
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

