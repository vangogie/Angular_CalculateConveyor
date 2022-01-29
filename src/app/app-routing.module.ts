import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutAuthorComponent } from './body/about-author/about-author.component';
import { AboutComponent } from './body/about/about.component';
import { AddBeltTypeComponent } from './body/add-belt-type/add-belt-type.component';
import { AddBeltComponent } from './body/add-belt/add-belt.component';
import { AddEngineComponent } from './body/add-engine/add-engine.component';
import { AllBeltTypesComponent } from './body/all-belt-types/all-belt-types.component';
import { AllBeltsComponent } from './body/all-belts/all-belts.component';
import { AllEnginesComponent } from './body/all-engines/all-engines.component';
import { DeleteBeltTypeComponent } from './body/delete-belt-type/delete-belt-type.component';
import { DeleteBeltComponent } from './body/delete-belt/delete-belt.component';
import { DeleteSuccessComponent } from './body/delete-success/delete-success.component';
import { DeleteComponent } from './body/delete/delete.component';
import { EditBeltTypeComponent } from './body/edit-belt-type/edit-belt-type.component';
import { EditBeltComponent } from './body/edit-belt/edit-belt.component';
import { EditComponent } from './body/edit/edit.component';
import { ErrorComponent } from './body/error/error.component';
import { MainComponent } from './body/main/main.component';

const routes: Routes = [
  {path: '', component:MainComponent},

  {path: 'allengines', component:AllEnginesComponent},
  {path: 'addengine', component:AddEngineComponent},
  {path: 'edit/:vendor/:id', component:EditComponent},
  {path: 'delete/:vendor/:id/:cost/:power', component:DeleteComponent},

  {path: 'allbelts', component:AllBeltsComponent},
  {path: 'addbelt', component:AddBeltComponent},
  {path: 'editbelt/:id', component:EditBeltComponent},
  {path: 'deletebelt/:id/:name', component:DeleteBeltComponent},

  {path: 'allbelttypes', component:AllBeltTypesComponent},
  {path: 'addbelttype', component:AddBeltTypeComponent},
  {path: 'editbelttype/:id', component:EditBeltTypeComponent},
  {path: 'deletebelttype/:id/:type', component:DeleteBeltTypeComponent},

  {path: 'about', component:AboutComponent},
  {path: 'author', component:AboutAuthorComponent},

  {path: 'delete_success/:nextroute', component:DeleteSuccessComponent},
  
  {path: 'error', component:ErrorComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
