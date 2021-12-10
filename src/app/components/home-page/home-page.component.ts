import { Component, OnInit } from '@angular/core'
import { Meta } from '@angular/platform-browser'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    constructor(
        private metaTagService: Meta
    ) {}

    ngOnInit(): void {
        this.metaTagService.addTags([
            {
                name: 'description',
                content: 'My name is Gavin de Bruyn and I\'m a Software Developer and Cloud Enthusiast. ' +
                    'I\'m from Cape Town, South Africa and currently working at Runninghill Software Development ' +
                    'as a Junior Software Developer'
            }
        ])
    }
}
