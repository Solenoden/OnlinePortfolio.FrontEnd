import { StateService } from './state.service'
import { TestBed } from '@angular/core/testing'
import { HttpClientModule } from '@angular/common/http'
import { of } from 'rxjs'

describe('test StateService', () => {
    let stateService: StateService

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ]
        })

        stateService = TestBed.inject(StateService)
    })

    describe('test getProjects', () => {
        it('should make an api call to get projects', () => {
            const apiGetProjectsSpy = spyOn(stateService['apiService'], 'getProjects').and.returnValue(of([]))
            stateService.getProjects()

            void expect(apiGetProjectsSpy).toHaveBeenCalledTimes(1)
        })
    })
})