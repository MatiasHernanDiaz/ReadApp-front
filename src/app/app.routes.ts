import { Routes } from '@angular/router';
import { LoginScreen } from './login/login.component';
import { RecommendationsScreen } from './recommendations/recommendations.component';
import { ProfileScreen } from './profile/profile.component';
import { BookContainerComponent } from './book-container/book-container.component'

export const routes: Routes = [
    { path: 'login', component: LoginScreen },
    { path: 'recommendations', component: RecommendationsScreen },
    { path: 'profile', component: ProfileScreen },
    { path: 'book-container', component: BookContainerComponent },
    { path: '**', component: RecommendationsScreen },
];
