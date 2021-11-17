export class Validator {
    private static notNullValidatorMap: Map<any, string[]> = new Map();

    // todo add more validator maps
    static registerNotNull(target: any, property: any): void {
        let keys: string[] = this.notNullValidatorMap.get(target);
        if (!keys) {
            keys = [];
            this.notNullValidatorMap.set(target, keys);
        }
        keys.push(property);
    }

    static validate(target: any): boolean {
        const notNullProps: string[] = this.notNullValidatorMap.get(Object.getPrototypeOf(target));
        if (!notNullProps) {
            return true;
        }
        let hasErrors = false;
        for (const property of notNullProps) {
            const value = target[property];
            if (!value) {
                console.error(property + ' value cannot be null');
                hasErrors = true;
            }
        }
        return hasErrors;
    }
}
