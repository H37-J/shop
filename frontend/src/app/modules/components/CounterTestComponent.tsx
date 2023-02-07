import React, {useReducer} from 'react'

const initialState = 0

const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'


const reducer = (state: number, action: { type: any }) => {
    switch(action.type) {
        case INCREASE:
            return state + 1
        case DECREASE:
            return state - 1
        default:
            return state
    }
}

const CounterTestComponent = () => {
    const [number, dispatch] = useReducer(reducer, initialState)

    const onIncrease = () => {
        dispatch({ type: 'INCREASE' });
    };

    const onDecrease = () => {
        dispatch({ type: 'DECREASE' });
    };

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={() => onIncrease()}>+1</button>
            <button onClick={() => onDecrease()}>-1</button>
        </div>
    );
}

export {CounterTestComponent}