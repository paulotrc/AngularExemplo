export function timeout( milliseconds: number = 0 ) {
    return ( target, key, descriptor ) => {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args) {
            setTimeout(() => {
                originalMethod.apply(this, args);
            }, milliseconds);
        };
        return descriptor;
    };
}
