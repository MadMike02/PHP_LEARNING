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

# OLD- PSR-2(Coding Style Guide) NEW PSR-12(Extended Coding Style)
- https://www.php-fig.org/psr/psr-2/
- Concerns with styling of code
- Code MUST follow a "coding style guide" PSR [PSR-1].
- Code MUST use 4 spaces for indenting, not tabs.
- There MUST NOT be a hard limit on line length; the soft limit MUST be 120 characters; lines SHOULD be 80 characters or less.
- There MUST be one blank line after the namespace declaration, and there MUST be one blank line after the block of use declarations.
- Opening braces for classes MUST go on the next line, and closing braces MUST go on the next line after the body.
- Opening braces for methods MUST go on the next line, and closing braces MUST go on the next line after the body.
- Visibility MUST be declared on all properties and methods; abstract and final MUST be declared before the visibility; static MUST be declared after the visibility.
- Control structure keywords MUST have one space after them; method and function calls MUST NOT.
- Opening braces for control structures MUST go on the same line, and closing braces MUST go on the next line after the body.
- Opening parentheses for control structures MUST NOT have a space after them, and closing parentheses for control structures MUST NOT have a space before.

# PSR- 3 : Logger Interface
- https://www.php-fig.org/psr/psr-3/
- Concerns with implementing logging in framework or app. Use the class `Psr\Log\LoggerInterface` for loggin.
- Supports 8 level of logging `debug, info, notice, warning, error, critical, alert, emergency`.