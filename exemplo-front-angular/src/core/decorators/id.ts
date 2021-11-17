export function Id() {

    return ( target, key) => {
        // property value
        let val = target[key];

        // property getter
        const getter = () => {
                return val;
        };

        // property setter
        const setter = (newVal) => {
            val = newVal;
            target.id = newVal;
            target[key] = newVal;
            // console.log('Setting ID::: ', this, target, target.id);
        };

        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            configurable: true,
            enumerable: true,
            get: getter,
            set: setter
        });
    };
}
