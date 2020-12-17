import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './webpage/home/home.component';
import { AreasWebComponent } from './webpage/areas/areas-web.component';
import { ActividadesWebComponent } from './webpage/actividades/actividades-web.component';
import { StreamingWebComponent } from './webpage/streaming/streaming-web.component';
import { GaleriaWebComponent } from './webpage/galeria/galeria-web.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { ContactoWebComponent } from './webpage/contacto/contacto-web.component';
import { WatchComponent } from './webpage/watch/watch.component';
import { ComprarShowComponent } from './webpage/streaming/compra/compra.component';
import { ResultadoCompraComponent } from './webpage/streaming/resultadoCompra/resultadoCompra.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'areas', component: AreasWebComponent },
  { path: 'actividades', component: ActividadesWebComponent },
  { path: 'streaming', component: StreamingWebComponent },
  { path: 'streaming/comprar/:idShow', component: ComprarShowComponent },
  { path: 'streaming/compra/:idCompra/:resultado', component: ResultadoCompraComponent },
  { path: 'streaming/watch/:idShow', component: WatchComponent },
  { path: 'streaming/watch/:idShow/:email/:codigo', component: WatchComponent },
  { path: 'galeria', component: GaleriaWebComponent },
  { path: 'plataforma', component: UnderConstructionComponent },
  { path: 'contacto', component: ContactoWebComponent },
  { path: 'admin-voces', loadChildren: './admin/admin.module#AdminModule' },
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
