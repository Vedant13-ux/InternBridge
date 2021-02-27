import { apiCallAuth } from '../../api/api'

export function setCurrentUser(user) {
    return {
        type: "SET_CURRENT_USER",
        user
    }
}

export function logout() {
    return async dispatch => {
        await dispatch(setCurrentUser({}));
        localStorage.clear();
        localStorage.setItem('isAuthenticated', false);
    }
}

export function authUser(emailToken) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCallAuth('get', '/api/auth/verify-email/' + emailToken, '')
                .then(({ token, ...user }) => {
                    localStorage.setItem("jwtToken", token);
                    localStorage.setItem('isAuthenticated', true);
                    dispatch(setCurrentUser(user));
                    resolve();
                })
                .catch(err => reject(err));
        });
    };
}
export function loginUser(user) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCallAuth('post', '/api/auth/signin', user)
                .then(async ({ token, ...user }) => {
                    localStorage.setItem("jwtToken", token);
                    localStorage.setItem('isAuthenticated', true);
                    console.log("Logeed iN and added token");
                    dispatch(setCurrentUser(user));
                    resolve();
                })
                .catch(err => reject(err));
        })
    }
}