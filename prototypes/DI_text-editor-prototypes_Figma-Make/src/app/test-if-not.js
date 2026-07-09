// Quick test to verify "if not" tokenization
const { Tokenizer } = require('./services/evaluationEngine/parsers/Tokenizer.ts');

const formula = `if 'customer email' starts with "vip@" then set 'vip bonus' to 50 if not set 'vip bonus' to 0`;

const tokenizer = new Tokenizer(formula);
const tokens = tokenizer.tokenize();

console.log('Tokens:');
tokens.forEach((token, i) => {
  console.log(`${i}: ${token.type}${token.value !== undefined ? ` (${token.value})` : ''}`);
});

// Look for "if not" pattern
const ifNotIndex = tokens.findIndex((t, i) => 
  t.type === 'ELSE' && t.value === 'if not'
);

if (ifNotIndex >= 0) {
  console.log('\n✅ SUCCESS: "if not" tokenized as ELSE at index', ifNotIndex);
} else {
  console.log('\n❌ FAILURE: "if not" NOT tokenized as ELSE');
  const secondIfIndex = tokens.findIndex((t, i) => 
    i > 0 && tokens[i-1].type === 'NUMBER' && t.type === 'IF'
  );
  if (secondIfIndex >= 0) {
    console.log(`  Found second IF at index ${secondIfIndex}, next token:`, tokens[secondIfIndex + 1]);
  }
}
