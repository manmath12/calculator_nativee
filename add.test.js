const { add } = require('./add');

test("adds correctly", () => {
    expect(add(2,3)).toBe(5);
});
