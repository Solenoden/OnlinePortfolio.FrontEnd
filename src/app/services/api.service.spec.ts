import { ApiService } from './api.service'
import { TestBed } from '@angular/core/testing'
import { HttpClientModule } from '@angular/common/http'
import Spy = jasmine.Spy
import { of, throwError } from 'rxjs'
import { Project } from '../models/project.model'

describe('test ApiService', () => {
    let apiService: ApiService

    const mockProjects = [
        {
            'id': 13657452,
            'name': 'Online Portfolio',
            'description': '',
            'repositories': [
                {
                    'id': 416250442,
                    'name': 'OnlinePortfolio.BackEnd',
                    'description': null,
                    'url': 'https://github.com/Solenoden/OnlinePortfolio.BackEnd',
                    'forkCount': 0,
                    'starCount': 0,
                    'watcherCount': 0,
                    'openIssueCount': 0,
                    'tags': [
                        'project-13657452',
                        'skill-backend-development',
                        'skill-unit-testing',
                        'tech-jest',
                        'tech-node',
                        'tech-typescript'
                    ],
                    'createdAt': 1634027529,
                    'updatedAt': 1636219407,
                    'technologies': [
                        'Jest',
                        'Node',
                        'Typescript'
                    ],
                    'skills': [
                        'Backend Development',
                        'Unit Testing'
                    ],
                    'projectId': 13657452
                },
                {
                    'id': 416250056,
                    'name': 'OnlinePortfolio.FrontEnd',
                    'description': null,
                    'url': 'https://github.com/Solenoden/OnlinePortfolio.FrontEnd',
                    'forkCount': 0,
                    'starCount': 0,
                    'watcherCount': 0,
                    'openIssueCount': 0,
                    'tags': [
                        'cicd-github-actions',
                        'cloud-heroku',
                        'project-13657452',
                        'skill-frontend-development',
                        'skill-unit-testing',
                        'tech-angular',
                        'tech-jasmine',
                        'tech-typescript'
                    ],
                    'createdAt': 1634027460,
                    'updatedAt': 1635945800,
                    'technologies': [
                        'Angular',
                        'Jasmine',
                        'Typescript'
                    ],
                    'skills': [
                        'Frontend Development',
                        'Unit Testing'
                    ],
                    'cicd': 'Github Actions',
                    'cloudInfrastructure': 'Heroku',
                    'projectId': 13657452
                }
            ],
            'createdAt': 1635842381,
            'updatedAt': 1635842381
        }
    ]

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ]
        })

        apiService = TestBed.inject(ApiService)
    })

    describe('test getProjects', () => {
        let httpGetSpy: Spy

        beforeEach(() => {
            httpGetSpy = spyOn(apiService['httpService'], 'get').and.returnValue(of(mockProjects))
        })

        it('should make a service call to get projects', () => {
            apiService.getProjects().subscribe(() => {
                void expect(httpGetSpy).toHaveBeenCalledTimes(1)
            })
        })

        it('should map the service call result to the project model', () => {
            apiService.getProjects().subscribe(result => {
                void expect(result).toBeInstanceOf(Array)

                result.forEach(project => {
                    void expect(project).toBeInstanceOf(Project)
                })
            })
        })

        it('should return an error if the service call fails', () => {
            httpGetSpy.and.returnValue(throwError(new Error()))

            apiService.getProjects().subscribe(() => {
                fail('should have thrown an error')
            }, error => {
                void expect(error).toBeTruthy()
            })
        })
    })
})