import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { StateDataComponent } from './state-data/state-data.component';


const routes: Routes = [
  {path:'', redirectTo:'/state',pathMatch:'full'},
  {path:'state', component: StateDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
