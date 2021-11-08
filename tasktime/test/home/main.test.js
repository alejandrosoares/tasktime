import add from "../../home/static/home/js/main.js";

test('return of add function should be 2', () => {

    expect(add(10, 10)).toBe(20);
})