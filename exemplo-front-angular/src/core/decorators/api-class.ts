// tslint:disable-next-line:ban-types
export function ApiClass<T extends new(...args: any[]) => {}>(constructor: T) {
    return class extends constructor {
        newProperty = 'new property';
        hello = 'override';
    };
}
