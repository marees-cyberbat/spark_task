import axios from 'axios';
import { GET_NOTE, ADD_NOTE, MODE, CHOSEN, DELETE_NOTE, GET_CATEGORY, ADD_CATEGORY, DELETE_CATEGORY, LIST_LOADING, USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOG_OUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, GET_ERRORS, CLEAR_ERRORS } from './types';


// check token and load user
export const fetchUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING });
    try{
        const res = await axios.get('https://sparknote.herokuapp.com/api/user', tokenConfig(getState));
        if(res)
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
    } catch(e){
        dispatch(returnErrors(e.response.data, e.response.status));
        dispatch({
            type: AUTH_ERROR
        })
    }
  };



  // delete todo
export const deleteNote = (request) => async(dispatch, getState) => {
    console.log(request)
    try{
        const res = await axios.post('https://sparknote.herokuapp.com/api/delete_note', request, tokenConfig(getState));
        if(res)
        dispatch(returnErrors('Successful', '200', 'DELETE_NOTE'));
    } catch(e){
        dispatch(returnErrors('Failed To delete', 500));
    }
}

export const modeAction = (mode) => dispatch => {
    dispatch({type: MODE, payload: mode})
}

  /// Return Errors
  
export const returnErrors = (msg, status, id = null) => {
    return{
        type: GET_ERRORS,
        payload: {msg, status, id}
    }
  };

    /// Clear Errors
  
export const clearErrors = () => {
    return{
        type: CLEAR_ERRORS
    }
  };

    // signin
    export const login = (request) => async (dispatch) => {
        console.log(request)
        try{
            const res = await axios.post('https://sparknote.herokuapp.com/api/login', request);
            console.log(res)
            if(res){
                dispatch(returnErrors('Login Successful', '200', LOGIN_SUCCESS));
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
            }
                
        } catch(e){
            dispatch(returnErrors('404 User Not Found', '404', LOGIN_FAIL));
            dispatch({
                type: LOGIN_FAIL
            })
        }
      };

  // signup

  export const register = (request) => async (dispatch) => {
    // headers
    const config = {
        header:{
            'Content-Type': 'application/json'
        }
    }

    try{
        const res = await axios.post('https://sparknote.herokuapp.com/api/new_user', request, config);
        if(res){
            dispatch(returnErrors('Registration Successful', '200', REGISTER_SUCCESS));
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        }
            
    } catch(e){
        dispatch(returnErrors(e.toString(), 500, REGISTER_FAIL));
        dispatch({
            type: REGISTER_FAIL
        })
    }
  };
// logout

export const logout = ()=>{
    return{
        type: LOGOG_OUT_SUCCESS
    }
}


// add todo
export const addNote = (request) => async(dispatch, getState) => {
    console.log(request)
    try{
        const res = await axios.post('https://sparknote.herokuapp.com/api/new_note', request, tokenConfig(getState));
        if(res)
            dispatch(returnErrors('Successful', '200', ADD_NOTE));
    } catch(e){
        dispatch(returnErrors(e.response.data, e.response.status));
    }
}

// add cat
export const addCat  = (request) => async (dispatch, getState) => {
    console.log(request);
    try{
        const res = await axios.post('https://sparknote.herokuapp.com/api/new_cat', request, tokenConfig(getState));
        if(res)
            dispatch(returnErrors('Successful', '200', ADD_CATEGORY));
    } catch(e){
        dispatch(returnErrors(e.response.data, e.response.status));
    }
}


// get cat
export const getCat  = (id) => async (dispatch) => {
    console.log(id)
    try{
        const res = await axios.get(`https://sparknote.herokuapp.com/api/get_cat/${id}`);
        if(res)
            dispatch({type: GET_CATEGORY, payload: res.data})
    } catch(e){
        dispatch(returnErrors(e.response.data, e.response.status));
    }
}

// get note
export const getNote  = (id) => async (dispatch) => {
    console.log(id)
    try{
        const res = await axios.get(`https://sparknote.herokuapp.com/api/get_note/${id}`);
        if(res)
            dispatch({type: GET_NOTE, payload: res.data})
    } catch(e){
        dispatch(returnErrors(e.toString(), 500));
    }
}


// delete cat
export const deleteCat  = (request) => async (dispatch, getState) => {
    console.log(request)
    try{
        const res = await axios.post('https://sparknote.herokuapp.com/api/delete_cat', request, tokenConfig(getState));
        if(res)
            dispatch((returnErrors('Successful', '200', DELETE_CATEGORY)))
    } catch(e){
        dispatch(returnErrors('Failed To Delete Category', '500'));
    }
}

  // chosen category
  export const chosen = cat => dispatch => {
    dispatch({type: CHOSEN, payload: cat})
  }


  // token config
 export const tokenConfig = getState => {
        // get token from local storage
    const token = getState().auth.token;
    // head
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // if token add to headers
    if(token)
        config.headers['x-auth-token'] = token;

    return config
 } 