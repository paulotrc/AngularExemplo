import { Injectable } from '@angular/core';

import { CoreSidebarComponent } from './sidebar.component';

@Injectable({
    providedIn: 'root'
})
export class CoreSidebarService
{
    // Private
    private registryComponent: { [key: string]: CoreSidebarComponent } = {};

    /**
     * Constructor
     */
    constructor()
    {
        // console.log('CONSTRUTOR::: CoreSidebarService' );
    }

    /**
     * Add the sidebar to the registry
     *
     * @param key
     * @param sidebar
     */
    register(key, sidebar): void
    {


        // Check if the key already being used
        if ( this.registryComponent[key] )
        {
            console.error(`Já foi registrado um componente SideBar com a chave '${key}'. Você pode usar outra chave.`);

            return;
        }

        // Add to the registry
        this.registryComponent[key] = sidebar;
        window['registryComponent'] = this.registryComponent;

    }

    /**
     * Remove the sidebar from the registry
     *
     * @param key
     */
    unregister(key): void
    {

      // Check if the sidebar exists
        if ( !this.registryComponent[key] )
        {
            console.warn(`Não existe um componente com a chave '${key}'.`);
        }

        // Unregister the sidebar
        delete this.registryComponent[key];
        window['registryComponent'] = this.registryComponent;
    }

    /**
     * Return the sidebar with the given key
     *
     * @param key
     * @returns {CoreSidebarComponent}
     */
    getSidebar(key): CoreSidebarComponent
    {
      // Check if the sidebar exists
        if ( !this.registryComponent[key] )
        {
            console.warn(`Não existe um componenet SideBar com a chave '${key}'.`);

            return;
        }

        // Return the sidebar
        return this.registryComponent[key];
    }
}
