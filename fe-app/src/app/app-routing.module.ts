import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JwtFormComponent } from './jwt-form/jwt-form.component';


const routes: Routes = [
	{
		path: '',
		redirectTo: '/generate_jwt',
		pathMatch: 'full',
	},{
		path: 'generate_jwt',
		component: JwtFormComponent,
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
