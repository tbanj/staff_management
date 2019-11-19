import * as actionTypes from '../actions/index';
const initialState = {
    user: {},
    posts: [],
    userLogin: false,
}

const reducer = (state = initialState, action) => {
    // if (action.type === actionTypes.LOGIN_USER) {
    //     const newState = Object.assign({}, state);
    //     newState.user = action.resultEld

    //     return newState;
    // }
    // return state;

    switch (action.type) {
        case actionTypes.LOGIN_USER:
            const newState = Object.assign({}, state);
            newState.user = action.resultEld

            return newState;
        case actionTypes.GET_POSTS:
            return {
                ...state,
                posts: state.posts.concat(action.payload)
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                userLogin: false
            }
        default:
            return state;
    }
}

export default reducer; 