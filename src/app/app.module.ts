import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllEnginesComponent } from './body/all-engines/all-engines.component';
import { AddEngineComponent } from './body/add-engine/add-engine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './header/menu/menu.component';
import { MainComponent } from './body/main/main.component';
import { EditComponent } from './body/edit/edit.component';
import { DeleteComponent } from './body/delete/delete.component';
import { DeleteSuccessComponent } from './body/delete-success/delete-success.component';

@NgModule({
  declarations: [
    AppComponent,
    AllEnginesComponent,
    AddEngineComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    MainComponent,
    EditComponent,
    DeleteComponent,
    DeleteSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
