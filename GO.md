# Intro
- Go is a procedural programming language
- Programs are assembled by using packages, for efficient management of dependencies.
- Go is a statically typed, concurrent, and garbage-collected programming language created at Google in 2009.
- It is designed to be simple, efficient, and easy to learn, making it a popular choice for building `scalable network services`, `web applications`, and `command-line` tools.
- Go is known for its `support for concurrency`, which is the `ability to run multiple tasks simultaneously`. C`oncurrency is achieved` in Go through the `use of Goroutines and Channels`, which allow you to write code that can `run multiple operations at the same time`. This makes Go an ideal choice for `building high-performance` and `scalable network services`, as well as for `solving complex computational problems`.
- Another important feature of Go is its `garbage collection`, which `automatically manages memory for you`. This `eliminates the need for manual memory management`, `reducing the likelihood of memory leaks` and other bugs that can arise from manual memory management.

# Installation
https://go.dev/doc/install


# features of Go
- `Simplicity`: Go is designed to be easy to learn and use. Its syntax is simple and straightforward, making it a good choice for beginners and experienced programmers alike.
- `Concurrency`: Go has `built-in support for concurrency`, allowing developers to `write efficient and scalable code for multicore and distributed systems`.
- `Garbage collection`: Go has automatic memory management, which frees developers from having to worry about memory allocation and deallocation.
- `Fast compile times`: Go has a `fast compiler`, which makes it easy to iterate quickly during development.
- `Cross-platform support`: Go can be compiled to run on many different platforms, including Windows, Linux, and macOS.
- `Strong typing`: Go is a `statically typed language`, which helps catch errors at compile time rather than at runtime.
- Go has a large and growing community of developers and is used by many well-known companies, including Google, Uber, and Dropbox.

Go is a powerful and efficient programming language that is well-suited for building modern applications and distributed systems. Its strong support for concurrency and minimalist syntax make it an attractive choice for developers who want to build scalable and efficient applications.


# SYNTEX

## HELLO WORLD
```
package main

import "fmt"

func main() {
    //print statement
	fmt.Println("hello world")

    //string and var
    fmt.Println("1 + 1 =", 1 + 1)
}
```
- **Line 1**: It contains the package main of the program, which have overall content of the program.It is the initial point to run the program, So it is compulsory to write.
- **Line 2**: It contains import “fmt”, it is a preprocessor command which tells the compiler to include the files lying in the package.
- **Line 3**: main function, it is beginning of execution of program.
- **Line 4**: fmt.Println() is a standard library function to print something as a output on screen.In this, fmt package has transmitted Println method which is used to display the output.
- **Comment**: Comments are used for explaining code and are used in similar manner as in Java or C or C++. Compilers ignore the comment entries and does not execute them. Comments can be of single line or multiple lines.

```
package main

import (
	"fmt"
	"math/rand",
    "math"
)

func main() {
    //print in new line
	fmt.Println("My favorite number is", rand.Intn(10))

    //for string values print
    fmt.Printf("Now you have %g problems.\n", math.Sqrt(7))
}
```

- `a name is exported if it begins with a capital letter` - rand.Intn() not rand.intn()

## Function
package main

```
import "fmt"

//If same type then `x, y int`
func add(x int, y int) int {
	return x + y
}

func main() {
	fmt.Println(add(42, 13))
}
```

## Multiple return and := operator

```
package main

import "fmt"

func swap(x, y string) (string, string) {
	return y, x
}

func main() {
	a, b := swap("hello", "world")
	fmt.Println(a, b)
}
```

##  Named return values
- A `return statement without arguments` `returns the named return values`. This is known as a "naked" return.
```
package main

import "fmt"

func split(sum int) (x, y int) {
	x = sum * 4 / 9
    y= sum - x (if y not defined here then it will return as 0)
	return
}

func main() {
	fmt.Println(split(17))
}
```

## Variables
```
package main

import "fmt"

//package scope vars
var c, python, java bool

func main() {
    //function scope vars
	var i int
	fmt.Println(i, c, python, java)
}
```

## Variables with initializers
```
package main

import "fmt"

//both value needed for assignment
var i, j int = 1, 2 

func main() {
	var c, python, java = true, false, "no!"
	fmt.Println(i, j, c, python, java)
}
```

## Short variable declarations
- Inside a function, the := short assignment statement can be used in place of a var declaration with implicit type.

- Outside a function, every statement begins with a keyword (var, func, and so on) and so the := construct is not available.

```
package main

import "fmt"

func main() {
	var i, j int = 1, 2
	//without defining type, defining value
    k := "mm"
	c, python, java := true, false, "no!"

	fmt.Println(i, j, k, c, python, java)
}

```