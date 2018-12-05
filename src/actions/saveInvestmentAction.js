export const saveInvestmentAction = (payload) => dispatch => {
 dispatch({
  type: 'SAVE_INVESTMENT',
  payload: payload
 })
}