---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ["read", "execute", "todo"]
---

# Commit and Push Changes

Analyze current changes, generate a conventional commit message, and push to the specified feature branch.

## Input Parameters

**Branch Name** (REQUIRED): ${input:branch-name:Enter feature branch name (e.g., feature/implement-delete-endpoint)}

## Instructions

### Phase 1: Validate Branch Name

1. **Check Branch Name Provided**
   - If branch name is empty or not provided, STOP and ask user:
     ```
     Branch name is required. Please provide a feature branch name.
     
     Examples:
     - feature/implement-post-endpoint
     - fix/toggle-bug
     - feature/add-delete-functionality
     ```

2. **Validate Branch Name Format**
   - Should follow pattern: `feature/*` or `fix/*`
   - NEVER allow "main" or "master"
   - If invalid, suggest correct format

### Phase 2: Analyze Changes

1. **Get Git Status**
   ```bash
   git status
   ```
   - Identify modified, added, deleted files
   - Note any untracked files

2. **Review Diffs**
   ```bash
   git diff
   ```
   - Analyze what changed in each file
   - Understand the scope of modifications

3. **Categorize Changes**
   - Determine change type:
     * `feat:` - New feature or functionality
     * `fix:` - Bug fix
     * `test:` - Test additions or modifications
     * `refactor:` - Code refactoring without behavior change
     * `docs:` - Documentation changes
     * `chore:` - Maintenance tasks
     * `style:` - Code style/formatting changes

### Phase 3: Generate Commit Message

1. **Follow Conventional Commit Format**
   ```
   <type>: <short description>
   
   [optional body with more details]
   ```

2. **Commit Message Guidelines**
   - **Type**: Use appropriate conventional commit type
   - **Description**: Clear, concise (50 chars or less)
   - **Imperative mood**: "add feature" not "added feature"
   - **Specific**: "implement POST /api/todos" not "fix backend"
   - **Body** (optional): Add if changes need explanation

3. **Examples**
   ```
   feat: implement POST endpoint for todo creation
   
   fix: correct toggle bug that always set completed to true
   
   test: add integration tests for DELETE endpoint
   
   refactor: extract validation logic to shared function
   
   docs: update testing guidelines with React Testing Library examples
   ```

### Phase 4: Branch Management

1. **Check if Branch Exists**
   ```bash
   git branch --list <branch-name>
   ```

2. **Create or Switch to Branch**
   - If branch doesn't exist:
     ```bash
     git checkout -b <branch-name>
     ```
   - If branch exists:
     ```bash
     git checkout <branch-name>
     ```

3. **Verify Correct Branch**
   ```bash
   git branch --show-current
   ```
   - Confirm we're NOT on main/master
   - Confirm we're on the user-specified branch

### Phase 5: Commit Changes

1. **Stage All Changes**
   ```bash
   git add .
   ```

2. **Commit with Generated Message**
   ```bash
   git commit -m "<generated-commit-message>"
   ```

3. **Verify Commit**
   ```bash
   git log -1 --oneline
   ```
   - Show the commit that was created

### Phase 6: Push to Remote

1. **Push to Remote Branch**
   ```bash
   git push origin <branch-name>
   ```
   - If this is the first push for the branch, it will set up tracking

2. **Confirm Push Success**
   - Display the remote URL where changes were pushed
   - Provide link to create PR if appropriate

### Phase 7: Report Completion

Provide summary:
```
✅ Changes committed and pushed successfully!

Branch: <branch-name>
Commit: <commit-hash> - <commit-message>

Files changed:
- <file1>
- <file2>
- <file3>

Remote: https://github.com/<owner>/<repo>/tree/<branch-name>

Next steps:
- Create a Pull Request to merge into main
- Or continue working on this branch
```

## Safety Checks

### NEVER Commit to Main

```bash
# Before any commit, verify:
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "master" ]; then
  echo "❌ ERROR: Cannot commit to main/master branch"
  echo "Please specify a feature branch name"
  exit 1
fi
```

### Verify Branch Name Provided

- If no branch name: STOP and ask for it
- If branch name is "main"/"master": REJECT and ask for feature branch
- If branch name doesn't follow convention: SUGGEST proper format

## Example Execution Flow

```
Input: branch-name = "feature/implement-post-endpoint"

1. Validating branch name...
   ✓ Valid feature branch name

2. Analyzing changes...
   → Modified: packages/backend/src/app.js
   → Modified: packages/backend/__tests__/app.test.js
   → 2 files changed, 45 insertions(+), 3 deletions(-)

3. Categorizing changes...
   → Type: feat (new functionality)
   → Scope: POST endpoint implementation

4. Generating commit message...
   → "feat: implement POST endpoint for todo creation"

5. Branch management...
   → Branch doesn't exist, creating...
   → Switched to branch 'feature/implement-post-endpoint'

6. Committing changes...
   → Staged all changes
   → Committed with message
   → Commit: a1b2c3d - feat: implement POST endpoint for todo creation

7. Pushing to remote...
   → Pushing to origin/feature/implement-post-endpoint
   → Push successful!

✅ Complete!

Next: Create PR or continue development on this branch
```

## Error Handling

### If User Provides No Branch Name

```
❌ Branch name is required for commit and push.

Please provide a feature branch name using the format:
- feature/<descriptive-name> for new features
- fix/<descriptive-name> for bug fixes

Examples:
- feature/implement-delete-endpoint
- fix/toggle-completion-bug
- feature/add-error-handling

Then run: /commit-and-push <branch-name>
```

### If User Tries to Commit to Main

```
❌ Cannot commit directly to main branch.

Please create a feature branch:
- feature/<descriptive-name> for new features
- fix/<descriptive-name> for bug fixes

Example: /commit-and-push feature/my-new-feature
```

### If There Are No Changes

```
❌ No changes to commit.

Working directory is clean. Make some changes first, then run:
/commit-and-push <branch-name>
```

## Important Notes

- **Branch Required**: Never commit without explicit branch name from user
- **No Main Commits**: Protect main branch - only use feature branches
- **Conventional Commits**: Always use proper commit message format
- **Stage Everything**: Use `git add .` to include all changes
- **Push Immediately**: Commit and push happen together
- **Clear Reporting**: Always show what was committed and where

## Inheritance

This prompt inherits knowledge from:
- `.github/copilot-instructions.md` - Git Workflow section
- `.github/copilot-instructions.md` - Conventional Commits format

## Conventional Commit Quick Reference

| Type | Use Case | Example |
|------|----------|---------|
| `feat:` | New feature | `feat: add DELETE endpoint` |
| `fix:` | Bug fix | `fix: correct toggle logic` |
| `test:` | Test changes | `test: add POST endpoint tests` |
| `refactor:` | Code improvement | `refactor: extract validation` |
| `docs:` | Documentation | `docs: update README` |
| `chore:` | Maintenance | `chore: update dependencies` |
| `style:` | Formatting | `style: fix indentation` |
