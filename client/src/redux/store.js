import {combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import themeSlice from './themeSlice';

import {persistReducer , persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";




const rootReducer= combineReducers({
    user: userSlice,
    theme  : themeSlice,
  
   
     
})

const persistConfig= {

    key :'root',
    storage,
    version :1 ,

}


const persistedReducer = persistReducer(persistConfig , rootReducer)

 export const store = configureStore({

       reducer:persistedReducer
}) 

export const persistor = persistStore(store);


