import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Project } from '../models/project.model'
import { HttpService } from './http.service'

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(
        private httpService: HttpService
    ) {}

    public getProjects(): Observable<Project[]> {
        return new Observable<Project[]>(observer => {
            this.httpService.get('/api/v1/projects').subscribe(result => {
                const body = result as Record<string, unknown>[]
                const projects: Project[] = body.map(json => Project.fromJson(json))

                observer.next(projects)
            }, error => {
                observer.error(error)
            }, () => {
                observer.complete()
            })
        })
    }
}