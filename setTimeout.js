let asyncTest = () =>{
    console.log('first');

    setTimeout(() => console.log('second'), 2000);
    console.log('last');
}

asyncTest();