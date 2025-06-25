---
title: Java Stream Coding Snippets
description: Java Stream Coding Snippets
---

#### Collectors.groupingBy
> Module: java.base
> Package: java.util.stream

`Function<? super T, ? extends K> classifier`
- It's a key function that groupingBy method uses to determine which group each element
belongs to.

`Supplier<M> mapFactory`
- It allows you to specify the type of Map (e.g., HashMap, TreeMap) to be used for storing the grouped elements.
If not provided, a HashMap is used by default.

`Collector<? super T, A, D> downstream`
- It specifies how to further process the elements within each group.

```java copy
Collectors.groupingBy(Function<? super T, ? extends K> classifier)
Collectors.groupingBy(Function<? super T, ? extends K> classifier, Collector<? super T, A, D> downstream)
Collectors.groupingBy(Function<? super T, ? extends K> classifier, Supplier<M> mapFactory, Collector<? super T, A, D> downstream)
```

## Group employee on the basis of department
```java copy
List.of(new Employee("Arun", "Engineering"), 
        new Employee("Brijesh", "Devops"), 
        new Employee("Reema", "HR"))
     .stream()
     .collect(Collectors.groupingBy(Employee::department));
```
## Find the average, sum, min, max, count
```java copy
List<Integer> in = List.of(1,12,3,13,4,14,6,16,7,8);
IntSummaryStatistics stats = in.stream().mapToInt(c -> c.intValue()).summaryStatistics();
int min = stats.getMin();
int max = stats.getMax();
double avg = stats.getAverage();
long sum = stats.getSum();
```

##### output

```
1
16
8.4
84
```

## Find the frequency of the characters
```java copy
String s = "hello";
Map<Character, Long> charFreqMap =  s.chars()
 .mapToObj(s -> (char)s)
 .collect(Collectors.groupingBy(s -> s, Collectors.counting()));
```

## Find the first non repeating character from a String
```java copy
 "hello".chars()
        .mapToObj(c -> (char)c)
        .collect(Collectors.groupingBy(c -> c, LinkedHashMap::new, Collectors.counting()))
        .entrySet()
        .stream()
        .filter(e -> e.getValue() == 1)
        .map(e -> e.getKey())
        .findFirst()
        .get();
```

## Find the duplicates and print them in sorted order

```java copy
"nonrepeatingword".chars()
       .mapToObj(c -> (char) c)
       .collect(Collectors.groupingBy(Function.identity(), TreeMap::new, Collectors.counting()))
       .entrySet()
       .stream()
       .filter(e -> e.getValue() != 1)
       .map(e -> e.getKey())
       .forEach(key -> System.out.print(key+" "));
```

## Convert the list into an Array

```java copy
int[] arr = List.of(1,2,3,4,5).stream().mapToInt(x -> Integer.valueOf(x)).toArray();

Integer[] arr = List.of(1,2,3,4,5).toArray(new Integer[0]);

or

Integer[] arr = List.of(1,2,3,4,5).toArray(Integer[]::new);


String[] arr = List.of("A", "B", "C").toArray(new String[0]);
 
 or 
 
String[] arr = List.of("A", "B", "C").toArray(String[]::new);
```

## Print prime numbers from 0 to n

```java copy
var upperLimit = 100;
IntPredicate isPrime = (num) -> IntStream.rangeClosed(2, (int) Math.sqrt(num))
                                         .noneMatch(i -> num % i == 0);
List<Integer> primeNos = IntStream.rangeClosed(2, upperLimit)
                                  .filter(isPrime)
                                  .boxed()
                                  .collect(Collectors.toList());
```

## Find the perfect number in within the given range

##### code
```java
IntStream.range(1, 100).filter(x -> 
	         IntStream.range(1, x)
	                  .filter(y -> x%y == 0)
	                  .sum() == x
	      ).forEach(System.out::println);
```

##### output
```
6
28
```

## Find the kth maximum from the 2-D array using Java streams

##### code
```java
int[][] arr = new int[]{{0,1},{2,3},{4,5},{6,7},{8,9,10}};
int k = 4;
Arrays.stream(arr)
      .flatMapToInt(a -> Arrays.stream(a))
      .boxed()
      .sorted(Comparator.reverseOrder())
      .skip(k-1)
      .findFirst()
      .get()
```

> In the above example we have used boxed() as the `IntStream.sorted()` only sorts in natural order and doesn't take any arguments. Had the question been to find the smallest kth number then `Arrays.stream(arr).flatMapToInt(a -> Arrays.stream(a)).boxed().sorted().skip(k-1).findFirst().getAsInt()`

#### output

```
7
```

## Find the largest repeating word from the list of strings

```java
List<String> words = List.of("Red", "Orange", "Blue", "Red", "Red", "Blue", "Blue", "Red", "Red");
String highestFreqWord = words.stream()
							  .collect(
									Collectors.groupingBy(
										s -> s,
										Collectors.counting())
							   ).entrySet()
							   .stream()
							   .max(Comparator.comparing(
									Map.Entry::getValue)
							   ).get()
							   .getKey();
```
#### output

```
highestFreqWord ==> "Red"
```