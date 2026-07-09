# Loop Debugging Visual Demo

**Demo of Loop Criteria Highlighting Enhancement**

This document demonstrates what users will see when debugging loops with the new loop criteria highlighting feature.

---

## Demo 1: FOR Loop - Sum List

### Formula
```
$total = 0
$numbers = [10, 20, 30]

FOR $num IN $numbers DO
  $total = $total + $num
END

RETURN $total
```

### Debug Session Visualization

#### Step 1: Initialize total
```
Line 1: $total = 0          ← Current Step
        👻 0 NUMBER

Line 2: $numbers = [10, 20, 30]
Line 3: 
Line 4: FOR $num IN $numbers DO
Line 5:   $total = $total + $num
Line 6: END
Line 7:
Line 8: RETURN $total
```

#### Step 2: Initialize numbers list
```
Line 1: $total = 0
        👻 0 NUMBER

Line 2: $numbers = [10, 20, 30]     ← Current Step
        👻 [10, 20, 30] ARRAY

Line 3: 
Line 4: FOR $num IN $numbers DO
Line 5:   $total = $total + $num
Line 6: END
```

#### Step 3: First iteration - $num = 10
```
Line 1: $total = 0
        👻 0 NUMBER

Line 2: $numbers = [10, 20, 30]
        👻 [10, 20, 30] ARRAY

Line 4: FOR $num IN $numbers DO     ← Current Step ⭐ NEW!
        👻 FOR $num = 10

Line 5:   $total = $total + $num
Line 6: END
```

#### Step 4: Add to total (first iteration)
```
Line 1: $total = 0
        👻 0 NUMBER

Line 2: $numbers = [10, 20, 30]
        👻 [10, 20, 30] ARRAY

Line 4: FOR $num IN $numbers DO
        👻 FOR $num = 10

Line 5:   $total = $total + $num    ← Current Step
        👻 10 NUMBER

Line 6: END
```

#### Step 5: Second iteration - $num = 20
```
Line 1: $total = 0
        👻 0 NUMBER

Line 2: $numbers = [10, 20, 30]
        👻 [10, 20, 30] ARRAY

Line 4: FOR $num IN $numbers DO     ← Current Step ⭐ NEW!
        👻 FOR $num = 20

Line 5:   $total = $total + $num
Line 6: END
```

#### Step 6: Add to total (second iteration)
```
Line 4: FOR $num IN $numbers DO
        👻 FOR $num = 20

Line 5:   $total = $total + $num    ← Current Step
        👻 30 NUMBER

Line 6: END
```

#### Step 7: Third iteration - $num = 30
```
Line 4: FOR $num IN $numbers DO     ← Current Step ⭐ NEW!
        👻 FOR $num = 30

Line 5:   $total = $total + $num
Line 6: END
```

#### Step 8: Add to total (third iteration)
```
Line 4: FOR $num IN $numbers DO
        👻 FOR $num = 30

Line 5:   $total = $total + $num    ← Current Step
        👻 60 NUMBER

Line 6: END
```

#### Step 9: Return final result
```
Line 8: RETURN $total               ← Current Step
        👻 60 NUMBER
```

### Key Features Demonstrated

✅ **FOR line highlights on each iteration** (Lines marked ⭐ NEW!)  
✅ **Ghost value shows current iterator value** (`$num = 10`, `$num = 20`, `$num = 30`)  
✅ **Users can see loop progression** step by step  
✅ **Clear when loop completes** (no more iterations after $num = 30)

---

## Demo 2: WHILE Loop - Count to 5

### Formula
```
$count = 1
$sum = 0

WHILE $count <= 5 DO
  $sum = $sum + $count
  $count = $count + 1
END

RETURN $sum
```

### Debug Session Visualization

#### Step 1-2: Initialize variables
```
Line 1: $count = 1          ← Step 1
        👻 1 NUMBER

Line 2: $sum = 0            ← Step 2
        👻 0 NUMBER

Line 4: WHILE $count <= 5 DO
Line 5:   $sum = $sum + $count
Line 6:   $count = $count + 1
Line 7: END
```

#### Step 3: First condition check - TRUE
```
Line 1: $count = 1
        👻 1 NUMBER

Line 2: $sum = 0
        👻 0 NUMBER

Line 4: WHILE $count <= 5 DO         ← Current Step ⭐ NEW!
        👻 WHILE 1 <= 5 = true BOOLEAN

Line 5:   $sum = $sum + $count
Line 6:   $count = $count + 1
Line 7: END
```

#### Step 4-5: Execute loop body (first iteration)
```
Line 4: WHILE $count <= 5 DO
        👻 WHILE 1 <= 5 = true BOOLEAN

Line 5:   $sum = $sum + $count       ← Step 4
        👻 1 NUMBER

Line 6:   $count = $count + 1        ← Step 5
        👻 2 NUMBER

Line 7: END
```

#### Step 6: Second condition check - TRUE
```
Line 1: $count = 1
        👻 1 NUMBER

Line 2: $sum = 0
        👻 0 NUMBER

Line 4: WHILE $count <= 5 DO         ← Current Step ⭐ NEW!
        👻 WHILE 2 <= 5 = true BOOLEAN

Line 5:   $sum = $sum + $count
Line 6:   $count = $count + 1
Line 7: END
```

#### [Steps 7-14: Continue iterations...]

Each iteration shows:
1. WHILE line with condition evaluation
2. Body execution (sum update, count increment)
3. Back to WHILE line for next check

#### Step 15: Fifth condition check - TRUE (last true)
```
Line 4: WHILE $count <= 5 DO         ← Current Step ⭐ NEW!
        👻 WHILE 5 <= 5 = true BOOLEAN

Line 5:   $sum = $sum + $count
Line 6:   $count = $count + 1
Line 7: END
```

#### Step 16-17: Execute loop body (fifth iteration)
```
Line 4: WHILE $count <= 5 DO
        👻 WHILE 5 <= 5 = true BOOLEAN

Line 5:   $sum = $sum + $count       ← Step 16
        👻 15 NUMBER

Line 6:   $count = $count + 1        ← Step 17
        👻 6 NUMBER

Line 7: END
```

#### Step 18: Sixth condition check - FALSE (loop exits!)
```
Line 4: WHILE $count <= 5 DO         ← Current Step ⭐ NEW!
        👻 WHILE 6 <= 5 = false BOOLEAN  ⚠️ FALSE - Loop exits!

Line 5:   $sum = $sum + $count
Line 6:   $count = $count + 1
Line 7: END
Line 8:
Line 9: RETURN $sum
```

#### Step 19: Return result
```
Line 9: RETURN $sum                  ← Current Step
        👻 15 NUMBER
```

### Key Features Demonstrated

✅ **WHILE line highlights on EVERY condition check** (Lines marked ⭐ NEW!)  
✅ **Ghost value shows full condition evaluation** (`1 <= 5 = true`, `2 <= 5 = true`, etc.)  
✅ **Clear when condition becomes FALSE** (`6 <= 5 = false`)  
✅ **Users see exact loop termination point**  
✅ **Complete transparency** of loop logic

---

## Demo 3: WHILE Loop with BREAK

### Formula
```
$value = 1

WHILE $value < 1000 DO
  $value = $value * 2
  
  IF $value > 100 THEN
    BREAK
  END
END

RETURN $value
```

### Key Steps

#### First few iterations
```
Step 1: WHILE 1 < 1000 = true BOOLEAN     ← Loop continues
Step 2:   $value = $value * 2 = 2
Step 3: WHILE 2 < 1000 = true BOOLEAN     ← Loop continues
Step 4:   $value = $value * 2 = 4
...
```

#### Critical iteration - BREAK triggered
```
Step N:   WHILE 64 < 1000 = true BOOLEAN  ← Loop continues
Step N+1:   $value = $value * 2 = 128 NUMBER
Step N+2:   IF 128 > 100 THEN              ← Condition true
Step N+3:     BREAK                        ← BREAK executed, exits loop
Step N+4: RETURN $value = 128 NUMBER       ← Next line after loop
```

### Key Features Demonstrated

✅ **WHILE condition shown before BREAK**  
✅ **Loop exits immediately on BREAK**  
✅ **No additional WHILE check after BREAK** (would be false anyway)  
✅ **Clear control flow** through conditional BREAK

---

## Demo 4: FOR Loop with CONTINUE

### Formula
```
$sum = 0
$values = [10, -5, 20, -3, 15]

FOR $value IN $values DO
  IF $value < 0 THEN
    CONTINUE
  END
  $sum = $sum + $value
END

RETURN $sum
```

### Key Steps

#### First iteration (positive value)
```
Step 1: FOR $value = 10                    ⭐ NEW!
Step 2:   IF 10 < 0 THEN                   ← FALSE, skip CONTINUE
Step 3:   $sum = $sum + 10 = 10 NUMBER
```

#### Second iteration (negative value - CONTINUE)
```
Step 4: FOR $value = -5                    ⭐ NEW!
Step 5:   IF -5 < 0 THEN                   ← TRUE, execute CONTINUE
Step 6:     CONTINUE                       ← Skip rest of loop body
[Back to FOR line for next iteration]
```

#### Third iteration (positive value)
```
Step 7: FOR $value = 20                    ⭐ NEW!
Step 8:   IF 20 < 0 THEN                   ← FALSE, skip CONTINUE
Step 9:   $sum = $sum + 20 = 30 NUMBER
```

### Key Features Demonstrated

✅ **FOR shows every iteration**, even skipped ones  
✅ **CONTINUE iterations still show iterator value**  
✅ **Clear which values were processed vs skipped**  
✅ **Complete loop transparency**

---

## User Benefits

### 1. Learning
New users can see:
- How loops iterate step by step
- When conditions become true/false
- How BREAK and CONTINUE work
- Loop control flow patterns

### 2. Debugging
Experienced users can identify:
- Off-by-one errors (`<= 10` vs `< 10`)
- Infinite loops (condition never false)
- Unexpected iterator values
- Logic errors in loop conditions

### 3. Verification
Users can confirm:
- Loop processes all expected values
- Condition triggers at right time
- BREAK exits at correct point
- CONTINUE skips correct iterations

---

## Technical Notes

### Performance
- Each loop iteration adds ONE trace step for the condition/iterator
- WHILE loop with 10 iterations: +10 steps showing condition checks
- FOR loop with 5 items: +5 steps showing iterator values
- Minimal overhead, massive debugging value

### Consistency
Loop constructs now match other statements:
- All executable lines produce trace steps
- All trace steps show results
- All results displayed as ghost values
- Predictable step-through behavior

---

## Comparison: Before vs After

### BEFORE (No Loop Criteria Tracing)
```
Step 1: $count = 1
Step 2: $sum = 0
[Mystery happens - loop executes but no trace steps]
Step 3: RETURN 55
```
❌ Users can't see loop execution  
❌ Can't debug loop conditions  
❌ Black box behavior

### AFTER (With Loop Criteria Tracing)
```
Step 1: $count = 1
Step 2: $sum = 0
Step 3: WHILE $count <= 10 = true BOOLEAN   ⭐
Step 4:   $sum = $sum + $count
Step 5:   $count = $count + 1
Step 6: WHILE $count <= 10 = true BOOLEAN   ⭐
Step 7:   $sum = $sum + $count
...
Step 30: WHILE $count <= 10 = false BOOLEAN ⭐ [EXIT]
Step 31: RETURN 55
```
✅ Complete loop visibility  
✅ Every iteration traced  
✅ Clear termination point  
✅ Full transparency

---

## Conclusion

The loop criteria highlighting enhancement transforms loop debugging from a black box into a glass box. Users can now see exactly what's happening at each step, making loops as debuggable as any other construct in the formula language.

**Try it yourself:**
1. Open Formula Editor
2. Select "Simple WHILE Loop" sample
3. Click "Start Debug"
4. Step through and watch the WHILE line highlight with condition results!
