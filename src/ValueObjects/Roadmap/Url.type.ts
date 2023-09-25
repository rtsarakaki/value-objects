// /* eslint-disable new-cap */
// import {
//   EhUrlValida,
//   CannotBeBlank,
// } from '../../exceptions/valor-invalido.exception';
// import GbTipo from '../_base.type';

// export class Url extends GbTipo {
//   constructor(valor: string, label: string | null = null) {
//     const msg = label ?? 'URL';
//     super(valor);
//     if (valor !== undefined) {
//       this.validar([
//         () => CannotBeBlank(valor, msg),
//         () => EhUrlValida(valor, msg),
//       ]);
//       this.valor = valor?.trim();
//     }
//   }
// }

// export function CriarUrl(valor: string, label: string | null = null) {
//   return new Url(valor, label);
// }
