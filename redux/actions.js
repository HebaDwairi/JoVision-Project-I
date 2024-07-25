export const ADD = 'ADD';
export const REMOVE ='REMOVE';

export const addImage = (imgData) => ({
    type: ADD,
    payload: imgData
});

export const removeImage = (index) => ({
    type: REMOVE,
    payload: index
});