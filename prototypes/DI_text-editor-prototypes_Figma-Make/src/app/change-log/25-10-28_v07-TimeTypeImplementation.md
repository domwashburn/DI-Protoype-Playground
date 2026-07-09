# v07 - Time Type Implementation

**Date:** October 28, 2025  
**Type:** Feature Addition

## Summary

Added `time` as a fifth variable type alongside `number`, `string`, `boolean`, and `date` to provide better support for time-based calculations and improve the usability of the SLA Response Time formula example.

## Context

The user noted that representing time values in milliseconds wasn't very useful in the SLA Response Time formula. To address this, we've introduced a dedicated `time` type with multiple format options that make time values more human-readable and easier to work with.

## Implementation Details

### 1. Core Type System Updates

**File: `/components/editors/core/types/EditorTypes.ts`**
- Added `'time'` to the `Variable.type` union type
- Added `'time'` to the `Attribute.type` union type
- Created new `TimeFormat` type with 6 format options:
  - `HH:MM:SS` - Hours, minutes, seconds (02:30:45)
  - `HH:MM` - Hours and minutes (02:30)
  - `minutes` - Total minutes (150.75)
  - `hours` - Total hours as decimal (2.5)
  - `seconds` - Total seconds (9045)
  - `milliseconds` - Total milliseconds (9045000)
- Added `timeFormat?: TimeFormat` property to `Variable` interface
- Created `TIME_FORMAT_OPTIONS` array with examples for UI display

**File: `/services/evaluationEngine/types/TypeSystem.ts`**
- Added `'time'` to `PrimitiveType` union type
- Created `TimeValue` class to wrap time values (distinguishes from plain numbers)
  - Internal representation is always milliseconds
  - Provides conversion methods: `toMinutes()`, `toHours()`, `toSeconds()`, `toHHMMSS()`, `toHHMM()`
- Updated `inferType()` to recognize `TimeValue` instances
- Added time coercion logic in `performCoercion()`:
  - Number → Time: Assumes number is milliseconds
  - String → Time: Parses HH:MM:SS, HH:MM, or plain number formats
- Updated `areTypesCompatible()` to allow time comparisons with `<`, `>`, `<=`, `>=`

### 2. Time Formatting Utilities

**File: `/utils/timeFormatting.ts`** (NEW)
- Created comprehensive time formatting utilities similar to `dateFormatting.ts`
- `formatTime(milliseconds, format)`: Converts milliseconds to formatted string
  - Handles negative values with sign prefix
  - Supports all 6 time formats
- `parseFormattedTime(timeString, format)`: Parses formatted string back to milliseconds
  - Handles negative values
  - Validates input and returns 0 for invalid values
- `formatDuration(milliseconds)`: Human-readable duration (e.g., "2 hours 30 minutes")

### 3. Variable Table Component

**File: `/components/editors/code/shared/components/VariableTable/VariableTable.tsx`**
- Imported `TimeFormat` type and `TIME_FORMAT_OPTIONS`
- Added state for `newVariableTimeFormat` (default: 'HH:MM:SS')
- Added "Time" option to type selector dropdown (both for new and existing variables)
- Added time format selector that appears when type is "time" (similar to date format selector)
- Updated variable creation logic to include `timeFormat` when type is "time"

### 4. Formula Test Panel

**File: `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx`**
- Imported `formatTime` and `parseFormattedTime` utilities
- Updated variable context building to handle time type:
  - Parses time value based on variable's `timeFormat`
  - Converts to milliseconds for evaluation engine
- Updated attribute context building to handle time type (default format HH:MM:SS)
- Added time input handling in the UI (text input with format placeholder)
- Updated input type priority comments to include time type

### 5. Sample Data Update

**File: `/SampleData/formulaSamples.ts`**
- Updated SLA Response Time formula example:
  - Added `$responseTime` variable with `time` type
  - Changed formula to calculate time difference first, then convert to minutes
  - More accurately demonstrates time type usage
  - Updated description to mention time type for readability
  - Updated timestamp to reflect modification

### 6. Type Definitions Across Components

Updated return type definitions to include `'time'` in:
- `/App.tsx` - Main app formula return type state
- `/components/EditorContainer/EditorContainer.tsx` - Props interface
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx` - Props interface
- `/components/editors/code/FormulaEditor/FormulaDetailsPanel.tsx` - Props interface
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx` - Props interface

## Files Changed

### Created
- `/utils/timeFormatting.ts` - Time formatting utilities

### Modified
- `/components/editors/core/types/EditorTypes.ts` - Added time type and formats
- `/services/evaluationEngine/types/TypeSystem.ts` - Added time type support
- `/components/editors/code/shared/components/VariableTable/VariableTable.tsx` - Time type UI
- `/components/editors/code/FormulaEditor/FormulaTestPanel.tsx` - Time input handling
- `/SampleData/formulaSamples.ts` - Updated SLA example
- `/App.tsx` - Return type update
- `/components/EditorContainer/EditorContainer.tsx` - Return type update
- `/components/editors/code/FormulaEditor/FormulaEditor.tsx` - Return type update
- `/components/editors/code/FormulaEditor/FormulaDetailsPanel.tsx` - Return type update

## Key Design Decisions

### Internal Representation
Time values are always stored internally as milliseconds (similar to how JavaScript's `Date.getTime()` works). This provides:
- Consistent basis for calculations
- Easy conversion between formats
- Natural integration with timestamp arithmetic

### TimeValue Wrapper Class
We created a `TimeValue` class rather than using plain numbers because:
- Distinguishes time values from regular numbers in type inference
- Prevents accidental mixing of time and numeric operations
- Provides convenient conversion methods
- Allows for future enhancements (e.g., timezone support)

### Format Options
Six format options provide flexibility for different use cases:
- `HH:MM:SS` and `HH:MM` for human-readable display
- `minutes`, `hours`, `seconds` for calculations and comparisons
- `milliseconds` for precision timing and interop with timestamps

### Coercion Strategy
- Numbers are assumed to be milliseconds when coerced to time
- Strings are parsed intelligently (tries HH:MM:SS, then HH:MM, then numeric)
- Time values can be compared using standard operators (<, >, <=, >=)

## Testing Recommendations

1. **Variable Table**
   - Create variable with time type
   - Test all 6 time format options
   - Verify format selector shows/hides correctly
   - Test format examples display correctly

2. **Formula Evaluation**
   - Test SLA Response Time formula with various inputs
   - Verify time parsing in different formats
   - Test time arithmetic (addition, subtraction)
   - Test time comparisons in IF conditions

3. **Type Coercion**
   - Test number → time coercion
   - Test string → time coercion with various formats
   - Test invalid time strings (should handle gracefully)
   - Test negative time values

4. **Time Formatting**
   - Test `formatTime()` with all 6 formats
   - Test negative values display correctly
   - Test `parseFormattedTime()` round-trip accuracy
   - Test `formatDuration()` human-readable output

## Future Enhancements

- **Time Arithmetic Functions**: Add built-in functions like `HOURS()`, `MINUTES()`, `SECONDS()` to extract components
- **Duration Calculations**: Add `DURATION()` function to create time values from components
- **Threshold Support**: Consider allowing thresholds on time values (not just numbers)
- **Time Zones**: Future consideration for timezone-aware time values
- **Time of Day**: Consider splitting into "duration" vs "time of day" types

## Breaking Changes

None. This is a purely additive change. Existing formulas with number, string, boolean, and date types continue to work unchanged.

## Related Files

- See `/utils/dateFormatting.ts` for similar pattern with date handling
- See `/change-log/EPIC-FormulaTypeSystem.md` for overall type system architecture
