import React, {useMemo, useRef, useState} from 'react';
import {current} from "immer";

const UserTestComponent = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'hjk',
            email: 'these9907@naver.com',
            active: true
        },

    ]);

    const userId = useRef(2)

    const UserRender = () => {
        return users.map((user, key: any) => {
            return (
                <div key={key}>
                    <span onClick={() => UserToggle(user.id)} style={{cursor:'pointer', color: user.active ? 'red' : 'black'}}>{user.username}</span>
                    <span style={{marginLeft: '10px'}}>{user.email}</span>
                    <button style={{marginLeft: '10px'}} type='button' onClick={() => UserDelete(user.id)}>삭제</button>
                </div>
            )
        })
    }

    const UserAdd = (e: any) => {
        const id = userId.current
        const username = (document.getElementById('username') as HTMLInputElement).value
        const email = (document.getElementById('email') as HTMLInputElement).value
        const active = false
        setUsers([...users, {id: userId.current, username, email, active}])

        userId.current += 1
    }

    const UserDelete = (id: number) => {
        setUsers(users.filter(user => user.id !== id))
    }

    const UserToggle = (id: number) => {
        setUsers(users.map(user =>
            user.id === id ? {...user, active: !user.active} : user
        ))
    }

    const countActiveUser = () => {
        console.log('활성된 사용자 숫자' + users.filter((user => user.active)).length)
        return users.filter(user => user.active).length
    }

    const count = useMemo(() => countActiveUser(), [users])

    return (
        <div>
            <input
                id='username'
                name="username"
                placeholder="계정명"
            />
            <input
                id='email'
                name="email"
                placeholder="이메일"
            />
            <button onClick={(e) => UserAdd(e)}>등록</button>

            {UserRender()}

            <div>
                {count}
            </div>
        </div>
    )
}

export {UserTestComponent};