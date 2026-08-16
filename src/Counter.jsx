import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment': return {count: state.count + 1};
        case 'decrement': return {count: state.count - 1};
        case 'reset': return {count: 0};
        default: throw new Error("Unknown action type");
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState)
    return(
        <>
        <button className="bg-blue-500 text-white px-4 py-2 rounded m-4" onClick={() => dispatch({type: 'increment'})}>+</button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded m-4" onClick={() => dispatch({type: 'reset'})}>Reset</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded m-4" onClick={() => dispatch({type: 'decrement'})}>-</button>
        <p className="text-xl font-bold">Count: {state.count}</p>
        </>
    )
}
export default Counter;