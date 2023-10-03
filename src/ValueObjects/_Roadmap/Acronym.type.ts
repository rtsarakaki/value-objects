// /* eslint-disable new-cap */
// import {
//   MustHaveOnlyOneWord,
//   MustHaveAtLeastXCharacters,
//   CannotBeBlank,
//   CannotHaveMoreThanXCharacters,
// } from '../../exceptions/valor-invalido.exception';
// import GbTipo from '../_base.type';

// export class Sigla extends GbTipo {
//   constructor(valor: string, label: string | null = null) {
//     const msg = label ?? 'Sigla';
//     super(valor);
//     if (valor !== undefined) {
//       this.validar([
//         () => CannotBeBlank(valor, msg),
//         () => MustHaveAtLeastXCharacters(valor, msg, 2),
//         () => CannotHaveMoreThanXCharacters(valor, msg, 5),
//         () => MustHaveOnlyOneWord(valor, msg),
//       ]);
//       this.valor = valor?.trim().toUpperCase();
//     }
//   }
// }

// export function CriarSigla(valor: string, label: string | null = null) {
//   return new Sigla(valor, label);
// }
