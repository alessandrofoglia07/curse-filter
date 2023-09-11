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
filter('fuck you', 'en'); // '*** you'
filter('fuck you, coglione', ['en', 'it']); // '*** you, ***'
filter('fuck you, coglione', ['en', 'it'], 'customPlaceholder'); // 'customPlaceholder you, customPlaceholder'
```

Alternately, if you want to **reduce filtering time**, you can pass as second parameter a string of an array of string (all supported languages).

```typescript
import { filter } from 'curse-filter';

const str = '<...>';

filter(str); // automatically selects all languages
filter(str, 'en');
filter(str, ['en', 'es', 'fr', 'it']);
```

### **`detect()`**

The `detect()` function will return a boolean representing whether or not curse words are in a string.

```typescript
import { detect } from 'curse-filter';

// you can select the languages to detect in the second argument, like in the `filter()` function

console.log(detect('Fuck you')); // true
console.log(detect('Fuck you', 'en')); // true
console.log(detect('Fuck you', ['en', 'fr'])); // true
console.log(detect('Fuckyou', 'en')); // false, view next paragraph.
console.log(detect('I love you')); // false
```

For more rigid use cases, you can use rigidMode option to also detect curse words that are part of bigger words (For example, for hiding them!).

```typescript
import { detect } from 'curse-filter';

console.log(detect('Fuckyou', 'en')); // false, the word "Fuck" is inside of a bigger word: "Fuckyou"
console.log(detect('Fuckyou', 'en', { rigidMode: true })); // true, the word "Fuck" is detected even if part of a bigger word
```

## **Promise versions**

You can access promise versions of filter and detect functions from `curse-filter/promises`.

```ts
import { filter, detect } from 'curse-filter/promises';

const main = async () => {
    const filtered = await filter('Fuck you');
    const detected = await detect('Fuck you');

    console.log(filtered, detected); // '*** you', true
};

main();
```

### **`SupportedLang` type**

```typescript
import { SupportedLang } from 'curse-filter';

const lang: SupportedLang = 'en';
```

## License

[MIT](https://github.com/alessandrofoglia07/curse-filter/blob/main/LICENSE)
