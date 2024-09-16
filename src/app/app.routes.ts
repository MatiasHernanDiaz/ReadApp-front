import { Routes } from '@angular/router'
import { LoginScreen } from './login/login.component'
import { RecommendationsScreen } from './main-frame/recommendations/recommendations.component'
import { ProfileScreen } from './main-frame/profile/profile.component'
import { MainFrameComponent } from './main-frame/main-frame.component'
import { InfoComponent } from './main-frame/profile/info/info.component'
import { FriendsComponent } from './main-frame/profile/friends/friends.component'
import { ReadbooksComponent } from './main-frame/profile/readbooks/readbooks.component'
import { BookstoreadComponent } from './main-frame/profile/bookstoread/bookstoread.component'
import { RecomstoevaluateComponent } from './main-frame/profile/recomstoevaluate/recomstoevaluate.component'
import { ExplorerComponent } from './main-frame/recommendations/explorer/explorer.component'
import { MyrecomsComponent } from './main-frame/myrecoms/myrecoms.component'
import { GralrecomsComponent } from './main-frame/gralrecoms/gralrecoms.component'
import { RecomdetailsComponent } from './main-frame/myrecoms/recomdetails/recomdetails.component'
import { BookContainerComponent } from './main-frame/book-container/book-container.component'

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
                component: RecommendationsScreen,
                children: [
                    {
                        path: "explorer",
                        component: RecommendationsScreen,
                        data:{myrecoms : false}
                    },
                    {
                        path: "myrecoms",
                        component: RecommendationsScreen,
                        data:{myrecoms : true}
                    },
                    {
                        path: "recoms",
                        component: BookContainerComponent
                    },
                    { 
                        path: 'book-search',
                        component: BookContainerComponent
                    },
                    { 
                        path: '', 
                        redirectTo: 'explorer', 
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
                        component: BookstoreadComponent
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
