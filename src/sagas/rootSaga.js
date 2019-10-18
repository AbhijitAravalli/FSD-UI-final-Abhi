/*eslint-disable*/

import { all, fork } from 'redux-saga/effects';

import { watchGetTasks, watchPostTasks , watchPutTasks, watchGetUsers,
  watchPostUsers, watchGetProjects, watchPostProjects} from './taskSagas';

 

export default function* rootSaga() {

  yield all([

    fork(watchGetTasks),
    fork(watchPostTasks),
    fork(watchPutTasks),
    fork(watchGetUsers),
    fork(watchPostUsers),
    fork(watchGetProjects),
    fork(watchPostProjects)

  ]);

}