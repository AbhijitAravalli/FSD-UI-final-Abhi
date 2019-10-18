import { createStore, applyMiddleware , compose} from 'redux'
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import reducers from '../reducers/index'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootSaga from '../sagas/rootSaga';
const persistConfig = {
  key: 'root',
  storage: storage
}
const middlewares = [thunk]

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`)

  middlewares.push(logger)
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  
    let enhancer;
  
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  
     enhancer = window.__REDUX_DEVTOOLS_EXTENSION__(applyMiddleware(sagaMiddleware, logger));
  
    } else {
  
      enhancer = compose(applyMiddleware(sagaMiddleware, logger));
  
    }
  let store = createStore(persistedReducer, enhancer)
  let persistor = persistStore(store)
  sagaMiddleware.run(rootSaga);
  return { store, persistor }
}