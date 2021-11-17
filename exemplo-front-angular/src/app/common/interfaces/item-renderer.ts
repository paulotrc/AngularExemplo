import {Type} from './type';

export interface ItemRenderer<H, R> {

    action: string;
    headerComponent: Type<H>;
    rowComponent: Type<R>;

}
