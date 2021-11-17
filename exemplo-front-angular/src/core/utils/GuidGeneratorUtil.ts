import {GuidGenerator} from '../interfaces/guid-generator';
import {CoreUtils} from './CoreUtils';

export class GuidGeneratorUtil implements GuidGenerator {
    generate() {
        return CoreUtils.generateGUID();
    }
}
