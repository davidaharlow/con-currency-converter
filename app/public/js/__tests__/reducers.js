import order from '../reducers/order'
import { ActionTypes as types } from '../helpers/constants';

describe('reducers', () => {

  describe('order reducer', () => {
    it('should return the initial state', () => {
      expect(order(undefined, {})).toEqual(
        {
          username: '',
          date: '',
          mostRecentUsername: '',
          mostRecentOriginAmount: 0,
          mostRecentOriginCurrency: 'USD',
          mostRecentDestinationAmount: 0,
          mostRecentDestinationCurrency: 'USD'
        }
      )
    })
   
  //   it('should handle ADD_TODO', () => {
  //     expect(
  //       reducer([], {
  //         type: types.ADD_TODO,
  //         text: 'Run the tests'
  //       })
  //     ).toEqual([
  //       {
  //         text: 'Run the tests',
  //         completed: false,
  //         id: 0
  //       }
  //     ])
  //  
  //     expect(
  //       reducer(
  //         [
  //           {
  //             text: 'Use Redux',
  //             completed: false,
  //             id: 0
  //           }
  //         ],
  //         {
  //           type: types.ADD_TODO,
  //           text: 'Run the tests'
  //         }
  //       )
  //     ).toEqual([
  //       {
  //         text: 'Run the tests',
  //         completed: false,
  //         id: 1
  //       },
  //       {
  //         text: 'Use Redux',
  //         completed: false,
  //         id: 0
  //       }
  //     ])
  //   })
  })

})