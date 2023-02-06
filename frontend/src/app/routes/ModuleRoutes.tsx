import React, { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ShopLoginPage } from '../shop/pages/auth/ShopLoginPage'
import { ShopLayout } from '../shop/template/ShopLayout'
import { useBestQueryRequest } from '../shop/helpers/query/request/QueryBestRequestProvider'
import axios from 'axios'
const ModuleRoutes = () => {
    return (
        <Routes>
            <Route>
                <Route
                    path="/test"
                    element={
                        <Test />
                    } />
                <Route
                    path="/test2"
                    element={
                        <TestTwo />
                    } />
            </Route>
        </Routes>
    )
}

type User = {
    email: string
    password: string
}

type Props = {
    children: React.ReactNode
}

type TestContextProps = {
    user: User | undefined
    setUser: Dispatch<SetStateAction<User | undefined>>
    logout: () => void
    str: string
}

const TestContextPropsState = {
    user: {
        email: 'these990712@gmail.com',
        password: 'star8903'
    },
    setUser: () => { },
    logout: () => { },
    str: 'test'
}

const TestContext = createContext<TestContextProps>(TestContextPropsState)

const useTestData = () => {
    return useContext(TestContext)
}

const TestProvider: FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(TestContextPropsState.user)
    const [str, setStr] = useState<string>('test')


    const logout = () => {
        setUser(undefined)
    }

    return (
        <TestContext.Provider value={{ user, setUser, logout, str }}>
            {children}
        </TestContext.Provider>
    )
}



type ArrayProps = {
    arr: Array<User>,
    setArr: Dispatch<SetStateAction<User[]>>
}

const ArrayPropsState = {
    arr: [
        {
            email: 'test',
            password: 'test2'
        }
    ],
    setArr: () => { }
}


const Test = () => {
    const { user, setUser } = useTestData()
    const [arr, setArr] = useState<User[]>(ArrayPropsState.arr)
    const e = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const value = (e.current as HTMLInputElement).value
        return () => { }
    }, [])

    const test = async () => {
        const { data: data } = await AxiosPost()
        setUser(data)
    }

    const AxiosPost = () => {
        return axios.post('http://localhost:3001/post', {
            email: 'test',
            password: 'test2'
        })
    }

    const addArray = () => {
        const data = {
            email: 'email',
            password: 'password'
        }
        setArr([...arr, data])
    
    }

    const arrayRender = () => {
        return arr.map((a, key) => {
    
            return (
            
                  <div key={key}>
                    <div>{a.email}</div>
                    <div>{a.password}</div>
                  </div>

            )
        })
    }

    return (
        <>
            <div>{user?.email}</div>
            <div>{user?.password}</div>

            {arrayRender()}


            <input type="text" ref={e} defaultValue="TestValue" />

            <div>
                <button type="button" onClick={() => addArray()}>버튼</button>
            </div>
        </>
    )
}

const TestTwo = () => {
    const { user, setUser } = useTestData()
    const didRequest = useRef(false)


    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then((res) => console.log(res))
    }, [])

    const changeUser = {
        email: 'test',
        password: 'test2'
    }

    return (
        <>
            <div>{user?.email}</div>
            <div>{user?.password}</div>

            <button type="button" onClick={() => setUser(changeUser)}>버튼</button>
        </>
    )
}

export { ModuleRoutes, TestProvider, useTestData }