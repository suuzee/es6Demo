console.log('======================');
(function () {
    let a = [1, 2, 3];
    let b = ({a, b}) => {
        document.write(a + b);
        console.log(a + b);
    }
    b({a: 3, b: 3});
})();

console.log('=====================');

// ...rest运算符
(function () {
    let c = (x, y, ...z) => {
        console.log(x)
        console.log(y)
        for (let p of z) {
            console.log(p);
        }
        console.log(z)
    }
    c(1, 2, 3, 4);
})();
console.log('=====================');
// 扩散
(function () {
    let d = (a, b, c) => {
        console.log(a);
        console.log(b);
        console.log(c);
    }
    d(...[4, 2, 3, 4]);
    let e = [1, 3, 5];
    console.log([1, ...e, 4]);
})();
console.log('=====================');
// 默认参数值
(function () {
    let a = (x = 1) => x;
    console.log(a(2));
    console.log(a());

    let b = ([x = 3, y = 4]) => {
        console.log(x);
        console.log(y);
    }
    b([1, 2])
    b([1])
    b([])
    b([undefined, 2])
    console.log('-------');
    let c = ({x = 3, y = 5}) => {
        console.log(x);
        console.log(y);
    }
    c({x: 4, y: 6});
    c({x: 4});
    c({y: 4});
    c({z: 4});
    c({});
})();
console.log('=====================');
