const avg = (arr) => {
    return arr.reduce((acc, value) => acc += value, 0) / arr.length
}

avg([1, 2, 3, 4])