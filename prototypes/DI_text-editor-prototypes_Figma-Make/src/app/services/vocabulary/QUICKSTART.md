# Vocabulary System - Quick Start

Get started with the Vocabulary System in 5 minutes.

---

## Installation

No installation needed - vocabulary system is built into the project.

---

## Basic Usage

### 1. Initialize the Repository

```typescript
import { VocabularyRepository } from './services/vocabulary';

// Get singleton instance
const repo = VocabularyRepository.getInstance();

// Initialize (loads BOMs from storage)
await repo.initialize();
```

### 2. Load Sample Data

```typescript
import loanBOM from './data/vocabulary/loan-application.bom.json';

repo.addBOM(loanBOM);
```

### 3. Resolve a Term

```typescript
const resolution = repo.resolveTerm('the credit score');

if (resolution) {
  console.log('Attribute:', resolution.attributePath);
  console.log('Match type:', resolution.matchType);
  console.log('BOM:', resolution.bomId);
}
```

### 4. Search Vocabulary

```typescript
const results = repo.search('credit', {
  maxResults: 10,
  types: ['number']
});

results.forEach(result => {
  console.log(result.attributePath, '(', result.relevance, ')');
});
```

### 5. Validate a Value

```typescript
const validation = repo.validate('creditScore', 750, 'loan-application');

if (!validation.valid) {
  console.error('Errors:', validation.errors);
}
```

---

## Using React Hooks

### Basic Hook Usage

```typescript
import { useVocabulary } from './services/vocabulary';

function MyComponent() {
  const { boms, isLoading } = useVocabulary();
  
  if (isLoading) {
    return <div>Loading vocabulary...</div>;
  }
  
  return (
    <div>
      <h1>Vocabulary</h1>
      <p>Loaded {boms.length} BOMs</p>
    </div>
  );
}
```

### Term Resolution Hook

```typescript
import { useVocabularyTerm } from './services/vocabulary';

function TermChecker() {
  const [term, setTerm] = useState('');
  const { resolution, isValid } = useVocabularyTerm(term);
  
  return (
    <div>
      <input 
        value={term} 
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Enter term..."
      />
      
      {isValid ? (
        <div>✅ Valid: {resolution?.attributePath}</div>
      ) : (
        <div>❌ Unknown term</div>
      )}
    </div>
  );
}
```

### Search Hook

```typescript
import { useVocabularySearch } from './services/vocabulary';

function VocabularySearch() {
  const [query, setQuery] = useState('');
  const { results, isSearching } = useVocabularySearch(query);
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search vocabulary..."
      />
      
      {isSearching && <div>Searching...</div>}
      
      <ul>
        {results.map(result => (
          <li key={result.attributePath}>
            {result.attributePath} ({result.relevance})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Creating a BOM

### Simple BOM

```typescript
import { BusinessObjectModel } from './services/vocabulary';

const myBOM: BusinessObjectModel = {
  id: 'my-bom',
  name: 'My Business Object Model',
  description: 'Sample BOM',
  attributes: [
    {
      jsonName: 'customerName',
      type: 'string',
      isList: false,
      
      singular: {
        definite: 'the customer name',
        indefinite: 'a customer name',
        bare: 'customer name'
      },
      
      plural: {
        definite: 'the customer names',
        bare: 'customer names'
      },
      
      expressions: {
        template: '{customer name} of {this}',
        examples: ['the customer name of the order']
      },
      
      actions: {
        template: 'set the customer name of {this} to {value}',
        examples: ['set the customer name of the order to "John"']
      }
    }
  ],
  version: '1.0.0',
  status: 'published'
};

// Add to repository
repo.addBOM(myBOM);
```

### With Validation

```typescript
{
  jsonName: 'age',
  type: 'number',
  isList: false,
  
  singular: {
    definite: 'the age',
    indefinite: 'an age'
  },
  
  plural: {
    definite: 'the ages',
    bare: 'ages'
  },
  
  expressions: {
    template: '{age} of {this}',
    examples: ['the age of the customer']
  },
  
  actions: {
    template: 'set the age of {this} to {value}',
    examples: ['set the age of the customer to 25']
  },
  
  validation: {
    required: true,
    min: 0,
    max: 120,
    errorMessage: 'Age must be between 0 and 120'
  }
}
```

### List Attribute

```typescript
{
  jsonName: 'phoneNumbers',
  type: 'string',
  isList: true,
  elementType: 'string',
  
  singular: {
    definite: 'the phone number',
    indefinite: 'a phone number'
  },
  
  plural: {
    definite: 'the phone numbers',
    bare: 'phone numbers'
  },
  
  expressions: {
    template: '{phone numbers} of {this}',
    examples: ['the phone numbers of the customer']
  },
  
  actions: {
    template: 'set the phone numbers of {this} to {value}',
    examples: ['set the phone numbers of the customer to phone numbers']
  },
  
  listActions: {
    add: {
      template: 'add {0} to the phone numbers of {this}',
      examples: ['add "555-1234" to the phone numbers of the customer']
    },
    remove: {
      template: 'remove {0} from the phone numbers of {this}',
      examples: ['remove "555-1234" from the phone numbers of the customer']
    },
    clear: {
      template: 'clear the phone numbers of {this}',
      examples: ['clear the phone numbers of the customer']
    }
  },
  
  validation: {
    minItems: 1,
    maxItems: 5
  }
}
```

---

## Common Patterns

### Autocomplete

```typescript
function Autocomplete() {
  const [input, setInput] = useState('');
  const { results } = useVocabularySearch(input);
  
  return (
    <div>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      
      {results.length > 0 && (
        <ul className="suggestions">
          {results.slice(0, 5).map(result => (
            <li 
              key={result.attributePath}
              onClick={() => setInput(result.attribute.singular.definite)}
            >
              {result.attribute.singular.definite}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Validation Form

```typescript
function ValidatedForm() {
  const [value, setValue] = useState('');
  const { isValid, errors } = useVocabularyValidation(
    'creditScore', 
    Number(value),
    'loan-application'
  );
  
  return (
    <div>
      <input 
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      
      {!isValid && (
        <div className="errors">
          {errors.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### BOM Explorer

```typescript
function BOMExplorer() {
  const { boms } = useVocabulary();
  const [selectedBOM, setSelectedBOM] = useState<string | null>(null);
  
  return (
    <div>
      <h2>Business Object Models</h2>
      
      <ul>
        {boms.map(bom => (
          <li key={bom.id} onClick={() => setSelectedBOM(bom.id)}>
            {bom.name}
          </li>
        ))}
      </ul>
      
      {selectedBOM && (
        <BOMDetails bomId={selectedBOM} />
      )}
    </div>
  );
}

function BOMDetails({ bomId }: { bomId: string }) {
  const { boms } = useVocabulary();
  const bom = boms.find(b => b.id === bomId);
  
  if (!bom) return null;
  
  return (
    <div>
      <h3>{bom.name}</h3>
      <p>{bom.description}</p>
      
      <h4>Attributes ({bom.attributes.length})</h4>
      <ul>
        {bom.attributes.map(attr => (
          <li key={attr.jsonName}>
            {attr.singular.definite} ({attr.type})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Testing

### Testing with Repository

```typescript
import { VocabularyRepository } from './services/vocabulary';

describe('My Feature', () => {
  let repo: VocabularyRepository;
  
  beforeEach(() => {
    repo = VocabularyRepository.getInstance();
    
    // Add test BOM
    repo.addBOM(testBOM, false); // Don't persist
  });
  
  it('should resolve term', () => {
    const result = repo.resolveTerm('the test term');
    expect(result).not.toBeNull();
  });
});
```

### Testing with Hooks

```typescript
import { renderHook } from '@testing-library/react-hooks';
import { useVocabulary } from './services/vocabulary';

describe('My Component', () => {
  it('should load BOMs', () => {
    const { result } = renderHook(() => useVocabulary());
    
    expect(result.current.boms).toBeDefined();
  });
});
```

---

## Import/Export

### Export BOM

```typescript
// Export single BOM
const json = repo.exportToJSON('loan-application');
console.log(json); // JSON string

// Export all BOMs
const allJSON = repo.exportAll();

// Download as file
const blob = new Blob([json], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'vocabulary.json';
a.click();
```

### Import BOM

```typescript
// From JSON string
const bom = repo.importFromJSON(jsonString);

// From file
const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const json = e.target?.result as string;
    try {
      repo.importFromJSON(json);
      alert('BOM imported successfully!');
    } catch (error) {
      alert('Import failed: ' + error.message);
    }
  };
  reader.readAsText(file);
};
```

---

## Troubleshooting

### Term Not Resolving

**Problem:** `resolveTerm()` returns null

**Solutions:**
1. Check spelling and case (should be case-insensitive, but check spaces)
2. Ensure BOM is added: `repo.getAllBOMs()`
3. Check if term is indexed: Look at attribute's singular/plural/variants
4. Try searching: `repo.search(term)` to find similar terms

### Validation Failing

**Problem:** Validation always returns `valid: false`

**Solutions:**
1. Check attribute path is correct
2. Ensure BOM ID is provided if needed
3. Check validation rules match value type
4. Console log the validation result to see actual errors

### Hooks Not Updating

**Problem:** Hook values not updating when data changes

**Solutions:**
1. Ensure you're using the hook's return values
2. Check if repository is initialized: `repo.isInitialized()`
3. For direct repository changes, hooks may not auto-update (by design)

---

## Next Steps

1. **Read the full documentation:** `/services/vocabulary/README.md`
2. **Explore sample BOM:** `/data/vocabulary/loan-application.bom.json`
3. **Check planning docs:** `/planning/requirements/PHASE_5.11.1_*.md`
4. **Run tests:** `npm test -- services/vocabulary`

---

## Need Help?

- **Documentation:** `/services/vocabulary/README.md`
- **API Reference:** See README API section
- **Examples:** See sample BOM and tests
- **Planning:** `/planning/requirements/`

---

**Happy coding! 🎉**
