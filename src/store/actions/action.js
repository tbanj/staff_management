import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchPosts = () => async (dispatch) => {
    await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        .then(res => {
            dispatch({
                type: actionTypes.GET_POSTS,
                payload: res.data
            })
        }).catch(err => {
            // console.log(err);
        });
}


export const logout = () => {
    return { type: actionTypes.AUTH_INITIATE_LOGOUT }
}

export const checkAuthTimeout = (expirationTime) => {
    return { type: actionTypes.AUTH_CHECK_TIMEOUT, expirationTime: 2000 };
};


// export const inactivityTime = function () {
//     var time;
//     window.onload = resetTimer;
//     // DOM Events
//     document.onmousemove = resetTimer;
//     document.onkeypress = resetTimer;

//     // function logout() {
//     //     alert("You are now logged out.")
//     //     //location.href = 'logout.html'
//     // }

//     function resetTimer() {

//         clearTimeout(time);
//         time = checkAuthTimeout
//         // 1000 milliseconds = 1 second
//     }
// };


