import {combineReducers} from 'redux'
import * as actionTypes from '../actions/action'
const initialState = {
    postList : []
}

const  rootReducer = (state=initialState,action) =>{
   switch(action.type){
       case actionTypes.ADD_DATA:{
        return {
            postList:action.payload
        }
       }
       default:
        return state;
   }
}
export default combineReducers({
    rootReducer
})