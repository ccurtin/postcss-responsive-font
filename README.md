# PostCSS Responsive Font [![Build Status][ci-img]][ci]

Set responsive min/max font-sizes within viewport ranges...

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/ccurtin/postcss-responsive-font.svg
[ci]:      https://travis-ci.org/ccurtin/postcss-responsive-font

Adds a new declaration that requires 4 values.

**font-size-responsive:** `min-font-size` `max-font-size` `min-viewport-width` `max-viewport-width`

**Input**:

```css
.foo {
    font-size-responsive:12px 32px 480px 1280px;
}
```

**Output**:
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


**Using Multiple Declarations**

To use multiple declarations, simply place multiple `font-size-responsive` declarations _in normal cascading order_ within `.foo`.

It may be obvious to some, but you do *NOT* want to use `font-size-responsive` within a media query. `font-size-responsive` creates its own media query values based on a user's input so it would not make sense to nest media queries inside of media queries!

Don't forget--using multiple declarations is just like cascading normal CSS-- make sure they are in the appropriate order for the appropriate effect.

To clarify, let's look at a proper example's Input and Output:

**Input**:

```css
.foo {
    font-size-responsive: 30px 60px 980px 1280px;
    font-size-responsive: 15px 45px 767px 980px;
    font-size-responsive: 12px 20px 480px 600px
}
```

**Output**:

```css
.foo {
    font-size: 30px;
    font-size: 15px;
    font-size: 12px
}

@media (min-width: 480px) {
    .foo {
        font-size: 20px
    }
}

@media (min-width: 480px) and (max-width: 600px) {
    .foo {
        font-size: calc(12px + (20 - 12) * ((100vw - 480px) / (600 - 480)))
    }
}

@media (min-width: 767px) {
    .foo {
        font-size: 45px
    }
}

@media (min-width: 767px) and (max-width: 980px) {
    .foo {
        font-size: calc(15px + (45 - 15) * ((100vw - 767px) / (980 - 767)))
    }
}

@media (min-width: 980px) {
    .foo {
        font-size: 60px
    }
}

@media (min-width: 980px) and (max-width: 1280px) {
    .foo {
        font-size: calc(30px + (60 - 30) * ((100vw - 980px) / (1280 - 980)))
    }
}
```

Not properly cascading your styles will cause bugs! but you knew that already :)

**Demo** :
![postcss-responsive-font](https://camo.githubusercontent.com/ad2eed53aceebb2070fdf443dfdf94cb6e84563e/68747470733a2f2f6368726973746f706865726a616d657363757274696e2e636f6d2f746d702f706f73746373732d726573706f6e736976652d666f6e742e676966)


## Usage

```js
postcss([ require('postcss-responsive-font') ])
```

See [PostCSS] docs for examples for your environment.
