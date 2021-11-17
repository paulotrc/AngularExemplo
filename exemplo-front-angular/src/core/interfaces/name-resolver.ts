export interface NameResolver {
    getFullClassNameFromInstance(instance: any, global: any): string;
}
