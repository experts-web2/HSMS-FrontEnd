import { createAction } from '@ngrx/store';

export const creat = createAction('[Counter Component] Increment');
export const read = createAction('[Counter Component] Decrement');
export const update = createAction('[Counter Component] Reset');
export const deleteS = createAction('[Counter Component] Delete');
