import { configureStore } from "@reduxjs/toolkit";
import todosReducer from './todosReducer';

export default configureStore({
  reducer: { todos: todosReducer },
});
