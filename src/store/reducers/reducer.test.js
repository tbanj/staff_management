import { LOGIN_USER, GET_POSTS, AUTH_LOGOUT } from '../actions/index';
import dataReducer from './reducer.js';
/*  Integration Test for Reducers
reducers can be test for 2 scenerios,
    reducers are functions so we test fpor reducer functions
it returns a default state if we dont receive any
state it means we are working with empty array of
the action type does not match 

 */

describe('Datas Render', () => {
    it('Should return default state', () => {
        const userReceived = { user: {}, posts: [], userLogin: false };
        const newState = dataReducer(undefined, {});
        expect(newState).toEqual(userReceived);
    });




    // LOGIN_CHECKER action type is not yet implemented
    test('should return new state if receiving type of GET_POSTS', () => {
        const postN = [{ title: 'Test 1' }, { title: 'Test 2' }, { title: 'Test 3' }];
        const expectedUser = { "user": {}, "posts": postN, "userLogin": false };
        const newStateSent = Object.assign({}, expectedUser);
        const newState = dataReducer(undefined, {
            type: GET_POSTS,
            payload: postN
        });
        expect(newState).toEqual(newStateSent);
    });


    test('should return new state if receiving type of LOGIN_USER', () => {
        const userN = { fullName: 'Test Full Name', password: 'Test Password', jobTitle: 'Test Job Title', email: 'Test Email' };
        const expectedUser = { "user": userN, "posts": [], "userLogin": false };
        const newStateSent = Object.assign({}, expectedUser);
        const newState = dataReducer(undefined, { type: LOGIN_USER, resultEld: userN });
        expect(newState).toEqual(newStateSent);
    });


    test('should return new state if receiving type of LOGIN_USER', () => {
        const userN = false;
        const expectedUser = { "user": {}, "posts": [], "userLogin": false };
        const newStateSent = Object.assign({}, expectedUser);
        const newState = dataReducer(undefined, { type: AUTH_LOGOUT, resultEld: userN });
        expect(newState).toEqual(newStateSent);
    });

});