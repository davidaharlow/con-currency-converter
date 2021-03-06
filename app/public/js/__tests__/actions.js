// import 'cross-fetch/polyfill'
import * as actions from '../actions/actions'
import { ActionTypes as types } from '../helpers/constants';
 
describe('actions', () => {

	describe('action creators', () => {
	  it('should changeOriginAmount', () => {
	    const data = 100
	    const expectedAction = {
		    type:types.CHANGE_ORIGIN_AMOUNT,
		    data:{newAmount: 100}
	    }
	    expect(actions.changeOriginAmount(data)).toEqual(expectedAction)
	  })
  })

})

// import configureMockStore from 'redux-mock-store'
// import thunk from 'redux-thunk'
// import * as actions from '../../actions/TodoActions'
// import * as types from '../../constants/ActionTypes'
// import fetchMock from 'fetch-mock'
// import expect from 'expect' // You can use any testing library
//  
// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)
//  
// describe('async actions', () => {
//   afterEach(() => {
//     fetchMock.reset()
//     fetchMock.restore()
//   })
//  
//   it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
//     fetchMock
//       .getOnce('/todos', { body: { todos: ['do something'] }, headers: { 'content-type': 'application/json' } })
//  
//  
//     const expectedActions = [
//       { type: types.FETCH_TODOS_REQUEST },
//       { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something'] } }
//     ]
//     const store = mockStore({ todos: [] })
//  
//     return store.dispatch(actions.fetchTodos()).then(() => {
//       // return of async actions
//       expect(store.getActions()).toEqual(expectedActions)
//     })
//   })
// })