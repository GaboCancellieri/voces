import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Show } from 'src/app/schemas/show';
import { CompraService } from 'src/app/services/compra.service';
import { ShowsService } from 'src/app/services/shows.service';
import {Location} from '@angular/common';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { EntradaService } from 'src/app/services/entradas.service';
import { Cliente } from 'src/app/schemas/cliente';
import { Entrada } from 'src/app/schemas/entrada';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class ComprarShowComponent implements OnInit {
  @ViewChild('close') cerrarModal: ElementRef;

  cliente;
  modelComprador: any = {};
  modelTarjeta: any = {
    cardNumber: null,
    cardholderName: null,
    securityCode: null,
    cardExpirationMonth: null,
    cardExpirationYear: null,
  };
  stepNumber = 0;
  tiposDocumento;
  tipoDocumento;
  cantidadEntradas = 1;
  precioTotal;
  cargosCredito;
  show: Show;
  entradasCompradas: Entrada[] = [];
  nuevaEntrada: any = {};
  validaDesde = moment().toDate();
  validaHasta = moment().add(2, 'days').toDate();
  paymentMethod: any;
  issuer;
  installments;
  cuotas = [];
  selectedCuota;
  MercadoPago: any;
  form: any;
  showPayment = false;
  doSubmit = false;
  preference = {};

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private compraService: CompraService,
    private showsService: ShowsService,
    private entradaService: EntradaService,
    private window: Window,
  ) { }

    ngOnInit() {
        // const script = document.createElement('script');
        // script.type = 'text/javascript';
        // script.src = 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js';
        // document.body.appendChild(script);
        // setTimeout(() => {
        //   this.MercadoPago = (this.window as any).Mercadopago;
        //   this.MercadoPago.setPublishableKey('TEST-24e317d9-e28d-4d0f-9da8-b7c773472b0c');
        //   // this.MercadoPago.setPublishableKey('APP_USR-6383a75b-8818-4605-976d-39a7873ef338');
        // }, 1000);

        this.getCliente();
        this.getShow();
    }

    getCliente() {
      const cliente = localStorage.getItem('cliente');
      if (cliente) {
        this.cliente =  JSON.parse(cliente);
      } else {
        this.location.back();
      }
    }

    getShow() {
      this.route.params.subscribe((params) => {
        const idShow = params.idShow;
        this.showsService.findOne(idShow).subscribe((show) => {
          this.show = show;
          this.precioTotal = show.precio;
          this.cargosCredito = (this.precioTotal * 7) / 100;

          if (show.fechaInicioEstreno && show.fechaFinEstreno) {
            if (moment(show.fechaFinEstreno).isAfter(moment().toDate())) {
              this.validaDesde = this.show.fechaInicioEstreno;
              this.validaHasta = this.show.fechaFinEstreno;
            }
          }

          this.entradasCompradas.push({
            idShow: this.show._id,
            nombre: this.cliente.nombre,
            apellido: this.cliente.apellido,
            email: this.cliente.email,
            activa: true,
            inicio: this.validaDesde,
            fin: this.validaHasta,
          });
        });
      });
    }

//     getIdentificationTypes(): void {
//       this.MercadoPago.getIdentificationTypes((status, response) => {
//         if (status === 200 || status === 201) {
//           this.setDocTypes(response);
//         }
//       });
//     }

//     guessPaymentMethod(event): void {
//       if (this.paymentMethod && this.paymentMethod.payment_type_id === 'credit_card') {
//         this.precioTotal -= this.cargosCredito;
//         (document.getElementById('transactionAmount') as HTMLInputElement).value = this.precioTotal;
//       }
//       const cardnumber = (document.getElementById('cardNumber') as HTMLInputElement).value;
//       if (cardnumber.length >= 6) {
//           const bin = cardnumber.substring(0, 6);
//           this.MercadoPago.getPaymentMethod({
//               bin
//           }, (status, response) => {
//             if (status === 200) {
//                 const paymentMethod = response[0];
//                 this.paymentMethod = paymentMethod;
//                 if (paymentMethod.payment_type_id === 'credit_card') {
//                   this.precioTotal += this.cargosCredito;
//                 }

//                 (document.getElementById('transactionAmount') as HTMLInputElement).value = this.precioTotal;
//                 (document.getElementById('paymentMethodId') as HTMLInputElement).value = paymentMethod.id;
//                 this.getIssuers(paymentMethod.id);
//             } else {
//                 alert(`payment method info error: ${response}`);
//             }
//          });
//       }
//    }

//   getIssuers(paymentMethodId) {
//     this.MercadoPago.getIssuers(
//         paymentMethodId,
//         (status, response) => {
//           if (status === 200) {
//               (document.getElementById('issuer') as HTMLSelectElement).options.length = 0;
//               const issuerSelect = document.getElementById('issuer');
//               response.forEach( issuer => {
//                   this.issuer = issuer;
//                   const opt = document.createElement('option');
//                   opt.text = issuer.name;
//                   opt.value = issuer.id;
//                   issuerSelect.appendChild(opt);
//               });
//               this.getInstallments(
//                   (document.getElementById('paymentMethodId') as HTMLInputElement).value,
//                   (document.getElementById('transactionAmount') as HTMLInputElement).value,
//                   (issuerSelect as HTMLInputElement).value
//               );
//           } else {
//               alert(`issuers method info error: ${response}`);
//           }
//        }
//     );
//   }

//   getInstallments(paymentMethodId, transactionAmount, issuerId){
//     this.MercadoPago.getInstallments({
//         payment_method_id: paymentMethodId,
//         amount: parseFloat(transactionAmount),
//         issuer_id: parseInt(issuerId)
//     }, (status, response) => {
//       if (status === 200) {
//           this.setInstallments(response);
//       } else {
//           alert(`installments method info error: ${response}`);
//       }
//    });
//   }

//   getCardToken(event): boolean {
//     event.preventDefault();
//     if (!this.doSubmit){
//         const $form = document.getElementById('paymentForm');
//         (document.getElementById('docNumber') as HTMLInputElement).value = this.modelComprador.docNumber;
//         this.MercadoPago.createToken($form, (status, response) => {
//           if (status === 200 || status === 201) {
//               this.doSubmit = true;
//               const params = {
//                 token: response.id,
//                 transactionAmount: this.precioTotal,
//                 description: this.show.nombre,
//                 installments: this.installments,
//                 paymentMethodId: this.paymentMethod.id,
//                 issuer: this.issuer.id,
//                 email: this.modelComprador.email,
//                 docType: this.modelComprador.docType,
//                 docNumber: this.modelComprador.docNumber,
//               };
//               this.compraService.comprarEntrada(params).subscribe((result) => {
//                 if (result.status === 'approved') {
//                   Swal.fire({
//                     title: 'Pago Aprobado!',
//                     text: 'El pago ha sido aprobado.',
//                     icon: 'success',
//                   });
//                   this.doSubmit = false;
//                   this.goBack();
//                   const compra = {
//                     fecha: moment().toDate(),
//                     monto: this.precioTotal,
//                     show: {
//                       id: this.show._id,
//                       nombre: this.show.nombre,
//                     },
//                     cliente: {
//                       id: this.cliente._id,
//                       nombre: this.cliente.nombre,
//                       apellido: this.cliente.apellido,
//                       email: this.cliente.email,
//                     },
//                     cantidadEntradas: this.entradasCompradas.length,
//                   };
//                   this.compraService.save(compra).subscribe((nuevaCompra) => {
//                     this.entradaService.crearEntradas(this.entradasCompradas).subscribe((entradas) => {
//                     });
//                   });
//                 } else if (result.status === 'in_process') {
//                   Swal.fire({
//                     title: 'Pago en Revisión!',
//                     text: 'El pago está en revisión. Lo contactaremos en cuanto tengamos una respuesta de Mercado Pago.',
//                     icon: 'warning',
//                   });
//                   this.doSubmit = false;
//                   this.goBack();
//                 } else if (result.status === 'rejected') {
//                   Swal.fire({
//                     title: 'Pago Rechazado!',
//                     text: 'El pago fue rechazado. Pruebe de nuevo o utilice otra tarjeta.',
//                     icon: 'error',
//                   });
//                   this.doSubmit = false;
//                   this.goBack();
//                 }
//               }, (error) => {
//                 if (error === 'Timeout') {
//                   Swal.fire({
//                     title: 'Pago no realizado',
//                     text: 'El pago está tardando más de lo normal, pruebe más tarde.',
//                     icon: 'error',
//                   });
//                 } else {
//                   Swal.fire({
//                     title: 'Error!',
//                     text: 'Algo salió mal. Pago no realizado.',
//                     icon: 'error',
//                   });
//                 }
//                 this.doSubmit = false;
//                 this.goBack();
//               });
//           } else {
//             Swal.fire({
//               title: 'Error!',
//               text: `No se pudo realizar la compra. Verifique los datos ingresados! ${JSON.stringify(response, null, 4)}`,
//               icon: 'error',
//             });
//           }
//        });
//         return false;
//     }
//  }

//   setTipoDoc(tipoDoc): void {
//     this.modelComprador.docType = tipoDoc;
//   }

//   setCuota(cuota): void {
//       this.installments = cuota;
//   }

  agregarEntrada() {
      const nuevaEntrada = {
        nombre: this.nuevaEntrada.nombre,
        apellido: this.nuevaEntrada.apellido,
        email: this.nuevaEntrada.email.trim().toLowerCase(),
        idShow: this.show._id,
        activa: true,
        inicio: this.entradasCompradas[0].inicio,
        fin: this.entradasCompradas[0].fin,
      };
      this.entradasCompradas.push(nuevaEntrada);
      this.precioTotal += this.show.precio;
      this.cargosCredito = (this.precioTotal * 7) / 100;

      this.nuevaEntrada = {};
      this.cerrarModal.nativeElement.click();
  }

  onQuitarEntrada() {
    this.entradasCompradas.pop();
    this.precioTotal -= this.show.precio;
    this.cargosCredito = (this.precioTotal * 7) / 100;
  }

  validarMail(ambito: string) {
    if (ambito === 'compra') {
      return this.modelComprador.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    } else if (ambito === 'entrada') {
      return this.nuevaEntrada.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    }
  }

  mailRepetido() {
    if (this.nuevaEntrada.email) {
      return this.entradasCompradas.filter(e => e.email.trim() === this.nuevaEntrada.email.trim()).length > 0;
    }
    return false;
  }

  goBack() {
    this.location.back();
  }

  // setDocTypes(docTypes) {
  //   (document.getElementById('docType') as HTMLSelectElement).options.length = 0;
  //   this.setTipoDoc(docTypes[0].name);
  //   docTypes.forEach( tipoDoc => {
  //   const opt = document.createElement('option');
  //   opt.text = tipoDoc.name;
  //   opt.value = tipoDoc.name;
  //   document.getElementById('docType').appendChild(opt);
  // });
  // }

  // setInstallments(installments) {
  //   (document.getElementById('installments') as HTMLSelectElement).options.length = 0;
  //   this.setCuota(installments[0].payer_costs[0].installments);
  //   installments[0].payer_costs.forEach( payerCost => {
  //       const opt = document.createElement('option');
  //       opt.text = payerCost.recommended_message;
  //       opt.value = payerCost.installments;
  //       document.getElementById('installments').appendChild(opt);
  //   });
  // }

  // onShowPayment() {
  //   this.showPayment = true;
  //   setTimeout(() => {
  //     this.getIdentificationTypes();
  //   }, 1000);
  // }

  // dontShowPayment() {
  //   this.showPayment = false;
  //   if (this.paymentMethod && this.paymentMethod.payment_type_id === 'credit_card') {
  //     this.precioTotal -= this.cargosCredito;
  //   }
  //   if (this.modelTarjeta.cardNumber) {
  //     this.modelTarjeta.cardNumber = null;
  //   }
  //   this.paymentMethod = null;
  //   (document.getElementById('transactionAmount') as HTMLInputElement).value = this.precioTotal;
  // }

  comprar() {
    this.doSubmit = true;
    Swal.fire({
      title: '¡IMPORTANTE!',
      text: `Usted será dirigido a la página de Mercado Pago, una vez completado el pago debe volver a este sitio
      (esperando 5 segundos). Por favor, NO CIERRE la ventana antes de volver al sitio de Escuela Voces.`,
      icon: 'info',
      showCancelButton: false,
      confirmButtonText: 'Entendido - Comprar',
      confirmButtonColor: '#FC01A0',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Redireccionando...',
          icon: 'info',
          showCancelButton: false,
          showConfirmButton: false,
        });
        const compra = {
          fecha: moment().toDate(),
          monto: this.precioTotal,
          show: {
            id: this.show._id,
            nombre: this.show.nombre,
          },
          cliente: {
            id: this.cliente._id,
            nombre: this.cliente.nombre,
            apellido: this.cliente.apellido,
            email: this.cliente.email,
          },
          entradasCompradas: this.entradasCompradas,
        };
        this.compraService.save(compra).subscribe((nuevaCompra) => {
          const preference = {
            title: this.show.nombre,
            unit_price: this.precioTotal,
            idCompra: nuevaCompra._id,
          };
          this.compraService.crearPreferencia(preference).subscribe((response) => {
            console.log(response);
            this.preference = response;
            window.location.href = response.init_point;
          },
          (error) => {
            console.log(error);
          });
        });
      } else {
        this.doSubmit = false;
      }
    });
  }
}
