import React, {useRef, useState} from 'react';

const UserTestComponent = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com',
            active: false
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com',
            active: false
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com',
            active: false
        }
    ]);

    const userId = useRef(4)

    const UserRender = () => {
        return users.map((user, key: any) => {
            console.log(key)
            return (
                <div key={key}>
                    <span style={{cursor:'pointer', color: user.active ? 'red' : 'black'}}>{user.username}</span>
                    <span>{user.email}</span>
                </div>
            )
        })
    }

    const UserAdd = (e: any) => {
        const username = (document.getElementById('username') as HTMLInputElement).value
        const email = (document.getElementById('email') as HTMLInputElement).value
        setUsers([...users, {id: userId.current, username, email, active: false}])


    }

    const UserActive = () => {

    }



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
        </div>
    )
}

export {UserTestComponent};