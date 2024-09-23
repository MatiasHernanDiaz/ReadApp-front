import { Routes } from '@angular/router'
import { LoginScreen } from './login/login.component'
import { RecommendationsScreen } from './main-frame/recommendations/recommendations.component'
import { ProfileScreen } from './main-frame/profile/profile.component'
import { MainFrameComponent } from './main-frame/main-frame.component'
import { InfoComponent } from './main-frame/profile/info/info.component'
import { FriendsComponent } from './main-frame/profile/friends/friends.component'
import { ReadbooksComponent } from './main-frame/profile/readbooks/readbooks.component'
import { BooksToReadComponent } from './main-frame/profile/books-to-read/books-to-read.component'
import { RecomstoevaluateComponent } from './main-frame/profile/recomstoevaluate/recomstoevaluate.component'
import { BookContainerComponent } from './main-frame/book-container/book-container.component'
import { MyrecomsComponent } from './main-frame/myrecoms/myrecoms.component'
import { RecomdetailsComponent } from './main-frame/myrecoms/recomdetails/recomdetails.component'

export const routes: Routes = [
    { 
        path: 'login',
        component: LoginScreen 
    },
    {
        path: 'app',
        component: MainFrameComponent,
        
        children: [
            {
                path: "layout",
              
                children: [
                    {
                        path: "recoms",
                        component: RecommendationsScreen,
                        data:{myrecoms : false}
                    },
                    {
                        path: "myrecoms",
                        component: MyrecomsComponent,
                        data:{myrecoms : true}
                    },
                    {
                        path: "myrecoms/:id",
                        component: RecomdetailsComponent,
                        data:{myrecoms : true}
                    },
                    {
                        path: "recoms/:id",
                        component: RecomdetailsComponent
                    },
                   
                    { 
                        path: 'books',
                        component: BookContainerComponent
                    },
                    { 
                        path: '', 
                        redirectTo: 'recoms', 
                        pathMatch: 'full' 
                    }
                ]
            },
            { 
                path: 'profile', // ----> /app/profile
                component: ProfileScreen,
                children: [
                    {
                        path: "info",
                        component: InfoComponent
                    },
                    {
                        path: "friends",
                        component: FriendsComponent
                    },
                    {
                        path: "readbooks",
                        component: ReadbooksComponent
                    },
                    {
                        path: "bookstoread",
                        component: BooksToReadComponent
                    },
                    {
                        path: "recomstoevaluate",
                        component: RecomstoevaluateComponent
                    }
                ]
            }
        ]
    },
    { path: '**', redirectTo: 'login' },
]
