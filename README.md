<h1 align="center">
  🧩 TypeScript <code>smart</code> value objects
</h1>

<br/>

# smart-value-objects
A Typescript library of classes aimed to help developers using and undestanding immutable objects.

You are invited to build other value objects with me and together we can expand the scope of this lib. Feel free to contribute code or your opinions.

https://github.com/rtsarakaki/value-objects

## Installation
```
yarn add smart-value-objects
or
npm install smart-value-objects
```
<br/>


## What are value objects?
Value Objects are immutable objects that represent a value within the application domain. They are used to encapsulate and validate values ​​that do not have their own identity. In other words, they are objects that represent a value but do not have a unique identifier.

See too:<br/>
[What are and when to use value objects?](https://branas.io/blog/o-que-sao-e-quando-utilizar-value-objects.html "Article in portuguese by Rodrigo Branas")

<br/>


# 👀 Usage example
```ts
import { GenericEntity } from 'smart-value-objects/dist/Types';
import { CompanyName, ISBN10, ISBN13, Language, PositiveNumber, SingleWord, Title, UUID, createUUID } from 'smart-value-objects/dist/ValueObjects';

export const BookInitial: BookModel = {
  id: '',
  title: '',
  isbn10: '',
  isbn13: '',
  pages: 0,
  language: '',
  publisher: '',
  publishedIn: new Date()
};

export type BookModel = {
  id: string;
  title: string;
  isbn10: string;
  isbn13: string;
  pages: number;
  language: string;
  publisher: string;
  publishedIn: Date
};

export default class Book extends GenericEntity {
  _id: UUID;
  _title: Title;
  _isbn10: ISBN10;
  _isbn13: ISBN13;
  _pages: PositiveNumber;
  _language: Language;
  _publisher: CompanyName;
  _publishedIn: Date

  constructor(public props: BookModel) {
    super();

    this._uid = this.initProp(this, createUUID(props?.id, 'Internal ID'));
    this._title = this.initProp(this, new SingleWord(props?.title, 'Title'));
    this._isbn10 = this.initProp(this, new ISBN10(props?.isbn10, 'ISBN 10'));
    this._isbn13 = this.initProp(this, new ISBN13(props?.isbn13, 'ISBN 13'));
    this._pages = this.initProp(this, new PositiveNumber(props?.pages, 'Title'));
    this._language = this.initProp(this, new Language(props?.language, 'Title'));
    this._publisher = this.initProp(this, new CompanyName(props?.publisher, 'Title'));
    this._publishedIn = props?.publishedIn;
  }

  get id() {
    return this._id.value;
  }

  get key() {
    return this.id;
  }

  get title() {
    return this._title.value;
  }

  get isbn10() {
    return this._isbn10.value;
  }

  get isbn13() {
    return this._isbn13.value;
  }

  get pages() {
    return this._pages.value;
  }

  get language() {
    return this._language.value;
  }

  get publisher() {
    return this._publishedIn;
  }

  get publishedIn() {
    return this._publisher.value;
  }


  toJson() {
    const fields = {
      id: this.uid,
      title: this.title,
      isbn10: this.this.isbn10,
      isbn13: this.isbn13,
      pages: this.pages,
      language: this.language,
      publisher: this.publisher,
      publishedIn: this.publishedIn,
      key: this.uid,
      sort: this.title,
    };
    return fields;
  }
}

```

<br/>

#  Now, lets go in parts

<br/>

## Model DTO

When creating your entities using value objects, you will want to have DTOs to interact with the frontend. So, in this code snippet we create a model to transport and receive data.

```ts
export type BookModel = {
  id: string;
  title: string;
  isbn10: string;
  isbn13: string;
  pages: number;
  language: string;
  publisher: string;
  publishedIn: Date
};
````

<br/>

## Initial state

Now we need an object to set the initial state of entity.

```ts
export const BookInitial: BookModel = {
  id: '',
  title: '',
  isbn10: '',
  isbn13: '',
  pages: 0,
  language: '',
  publisher: '',
  publishedIn: new Date()
};
```

<br/>

## Class declaration

The entity must inherit GenericEntity, which will facilitate the validation of properties and return of errors found when filling out.

```
export default class Book extends GenericEntity {
```

<br/>

## Internal class properties

Here, we start using value objects to define the type of properties.

Note that not all properties need to be a value object. In this example, the `_publishedIn` property is not using a value object from the library, as we understand that a Date type is already an intelligent type and that validates its own content. This case can also be applied to Boolean values ​​that simply receive true or false, or other types that do not have validations or formatting.

```ts
  _id: UUID;
  _title: Title;
  _isbn10: ISBN10;
  _isbn13: ISBN13;
  _pages: PositiveNumber;
  _language: Language;
  _publisher: CompanyName;
  _publishedIn: Date
```

<br/>

## Initializing the entity

The class constructor must receive the object with data with the same type as the model and initialize each of the properties using the ` initProp ` method, which will validate the value object and accumulate errors in the entity's error collection. So after all properties are filled in you will have a list of all errors in the ` errors ` property.

If there is any error in this list, the entity's ` isValid ` property will be ` false ` and if there is no error in the list, then the entity will be valid.

```ts
  constructor(public props: BookModel) {
    super();

    this._uid = this.initProp(this, createUUID(props?.id, 'Internal ID'));
    this._title = this.initProp(this, new SingleWord(props?.title, 'Title'));
    this._isbn10 = this.initProp(this, new ISBN10(props?.isbn10, 'ISBN 10'));
    this._isbn13 = this.initProp(this, new ISBN13(props?.isbn13, 'ISBN 13'));
    this._pages = this.initProp(this, new PositiveNumber(props?.pages, 'Title'));
    this._language = this.initProp(this, new Language(props?.language, 'Title'));
    this._publisher = this.initProp(this, new CompanyName(props?.publisher, 'Title'));
    this._publishedIn = props?.publishedIn;
  }
````

<br/>

## Properties

For each of the properties, you can create a get to expose the value so they can be accessed.

```ts
  get title() {
    return this._title.value;
  }
  ```

<br/>

## Map properties to a json object

The ` toJson() ` method is used to map the entity's values ​​to a json that can be sent by use cases so that the data can be persisted or displayed in fronend.

```ts 
    toJson() {
    const fields = {
      id: this.uid,
      title: this.title,
      isbn10: this.this.isbn10,
      isbn13: this.isbn13,
      pages: this.pages,
      language: this.language,
      publisher: this.publisher,
      publishedIn: this.publishedIn,
      key: this.uid,
      sort: this.title,
    };
    return fields;
  }
  ```