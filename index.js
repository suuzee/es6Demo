let a = [1, 2, 3];
let b = function ({a, b}) {
    document.write(a + b);
    // console.log(a + b);
}
b({a: 3, b: 3});