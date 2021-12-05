import { Component } from '@angular/core'
import { environment } from '../../../../environments/environment'

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
    public readonly cvDocumentUrl: string = environment.cvDocumentUrl as string

    public isHamburgerMenuOpen = false

    public toggleIsHamburgerMenuOpen(): void {
        this.isHamburgerMenuOpen = !this.isHamburgerMenuOpen
    }
}
