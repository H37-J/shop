import React from 'react'
import {RouteProps, useLocation, useMatch, useParams, useSearchParams} from "react-router-dom";
import qs from "qs";

type DataType = {
    name: string, description: string
}


const profileData = {
    test: {
        name: 'ewqeqw', description: 'Frontend Engineer @ Laftel Inc. 재밌는 것만 골라서 하는 개발자'
    },
}

type matchType = {
    match: any
}

const RouterTestComponent = () => {
    const locaiton = useLocation()

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    })
    const about = query.about as string

    console.log(about)

    const {username} = useParams()

    // @ts-ignore
    const profile = profileData[username]

    return (
        <>
            <span>{profile.name}</span>
            <span>{about}</span>
        </>)

}

export {RouterTestComponent}