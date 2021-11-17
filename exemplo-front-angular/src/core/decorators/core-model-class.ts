// tslint:disable-next-line:ban-types
export function CoreModel() {
    return (target) => {
        target.id = null;
        target.constructor.prototype.id = null;
    };
}
