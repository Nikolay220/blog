import { combineReducers } from 'redux'

import curPage from './curPage'
import articles from './articles'
import error from './error'
// import updateFilterBtn from './updateFilterBtn'
// import updateStopsCheckboxes from './updateStopsCheckboxes'
// import updateTicketsList from './updateTicketsList'
// import updateError from './updateError'
const app = combineReducers({
  curPage,
  articles,
  error,
})
// export default function app(state = {}, action) {
//   return {
//     curPage: updateCurPage
//     totalPages:
//     sortFilter: updateFilterBtn(state.sortFilter, action),
//     stopsCheckboxesNames: updateStopsCheckboxes(state.stopsCheckboxesNames, action),
//     ticketsList: updateTicketsList(state.ticketsList, action),
//     error: updateError(state.error, action),
//   }
// }
export default app
