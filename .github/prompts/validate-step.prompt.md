---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
tools: ["search", "read", "execute", "web", "todo"]
---

# Validate Exercise Step Completion

Validate that all success criteria for a specific exercise step have been met.

## Input Parameters

**Step Number** (REQUIRED): ${input:step-number:Enter step number (e.g., 5-0, 5-1, 5-2)}

## Instructions

### Phase 1: Validate Input

1. **Check Step Number Provided**
   - If step number is empty or not provided, STOP and ask user:
     ```
     Step number is required. Please provide the step you want to validate.
     
     Format: X-Y (e.g., 5-0, 5-1, 5-2)
     
     Example: /validate-step 5-1
     ```

2. **Validate Step Number Format**
   - Should match pattern: `\d+-\d+` (e.g., "5-0", "5-1")
   - If invalid format, ask user to correct

### Phase 2: Load Exercise Issue

1. **Find Exercise Issue**
   ```bash
   gh issue list --state open --json number,title
   ```
   - Look for issue with "Exercise:" in the title
   - Extract the issue number

2. **Load Issue with Comments**
   ```bash
   gh issue view <issue-number> --comments
   ```
   - Get full issue including all step comments

### Phase 3: Extract Success Criteria

1. **Locate Specific Step**
   - Search through issue comments for: `# Step ${step-number}:`
   - Example: Looking for "# Step 5-1:" in the comments

2. **Extract Success Criteria Section**
   - Find the section marked with heading "## Success Criteria" or similar
   - Extract all criteria items (usually bullet points or checkboxes)
   - Parse each criterion into a testable condition

3. **Parse Criteria Format**
   - Criteria may be formatted as:
     * `- [ ] Description` (checkbox)
     * `- ✅ Description` (checkmark)
     * `* Description` (bullet)
   - Extract the description text for each criterion

### Phase 4: Validate Each Criterion

For each success criterion, perform appropriate validation:

#### Test-Related Criteria

**Example:** "All backend tests pass"
```bash
cd packages/backend && npm test
```
- Check exit code (0 = pass)
- Parse output for pass/fail counts
- Report specific test failures if any

**Example:** "All frontend tests pass"
```bash
cd packages/frontend && npm test -- --watchAll=false
```
- Check exit code
- Report test results

#### Lint-Related Criteria

**Example:** "No ESLint errors in backend"
```bash
cd packages/backend && npm run lint
```
- Check for 0 errors
- Report specific errors if any exist
- Warnings may be acceptable depending on criteria

**Example:** "No ESLint errors in frontend"
```bash
cd packages/frontend && npm run lint
```
- Check for 0 errors
- List any remaining issues

#### Code-Related Criteria

**Example:** "POST endpoint implemented"
- Check if endpoint exists in code
- Verify implementation is complete (not just stub)
- Search for route definition: `app.post('/api/todos'`

**Example:** "Validation logic added"
- Search for validation code
- Check if error responses are implemented
- Verify validation tests exist

**Example:** "DELETE endpoint implemented"
- Search for route: `app.delete('/api/todos/:id'`
- Verify implementation removes todo from array
- Check associated tests

#### File-Related Criteria

**Example:** "Memory notes updated"
- Check if `.github/memory/scratch/working-notes.md` has content
- Verify recent modifications (git status)

**Example:** "Pattern documented"
- Check if `.github/memory/patterns-discovered.md` has new entries
- Look for patterns related to the current step

#### Application-Related Criteria

**Example:** "Application runs without errors"
```bash
# Check if processes start successfully (may need background check)
npm run start
```
- Report if startup is clean
- Note: May require manual verification

**Example:** "Feature works in browser"
- This requires manual testing
- Provide instructions for user to verify:
  ```
  Manual verification required:
  1. Start app: npm run start
  2. Open http://localhost:3000
  3. Test: [specific feature to test]
  4. Verify: [expected behavior]
  ```

### Phase 5: Generate Report

Create a comprehensive validation report:

```markdown
# Step ${step-number} Validation Report

## Overall Status
[✅ All criteria met | ⚠️ Partially complete | ❌ Incomplete]

## Success Criteria Validation

### ✅ Criterion 1: All backend tests pass
**Status**: PASSED
**Details**: 24/24 tests passing

### ✅ Criterion 2: No ESLint errors
**Status**: PASSED  
**Details**: 0 errors, 0 warnings

### ❌ Criterion 3: DELETE endpoint implemented
**Status**: FAILED
**Details**: Endpoint not found in packages/backend/src/app.js
**Action Required**: Implement DELETE /api/todos/:id endpoint

### ⚠️ Criterion 4: Manual browser testing
**Status**: REQUIRES VERIFICATION
**Instructions**: 
1. Start app: npm run start
2. Navigate to http://localhost:3000
3. Create a todo
4. Toggle completion status
5. Delete the todo
6. Verify it's removed from list

## Summary

**Passed**: 2/4
**Failed**: 1/4
**Manual Verification Required**: 1/4

## Next Steps

To complete this step:
1. Implement DELETE endpoint in packages/backend/src/app.js
2. Run tests to verify: npm test
3. Perform manual browser testing
4. Re-run validation: /validate-step ${step-number}
```

### Phase 6: Provide Specific Guidance

For any failed criteria:

1. **Identify the Gap**
   - What is missing or incorrect?
   - Where should the fix be applied?

2. **Suggest Action**
   - Specific file to modify
   - Type of change needed
   - Reference to documentation if applicable

3. **Provide Next Command**
   - If tests failing: "Fix tests with: /execute-step"
   - If linting errors: "Fix with code-reviewer agent"
   - If feature incomplete: "Implement with: /execute-step"

## Example Execution Flow

```
Input: step-number = "5-1"

1. Validating step number...
   ✓ Valid format: 5-1

2. Finding exercise issue...
   → Found: Issue #5 "Exercise: Session 5"

3. Loading issue with comments...
   → Loaded 6 step comments

4. Locating Step 5-1...
   → Found: "Step 5-1: Backend Test-Driven Development"

5. Extracting success criteria...
   → Found 4 criteria:
     1. All backend tests pass
     2. No ESLint errors in backend
     3. POST endpoint implemented
     4. Toggle bug fixed

6. Validating criteria...

   ✓ Criterion 1: All backend tests pass
     → Running: npm test
     → Result: 24/24 passing ✅

   ✓ Criterion 2: No ESLint errors
     → Running: npm run lint
     → Result: 0 errors ✅

   ✓ Criterion 3: POST endpoint implemented
     → Checking: packages/backend/src/app.js
     → Found: app.post('/api/todos') ✅

   ✓ Criterion 4: Toggle bug fixed
     → Test: "should toggle completion both ways"
     → Result: PASSING ✅

7. Generating report...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Step 5-1 COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

All success criteria met! 🎉

You're ready to:
1. Commit your changes: /commit-and-push feature/step-5-1
2. Move to next step: /execute-step (will auto-detect next step)
```

## Error Handling

### If No Step Number Provided

```
❌ Step number is required.

Please provide the step number you want to validate.

Format: X-Y (e.g., 5-0, 5-1, 5-2)

Example: /validate-step 5-1
```

### If Step Not Found

```
❌ Step "${step-number}" not found in exercise issue.

Available steps found in Issue #5:
- Step 5-0: Setup and Familiarization
- Step 5-1: Backend Test-Driven Development
- Step 5-2: Code Quality and Linting
- Step 5-3: Frontend Implementation

Please check the step number and try again.
```

### If Exercise Issue Not Found

```
❌ Could not find exercise issue.

Please ensure:
1. An issue exists with "Exercise:" in the title
2. The issue is open
3. You have access to the repository

Run: gh issue list --state open
```

## Important Notes

- **Step Number Required**: Always ask if not provided
- **Comprehensive Validation**: Check ALL criteria, don't stop at first failure
- **Specific Guidance**: Provide actionable next steps for failures
- **Manual Testing**: Acknowledge when manual verification is needed
- **Clear Reporting**: Use visual indicators (✅ ❌ ⚠️) for quick scanning
- **Code Review Focus**: This uses code-reviewer agent for quality validation

## Inheritance

This prompt inherits knowledge from:
- `.github/copilot-instructions.md` - Workflow Utilities section (gh CLI commands)
- `.github/copilot-instructions.md` - Testing Guidelines section
- `docs/testing-guidelines.md` - Test validation patterns
- `docs/project-overview.md` - Success criteria definitions

## Validation Categories

| Category | Method | Example |
|----------|--------|---------|
| **Tests** | Run test suite | `npm test` |
| **Linting** | Run linter | `npm run lint` |
| **Code Exists** | File search | Search for endpoint definition |
| **Implementation** | Code analysis | Check logic is complete |
| **Manual** | User instruction | Provide verification steps |

## Success Criteria Patterns

Common patterns to recognize:

- "All [package] tests pass" → Run test suite
- "No ESLint errors" → Run linter
- "[Endpoint] implemented" → Search for route definition
- "[Feature] works in browser" → Manual verification
- "Memory notes updated" → Check file modifications
- "Pattern documented" → Check patterns file
