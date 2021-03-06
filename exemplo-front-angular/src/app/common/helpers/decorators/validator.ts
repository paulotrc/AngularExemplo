import 'reflect-metadata';

const requiredMetadataKey = Symbol('required');

function required(
    // tslint:disable-next-line:ban-types
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
) {
    const existingRequiredParameters: number[] =
        Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(
        requiredMetadataKey,
        existingRequiredParameters,
        target,
        propertyKey
    );
}

function validate(
    target: any,
    propertyName: string,

    // tslint:disable-next-line:ban-types
    descriptor: TypedPropertyDescriptor<Function>
) {
    const method = descriptor.value;
    descriptor.value = function() {
        const requiredParameters: number[] = Reflect.getOwnMetadata(
            requiredMetadataKey,
            target,
            propertyName
        );
        if (requiredParameters) {
            for (const parameterIndex of requiredParameters) {
                if (
                    parameterIndex >= arguments.length ||
                    arguments[parameterIndex] === undefined
                ) {
                    throw new Error('Missing required argument' + parameterIndex);
                }
            }
        }

        return method.apply(this, arguments);
    };
}
