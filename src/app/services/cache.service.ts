import { Injectable } from '@angular/core'
import { Project } from '../models/project.model'
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript'

enum StorageKey {
    Projects = 'projects'
}

@Injectable({ providedIn: 'root' })
export class CacheService {
    public getProjects(): Project[] {
        const deserializer = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL)
        const json = sessionStorage.getItem(StorageKey.Projects)

        return deserializer.deserializeArray(JSON.parse(json), Project)
    }

    public setProjects(projects: Project[]): void {
        sessionStorage.setItem(StorageKey.Projects, JSON.stringify(projects))
    }

    public removeProjects(): void {
        sessionStorage.removeItem(StorageKey.Projects)
    }
}