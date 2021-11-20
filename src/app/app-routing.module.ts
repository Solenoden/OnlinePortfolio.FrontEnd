import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './components/home-page/home-page.component'

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            scrollOffset: [0, 30],
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
