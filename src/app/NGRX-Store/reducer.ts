import { createReducer, on } from '@ngrx/store';
import { creat, read, update, deleteS } from './action';

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(creat, (state) => state + 1),
  on(read, (state) => state - 1),
  on(update, (state) => 0),
  on(deleteS, (state) => 0)

);