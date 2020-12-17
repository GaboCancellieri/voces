import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Compra } from 'src/app/schemas/compra';
import { CompraService } from 'src/app/services/compra.service';
import { EntradaService } from 'src/app/services/entradas.service';

@Component({
  selector: 'app-compra',
  templateUrl: './resultadoCompra.component.html',
  styleUrls: ['./resultadoCompra.component.scss']
})
export class ResultadoCompraComponent implements OnInit {
  estado: string;

  constructor(
    private route: ActivatedRoute,
    private compraservice: CompraService,
    private entradasService: EntradaService,
    private router: Router,
  ) { }

    ngOnInit() {
      this.getCompra();
    }

    getCompra() {
      this.route.params.subscribe((params) => {
        const idCompra = params.idCompra;
        this.compraservice.findOne(idCompra).subscribe((compra) => {
          this.getResultado(compra);
        });
      });
    }

    getResultado(compra: Compra) {
      this.route.queryParams.subscribe((params) => {
        this.estado = params.status;
        const resultado = {
          idOrden: params.merchant_order_id,
          idPago: params.payment_id,
          tipoPago: params.payment_type,
          idSitio: params.site_id,
          estado: params.status,
        };
        compra.resultado = resultado;
        if (params.status === 'approved') {
          this.compraservice.update(compra._id, compra).subscribe((compraActualizada) => {
            this.entradasService.crearEntradas(compra.entradasCompradas).subscribe((entradas) => {});
          });
        } else if (params.status === 'pending') {
          this.compraservice.update(compra._id, compra).subscribe((compraActualizada) => {});
        }
      });
    }

    volver() {
      this.router.navigate(['/streaming']);
    }
}
