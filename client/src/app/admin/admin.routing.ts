import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { InstitucionalAdminComponent } from './pages/institucional/institucional.component';
import { AreasAdminComponent } from './pages/areas/areas.component';
import { ActividadesAdminComponent } from './pages/actividades/actividades.component';
import { GaleriaAdminComponent } from './pages/galeria/galeria.component';
import { StreamingAdminComponent } from './pages/streaming/streaming.component';
import { ContactoAdminComponent } from './pages/contacto/contacto.component';
import { ShowDetalleAdminComponent } from './pages/streaming/show-detalle/show-detalle.component';
import { NovedadesAdminComponent } from './pages/novedades/novedades.component';
import { GeneradorEntradaComponent } from './pages/generarEntrada/generadorEntrada.component';

const routes: Routes = [
    { path: 'inicio', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'novedades', component: NovedadesAdminComponent, canActivate: [AuthGuard] },
    { path: 'institucional', component: InstitucionalAdminComponent, canActivate: [AuthGuard] },
    { path: 'areas', component: AreasAdminComponent, canActivate: [AuthGuard] },
    { path: 'actividades', component: ActividadesAdminComponent, canActivate: [AuthGuard] },
    { path: 'streaming', component: StreamingAdminComponent, canActivate: [AuthGuard] },
    { path: 'streaming/show', component: ShowDetalleAdminComponent, canActivate: [AuthGuard] },
    { path: 'streaming/show/:idShow', component: ShowDetalleAdminComponent, canActivate: [AuthGuard] },
    { path: 'galeria', component: GaleriaAdminComponent, canActivate: [AuthGuard] },
    { path: 'contacto', component: ContactoAdminComponent, canActivate: [AuthGuard] },
    { path: 'generarEntrada', component: GeneradorEntradaComponent, canActivate: [AuthGuard] },
    { path: 'login', component: AdminLoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})

export class AdminRoutingModule { }
