import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LandingPageComponent } from './components/landing-page/landing-page.component'
import { NavigationBarComponent } from './components/common/navigation-bar/navigation-bar.component'
import { HomePageComponent } from './components/home-page/home-page.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutMePageComponent } from './components/about-me-page/about-me-page.component'

@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent,
        NavigationBarComponent,
        HomePageComponent,
        AboutMePageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
