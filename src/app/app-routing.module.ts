import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutAuthorComponent } from './body/about-author/about-author.component';
import { AboutComponent } from './body/about/about.component';
import { AddEngineComponent } from './body/add-engine/add-engine.component';
import { AllEnginesComponent } from './body/all-engines/all-engines.component';
import { DeleteSuccessComponent } from './body/delete-success/delete-success.component';
import { DeleteComponent } from './body/delete/delete.component';
import { EditComponent } from './body/edit/edit.component';
import { ErrorComponent } from './body/error/error.component';
import { MainComponent } from './body/main/main.component';

const routes: Routes = [
  {path: '', component:MainComponent},
  {path: 'allengines', component:AllEnginesComponent},
  {path: 'addengine', component:AddEngineComponent},
  {path: 'about', component:AboutComponent},
  {path: 'author', component:AboutAuthorComponent},
  {path: 'edit/:vendor/:id', component:EditComponent},
  {path: 'delete/:vendor/:id/:cost/:power', component:DeleteComponent},
  {path: 'delete_success', component:DeleteSuccessComponent},
  {path: 'error', component:ErrorComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
