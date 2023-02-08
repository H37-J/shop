import React from 'react'

const message: string = 'test'
const number: number = 1
const numbers: number[] = [1,2,3]
const messages: string[] = ['test', 'test2']

type Items<T> = {
    list: T[]
}

const items: Items<String> = {
    list: ['a', 'b', 'c']
}

class Queue<T> {
    list: T[] = [];

    get length() {
      return this.list.length;
    }

    enqueue(item: T) {
      this.list.push(item);
    }

    dequeue() {
      return this.list.shift();
    }
}

