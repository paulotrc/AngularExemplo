/**
 * Attach controllers to express application
 *
 * @param {Express} app Express application
 * @param {Type[]} controllers Controllers array
 */
import {ExpressClass, ExpressMeta, getMeta, ParameterConfiguration, ParameterType} from './meta';

import {Type} from './type';

import {Container} from './container';


export function attachControllers(app: any, controllers: Type[]) {
    controllers.forEach((controller: Type) => registerController(app, controller, getController));

    // error middleware must be registered as the very last one
    // ### app.use(errorMiddlewareHandler());
}


/**
 * Attach controller instances to express application
 *
 * @param {Express} app Express application
 * @param {any[]} controllers Controllers array
 */
export function attachControllerInstances(app: object, controllers: object[]) {
    controllers.forEach((controller: Type) => registerController(app, controller, (c: object) => c ));

    // error middleware must be registered as the very last one
    // ### app.use(errorMiddlewareHandler());
}

/**
 * Register controller via registering new Router
 *
 * @param {Application} app
 * @param {ExpressClass} Controller
 * @returns
 */
// tslint:disable-next-line:no-shadowed-variable
function registerController(app: any, Controller: Type|object, getController: (c: Type|object) => any) {
    const controller: any = getController(Controller);
    const meta: ExpressMeta = getMeta(controller);
    console.log('meta:::: ', meta);
    // const router: Router = Router();
    const routes: object = meta.routes;
    const url: string = meta.url;
    const params: object = meta.params;



    return app;
}

/**
 * Extract parameters for handlers
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @param {ParameterConfiguration[]} params
 *
 * @returns {any[]}
 */
function extractParameters(req: Request, res: Response, next: any, params: ParameterConfiguration[]): any[] {
    if (!params || !params.length) {
        return [ req, res, next ];
    }

    const args = [];

    for (const { name, index, type } of params) {

        switch (type) {
            case ParameterType.RESPONSE:
                args[index] = res;
                break;
            case ParameterType.REQUEST:
                args[index] = getParam(req, null, name);
                break;
            case ParameterType.NEXT:
                args[index] = next;
                break;
            case ParameterType.PARAMS:
                args[index] = getParam(req, 'params', name);
                break;
            case ParameterType.QUERY:
                args[index] = getParam(req, 'query', name);
                break;
            case ParameterType.BODY:
                args[index] = getParam(req, 'body', name);
                break;
            case ParameterType.HEADERS:
                args[index] = getParam(req, 'headers', name);
                break;
            case ParameterType.COOKIES:
                args[index] = getParam(req, 'cookies', name);
                break;
        }

    }

    return args;
}

/**
 * Get controller instance from container or instantiate one
 *
 * @param {any} Controller
 *
 * @returns {ExpressClass}
 */
function getController(Controller: Type): ExpressClass {
    try {
        return Container.get(Controller);
    } catch {
        return new Controller();
    }
}

/**
 * Get parameter value from the source object
 *
 * @param {*} source
 * @param {string} paramType
 * @param {string} name
 *
 * @returns {*}
 */
function getParam(source: any, paramType: string, name: string): any {
    const param = source[paramType] || source;

    return name ? param[name] : param;
}
