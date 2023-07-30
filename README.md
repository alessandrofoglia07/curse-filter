<div align='center'>

<br>

# **curse-filter**

**curse-filter** is a Node.js module that allows you to filter out curse words (from multiple languages) from a string.

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

### **supportedLangs**

```typescript
import { supportedLangs } from 'curse-filter';

console.log(supportedLangs); // This will log an array of supported languages
```

### **filter()**

```typescript
import { filter } from 'curse-filter';

const result = filter('Fuck you');

console.log(result); // "*** you"
```

Alternately, if you want to **reduce filtering time**, you can pass as second parameter a string of an array of string (all supported languages).

```typescript
import { filter } from 'curse-filter';

const str = '<...>';

filter(str); // automatically selects all languages
filter(str, 'en');
filter(str, ['en', 'es', 'fr', 'it']);
```

### **filterAsync()**

The filter() function, also has an asynchronous version

```typescript
import { filterAsync } from 'curse-filter';

filterAsync('Fuck you')
    .then((filteredString) => {
        console.log(filteredString); // "*** you"
    })
    .catch((error) => {
        console.log(error);
    });
```

### **SupportedLang type**

```typescript
import { SupportedLang } from 'curse-filter';

const lang: SupportedLang = 'en';
```

## License

[MIT](https://github.com/alessandrofoglia07/curse-filter/blob/main/LICENSE)
