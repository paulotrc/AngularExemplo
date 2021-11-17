import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Resolve} from '@angular/router';
import {BaseService} from '@services';


@Injectable()
export class ModelBaseService extends BaseService implements Resolve<any> {

    /**
     * Constructor
     *
     * @param {HttpClient} httpClient
     * @param resolver
     */
    constructor(
        protected httpClient: HttpClient,
        protected resolver: ComponentFactoryResolver
    ) {
        super();
        // Set the defaults
    }

}
