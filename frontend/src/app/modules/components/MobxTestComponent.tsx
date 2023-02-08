import React from 'react'
import {makeAutoObservable } from 'mobx'

class Timer {
    second = 0

    constructor() {
        makeAutoObservable(this)
    }
}