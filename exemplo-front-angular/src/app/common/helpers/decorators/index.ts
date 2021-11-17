import 'reflect-metadata';

// tslint:disable-next-line:ban-types

export function f() {
    console.log('f(): evaluated');
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        console.log('f(): called');
    };
}

export function g() {
    console.log('g(): evaluated');
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        console.log('g(): called');
    };
}

export function logMethod(target, key, descriptor) {

    // save a reference to the original method this way we keep the values currently in the
    // descriptor and don't overwrite what another decorator might have done to the descriptor.
    if (descriptor === undefined) {
        descriptor = Object.getOwnPropertyDescriptor(target, key);
    }
    const originalMethod = descriptor.value;

    // editing the descriptor/value parameter
    descriptor.value = function() {
        const args = [];
        for (let i = 0; i < arguments.length; i++) {
            args[i - 0] = arguments[i];
        }
        const a = args.map( (pa) => JSON.stringify(pa)).join();
        // note usage of originalMethod here
        const result = originalMethod.apply(this, args);
        const r = JSON.stringify(result);
        console.log('Call: ' + key + '(' + a + ') => ' + r);
        return result;
    };

    // return edited descriptor as opposed to overwriting the descriptor
    return descriptor;
}

export function logParameter(target: any, key: string, index: number) {
    const metadataKey = `__log_${key}_parameters`;
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(index);
    } else {
        target[metadataKey] = [index];
    }
}

export function logProperty(target: any, key: string) {

    // property value
    let _val = this[key];

    // property getter
    const getter = function() {
        console.log(`Get: ${key} => ${_val}`);
        return _val;
    };

    // property setter
    const setter = function(newVal) {
        console.log(`Set: ${key} => ${newVal}`);
        _val = newVal;
    };

    // Delete property.
    if (delete this[key]) {

        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}

export function logParamTypes(target: any, key: string) {
    const types = Reflect.getMetadata('design:paramtypes', target, key);
    const s = types.map(a => a.name).join();
    console.log(`${key} param types: ${s}`);
}





