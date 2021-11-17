/* tslint:disable:variable-name */
import {Uri} from './uri';

export class BaseUri implements Uri {

    // static URI = 0;
    // @todo refatorar essas constants com a numeração correta
    static PROTOCOL = 0;
    static HOST = 2;
    static PORT = 3;
    static CONTEXT = 4;
    static VERSION = 6;
    static PATH = 5;
    static RESOURCE = 6;
    static RELATION = 7;
    static RESOURCE_VALUE = 8;
    static RELATION_VALUE = 9;
    static PARAMS = 10; // query params
    static HASHTAG = 11;


    private _uri: string;
    private _protocol: string;
    private _host: string;
    private _port: string;
    private _context: string;
    private _path: string;
    private _pathValue: string;
    private _version: string;
    private _resource: string;
    private _relation: string;
    private _resourceValue: string;
    private _relationValue: string;
    private _params: string;
    private _hashtag: string;


    constructor(model) {
        this._uri = model.uri;
        this._protocol = model.protocol;
        this._host = model.host;
        this._port = model.port;
        this._context = model.context;
        this._path = model.path;
        this._pathValue = model.pathValue;
        this._version = model.version;
        this._resource = model.resource;
        this._relation = model.relation;
        this._resourceValue = model.resourceValue;
        this._relationValue = model.relationValue;
        this._params = model.params;
        this._hashtag = model.hashtag;
    }


    get uri(): string {
        return this._uri;
    }

    get protocol(): string {
        return this._protocol;
    }

    get host(): string {
        return this._host;
    }

    get port(): string {
        return this._port;
    }

    get context(): string {
        return this._context;
    }

    get path(): string {
        return this._path;
    }

    get version(): string {
        return this._version;
    }

    get resource(): string {
        return this._resource;
    }

    get relation(): string {
        return this._relation;
    }

    get params(): string {
        return this._params;
    }

    get hashtag(): string {
        return this._hashtag;
    }

    get resourceValue(): string {
        return this._resourceValue;
    }

    set resourceValue(value: string) {
        this._resourceValue = value;
    }

    get relationValue(): string {
        return this._relationValue;
    }

    get pathValue(): string {
        return this._pathValue;
    }

    set pathValue(value: string) {
        this._pathValue = value;
    }

    set relationValue(value: string) {
        this._relationValue = value;
    }

    set uri(value: string) {
        this._uri = value;
    }

    set protocol(value: string) {
        this._protocol = value;
    }

    set host(value: string) {
        this._host = value;
    }

    set port(value: string) {
        this._port = value;
    }

    set context(value: string) {
        this._context = value;
    }

    set path(value: string) {
        this._path = value;
    }

    set version(value: string) {
        this._version = value;
    }

    set resource(value: string) {
        this._resource = value;
    }

    set relation(value: string) {
        this._relation = value;
    }

    set params(value: string) {
        this._params = value;
    }

    set hashtag(value: string) {
        this._hashtag = value;
    }

}
