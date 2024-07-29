export const ADD = 'ADD';
export const REMOVE ='REMOVE';

export const addMedia = (data) => ({
    type: ADD,
    payload: data
});

export const removeMedia = (index) => ({
    type: REMOVE,
    payload: index
});