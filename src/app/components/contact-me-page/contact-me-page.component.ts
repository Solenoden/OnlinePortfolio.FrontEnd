import { Component } from '@angular/core'
import { environment } from '../../../environments/environment'

@Component({
    selector: 'app-contact-me-page',
    templateUrl: './contact-me-page.component.html',
    styleUrls: ['./contact-me-page.component.scss']
})
export class ContactMePageComponent {
    public readonly emailAddress = environment.emailAddress as string
    public readonly githubProfileLink = environment.githubProfileLink as string
    public readonly githubUsername = environment.githubUsername as string
    public readonly linkedInProfileLink = environment.linkedInProfileLink as string
    public readonly linkedInUsername = environment.linkedInUsername as string
}
