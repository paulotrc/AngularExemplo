export function Log<T extends { new(...constructorArgs: any[]) }>(constructorFunction: T) {

    const newConstructorFunction: any = (...args) => {
        console.log('LOG:: before invoking: ' + constructorFunction.name);
        const func: any = () => {
            return new constructorFunction(...args);
        };
        func.prototype = constructorFunction.prototype;
        const result: any = new func();
        console.log('LOG:: after invoking: ' + constructorFunction.name);
        console.log('LOG:: object created: ' + JSON.stringify(result));
        return result;
    };
    newConstructorFunction.prototype = constructorFunction.prototype;
    // return newConstructorFunction;
}
