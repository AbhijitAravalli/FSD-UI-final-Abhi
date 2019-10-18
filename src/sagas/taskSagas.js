import { call, put, takeEvery } from 'redux-saga/effects';

import { getData, getDataApi, postDataApi, ENVIRONMENT, putDataApi } from '../api/apiCall';

import { getTasksSuccessAction, getTasksErrorAction,
  postTasksSuccessAction, postTasksErrorAction,
  putTasksSuccessAction, putTasksErrorAction,
  getUsersSuccessAction, getUsersErrorAction,
  postUsersSuccessAction, postUsersErrorAction,
  getProjectsSuccessAction, getProjectsErrorAction,
  postProjectsSuccessAction, postProjectsErrorAction} from '../actions/taskAction';

import * as actionTypes from '../constants/actionTypes';


export function* getTasks() {
    debugger;
    
      try {
         const response = yield call(getDataApi, '/tasks');
    
          yield put(getTasksSuccessAction(response.data));
    
      } catch (error) {
    
        yield put(getTasksErrorAction(error));
    
      }
    
    }
    
     
    
    export function* watchGetTasks() {
    
      yield takeEvery(actionTypes.GET_TASK, getTasks);
    
    }

    export function* postTasks(action) {
      debugger;
      
        try {
           const response = yield call(postDataApi, '/task', action.params);
      
            yield put(postTasksSuccessAction(response.data));
      
        } catch (error) {
      
          yield put(postTasksErrorAction(error));
      
        }
      
      }
      
       
      
      export function* watchPostTasks() {
      
        yield takeEvery(actionTypes.POST_TASK, postTasks);
      
      }

      export function* putTasks(action) {
          try {
             const response = yield call(putDataApi, `/task/${action.params.taskId}`, action.params);
        
              yield put(putTasksSuccessAction(response.data));
        
          } catch (error) {
        
            yield put(putTasksErrorAction(error));
        
          }
        
        }
        export function* watchPutTasks() {
        
          yield takeEvery(actionTypes.PUT_TASK, putTasks);
        
        }

        export function* getUsers(action) {
          debugger;
            try {
               const response = yield call(getDataApi, `/users${action.params}`); 
               /* const response = yield call(getDataApi, `/users${action.params.name!==undefined&&action.params.name!==''?`?sort=${encodeURIComponent(action.params.name)}`:''}`+
               `${action.params.dir!==undefined&&action.params.dir!==''?`&sortDirection=${encodeURIComponent(action.params.dir)}`:''}`); */
                yield put(getUsersSuccessAction(response.data));
            } catch (error) {
              yield put(getUsersErrorAction(error));
            }
          }

           export function* watchGetUsers() {
            yield takeEvery(actionTypes.GET_USER, getUsers);
          }

          export function* postUsers(action) {
              try {
                 const response = yield call(postDataApi, '/user', action.params);
            yield put(postUsersSuccessAction(response.data));
            } catch (error) {
            yield put(postUsersErrorAction(error));
            }
            }
             export function* watchPostUsers() {
            yield takeEvery(actionTypes.POST_USER, postUsers);
            }

            export function* getProjects() {
              debugger;
                try {
                   const response = yield call(getDataApi, '/projects');
                    yield put(getProjectsSuccessAction(response.data));
                } catch (error) {
                  yield put(getProjectsErrorAction(error));
                }
              }
    
               export function* watchGetProjects() {
                yield takeEvery(actionTypes.GET_PROJECT, getProjects);
              }
    
              export function* postProjects(action) {
                  try {
                     const response = yield call(postDataApi, '/project', action.params);
                yield put(postProjectsSuccessAction(response.data));
                } catch (error) {
                yield put(postProjectsErrorAction(error));
                }
                }
                 export function* watchPostProjects() {
                yield takeEvery(actionTypes.POST_PROJECT, postProjects);
                }