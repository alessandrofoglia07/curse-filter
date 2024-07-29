<div align='center'>

<br>

# **curse-filter**

**curse-filter** is a fully-equipped Node.js library that simplifies profanity filtering in _15+ different languages_.

[![npm version](https://img.shields.io/npm/v/curse-filter.svg?style=flat-square)](https://www.npmjs.org/package/curse-filter)
[![install size](https://packagephobia.com/badge?p=curse-filter@latest)](https://packagephobia.com/result?p=curse-filter@latest)
[![GitHub](https://img.shields.io/github/license/alessandrofoglia07/curse-filter)](https://github.com/alessandrofoglia07/curse-filter/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/alessandrofoglia07/curse-filter)](https://github.com/alessandrofoglia07/curse-filter)

<br>
</div>

## Installation

```bash
npm install curse-filter
```

## Loading the module

### ESM / Typescript

This module is first thought for Typescript/ESM, so this is the recommended way to load it.

```typescript
import { filter } from 'curse-filter';
```

### Note

Profanity language is used in this README for demonstration purposes only. Please be respectful.

## Usage

### **`supportedLangs`**

```typescript
import { supportedLangs } from 'curse-filter';

console.log(supportedLangs); // This will log an array of supported languages
```

### **`filter()`**

The `filter()` function will return a string with all curse words replaced with asterisks ("\*\*\*").

```typescript
import { filter } from 'curse-filter';

filter('fuck you'); // '*** you'
filter('fuck you', { lang: 'en' }); // '*** you'
filter('fuck you, coglione', { lang: ['en', 'it'] }); // '*** you, ***'
filter('fuck you, coglione', { lang: ['en', 'it'], placeholder: 'customPlaceholder' }); // 'customPlaceholder you, customPlaceholder'
```

Note that the fewer languages you pass to the function's options object, the faster the filtering will be.

### **`detect()`**

The `detect()` function will return a boolean representing whether or not curse words are in a string.

```typescript
import { detect } from 'curse-filter';

// you can select the languages to detect in the second argument, like in the `filter()` function

detect('Fuck you'); // true
detect('Fuck you', { lang: 'en' }); // true
detect('Fuck you', { lang: ['en', 'fr'] }); // true
detect('I love you'); // false
detect('Fuckyou', { lang: 'en' }); // false, view next paragraph.
```

For more **rigid use cases**, you can use `rigidMode` option to also detect curse words that are part of bigger words.

```typescript
import { detect } from 'curse-filter';

detect('Fuckyou', { lang: 'en' }); // false, the word "Fuck" is inside of a bigger word: "Fuckyou"
detect('Fuckyou', { lang: 'en', rigidMode: true }); // true, the word "Fuck" is detected even if part of a bigger word
```

## **Promise versions**

You can access promise versions of filter and detect functions from `curse-filter/promises`.

```ts
import { filter, detect } from 'curse-filter/promises';

await filter('Fuck you'); // '*** you'
await detect('Fuck you'); // true
```

## **Adding custom keywords to search for**

curse-filter offers a nice and familiar way to add strings or arrays of strings to the words to search for with the `CustomKeywords` [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)-like object.

```ts
import { filter, CustomKeywords } from 'curse-filter';

CustomKeywords.add('Hello'); // Hello

// Custom method of CustomKeywords object
CustomKeywords.addKeywords('Hey', 'Hi', ['Bonjour', 'Ciao']); // Hello, Hey, Hi, Bonjour, Ciao

// The filter and detect functions automatically look for custom keywords added to the object
filter('Hey John!'); // '*** John!'
```

## **Express.js middlewares**

curse-filter comes with built-in `express.js` middlewares.

### **`detectMiddleware`** middleware

The `detectMiddleware` middleware analizes the whole `req.body` object for curses.

```ts
import express, { Request, Response } from 'express';
import { detectMiddleware } from 'curse-filter';
import { registerUserToDB } from './db';

const app = express();

app.use(express.json());

app.post('/register', detectMiddleware, async (req: Request, res: Response) => {
    /* If the request body contains curse words, the middleware will automatically 
    send a 422 response with a message containing the detected curse words.
    If no curse words are detected, the middleware will call the next() function. */

    await registerUserToDB(req.body);

    res.status(200).json({ message: 'User registered!' });
});
```

You can configure the middleware with the following options:

```ts
// Class for configuring the middleware
import { MiddlewaresConfig } from 'curse-filter';

// Default values:

MiddlewareConfig.onError = null; // Called when a curse word is detected, before sending the response

MiddlewareConfig.detectOptions = {}; // Options for the detect function

MiddlewareConfig.errorMessage = 'Not allowed content detected.'; // Message sent in the response

MiddlewareConfig.statusCode = 422; // Status code sent in the response
```

## **Typescript**

### **`SupportedLang` type**

```typescript
import { SupportedLang } from 'curse-filter';

const lang: SupportedLang = 'en';
```

### **`Custom Set interfaces`**

```ts
// KeywordsSet is a Set<string> with a custom addKeywords method
import type { KeywordsSet } from 'curse-filter';
```

```ts
// KeywordsSetConstructor is a SetConstructor with a custom addKeywords method
import type { KeywordsSetConstructor } from 'curse-filter';
```

## License

[MIT](https://github.com/alessandrofoglia07/curse-filter/blob/main/LICENSE)

<br>

<div align='center'>

Made with 💜 by [alessandrofoglia07](https://github.com/alessandrofoglia07)

</div>
