import { ADD, REMOVE } from "./actions";
const initialState = {
    media : [],
    number:0,
}
const reducer = (state = initialState ,action) => {
    switch(action.type){
        case ADD:
            return{
                ...state,
                media: [action.payload,...state.media],
                number: state.number+1,
            };
        case REMOVE:
            return{
                ...state,
                media: state.media.filter((item,index)=>index!==action.payload)
            };
        default: return state;
    }
}
export default reducer;