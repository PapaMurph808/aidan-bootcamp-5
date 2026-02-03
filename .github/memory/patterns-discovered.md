# Discovered Code Patterns

## Purpose

This file documents reusable code patterns, architectural decisions, and best practices discovered during development. Each pattern includes context, problem description, solution, and examples.

**Use this file**: When you discover a pattern that will likely recur in the codebase.

**Committed to git**: Yes - this accumulates project knowledge over time.

---

## Pattern Template

Copy this template for each new pattern:

```markdown
### Pattern: [Descriptive Pattern Name]

**Context**: [When/where this pattern applies]

**Problem**: [What issue does this pattern solve?]

**Solution**: [How to implement this pattern]

**Example**:
```javascript
// ❌ Wrong approach
[Show incorrect implementation]

// ✅ Correct approach
[Show correct implementation]
```

**Why This Works**: [Explanation of the solution]

**Related Files**: [Where this pattern is used or should be used]

**Tags**: #category #relevantTags
```

---

## Patterns

### Pattern: Service Data Initialization

**Context**: When setting up in-memory data stores or service state in Express applications

**Problem**: Accessing array methods on undefined values causes runtime errors. Tests fail with "Cannot read property 'length' of undefined" or similar errors.

**Solution**: Always initialize arrays as empty arrays `[]` rather than leaving them undefined or null.

**Example**:
```javascript
// ❌ Wrong - causes undefined errors
let todos;  // undefined by default

app.get('/api/todos', (req, res) => {
  res.json(todos);  // Error: todos is undefined
});

// ✅ Correct - safe to use immediately
let todos = [];  // Initialized as empty array

app.get('/api/todos', (req, res) => {
  res.json(todos);  // Returns [] safely
});
```

**Why This Works**: 
- JavaScript arrays are objects with built-in methods
- An empty array `[]` is a valid response for "no items"
- Array methods (push, filter, find, etc.) work on empty arrays
- Avoids null/undefined checks throughout the codebase

**Related Files**: 
- `packages/backend/src/app.js` - todos array initialization
- Any service layer that maintains in-memory state

**Tags**: #backend #initialization #arrays #bestPractice

---

### Pattern: [Add Your Next Pattern]

**Context**: 

**Problem**: 

**Solution**: 

**Example**:
```javascript
// Add your example here
```

**Why This Works**: 

**Related Files**: 

**Tags**: 

---

## Pattern Categories

Use these tags to categorize patterns:

- `#backend` - Backend/API patterns
- `#frontend` - Frontend/React patterns
- `#testing` - Test-related patterns
- `#errorHandling` - Error handling approaches
- `#validation` - Input validation patterns
- `#stateManagement` - State management patterns
- `#api` - API design patterns
- `#database` - Data persistence patterns
- `#performance` - Performance optimization patterns
- `#security` - Security-related patterns
- `#bestPractice` - General best practices

---

## Notes

- Document patterns as you discover them, not in batches
- Include both wrong and correct examples for clarity
- Explain **why** the pattern works, not just **how**
- Reference specific files where pattern is implemented
- Update existing patterns if you discover better approaches
- Use tags to make patterns searchable
