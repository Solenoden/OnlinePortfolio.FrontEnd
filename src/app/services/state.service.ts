import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Project } from '../models/project.model'
import { Observable } from 'rxjs'
import { CacheService } from './cache.service'

@Injectable({ providedIn: 'root' })
export class StateService {
    constructor(
        private apiService: ApiService,
        private cacheService: CacheService
    ) {
    }

    public getProjects(): Observable<Project[]> {
        return new Observable<Project[]>(observer => {
            const projects = this.cacheService.getProjects()

            if (projects) {
                observer.next(projects)
                observer.complete()
                return
            }

            this.apiService.getProjects().subscribe(result => {
                this.cacheService.setProjects(result)

                observer.next(result)
                observer.complete()
            }, error => {
                observer.error(error)
            })
        })
    }
}