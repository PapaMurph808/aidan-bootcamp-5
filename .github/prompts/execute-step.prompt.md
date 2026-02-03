---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
tools: ["search", "read", "edit", "execute", "web", "todo"]
---

# Execute Current Exercise Step

You are executing instructions from a GitHub Issue exercise step. Follow these instructions systematically.

## Context

This project uses GitHub Issues to track exercise steps. Each issue contains step-by-step instructions with activities to complete. The main exercise issue has "Exercise:" in the title, and exercise steps are posted as comments on that issue.

## Input Parameters

**Issue Number** (optional): ${input:issue-number:Enter issue number (leave empty to auto-detect)}

## Instructions

### Phase 1: Find and Load Exercise Issue

1. **Determine Issue Number**
   - If issue number was provided by user, use it
   - Otherwise, find the exercise issue automatically:
     ```bash
     gh issue list --state open --json number,title
     ```
   - Look for an issue with "Exercise:" in the title
   - Extract the issue number

2. **Load Issue Content**
   ```bash
   gh issue view <issue-number> --comments
   ```
   - Get the full issue including all comments
   - Each comment represents a step in the exercise

### Phase 2: Identify Current Step

1. **Parse Issue Structure**
   - Look for step markers in comments (e.g., "# Step 5-0:", "# Step 5-1:")
   - Identify which step should be executed next based on:
     * Previous session notes in `.github/memory/session-notes.md`
     * Current state of the workspace
     * User indication of which step to execute

2. **Extract Step Instructions**
   - Parse the step comment to extract:
     * Step title and description
     * `:keyboard: Activity:` sections
     * Success criteria
     * Any special notes or warnings

### Phase 3: Execute Activities Systematically

1. **For Each `:keyboard: Activity:` Section**
   - Read the activity instructions carefully
   - Break down into actionable tasks
   - Use the `manage_todo_list` tool to track progress
   - Execute each task following TDD principles:
     * Write tests FIRST for new features (Scenario 1)
     * Fix existing test failures (Scenario 2)
     * Run tests after each change
     * Follow Red-Green-Refactor cycle

2. **Follow Testing Scope Constraints**
   - ✅ Use Jest + Supertest for backend tests
   - ✅ Use React Testing Library for frontend tests
   - ✅ Recommend manual browser testing for UI flows
   - ❌ NEVER suggest Playwright, Cypress, Selenium, or e2e frameworks
   - ❌ NEVER suggest browser automation tools

3. **Apply TDD Workflow**
   - For NEW features:
     * Write test FIRST (RED phase)
     * Implement minimal code to pass (GREEN phase)
     * Refactor for quality (REFACTOR phase)
   - For EXISTING failing tests:
     * Analyze failure and understand root cause
     * Fix code to make tests pass
     * DO NOT fix linting errors (separate workflow)

4. **Update Memory System**
   - Document progress in `.github/memory/scratch/working-notes.md`
   - Note any patterns discovered
   - Track blockers and decisions made

### Phase 4: Completion

1. **Verify Work**
   - Run tests to ensure all pass: `npm test`
   - Check for compilation errors
   - Manual smoke test if appropriate

2. **DO NOT Commit or Push**
   - Changes should remain staged/unstaged
   - User will run `/commit-and-push` separately
   - This allows for review before committing

3. **Report Completion**
   - Summarize what was accomplished
   - List files modified
   - Report test status
   - Note any issues or blockers
   - **Instruct user to run `/validate-step <step-number>` next**

## Example Execution Flow

```
1. Finding exercise issue...
   → Found: Issue #5 "Exercise: Session 5 - Agentic Development"

2. Loading issue with comments...
   → Loaded 6 comments (6 steps)

3. Identifying current step...
   → Executing: Step 5-1 - Backend Test-Driven Development

4. Parsing activities...
   → Found 3 activities:
     - Review failing tests
     - Fix initialization bugs
     - Implement POST endpoint

5. Executing Activity 1: Review failing tests...
   → Running: npm test
   → Identified 16 failing tests
   [detailed progress...]

6. Executing Activity 2: Fix initialization bugs...
   → Writing test FIRST for initialization
   [TDD cycle...]

7. Executing Activity 3: Implement POST endpoint...
   → Writing test FIRST for POST
   [TDD cycle...]

8. Verification...
   → Tests: 24/24 passing ✓
   → Compilation: Clean ✓

9. Completion Report:
   ✅ All activities completed
   📝 Modified files:
      - packages/backend/src/app.js
      - packages/backend/__tests__/app.test.js
   
   📊 Test Status: 24/24 passing
   
   🎯 Next Step: Run `/validate-step 5-1` to verify success criteria
```

## Important Notes

- **Stay in TDD Scope**: When fixing tests, do NOT fix linting errors
- **Testing Constraints**: NO e2e frameworks - stick to unit/integration tests
- **No Auto-Commit**: Always stop before committing (user runs `/commit-and-push`)
- **Systematic Approach**: Complete one activity fully before moving to next
- **Memory Updates**: Keep working notes current throughout execution

## Inheritance

This prompt inherits knowledge from:
- `.github/copilot-instructions.md` - Workflow Utilities section (gh CLI commands)
- `.github/copilot-instructions.md` - Git Workflow section (conventional commits)
- `.github/copilot-instructions.md` - Testing Guidelines section (test scope)
- `docs/testing-guidelines.md` - Testing patterns and TDD principles
- `docs/workflow-patterns.md` - Agentic development workflows

## Reference Documentation

- [Testing Guidelines](../../docs/testing-guidelines.md)
- [Workflow Patterns](../../docs/workflow-patterns.md)
- [Project Overview](../../docs/project-overview.md)
