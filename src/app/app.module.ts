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
import { MainComponent } from './body/main/main.component';
import { EditComponent } from './body/edit/edit.component';
import { DeleteComponent } from './body/delete/delete.component';
import { DeleteSuccessComponent } from './body/delete-success/delete-success.component';
import { AllBeltsComponent } from './body/all-belts/all-belts.component';
import { AddBeltComponent } from './body/add-belt/add-belt.component';
import { DeleteBeltComponent } from './body/delete-belt/delete-belt.component';
import { EditBeltComponent } from './body/edit-belt/edit-belt.component';
import { AllBeltTypesComponent } from './body/all-belt-types/all-belt-types.component';
import { AddBeltTypeComponent } from './body/add-belt-type/add-belt-type.component';
import { EditBeltTypeComponent } from './body/edit-belt-type/edit-belt-type.component';
import { DeleteBeltTypeComponent } from './body/delete-belt-type/delete-belt-type.component';
import { EditMetallCostingComponent } from './body/edit-metall-costing/edit-metall-costing.component';
import { AllMetallCostingComponent } from './body/all-metall-costing/all-metall-costing.component';

@NgModule({
  declarations: [
    AppComponent,
    AllEnginesComponent,
    AddEngineComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    EditComponent,
    DeleteComponent,
    DeleteSuccessComponent,
    AllBeltsComponent,
    AddBeltComponent,
    DeleteBeltComponent,
    EditBeltComponent,
    AllBeltTypesComponent,
    AddBeltTypeComponent,
    EditBeltTypeComponent,
    DeleteBeltTypeComponent,
    EditMetallCostingComponent,
    AllMetallCostingComponent
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
