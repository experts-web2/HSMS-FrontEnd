import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedModule } from './shared-module/shared-module';
import { AddTokenModalComponent } from './modules/dialog/add-token-modal/add-token-modal.component';
import { RegistrationModule } from './modules/registration/registration.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './modules/home/home.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddTokenModalComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    RegistrationModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[AppComponent]
})
export class AppModule { 
  constructor(private injector: Injector){}
  
  ngDoBootstrap(){
    const el= createCustomElement(AppComponent, {
      injector: this.injector
    });
    customElements.define('app-component', el);
  }
 }
