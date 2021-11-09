import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Project } from '../models/project.model'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class StateService {
    constructor(
        private apiService: ApiService
    ) {
    }

    public getProjects(): Observable<Project[]> {
        // TODO: Implement logic to cache projects in session storage
        return this.apiService.getProjects()
    }
}