/**
 * Sample Markdown documents (Bear/Obsidian/MacDown style)
 */

export interface MarkdownDocument {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const markdownSamples: MarkdownDocument[] = [
  {
    id: 'technical-spec',
    title: 'Authentication System Specification',
    description: 'Technical specification for authentication system',
    content: `# Authentication System Specification

## Overview

This document outlines the technical specification for implementing a secure, scalable authentication system using OAuth 2.0 and JWT tokens.

## Requirements

### Functional Requirements

1. **User Registration**
   - Email/password signup
   - Social authentication (Google, GitHub, Microsoft)
   - Email verification required
   
2. **User Login**
   - Multi-factor authentication (MFA) support
   - Session management
   - Remember me functionality

3. **Password Management**
   - Secure password reset flow
   - Password strength requirements
   - Password history (prevent reuse of last 5 passwords)

### Non-Functional Requirements

- **Security**: All passwords must be hashed using bcrypt with cost factor 12
- **Performance**: Authentication requests must complete within 200ms
- **Scalability**: Support 10,000+ concurrent users

## Architecture

\`\`\`typescript
interface AuthenticationService {
  register(email: string, password: string): Promise<User>;
  login(email: string, password: string): Promise<AuthToken>;
  refreshToken(refreshToken: string): Promise<AuthToken>;
  logout(userId: string): Promise<void>;
  resetPassword(email: string): Promise<void>;
}
\`\`\`

## Security Considerations

> ⚠️ **Important**: Never store passwords in plain text. Always use industry-standard hashing algorithms.

### Token Management

- Access tokens expire after **15 minutes**
- Refresh tokens expire after **30 days**
- Tokens must be stored in HTTP-only cookies
- Implement token rotation on refresh

### Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| /auth/login | 5 requests | 15 minutes |
| /auth/register | 3 requests | 1 hour |
| /auth/reset-password | 3 requests | 1 hour |

## Implementation Timeline

- [ ] Week 1: Core authentication logic
- [ ] Week 2: OAuth integration
- [ ] Week 3: MFA implementation
- [ ] Week 4: Testing and security audit

## References

- [OAuth 2.0 RFC 6749](https://tools.ietf.org/html/rfc6749)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/)

---

*Last updated: October 21, 2025*
*Author: Engineering Team*`
  },
  {
    id: 'quick-notes',
    title: 'Daily Notes - Oct 21',
    description: 'Quick notes and ideas for the day',
    content: `# Daily Notes - October 21, 2025

## Today's Tasks

- [x] Review pull requests
- [x] Update project documentation
- [ ] Prepare for client demo
- [ ] Code review for authentication module

## Ideas & Thoughts

### Feature: Smart Notifications

Had an idea for improving our notification system:

1. **Context-aware timing** - Don't send notifications during user's focus time
2. **Intelligent grouping** - Group related notifications together
3. **Priority scoring** - Use ML to determine notification priority

\`\`\`python
def calculate_notification_priority(notification, user_context):
    """
    Calculate priority score for a notification based on:
    - User preferences
    - Historical interaction patterns
    - Current context (time, location, activity)
    """
    base_score = notification.importance_level
    
    # Adjust based on user context
    if user_context.is_in_focus_mode:
        base_score *= 0.5
    
    if notification.sender in user_context.vip_contacts:
        base_score *= 1.5
    
    return min(base_score, 10.0)
\`\`\`

## Meeting Notes

**Project Kickoff - 2:00 PM**

Key takeaways:
- Timeline is aggressive but achievable
- Need to finalize tech stack by end of week
- Design mockups ready for review

> "Move fast and build things that matter" - CTO

## Links to Explore

- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023)
- [Temporal.io for workflows](https://temporal.io/)
- [tRPC for type-safe APIs](https://trpc.io/)

## Code Snippets

Quick utility function for debouncing:

\`\`\`javascript
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}
\`\`\`

---

**Energy Level**: ⚡⚡⚡⚡ (High)
**Mood**: 😊 Productive`
  },
  {
    id: 'markdown-guide',
    title: 'Markdown Syntax Guide',
    description: 'Complete guide to markdown syntax',
    content: `# Markdown Syntax Guide

## Basic Formatting

**Bold text** using \`**text**\` or \`__text__\`
*Italic text* using \`*text*\` or \`_text_\`
***Bold and italic*** using \`***text***\`
~~Strikethrough~~ using \`~~text~~\`

## Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item

### Task List
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

## Links and Images

[Link text](https://example.com)
![Alt text for image](https://via.placeholder.com/150)

## Blockquotes

> This is a blockquote
> It can span multiple lines
>> And can be nested

## Code

Inline code: \`const x = 10;\`

Code block:
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

### Tables with Formatting

| Feature | Status | Priority |
|---------|--------|----------|
| **Authentication** | \`Complete\` | *High* |
| ~~Old API~~ | \`Deprecated\` | *Low* |
| [New Dashboard](https://example.com) | \`In Progress\` | **Critical** |
| User Profiles | \`Planned\` | *Medium* |

## Horizontal Rule

---

## Advanced Features

### Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

### Definition Lists

Term 1
: Definition 1

Term 2
: Definition 2a
: Definition 2b

### Emojis

:smile: :heart: :rocket: :tada:`
  }
];

export const emptyMarkdownDocument: MarkdownDocument = {
  id: 'new',
  title: 'Untitled Document',
  description: 'Start typing in markdown...',
  content: '# Untitled\n\nStart writing your markdown here...'
};