import { Injectable } from '@angular/core';
import { SituacaoEspecial } from '../models/SituacaoEspecial';
import { BaseService } from '@services';
import { ModelService as ServiceGrupo } from "../../grupo/services/model.service";
import { CoreUtils } from "../../../../../core/utils/CoreUtils";
import * as _ from 'lodash';

@Injectable()
export class ModelService extends BaseService {
    listModels: SituacaoEspecial[] = [];
    model: SituacaoEspecial;
    private impedimentosColumnsList: any[];

    constructor(serviceGrupo: ServiceGrupo) {
        super();

        this.page.size = 10;
        this.page.pageNumber = 0;

        CoreUtils.registerExternalService(
            {
                modelService: this,
                externalServices: [
                    { module: 'grupo', serviceGrupo }
                ]
            }
        );
    }

    public getColumnsImpedimentos = (result) => {

        this.serviceName = 'impedimentos';
        this.page.size = 10;

        this.getAllFromPath('impedimentos')
            .subscribe((response: any) => {
                if (response) {
                    this.impedimentosColumnsList = response;
                    this.getResponseHeaders(); // Isso � pra pegar o paginator automaticamente
                    let impedimentosResult: any[] = [];
                    let impedimentosTemp: any[] = [];
                    impedimentosResult.push({ prop: 'id', name: 'Código' });
                    impedimentosResult.push({ prop: 'descricao', name: 'Descrição' });
                    this.impedimentosColumnsList.forEach(item => {
                        impedimentosTemp.push({ prop: CoreUtils.toCamelCase(CoreUtils.removerAcentos(item.descricao)), name: CoreUtils.capitalizeWords(item.descricao, ' ') });
                    });
                    impedimentosTemp = _.orderBy(impedimentosTemp, ['name'], ['asc']);
                    impedimentosResult = _.concat(impedimentosResult, impedimentosTemp);
                    this.setCurrentComponentResult(result, impedimentosResult);
                    console.log('RESULT::: ', CoreUtils.mainComponent.modelService.currentComponent);
                }
            });
    };

    public getImpedimentos = (result) => {

        this.serviceName = 'impedimentos';
        this.page.size = 10;

        this.getAllFromPath('impedimentos')
            .subscribe((response: any) => {
                if (response) {
                    this.getResponseHeaders(); // Isso � pra pegar o paginator automaticamente
                    this.setCurrentComponentResult(result, response);
                    console.log('RESULT:::impedimentos ', CoreUtils.mainComponent.modelService.currentComponent);
                }
            });
    };

    public getListaPerfisInclusaoManual = (result) => {

        this.serviceName = 'permissoes-manuais';
        this.page.size = 10;

        this.getAllFromPath('perfis-inclusao-manual')
            .subscribe((response: any) => {
                if (response) {
                    this.getResponseHeaders();
                    let perfis: {}[] = [];
                    _.each(response, item => {
                        perfis.push({checked:false, id: item.id, descricao: item.descricao});
                    });
                    perfis = _.orderBy(perfis, ['id'], ['asc']);
                    this.setCurrentComponentResult(result, perfis);
                    console.log('RESULT:::listaPerfis ', response);
                    console.log('RESULT:::getListaPerfisInclusaoManual ', CoreUtils.mainComponent.modelService.currentComponent);
                }
            });
    };

    public adjustDataProvider(dataProvider: any[]): any[] {
        _.each(dataProvider, itemDataProvider => {
            const x: any = {};
            _.each(this.impedimentosColumnsList, itemImpedimentoColumn => {

                itemDataProvider[CoreUtils.toCamelCase(CoreUtils.removerAcentos(itemImpedimentoColumn['descricao']))] = 'Não';

                _.each(itemDataProvider.impedimentoList, itemImpedimento => {

                    if (itemImpedimento.id == itemImpedimentoColumn.id) {
                        itemDataProvider[CoreUtils.toCamelCase(CoreUtils.removerAcentos(itemImpedimentoColumn['descricao']))] = 'Sim';
                        return;
                    }
                });
            });
            delete itemDataProvider.impedimentoList;
            if (itemDataProvider.perfilInclusaoManualList === undefined) {
                itemDataProvider.perfilInclusaoManualList = [];
            }
        });
        return dataProvider;
    }

    public getSituacaoById = (obj) => {

        this.serviceName = 'situacoes-especiais';
        this.page.size = 5;

        this.getAllFromPath('situacoes-especiais/' + obj.idSituacao)
            .subscribe((response: any) => {
                if (response) {
                    this.getResponseHeaders();
                    CoreUtils.mainComponent.modelService.currentComponent[obj.result] = response;
                    return response;
                }
            });
    }

}
