import { Component } from '@angular/core'

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
    public isHamburgerMenuOpen = false

    public toggleIsHamburgerMenuOpen(): void {
        this.isHamburgerMenuOpen = !this.isHamburgerMenuOpen
    }
}
