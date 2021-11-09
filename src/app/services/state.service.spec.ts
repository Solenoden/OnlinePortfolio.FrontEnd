import { StateService } from './state.service'
import { TestBed } from '@angular/core/testing'
import { HttpClientModule } from '@angular/common/http'
import Spy = jasmine.Spy
import { Project } from '../models/project.model'
import { of, throwError } from 'rxjs'

describe('test StateService', () => {
    let stateService: StateService

    const mockProject = new Project()
    mockProject.id = 1
    mockProject.name = 'Awesome project'

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ]
        })

        stateService = TestBed.inject(StateService)
    })

    describe('test getProjects', () => {
        let cacheGetProjectsSpy: Spy
        let apiGetProjectsSpy: Spy

        beforeEach(() => {
            cacheGetProjectsSpy = spyOn(stateService['cacheService'], 'getProjects').and.returnValue([mockProject])
            apiGetProjectsSpy = spyOn(stateService['apiService'], 'getProjects').and.returnValue(of([mockProject]))
        })

        it('should retrieve projects from the cache', () => {
            stateService.getProjects().subscribe(() => {
                void expect(cacheGetProjectsSpy).toHaveBeenCalledTimes(1)
            })
        })

        it('should return cached projects if there are any', () => {
            stateService.getProjects().subscribe(result => {
                void expect(result).toEqual([mockProject])
            })
        })

        it('should not make an api call if there are cached projects', () => {
            stateService.getProjects().subscribe(() => {
                void expect(apiGetProjectsSpy).toHaveBeenCalledTimes(0)
            })
        })

        it('should make an api call if there are no cached projects', () => {
            cacheGetProjectsSpy.and.returnValue(null)

            stateService.getProjects().subscribe(() => {
                void expect(apiGetProjectsSpy).toHaveBeenCalledTimes(1)
            })
        })

        it('should set the projects in the cache if there originally were not any', () => {
            const cacheSetProjectsSpy = spyOn(stateService['cacheService'], 'setProjects')
            cacheGetProjectsSpy.and.returnValue(null)

            stateService.getProjects().subscribe(() => {
                void expect(cacheSetProjectsSpy).toHaveBeenCalledTimes(1)
                void expect(cacheSetProjectsSpy).toHaveBeenCalledWith([mockProject])
            })
        })

        it('should return an error if the api call fails', () => {
            cacheGetProjectsSpy.and.returnValue(null)
            apiGetProjectsSpy.and.returnValue(throwError(new Error()))

            stateService.getProjects().subscribe(() => {
                fail('should return an error')
            }, error => {
                void expect(error).toBeTruthy()
            })
        })
    })
})