import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCEED, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCEED, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCEED, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET, USER_LIST_REQUEST, USER_LIST_SUCCEED, USER_LIST_FAIL, USER_DELETE_REQUEST, USER_DELETE_FAIL, USER_DELETE_SUCCEED, USER_DELETE_RESET, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET, USER_DETAILS_RESET, USER_TOP_LIST_REQUEST, USER_TOP_LIST_SUCCEED, USER_TOP_LIST_FAIL } from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        
        case USER_SIGNIN_SUCCEED:
            return { loading: false, userInfo: action.payload };
             
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };

        case USER_SIGNOUT:
            return {};

        default:
            return state;
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        
        case USER_REGISTER_SUCCEED:
            return { loading: false, userInfo: action.payload };
             
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}

export const userDetailsReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {loading: true};

        case USER_DETAILS_SUCCEED:
            return {loading: false, user: action.payload};

        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload};

        case USER_DETAILS_RESET:
            return { loading: true};

        default:
            return state;
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true};

        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading: false, success: true};

        case USER_UPDATE_PROFILE_FAIL:
            return {loading: false, error: action.payload};

        case USER_UPDATE_PROFILE_RESET:
            return {};

        default:
            return state;
    }
}

export const userListReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {loading: true};
        
        case USER_LIST_SUCCEED:
            return {loading: false, users: action.payload};

        case USER_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {loading: true};
        
        case USER_DELETE_SUCCEED:
            return {loading: false, success: true};

        case USER_DELETE_FAIL:
            return {loading: false, error: action.payload}

        case USER_DELETE_RESET:
            return {};

        default:
            return state;
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {loading: true};

        case USER_UPDATE_SUCCESS:
            return {loading: false, success: true};

        case USER_UPDATE_FAIL:
            return {loading: false, error: action.payload};

        case USER_UPDATE_RESET:
            return {};

        default:
            return state;
    }
}

export const userTopSellersListReducer = (state = {loading: true}, action) => {
    switch (action.type) {
        case USER_TOP_LIST_REQUEST:
            return {loading: true};
        
        case USER_TOP_LIST_SUCCEED:
            return {loading: false, users: action.payload};

        case USER_TOP_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}