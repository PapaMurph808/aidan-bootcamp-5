# Development Memory System

## Purpose

This memory system tracks patterns, decisions, and lessons learned during development. It helps maintain context across sessions and enables AI assistants to provide more informed, context-aware suggestions based on accumulated project knowledge.

## Memory Types

### Persistent Memory
- **Location**: `.github/copilot-instructions.md`
- **Content**: Foundational principles, workflows, and project guidelines
- **Scope**: High-level guidance that rarely changes
- **Committed**: Yes, always

### Working Memory
- **Location**: `.github/memory/`
- **Content**: Discoveries, patterns, and session-specific learnings
- **Scope**: Tactical insights gained during development
- **Committed**: Partially (see structure below)

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the system
├── session-notes.md             # Historical session summaries (committed)
├── patterns-discovered.md       # Accumulated code patterns (committed)
└── scratch/
    ├── .gitignore               # Ignores all scratch files
    └── working-notes.md         # Active session notes (NOT committed)
```

### File Purposes

#### `session-notes.md` - Historical Record (Committed)
- **Purpose**: Document completed development sessions for future reference
- **When to use**: At the END of each development session
- **Content**: Summary of what was accomplished, key findings, and outcomes
- **Lifecycle**: Permanent historical record, committed to git
- **Think of it as**: Your project's development diary

#### `patterns-discovered.md` - Pattern Library (Committed)
- **Purpose**: Document reusable code patterns and architectural decisions
- **When to use**: When you discover a pattern that will likely recur
- **Content**: Structured pattern documentation with examples
- **Lifecycle**: Accumulates over time, committed to git
- **Think of it as**: Your project's pattern library or cookbook

#### `scratch/working-notes.md` - Active Session (NOT Committed)
- **Purpose**: Scratchpad for active development work
- **When to use**: DURING active development sessions
- **Content**: Current task, approach, findings, blockers, next steps
- **Lifecycle**: Ephemeral, not committed (captured in .gitignore)
- **Think of it as**: Your developer notebook for the current session

## When to Use Each File

### During TDD Workflow

**Active Development (working-notes.md)**:
```markdown
## Current Task
Implementing POST /api/todos endpoint

## Approach
Following TDD - test exists, now implementing to pass

## Key Findings
- Test expects auto-generated ID
- Must validate title is not empty
- createdAt should be ISO string

## Decisions Made
- Using Date.now() for ID generation (simple, good enough for now)
- Storing completed as boolean, defaults to false

## Next Steps
- [ ] Implement validation
- [ ] Add ID generation
- [ ] Make test pass
```

**End of Session (session-notes.md)**:
```markdown
### Session: Backend CRUD Implementation
**Date**: 2026-02-03
**Accomplished**:
- Implemented POST /api/todos with validation
- Fixed todos array initialization bug
- All POST tests passing

**Key Findings**:
- Empty array initialization was missing
- ID generation needs proper counter

**Outcomes**:
- 8/24 tests passing → 12/24 tests passing
```

**Pattern Discovery (patterns-discovered.md)**:
```markdown
### Pattern: Service Data Initialization
**Problem**: Tests failing due to undefined array access
**Solution**: Initialize service arrays as empty [] not undefined
**Files**: packages/backend/src/app.js
```

### During Linting Workflow

**Active Work (working-notes.md)**:
```markdown
## Current Task
Resolving ESLint errors in backend

## Approach
1. Run lint to identify all errors
2. Categorize by type
3. Fix one category at a time

## Key Findings
- 12 'no-unused-vars' errors - mostly intentional for exercise
- 8 'no-console' warnings - some needed for debugging

## Decisions Made
- Removing genuinely unused variables
- Keeping console.logs marked with comments for learning
- Using eslint-disable-next-line for intentional violations
```

### During Debugging Workflow

**Active Work (working-notes.md)**:
```markdown
## Current Task
Fix toggle bug - always sets to true

## Approach
1. Reproduce issue
2. Check toggle endpoint implementation
3. Review test expectations

## Key Findings
- Line 45: `todo.completed = true` is hardcoded
- Should be: `todo.completed = !todo.completed`
- Test expects bidirectional toggle

## Blockers
None

## Decisions Made
- Fix the assignment to use negation operator
- Add test coverage for toggle both ways
```

**Pattern Discovery (patterns-discovered.md)**:
```markdown
### Pattern: State Toggle Implementation
**Problem**: Always setting state to true instead of toggling
**Solution**: Use negation operator: `state = !state`
**Example**:
```javascript
// ❌ Wrong - always sets to true
todo.completed = true;

// ✅ Correct - toggles current state
todo.completed = !todo.completed;
```
**Related Files**: packages/backend/src/app.js (PATCH endpoint)
```

## How AI Reads and Applies These Patterns

### Context Loading
When you start a conversation, AI can read:
1. **Persistent instructions** - From `.github/copilot-instructions.md`
2. **Historical sessions** - From `session-notes.md`
3. **Known patterns** - From `patterns-discovered.md`
4. **Active work** - From `scratch/working-notes.md`

### Pattern Application
AI uses these patterns to:
- **Avoid known pitfalls**: "Based on patterns-discovered.md, I see we initialize arrays as [] not null"
- **Maintain consistency**: "Following the pattern in session-notes.md, let's use the same validation approach"
- **Reference decisions**: "In the last session, you decided to use Date.now() for ID generation"
- **Continue from blockers**: "I see in working-notes.md you were blocked on X, let's tackle that"

### Example AI Behavior

**Without memory system**:
```
You: "Implement the DELETE endpoint"
AI: "Here's a generic delete implementation..."
```

**With memory system**:
```
You: "Implement the DELETE endpoint"
AI: "Based on patterns-discovered.md, I'll follow the same error handling
pattern we established for POST and PUT. I see from session-notes.md that
we're using 404 for not found and 200 for success. Here's the implementation
following those patterns..."
```

## Workflow Integration

### Session Start
1. Review `session-notes.md` - What was done last time?
2. Review `patterns-discovered.md` - What patterns should you follow?
3. Open `scratch/working-notes.md` - Start fresh notes for today

### During Session
1. **Active work** → Update `scratch/working-notes.md` continuously
2. **Pattern discovery** → Add to `patterns-discovered.md` immediately
3. **Quick reference** → Check patterns before implementing similar code

### Session End
1. **Summarize** → Review `scratch/working-notes.md`
2. **Extract key findings** → Add summary to `session-notes.md`
3. **Commit** → Save session-notes.md and patterns-discovered.md
4. **Leave scratch** → working-notes.md remains for next session or gets cleared

## Best Practices

### Do ✅
- **Be specific**: Include file paths, line numbers, exact error messages
- **Be concise**: Bullet points over paragraphs
- **Be current**: Update working-notes.md as you work
- **Be selective**: Only document patterns that will recur
- **Be consistent**: Follow the templates provided

### Don't ❌
- **Don't commit scratch**: It's intentionally ephemeral
- **Don't duplicate**: If it's in copilot-instructions.md, don't repeat here
- **Don't be vague**: "Fixed bug" → "Fixed toggle bug in PATCH /api/todos/:id"
- **Don't skip sessions**: Always summarize completed work
- **Don't overthink**: Quick notes are better than perfect notes

## Example Workflow

```bash
# Session starts
$ cat .github/memory/session-notes.md  # Review last session
$ cat .github/memory/patterns-discovered.md  # Review known patterns
$ vim .github/memory/scratch/working-notes.md  # Open scratch notes

# During work - take notes as you go
[Make changes, run tests, discover patterns]

# Session ends
$ vim .github/memory/session-notes.md  # Add session summary
$ git add .github/memory/session-notes.md .github/memory/patterns-discovered.md
$ git commit -m "docs: update memory with TDD session learnings"

# scratch/working-notes.md stays uncommitted for next session
```

## Summary

This memory system creates a **feedback loop** where:
1. You discover patterns during development
2. Patterns are documented in memory files
3. AI reads these patterns
4. AI provides context-aware suggestions
5. Development becomes faster and more consistent

Think of it as building an **institutional memory** for your project that both humans and AI can leverage.
