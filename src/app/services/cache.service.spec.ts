import { CacheService } from './cache.service'
import { TestBed } from '@angular/core/testing'
import { HttpClientModule } from '@angular/common/http'
import Spy = jasmine.Spy
import { Project } from '../models/project.model'

describe('test CacheService', () => {
    let cacheService: CacheService

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

        cacheService = TestBed.inject(CacheService)
    })

    describe('projects', () => {
        let sessionStorageGetItemSpy: Spy

        beforeEach(() => {
            sessionStorageGetItemSpy = spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(mockProjects))
        })

        describe('test getProjects', () => {
            it('should retrieve the projects from session storage', () => {
                cacheService.getProjects()

                void expect(sessionStorageGetItemSpy).toHaveBeenCalledTimes(1)
            })

            it('should return the project data from session storage as an array of the project model', () => {
                const projects = cacheService.getProjects()

                void expect(projects).toBeInstanceOf(Array)
                projects.forEach(project => {
                    void expect(project).toBeInstanceOf(Project)
                })
            })

            it('should return undefined if there is no cached data', () => {
                sessionStorageGetItemSpy.and.returnValue(null)
                const projects = cacheService.getProjects()

                void expect(projects).toEqual(undefined)
            })
        })

        describe('test setProjects', () => {
            it('should retrieve the projects from session storage', () => {
                const sessionStorageSetItemSpy = spyOn(sessionStorage, 'setItem')
                const mockProject = new Project()
                mockProject.name = 'Awesome project'
                mockProject.id = 1

                cacheService.setProjects([mockProject])

                void expect(sessionStorageSetItemSpy).toHaveBeenCalledTimes(1)
                void expect(sessionStorageSetItemSpy).toHaveBeenCalledWith(
                    jasmine.any(String),
                    JSON.stringify([mockProject])
                )
            })
        })

        describe('test removeProjects', () => {
            it('should remove the projects from session storage', () => {
                const sessionStorageRemoveItemSpy = spyOn(sessionStorage, 'removeItem')
                cacheService.removeProjects()

                void expect(sessionStorageRemoveItemSpy).toHaveBeenCalledTimes(1)
            })
        })
    })
})