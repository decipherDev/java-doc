---
title: Local Variable type inference (var)
description: Local Variable type inference (var)
---

## Version
_Added in Java 10_

Java 10 introduced var identifier with which local variables can be declared with non-null initializers. It helps to write code that’s easier to read.

> var is a reserved type name, not a keyword, which means that existing code that uses var as a variable, method, or package name is not affected. However, code that uses var as a `class` or `interfae` name is affected and the `class` or `interface` needs to be renamed.

## Places Not to use
- Cannot be used in a method signature
- Cannot be used to declare static variable
- Cannot be used to declare instance variable
- Cannot be initially set to null
  
```java
    var x = null; //Not allowed
    String s = null;
    var i = s; // allowed
    
    var x = "hello";
    x = 1; //Not allowed
```
- Cannot be used with generic type
```Java
    var<String> names = new ArrayList<>(); //ERROR
```

## References
- [JEP286](https://openjdk.org/jeps/286)
