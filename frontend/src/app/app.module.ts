import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing,module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { usersReducer } from './store/users.reducer';
import { postsReducer } from './store/posts.reducer';
import { commentsReducer } from './store/comments.reducer';

import { UsersEffects } from './store/users.effects';
import { PostsEffects } from './store/posts.effects';
import { CommentsEffects } from './store/comments.effects';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { LoaderComponent } from './ui/loader/loader.component';
import { ValidateIdenticalDirective } from './directives/validate-identical.directive';
import { ValidateSomeoneFilledDirective } from './directives/validate-someone-filled.directive';
import { RegisterComponent } from './pages/register/register.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { LoginComponent } from './pages/login/login.component';
import { ImagePipe } from './pipes/image.pipe';
import { PostsComponent } from './pages/posts/posts.component';
import { PostItemComponent } from './pages/posts/post-item/post-item.component';
import { NewPostComponent } from './pages/new-post/new-post.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LayoutComponent,
    FileInputComponent,
    LoaderComponent,
    ValidateIdenticalDirective,
    ValidateSomeoneFilledDirective,
    RegisterComponent,
    CenteredCardComponent,
    LoginComponent,
    ImagePipe,
    PostsComponent,
    PostItemComponent,
    NewPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatSnackBarModule,
    StoreModule.forRoot({
      users: usersReducer,
      posts: postsReducer,
      comments: commentsReducer,
    }, {}),
    EffectsModule.forRoot([UsersEffects, PostsEffects, CommentsEffects]),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
