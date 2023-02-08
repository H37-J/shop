import React, {useEffect, useReducer, useState} from 'react'
import axios from "axios";

type User = {
    id: number
    name: string
}

type StateType = {
    loading: boolean,
    data: Array<User> | unknown,
    error: any
}

// type ActionType = {
//     type: string
//     data: any
//     error: any
// }

export type ActionType =
    | { type: 'LOADING';}
    | { type: 'SUCCESS'; data: Array<User> | unknown }
    | { type: 'ERROR';  error: unknown};


const initialState: StateType = {
    loading: false,
    data: [],
    error: null
}


const reducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            };
    }
}

const AxiosTestComponent = () => {
    const [users, setUsers] = useState<Array<User>>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<unknown>(null)

    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchUsers = async () => {
        dispatch({ type: 'LOADING' });
        try {
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
            dispatch({ type: 'SUCCESS', data: response.data });
        } catch (e) {
            dispatch({ type: 'ERROR', error: e });
        }
    };

    // const { loading, data: users, error } = state;

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            setLoading(true)

            const response = await axios.get('https://jsonplaceholder.typicode.com/users');

            setUsers(response.data)
        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }

    const render = () => {
        return users.map((user, key) => {
            return (<div key={key}>
                {user.id}
                {user.name}
            </div>)
        })
    }

    return (<>
            {loading && <span>로딩중..</span> }
            {error && <span>error</span>}
            {render()}

            <button onClick={() => fetchUser()}>다시 불러오기</button>
        </>)

}

export {AxiosTestComponent}