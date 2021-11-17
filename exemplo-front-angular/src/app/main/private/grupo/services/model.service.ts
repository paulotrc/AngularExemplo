import { Injectable } from '@angular/core';
import { Grupo } from '../models/Grupo';
import { BaseService } from '@services';
import { CoreUtils } from "../../../../../core/utils/CoreUtils";

@Injectable()
export class ModelService extends BaseService {
    listModels: Grupo[];
    model: Grupo;


    constructor() {
        super();
    }

    // Busca todos os grupos para carregar a combo
    getGrupos = (result) => {

        this.serviceName = 'grupos';
        this.page.size = 10;

        this.getAllFromPath('grupos')
            .subscribe((response: any) => {
                if (response) {
                    this.getResponseHeaders(); // Isso é pra pegar o paginator automaticamente
                    this.setCurrentComponentResult(result, response);
                    console.log('RESULT::: ', CoreUtils.mainComponent.modelService.currentComponent);
                }
            });
    }

    // Post grupo atraves da modal
    postGrupo = (model) => {

        this.serviceName = 'grupos';
        this.page.size = 10;

        this.save(model, 'grupos')
            .subscribe((response: any) => {
                if (response) {
                    //this.getResponseHeaders(); // Isso é pra pegar o paginator automaticamente
                    //this.setCurrentComponentResult(result, response);
                    console.log('RESULT::: ', CoreUtils.mainComponent.modelService.currentComponent);
                }
            });
    }
}
