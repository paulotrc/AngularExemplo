import { Component, ContentChild, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as Prism from 'prismjs/prism';
import './prism-languages';

@Component({
    selector : 'core-highlight',
    template : '',
    styleUrls: ['./highlight.component.scss']
})
export class CoreHighlightComponent implements OnInit, OnDestroy
{
    // Source
    @ContentChild('source', {static: true})
    source: ElementRef;

    // Lang
    @Input('lang')
    lang: string;

    // Path
    @Input('path')
    path: string;

    // Private
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {HttpClient} httpClient
     */
    constructor(
        private _elementRef: ElementRef,
        private httpClient: HttpClient
    )
    {
        // Set the private defaults
        this.unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // If there is no language defined, return...
        if ( !this.lang )
        {
            return;
        }

        // If the pPath is defined...
        if ( this.path )
        {
            // Get the source
            this.httpClient.get(this.path, {responseType: 'text'})
                .pipe(takeUntil(this.unsubscribeAll))
                .subscribe((response) => {

                    // Highlight it
                    this.highlight(response);
                });
        }

        // If the pPath is not defined and the source element exists...
        if ( !this.path && this.source )
        {
            // Highlight it
            this.highlight(this.source.nativeElement.value);
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Highlight the given source code
     *
     * @param sourceCode
     */
    highlight(sourceCode): void
    {
        // Split the source into lines
        const sourceLines = sourceCode.split('\n');

        // Remove the first and the last line of the source
        // code if they are blank lines. This way, the html
        // can be formatted properly while using core-highlight
        // component
        if ( !sourceLines[0].trim() )
        {
            sourceLines.shift();
        }

        if ( !sourceLines[sourceLines.length - 1].trim() )
        {
            sourceLines.pop();
        }

        // Find the first non-whitespace char index in
        // the first line of the source code
        const indexOfFirstChar = sourceLines[0].search(/\S|$/);

        // Generate the trimmed source
        let source = '';

        // Iterate through all the lines
        sourceLines.forEach((line, index) => {

            // Trim the beginning white space depending on the index
            // and concat the source code
            source = source + line.substr(indexOfFirstChar, line.length);

            // If it's not the last line...
            if ( index !== sourceLines.length - 1 )
            {
                // Add a line break at the end
                source = source + '\n';
            }
        });

        // Generate the highlighted code
        const highlightedCode = Prism.highlight(source, Prism.languages[this.lang]);

        // Replace the innerHTML of the component with the highlighted code
        this._elementRef.nativeElement.innerHTML =
            '<pre><code class="highlight language-' + this.lang + '">' + highlightedCode + '</code></pre>';
    }
}

