const initialUserState = {
    result:[]
}

export default (state = initialUserState, action) => {
 switch (action.type) {
  case 'SAVE_INVESTMENT':
   return {
    ...state,
    result: [...state.result, action.payload]
   }
  default:
   return state
 }
}