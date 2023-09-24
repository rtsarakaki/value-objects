// export class Colecao<T, M> {
//   private _items: T[];
//   private _mapFn: any;

//   constructor(items: M[], mapFn: (item: M) => T) {
//     this._mapFn = mapFn; 
//     this._items = items.map(item => mapFn(item));
//   }

//   adicionar(item: M) {
//     const mappedItem = this._mapFn(item);
//     this._items.push(mappedItem);
//   }

//   remover(item: M) {
//     const index = this._items.findIndex(i => i === this._mapFn(item));
//     if (index > -1) {
//       this._items.splice(index, 1);
//     }
//   }

//   obterTodos(): T[] {
//     return this._items;
//   }
// }




