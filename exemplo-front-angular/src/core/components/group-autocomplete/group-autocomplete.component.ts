import {Component, Input, OnInit} from '@angular/core';
import {locale as english} from '../../../app/main/teste/i18n/en';
import {locale as turkish} from '../../../app/main/teste/i18n/tr';
import {locale as portuguese} from '../../../app/main/teste/i18n/pt-br';
import {CoreTranslationLoaderService} from '../../services/translation-loader.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CoreUtils} from '../../utils/CoreUtils';
import {ListGroup} from '../../../app/common/helpers/interfaces/ListGroup';

@Component({
  selector: 'core-group-autocomplete',
  templateUrl: './group-autocomplete.component.html',
  styleUrls: ['./group-autocomplete.component.scss']
})
export class GroupAutocompleteComponent implements OnInit {

  listForm: FormGroup = this.formBuilder.group({
    listGroup: '',
  });



  listGroupOptions: Observable<ListGroup[]>;

  @Input() placeholder: string;
  @Input() dataProvider: any[] = [];
  @Input() optionSelectedFunc: (...args: any[]) => void; //new EventEmitter<MatAutocompleteSelectedEvent>();


  constructor(private translationLoaderService: CoreTranslationLoaderService, private formBuilder: FormBuilder) {
              this.translationLoaderService.loadTranslations(english, turkish, portuguese);
  }

  ngOnInit() {
    this.listGroupOptions = this.listForm.get('listGroup')!.valueChanges
        .pipe(
            startWith(''),
            map(value => this.filterGroup(value))
        );
  }

  private filterGroup(value: string): ListGroup[] {
    return CoreUtils.filterGroupByPrefix(value, this.dataProvider );
  }

}
