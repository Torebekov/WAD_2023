/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function (init) {
    const counter = {
        current: init,
        increment() {
            this.current++
            return this.current
        },
        decrement() {
            this.current--
            return this.current
        },
        reset() {
            this.current = init
            return this.current
        }
    }
    return counter
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */