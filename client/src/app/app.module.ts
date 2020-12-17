import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { PipesModule } from './pipes/pipes.module';
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
import { ClienteService } from './services/cliente.service';
import { CompraService } from './services/compra.service';
import { UserStreamingComponent } from './webpage/streaming/user/user-streaming.component';
import { CarteleraComponent } from './webpage/streaming/cartelera/cartelera.component';
import { ComprarShowComponent } from './webpage/streaming/compra/compra.component';
import { AlbumService } from './services/album.service';
import { ImagesService } from './services/images.service';
import { ImagenesService } from './services/imagenes.service';
import { ActividadesService } from './services/actividades.service';
import { UrlService } from './window.provider.service';
import { WINDOW_PROVIDERS } from './window.provider';
import { EmailService } from './services/email.service';
import { ResultadoCompraComponent } from './webpage/streaming/resultadoCompra/resultadoCompra.component';
// NG PRIME
import { TabMenuModule } from 'primeng/tabmenu';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'primeng/tooltip';
import { StepsModule } from 'primeng/steps';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import {TableModule} from 'primeng/table';
import {GalleriaModule} from 'primeng/galleria';
import { CardModule } from 'primeng/card';
import { from } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PipesModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TabMenuModule,
    CarouselModule,
    AdminModule,
    TooltipModule,
    DropdownModule,
    StepsModule,
    InputNumberModule,
    InputMaskModule,
    TableModule,
    GalleriaModule,
    CardModule,
  ],
  declarations: [
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
    UserStreamingComponent,
    CarteleraComponent,
    ComprarShowComponent,
    ResultadoCompraComponent,
  ],

  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: Window, useValue: window },
    UrlService,
    WINDOW_PROVIDERS,
    JwtHelperService,
    InstitucionalService,
    DocenteService,
    AreaService,
    ShowsService,
    EntradaService,
    ClienteService,
    CompraService,
    AlbumService,
    ImagesService,
    ImagenesService,
    ActividadesService,
    EmailService,
  ],
  bootstrap: [AppComponent, ]
})
export class AppModule { }
