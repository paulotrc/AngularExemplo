import {InMemoryDbService} from 'angular-in-memory-web-api';
import {TaskFakeDb} from '../helpers/fake-db/task';


export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {

            // Task
            'task-tasks'  : TaskFakeDb.tasks,
            'task-filters': TaskFakeDb.filters,
            'task-tags'   : TaskFakeDb.tags

        };
    }
}
