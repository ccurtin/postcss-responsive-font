# PostCSS Responsive Font [![Build Status][ci-img]][ci]

Set responsive min/max font-sizes within viewport ranges...

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/ccurtin/postcss-responsive-font.svg
[ci]:      https://travis-ci.org/ccurtin/postcss-responsive-font

Adds a new declaration that has 4 values.

`font-size-responsive:` `min-font-size` `max-font-size` `min-viewport-width` `max-viewport-width`

```css
.foo {
    font-size-responsive:12px 32px 480px 1280px;
}
```

```css
.foo {
    font-size:12px;
}
@media (min-width:480px) {
    .foo {
        font-size: 32px
    }
}
@media (min-width:480px) and (max-width:1280px) {
    .foo {
        font-size: calc(12px + (32 - 12) * ((100vw - 480px) / (1280 - 480)))
    }
}
```

## Usage

```js
postcss([ require('postcss-responsive-font') ])
```

See [PostCSS] docs for examples for your environment.
