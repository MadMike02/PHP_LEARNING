# functions
```
@function feature($feature-flag) {
    @return map-get($sw-features, $feature-flag);
}
```
# Loop
## for loop
```
@for $i from 1 through 10 {
    .icon-#{$i}x {
        width: $i * $icon-base-size;
        height: $i * $icon-base-size;
    }
}
```
## each loop
```
@each $color, $value in $theme-colors {
    .alert-#{$color} {
        .icon {
            color: $value;
        }
    }
}
```

# variables
- `$search-suggest-zindex: 1000 !default;`
- `$spacer-xs: ( $spacer * 0.25 ) !default;`
- `$app-css-relative-asset-path: '../../' + $theme-id + '/assets' !default;`

# Mixins
## declaration

```
@mixin truncate-multiline($line-height: 1.2em, $line-count: 2, $bg-color: white) {
    overflow: hidden;
    line-height: $line-height;
    height: $line-height * $line-count;
}
```
## Usage
```
@include truncate-multiline(1.5em, 2, $sw-background-color);
```
### example - 
```
.product-variant-characteristics-text {
    @include truncate-multiline(1.5em, 2, $sw-background-color);

    font-size: $font-size-sm;
}
```

# Selector
- & -->> refer as outer selector
```
.class{
    .classB{
        ...
    }
    &:hover{
        ...
    }
    .icon > svg {
        top: 0;
    }
}
```

# @extends
- To use style of another class in class and add more stlye in that
```
.sticky-top{
    color:red;
    ...
}
 .offcanvas-footer {
        @extend .sticky-top;
        bottom: 0;
        top: auto;
    }
```
