const defaultState = {
    isAuthenticated: false,
    user: {}
}

const currentUserReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_CURRENT_USER":
            return {
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            }
        case "UPDATE_USER_REFRESH":
            // state.user.projects=action.user.projects
            return {
                isAuthenticated: true,
                user: action.user
            }
        default:
            return state
    }
}
export default currentUserReducer;