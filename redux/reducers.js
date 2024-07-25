import { ADD, REMOVE } from "./actions";
const initialState = {
    images : [],
    number:0,
}
const reducer = (state = initialState ,action) => {
    switch(action.type){
        case ADD:
            return{
                ...state,
                images: [...state.images,action.payload],
                number: state.number+1,
            };
        case REMOVE:
            return{
                ...state,
                images: state.images.filter((item,index)=>index!==action.payload)
            };
        default: return state;
    }
}
export default reducer;