import { Repository } from './repository.model'

export class Project {
    id: number
    name: string
    description: string
    repositories: Repository[]
    createdAt: number
    updatedAt: number

    public static fromJson(jsonObj: Record<string, unknown>): Project {
        const project = new Project()
        project.id = jsonObj.id as number
        project.name = jsonObj.name as string
        project.description = jsonObj.description as string
        project.createdAt = jsonObj.createdAt as number
        project.updatedAt = jsonObj.updatedAt as number
        // eslint-disable-next-line no-extra-parens
        project.repositories = (jsonObj.repositories as Record<string, unknown>[]).map(
            repositoryJson => Repository.fromJson(repositoryJson)
        )

        return project
    }
}