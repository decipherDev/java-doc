---
title: Local Variable type inference (var)
description: Local Variable type inference (var)
---

## Version
_Added in Java 10_

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
