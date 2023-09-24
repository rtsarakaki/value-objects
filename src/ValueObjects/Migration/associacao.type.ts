// /* eslint-disable new-cap */
// import {
//   MustHaveOnlyOneWord,
//   CannotBeBlank,
// } from '../../exceptions/valor-invalido.exception';
// import GbTipo from '../_base.type';

// export class Associacao extends GbTipo {
//   constructor(
//     valor: string | undefined,
//     label: string | null = null,
//     _: any,
//   ) {
//     const msg = label ?? 'Cor';
//     super(valor);
//     if (valor !== undefined) {
//       this.validar([
//         () => CannotBeBlank(valor, msg),
//         () => MustHaveOnlyOneWord(valor, msg),
//       ]);
//       this.valor = valor?.trim().toLowerCase();
//     }
//   }
// }

// export function CriarAssociacao(
//   valor: string,
//   label: string | null = null,
//   useCase: any,
// ) {
//   return new Associacao(valor, label, useCase);
// }
