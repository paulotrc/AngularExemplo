import {ProcessResult} from '../interfaces/proccess-result';
import {NameResolver} from '../interfaces/name-resolver';

export class NameResolverUtil implements NameResolver {
    private fn: any;
    private global: any;
    private processed: Array<any>;

    /**
     * To handle recursiveness in the object graph, collect all handled nodes in the object graph,
     * so an object is only traversed once.
     */
    isProcessed(obj: any): boolean {
        const result = false;
        for (let i, length; i < length; i += 1) {
            if (this.processed[i] === obj) {
                return true;
            }
        }
        return result;
    }

    processProperty(obj: any, key: string, path: Array<string>): ProcessResult {
        let result: ProcessResult = {
            fnFound: false,
            path
        };

        if (obj.hasOwnProperty(key)) {
            try {
                const prop = obj[key];
                if (prop === this.fn) {
                    // Function found, stop traversing the object graph.
                    result.fnFound = true;
                    return result;
                }

                // Continue traversing the object graph.
                result = this.processObject(prop, path);

                if (result.fnFound) {
                    // Function found, stop traversing the object graph.
                    return result;
                }
            } catch (error) {
                // Access to some properties result in exceptions.
                console.error('Erro ao recuperar o NameSpace', error );
            }
        }


        return result;
    }

    processObject(obj: any, path: Array<string>): ProcessResult {
        let processResult;
        const result: ProcessResult = {
            fnFound: false,
            path
        };

        if (this.isProcessed(obj)) {
            return result;
        }
        this.processed.push(obj);

        for (const key in obj) {
            const pathCopy = path.slice();
            pathCopy.push(key);
            //console.log('processProperty::: ', obj , key, pathCopy);
            processResult = this.processProperty(obj, key, pathCopy);
            if (processResult.fnFound) {
                return processResult;
            }
        }

        return processResult;
    }

    getFullClassNameFromInstance(instance: any, global: any): string {
        this.fn = instance.constructor;
        this.global = global;
        this.processed = [];

        const processResult = this.processObject(this.global, []);

        let fullFnName = '';
        if (processResult.fnFound) {
            fullFnName = processResult.path.join('.');
        }

        return fullFnName;
    }
}
