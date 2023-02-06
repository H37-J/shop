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



const Test = () => {
    const { user, setUser } = useTestData()
    const didRequest = useRef(false)


    useEffect(() => {
        axios.get('http://localhost:3001/')
        .then((res) => console.log(res.data))

        axios.post('http://localhost:3001/post', {
            email: 'test'
        })
        .then((res) => console.log('twerwerw'))


    })

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