import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ProjectsPageComponent } from './projects-page.component'
import { Project } from '../../models/project.model'
import { HttpClientModule } from '@angular/common/http'
import Spy = jasmine.Spy
import { of, throwError } from 'rxjs'
import { StateService } from '../../services/state.service'
import { NgxPaginationModule } from 'ngx-pagination'

describe('ProjectsPageComponent', () => {
    let component: ProjectsPageComponent
    let fixture: ComponentFixture<ProjectsPageComponent>

    let stateGetProjectsSpy: Spy

    const mockProject1 = new Project()
    mockProject1.name = 'Awesome project'
    mockProject1.id = 1
    const mockProject2 = new Project()
    mockProject2.name = 'Test testy'
    mockProject2.id = 2
    const mockProject3 = new Project()
    mockProject3.name = 'Testy test'
    mockProject3.id = 3
    const mockProjects = [mockProject1, mockProject2, mockProject3]

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                NgxPaginationModule
            ],
            declarations: [
                ProjectsPageComponent
            ],
        }).compileComponents()
    })

    beforeEach(() => {
        stateGetProjectsSpy = spyOn(TestBed.inject(StateService), 'getProjects').and.returnValue(of(mockProjects))

        fixture = TestBed.createComponent(ProjectsPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()

        stateGetProjectsSpy.calls.reset()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    describe('test ngOnInit', () => {
        it('should get projects', () => {
            const getProjectsSpy = spyOn(component as any, 'getProjects')
            component.ngOnInit()

            void expect(getProjectsSpy).toHaveBeenCalledTimes(1)
        })
    })

    describe('test getProjects', () => {
        it('should make a call to state to retrieve projects', () => {
            component['getProjects']()

            void expect(stateGetProjectsSpy).toHaveBeenCalledTimes(1)
        })

        it('should populate the project arrays', () => {
            component.projectsToDisplay = undefined
            component.allProjects = undefined
            component['getProjects']()

            void expect(component.projectsToDisplay).toEqual(mockProjects)
            void expect(component.allProjects).toEqual(mockProjects)
        })

        it('should set the couldNotRetrieveProjects field if the state call fails', () => {
            stateGetProjectsSpy.and.returnValue(throwError(''))
            component.couldNotRetrieveProjects = undefined
            component['getProjects']()

            void expect(component.couldNotRetrieveProjects).toBeTrue()
        })
    })

    describe('searchProjects', () => {
        it('should filter the projects by name', () => {
            component.projectSearchText = 'Awe'
            component.searchProjects()
            void expect(component.projectsToDisplay).toEqual([mockProject1])

            component.projectSearchText = 'Test'
            component.searchProjects()
            void expect(component.projectsToDisplay).toEqual([mockProject2, mockProject3])
        })

        it('should reset the displayed projects to all projects if the search text is empty', () => {
            component.projectSearchText = ''
            component.searchProjects()

            void expect(component.projectsToDisplay).toEqual(mockProjects)
        })
    })
})
