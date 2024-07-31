export const ADD = 'ADD';
export const REMOVE ='REMOVE';
export const RENAME ='RENAME';
export const addMedia = (data) => ({
    type: ADD,
    payload: data
});

export const removeMedia = (index) => ({
    type: REMOVE,
    payload: index
});
export const renameMedia = (index,newSrc) => ({
    type: RENAME,
    payload:{index,newSrc}
});