import {DataSource} from '@angular/cdk/collections';
import {Observable, Subject} from 'rxjs';
import {BaseService} from '@services';

export class ModelsDataSource extends DataSource<any> {


    onModelListChanged: Subject<any>;

    onDataChanged( pOnModelsChanged ): ModelsDataSource {
        this.onModelListChanged = pOnModelsChanged;
        return this;
    }

    /**
     * Constructor
     *
     * @param {ModelsService} modelsService
     */
    constructor(
        private modelsService: BaseService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this.onModelListChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}
