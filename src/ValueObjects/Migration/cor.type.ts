// /* eslint-disable new-cap */
// import {
//   EhCorValida,
//   CannotBeBlank,
// } from '../../exceptions/valor-invalido.exception';
// import GbTipo from '../_base.type';

// export class Cor extends GbTipo {
//   constructor(valor: string | undefined, label: string | null = null) {
//     const msg = label ?? 'Cor';
//     super(valor);
//     if (valor !== undefined) {
//       this.validar([
//         () => CannotBeBlank(valor, msg),
//         () => EhCorValida(valor, msg),
//       ]);
//       this.valor = valor?.trim().toLowerCase();
//     }
//   }
// }

// export function CriarCor(valor: string, label: string | null = null) {
//   return new Cor(valor, label);
// }
