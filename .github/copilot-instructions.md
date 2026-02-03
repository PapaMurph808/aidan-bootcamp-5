---
description: "Global instructions for TODO application development"
---

# TODO Application Development Guide

## Project Context

This is a full-stack TODO application with:
- **Frontend**: React-based UI for task management
- **Backend**: Express REST API for TODO operations
- **Development Approach**: Iterative, feedback-driven development with Test-Driven Development
- **Current Phase**: Backend stabilization and frontend feature completion

## Documentation References

Reference these documents when working on the project:
- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

Follow these core principles:

1. **Test-Driven Development**: Follow the Red-Green-Refactor cycle
   - Write tests first (RED)
   - Implement minimal code to pass (GREEN)
   - Refactor for quality (REFACTOR)

2. **Incremental Changes**: Make small, testable modifications
   - Each change should be independently verifiable
   - Avoid large, multi-purpose commits

3. **Systematic Debugging**: Use test failures as guides
   - Let failing tests tell you what to fix
   - Add tests to reproduce bugs before fixing

4. **Validation Before Commit**: Ensure quality gates pass
   - All tests must pass
   - No lint errors
   - Code follows project standards

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

### Testing Tools
- **Backend**: Jest + Supertest for API endpoint testing
- **Frontend**: React Testing Library for component unit/integration tests
- **UI Verification**: Manual browser testing for full user flows

### Important Testing Constraints

**DO NOT suggest or implement**:
- End-to-end (e2e) test frameworks (Playwright, Cypress, Selenium)
- Browser automation tools
- Full-stack automated UI testing

**Reason**: This lab focuses on unit and integration testing without the complexity of e2e testing infrastructure.

### Testing Approach by Context

**Backend API Changes**:
- Write Jest/Supertest tests FIRST
- Run tests and see them fail (RED)
- Implement the API endpoint/logic (GREEN)
- Refactor for quality (REFACTOR)

**Frontend Component Features**:
- Write React Testing Library tests FIRST for component behavior
- Run tests and see them fail (RED)
- Implement the component feature (GREEN)
- Refactor for quality (REFACTOR)
- Follow with manual browser testing for full UI flows

**This is true TDD**: Test first, then code to pass the test.

## Workflow Patterns

Follow these established workflows:

### 1. TDD Workflow (Red-Green-Refactor)
1. Write a failing test that describes the desired behavior
2. Run the test suite and confirm the test fails (RED)
3. Write minimal code to make the test pass
4. Run the test suite and confirm the test passes (GREEN)
5. Refactor the code for quality while keeping tests green (REFACTOR)
6. Repeat for next feature/fix

### 2. Code Quality Workflow
1. Run linter to identify issues
2. Categorize issues by type and severity
3. Fix issues systematically (one category at a time)
4. Re-run linter to validate fixes
5. Ensure all tests still pass

### 3. Integration Workflow
1. Identify the issue through failing tests or bug reports
2. Debug to understand root cause
3. Write/update tests to cover the issue
4. Implement the fix
5. Verify end-to-end functionality (both tests and manual verification)

## Agent Usage

Use specialized agents for specific workflows:

### tdd-developer Agent
Use for:
- Writing tests first (TDD approach)
- Implementing features following Red-Green-Refactor cycle
- Debugging test failures
- Adding test coverage
- Any test-related work

### code-reviewer Agent
Use for:
- Addressing lint errors and warnings
- Code quality improvements
- Refactoring for better patterns
- Ensuring code standards compliance
- Code review feedback

## Memory System

This project uses a structured memory system to track discoveries and maintain context across development sessions.

### Memory Types

**Persistent Memory** (`.github/copilot-instructions.md`):
- Foundational principles and workflows
- Project-wide guidelines and standards
- Rarely changes

**Working Memory** (`.github/memory/`):
- Development discoveries and patterns
- Session-specific learnings
- Accumulated project knowledge

### Memory Files

**`.github/memory/session-notes.md`** (Committed):
- Historical summaries of completed sessions
- Use at END of each session to document accomplishments
- Chronological record of project progress

**`.github/memory/patterns-discovered.md`** (Committed):
- Reusable code patterns and architectural decisions
- Document when you discover patterns that will recur
- Structured pattern library with examples

**`.github/memory/scratch/working-notes.md`** (NOT Committed):
- Scratchpad for active development work
- Update continuously DURING the session
- Ephemeral notes for current task tracking

### Using the Memory System

**During Development**:
1. Take active notes in `scratch/working-notes.md`
2. Document discovered patterns immediately in `patterns-discovered.md`
3. Reference existing patterns before implementing similar features

**At Session End**:
1. Review `scratch/working-notes.md` for key findings
2. Summarize completed work in `session-notes.md`
3. Commit session-notes.md and patterns-discovered.md
4. Leave or clear scratch/working-notes.md

**AI Integration**:
- AI assistants read these files for context-aware suggestions
- Patterns guide consistent implementation approaches
- Session notes provide project history and decision rationale
- Working notes capture current blockers and next steps

**See** `.github/memory/README.md` for comprehensive documentation on using the memory system.

## Workflow Utilities

Use GitHub CLI commands for workflow automation (available in all modes):

### List Open Issues
```bash
gh issue list --state open
```

### Get Issue Details
```bash
gh issue view <issue-number>
```

### Get Issue with Comments
```bash
gh issue view <issue-number> --comments
```

### Working with Exercise Issues
- The main exercise issue will have "Exercise:" in the title
- Exercise steps are posted as comments on the main issue
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked

## Git Workflow

### Conventional Commits
Use conventional commit format for all commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `test:` - Test additions or changes
- `refactor:` - Code refactoring
- `style:` - Code style/formatting changes

**Example**: `feat: add delete todo endpoint`

### Branch Strategy
- **Feature branches**: `feature/<descriptive-name>`
- **Bug fixes**: `fix/<descriptive-name>`
- **Main branch**: `main` (protected, merge via PR)

### Commit and Push Workflow
1. Stage all changes: `git add .`
2. Commit with conventional format: `git commit -m "feat: description"`
3. Push to correct branch: `git push origin <branch-name>`
4. Create PR for review when ready

### Best Practices
- Keep commits focused and atomic
- Write clear, descriptive commit messages
- Push regularly to back up work
- Always work on feature branches, not directly on main
