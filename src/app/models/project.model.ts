import { Repository } from './repository.model'
import { JsonObject, JsonProperty } from 'json2typescript'

@JsonObject('Project')
export class Project {
    @JsonProperty('id', Number)
    id: number

    @JsonProperty('name', String)
    name: string

    @JsonProperty('description', String)
    description: string

    @JsonProperty('repositories', [Repository])
    repositories: Repository[]

    @JsonProperty('createdAt', Number)
    createdAt: number

    @JsonProperty('updatedAt', Number)
    updatedAt: number
}