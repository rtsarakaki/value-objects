// /* eslint-disable new-cap */
// import {
//   MustHaveOnlyOneWord,
//   MustHaveAtLeastXCharacters,
//   IsValidEmail,
//   CannotBeBlank,
//   CannotHaveMoreThanXCharacters,
// } from '../../exceptions/valor-invalido.exception';
// import GbTipo from '../_base.type';

// export class Email extends GbTipo {
//   constructor(valor: string, label: string | null = null) {
//     const msg = label ?? 'Palavra';
//     super(valor);
//     if (valor !== undefined) {
//       this.validar([
//         () => CannotBeBlank(valor, msg),
//         () => MustHaveAtLeastXCharacters(valor, msg, 1),
//         () => CannotHaveMoreThanXCharacters(valor, msg, 80),
//         () => MustHaveOnlyOneWord(valor, msg),
//         () => IsValidEmail(valor, msg),
//       ]);
//       this.valor = valor?.trim().toLowerCase();
//     }
//   }
// }

// export function CriarEmail(valor: string, label: string | null = null) {
//   return new Email(valor, label);
// }
