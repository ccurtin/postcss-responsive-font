# PostCSS Responsive Font [![Build Status][ci-img]][ci]

Set responsive min/max font-sizes within viewport ranges...

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/ccurtin/postcss-responsive-font.svg
[ci]:      https://travis-ci.org/ccurtin/postcss-responsive-font

Adds a new declaration that requires 4 values.

*font-size-responsive:* `min-font-size` `max-font-size` `min-viewport-width` `max-viewport-width`

*Input*: 

```css
.foo {
    font-size-responsive:12px 32px 480px 1280px;
}
```

*Output*: 
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


*Demo* :
![postcss-responsive-font](https://camo.githubusercontent.com/ad2eed53aceebb2070fdf443dfdf94cb6e84563e/68747470733a2f2f6368726973746f706865726a616d657363757274696e2e636f6d2f746d702f706f73746373732d726573706f6e736976652d666f6e742e676966)


## Usage

```js
postcss([ require('postcss-responsive-font') ])
```

See [PostCSS] docs for examples for your environment.
