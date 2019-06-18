import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from '../reducers'
import thunk from "redux-thunk"

// const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(rootReducer, devTools)

export default store
