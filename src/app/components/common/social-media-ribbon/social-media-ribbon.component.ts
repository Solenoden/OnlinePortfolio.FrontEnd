import { Component } from '@angular/core'
import { environment } from '../../../../environments/environment'

@Component({
    selector: 'app-social-media-ribbon',
    templateUrl: './social-media-ribbon.component.html',
    styleUrls: ['./social-media-ribbon.component.scss']
})
export class SocialMediaRibbonComponent {
    public readonly emailAddress = environment.emailAddress as string
    public readonly githubProfileLink = environment.githubProfileLink as string
    public readonly linkedInProfileLink = environment.linkedInProfileLink as string
}
