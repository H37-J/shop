function* test() {
    console.log('test')
    yield 1;

    console.log('test2')
    yield 2;
    
    console.log('test3')
    yield 3;
}

function* watchGenerator() {
    console.log('모니터링 시작!');
    while(true) {
        const action = yield;
        if (action.type === 'HELLO') {
            console.log('안녕하세요?');
        }
        if (action.type === 'BYE') {
            console.log('안녕히가세요.');
        }
    }
}

const generator = test()

generator.next()
generator.next()
generator.next()

const watch = watchGenerator()
watch.next({type: ''})
watch.next({type: 'HELLO'})
watch.next({type: 'BYE'})