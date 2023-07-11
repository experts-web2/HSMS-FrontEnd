import { Injector, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedModule } from './shared-module/shared-module';
import { AddTokenModalComponent } from './modules/dialog/add-token-modal/add-token-modal.component';
import { RegistrationModule } from './modules/registration/registration.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { GenericTableComponent } from "./Shared/components/generic-table/generic-table.component";
import { LoaderComponent } from './Shared/components/loader/loader.component';
import { AppHttpInterceptor } from './auth/interceptor/app-http.interceptor';
@NgModule({
    declarations: [
        AppComponent,
        AddTokenModalComponent,
    ],
    providers: [MessageService, 
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AppHttpInterceptor,
        multi: true
      },
      AppHttpInterceptor
    ],
    bootstrap: [AppComponent],
    entryComponents: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        BrowserAnimationsModule,
        RegistrationModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        SharedModule,
        HttpClientModule,
        ToastModule,
        MessagesModule,
        GenericTableComponent,
        LoaderComponent
    ]
})
export class AppModule implements OnInit { 
  constructor(private injector: Injector, private primengConfig: PrimeNGConfig){}
  
  ngOnInit() {
      this.primengConfig.ripple = true;
  }

  ngDoBootstrap(){
    const el= createCustomElement(AppComponent, {
      injector: this.injector
    });
    customElements.define('app-component', el);
  }

}
