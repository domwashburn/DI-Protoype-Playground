# Vocabulary Data

This directory contains Business Object Model (BOM) definitions in JSON format.

## Structure

Each `.bom.json` file contains a complete BOM with attributes following IBM ADS/ODM patterns.

## Files

- **loan-application.bom.json** - Loan application data model with credit score, income, and employment attributes

## BOM JSON Format

```json
{
  "id": "unique-id",
  "name": "Human Readable Name",
  "description": "Purpose of this BOM",
  "namespace": "optional.namespace",
  "version": "1.0.0",
  "status": "published",
  "attributes": [
    {
      "jsonName": "attributeName",
      "type": "number|string|boolean|date|object|list",
      "isList": false,
      "elementType": "type-for-list-elements",
      "documentation": "Human-readable description",
      
      "singular": {
        "definite": "the X",
        "indefinite": "a X",
        "bare": "X",
        "variants": ["alternative phrasings"]
      },
      
      "plural": {
        "definite": "the Xs",
        "bare": "Xs",
        "variants": ["alternative plural forms"]
      },
      
      "expressions": {
        "template": "{X} of {this}",
        "examples": ["the X of the Y"]
      },
      
      "actions": {
        "template": "set the X of {this} to {value}",
        "examples": ["set the X of the Y to Z"]
      },
      
      "listActions": {
        "add": {
          "template": "add {0} to the Xs of {this}",
          "examples": ["add an X to the Xs of the Y"]
        },
        "remove": {
          "template": "remove {0} from the Xs of {this}",
          "examples": ["remove an X from the Xs of the Y"]
        },
        "clear": {
          "template": "clear the Xs of {this}",
          "examples": ["clear the Xs of the Y"]
        }
      },
      
      "validation": {
        "required": true,
        "min": 0,
        "max": 100
      },
      
      "scope": "global",
      "tags": ["category", "type"]
    }
  ],
  "tags": ["domain", "category"],
  "author": {
    "name": "Author Name"
  },
  "createdAt": "ISO8601 timestamp",
  "updatedAt": "ISO8601 timestamp"
}
```

## Adding New BOMs

1. Create a new `.bom.json` file in this directory
2. Follow the structure above
3. Ensure all required fields are present
4. Include comprehensive examples
5. Add validation rules where appropriate
6. Test by importing into VocabularyRepository

## Loading BOMs

BOMs are automatically loaded into localStorage when added via the VocabularyRepository:

```typescript
import loanBOM from './data/vocabulary/loan-application.bom.json';
import { VocabularyRepository } from './services/vocabulary';

const repo = VocabularyRepository.getInstance();
await repo.initialize();
repo.addBOM(loanBOM);
```

## BOM Validation

BOMs are validated on import using VocabularyValidator:

- `id` and `name` are required
- `attributes` array must be present
- Each attribute must have required verbalization fields
- List attributes must have `listActions`

## List vs Non-List Attributes

### Non-List Attributes (isList: false)

- Single value attributes
- Only 'set' action available
- Uses singular forms in templates

### List Attributes (isList: true)

- Array/collection attributes
- Multiple actions: set, add, remove, clear
- Uses plural forms in templates
- Requires `listActions` definition

## Scope Levels

- **global**: Available in all formulas/rules
- **project**: Available within a specific project
- **formula**: Local to a specific formula

## Tags

Use tags for categorization and filtering:

- Domain: `financial`, `hr`, `customer`
- Type: `required`, `optional`, `computed`
- Category: `credit`, `income`, `employment`

## Versioning

BOMs support semantic versioning:

```json
{
  "version": "1.0.0",
  "changelog": [
    {
      "version": "1.0.0",
      "date": "2025-01-15",
      "changes": ["Initial release"]
    }
  ]
}
```

## Status Values

- **draft**: Work in progress
- **review**: Awaiting approval
- **published**: Active and available
- **archived**: Deprecated but retained

---

For more information, see `/services/vocabulary/README.md`
