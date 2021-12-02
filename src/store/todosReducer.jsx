import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "todos/fetchData",
  async (dispatch, getState) => {
    const response = await axios.get("http://localhost:3001/todos");
    console.log(response.data);
    return response.data;
  }
);

export const deleteData = createAsyncThunk(
  "todos/deleteData",
  async ({ id }) => {
    const response = await axios.delete(`http://localhost:3001/todos/${id}`);
    console.log(response);
    return id;
  }
);

export const addTodo = createAsyncThunk("todos/addTodo", async (data) => {
  const response = await axios.post(`http://localhost:3001/todos`, data);
  console.log(response);
  return data;
});

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todo: [],
    error: false,
    loading: true,
  },
  reducers: {
    toggleStatus: (state, action) => {
      console.log(action);
      const updatedArr = state.todo.map((item) => {
        if (item.id === action.payload) {
          return item.status === "complete"
            ? { ...item, status: "incomplete" }
            : { ...item, status: "complete" };
        } else {
          return { ...item };
        }
      });
      return { ...state, todo: updatedArr };
    },

    deleteAllCompleted: (state, action) => {
      const updatedArr = state.todo.filter((item) => item.status === "incomplete");
      return {...state, todo: updatedArr}
    },
  },

  extraReducers: {
    [fetchData.pending]: (state) => {
      return { ...state, error: false, loading: true };
    },
    [fetchData.rejected]: (state) => {
      return { ...state, error: true, loading: false };
    },
    [fetchData.fulfilled]: (state, { payload }) => {
      return { ...state, error: false, loading: false, todo: payload };
    },

    [deleteData.fulfilled]: (state, { payload }) => {
      console.log("hello");
      const { todo } = state;
      const updatedArr = todo.filter((item) => item.id !== payload);
      return { ...state, todo: updatedArr };
    },

    [addTodo.fulfilled]: (state, { payload }) => {
      return { ...state, todo: [...state.todo, payload] };
    },
  },
});

export const { toggleStatus, deleteAllCompleted } = todoSlice.actions;
export default todoSlice.reducer;
