// /* eslint-disable new-cap */
// import {
//   MustContainOnlyNumbers,
//   MustHaveAtLeastXCharacters,
//   CannotStartWithZero,
//   CannotBeBlank,
//   CannotHaveMoreThanXCharacters,
// } from '../../exceptions/valor-invalido.exception';
// import GbTipo from '../_base.type';

// export class CentroDeCusto extends GbTipo {
//   constructor(valor: string, label: string) {
//     const msg = label ?? 'Nome';
//     super(valor);
//     if (valor !== undefined) {
//       this.validar([
//         () => CannotBeBlank(valor, msg),
//         () => CannotStartWithZero(valor, msg),
//         () => MustContainOnlyNumbers(valor, msg),
//         () => MustHaveAtLeastXCharacters(valor, msg, 6),
//         () => CannotHaveMoreThanXCharacters(valor, msg, 7),
//       ]);
//     }
//   }
// }

// export function CriarCentroDeCusto(valor: string, label: string) {
//   return new CentroDeCusto(valor, label);
// }
