import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './webpage/home/home.component';
import { FooterWebComponent } from './webpage/footer/footer-web.component';
import { MenuWebComponent } from './webpage/menu/menu-web.component';
import { InstitucionalComponent } from './webpage/institucional/institucional.component';
import { AreasWebComponent } from './webpage/areas/areas-web.component';
import { ActividadesWebComponent } from './webpage/actividades/actividades-web.component';
import { NovedadesWebComponent } from './webpage/novedades/novedades-web.component';
import { StreamingWebComponent } from './webpage/streaming/streaming-web.component';
import { GaleriaWebComponent } from './webpage/galeria/galeria-web.component';
import { ContactoWebComponent } from './webpage/contacto/contacto-web.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { AdminModule } from './admin/admin.module';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { InstitucionalService } from './services/institucional.service';
import { DocenteService } from './services/docente.service';
import { AreaService } from './services/area.service';
import { ShowsService } from './services/shows.service';
import { EntradaService } from './services/entradas.service';
import { WatchComponent } from './webpage/watch/watch.component';
import { SafePipe } from './pipes/safeUrl.pipe';
import { SanitizeHtmlPipe } from './pipes/sanitizeHTML.pipe';
import { ClienteService } from './services/cliente.service';

// NG PRIME
import { TabMenuModule } from 'primeng/tabmenu';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TabMenuModule,
    CarouselModule,
    AdminModule,
    TooltipModule,
  ],
  declarations: [
    SafePipe,
    SanitizeHtmlPipe,
    AppComponent,
    HomeComponent,
    FooterWebComponent,
    MenuWebComponent,
    NovedadesWebComponent,
    InstitucionalComponent,
    AreasWebComponent,
    ActividadesWebComponent,
    StreamingWebComponent,
    GaleriaWebComponent,
    ContactoWebComponent,
    NotFoundComponent,
    UnderConstructionComponent,
    WatchComponent,
  ],

  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    InstitucionalService,
    DocenteService,
    AreaService,
    ShowsService,
    EntradaService,
    ClienteService,
  ],
  bootstrap: [AppComponent, ]
})
export class AppModule { }
