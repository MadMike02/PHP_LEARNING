# USEFUL URLS
- https://www.toptal.com/php/10-most-common-mistakes-php-programmers-make

# ABOUT PSR
- The `PHP Standard Recommendation (PSR)` is a PHP specification published by the `PHP Framework Interoperability Group (PHP-FIG)`. It serves the standardization of programming concepts in PHP. The aim is to enable interoperability of components. The `PHP-FIG is formed by several PHP frameworks founders`.

# OLD - PSR-0 (Depricated in 2014), NEW- PSR-4  : Autoloading Standard
- https://www.php-fig.org/psr/psr-4/
- use namespaces as directory paths for autoloading classes, interface, traits.
- format- ` \<NamespaceName>(\<SubNamespaceNames>)*\<ClassName>`

# PSR-1: Basic Coding Standard
- https://www.php-fig.org/psr/psr-1/

- Standards related to code structure

- Files MUST use only <?php(`<?php ?>`) and <?= (`<?= ?>`) tags.
- Files MUST use only UTF-8 without BOM for PHP code.
- Files SHOULD `either declare symbols` (classes, functions, constants, etc.) or `cause side-effects` (e.g. generate output, change .ini settings, etc.) but SHOULD NOT do both.
- Namespaces and classes MUST follow an "autoloading" PSR: [PSR-0, PSR-4].
- Class names MUST be declared in StudlyCaps.
- Class constants MUST be declared in all upper case with underscore separators.
- Method names MUST be declared in camelCase.