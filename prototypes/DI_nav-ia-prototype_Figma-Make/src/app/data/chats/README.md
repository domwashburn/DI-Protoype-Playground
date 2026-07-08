## Chat Logs & Artifacts Data Layer

Comprehensive chat/conversation system with Canvas-style artifacts, asset references, and integration with decision automations.

Think **ChatGPT + Canvas** for Decision Automations!

---

## 📊 Overview

This data layer provides:
- **Conversations**: Chat sessions with AI assistant
- **Messages**: Individual user/assistant exchanges
- **Artifacts**: Canvas-style generated content (like ChatGPT Canvas)
- **Asset References**: Links to actual automation assets created/discussed
- **Version History**: Track artifact changes over time

### Key Features

✅ **Canvas View** - View and edit generated artifacts  
✅ **Asset Linking** - Reference automations, services, assets  
✅ **Version Tracking** - Full version history for artifacts  
✅ **AI Transparency** - Track AI-generated vs manual content  
✅ **Search & Filter** - Powerful query capabilities  
✅ **Export** - Multiple export formats  

---

## 🎯 Use Cases

### 1. **Create Automations via Chat**
User chats with AI → Artifacts generated → Published as real automations

### 2. **Review & Iterate**
User reviews existing automation → AI suggests improvements → Edit in Canvas

### 3. **Training & Learning**
New users ask questions → AI provides examples → Save as templates

### 4. **Debugging**
User reports issue → AI analyzes → Provides fix as artifact

### 5. **Documentation**
Generate documentation for automations → Save as artifacts

---

## 🚀 Quick Start

```typescript
import { useConversations, useArtifacts } from '@/data/hooks';

function ChatPage() {
  // Get all conversations
  const { conversations } = useConversations();
  
  // Get conversations that created automations
  const { conversations: creationChats } = useConversations({
    filter: { type: 'canvas', hasArtifacts: true }
  });
  
  // Get artifacts for a conversation
  const { artifacts } = useArtifacts({
    filter: { conversationId: 'conv-credit-risk-creation' }
  });
  
  return <div>{conversations.length} conversations</div>;
}
```

---

## 📁 Files

| File | Purpose | Lines |
|------|---------|-------|
| `types.ts` | TypeScript type definitions | ~600 |
| `conversations.ts` | 8 conversation sessions | ~300 |
| `messages.ts` | 20+ messages with asset refs | ~650 |
| `artifacts.ts` | 10+ Canvas artifacts | ~800 |
| `lookups.ts` | Query/filter functions | ~400 |
| `index.ts` | Main exports | ~50 |
| `README.md` | This file | ~500 |

**Total**: ~3,300 lines

---

## 💬 Conversations (8)

### Creation Conversations (AI-Generated Automations)

1. **Create Credit Risk Assessment** (6 messages, 3 artifacts)
   - Created `automation-6-24-20`
   - AI Model: GPT-4
   - Status: Archived, Published
   
2. **Build Churn Prediction Model** (4 messages, 2 artifacts)
   - Created `churn-prediction-model`
   - AI Model: GPT-4
   - Status: Archived, Published
   
3. **Create Analytics Dashboard** (3 messages, 2 artifacts)
   - Created `dashboard-analytics-auto`
   - AI Model: GPT-4
   - Status: Archived, Published

### Active Conversations

4. **Enhance Fraud Detection** (5 messages, 1 artifact)
   - Improving existing model
   - Status: Active, Pinned
   
5. **Review Credit Model** (3 messages)
   - Reviewing `asset-credit-dm-001`
   - Status: Active
   
6. **Brainstorm Customer Segmentation** (7 messages, 2 artifacts)
   - Strategy planning
   - Status: Active, Favorite
   
7. **Debug Loan Approval** (4 messages, 1 artifact)
   - Troubleshooting
   - Status: Active, Pinned
   
8. **Learn About Decision Models** (5 messages, 2 artifacts)
   - Training session
   - Status: Archived

---

## 📨 Messages (20+)

### Message Types

- **User Messages**: Questions, requests, feedback
- **Assistant Messages**: Responses, generated content
- **System Messages**: Automated notifications

### Asset References

Messages can reference automation assets:

```typescript
{
  id: 'ref-credit-dm-001',
  assetId: 'asset-credit-dm-001',
  assetType: 'asset',
  assetName: 'Credit Scoring Model',
  referenceType: 'created',  // created, modified, inspected, etc.
}
```

### Reference Types

- `created` - Asset was created in this message
- `modified` - Asset was modified
- `referenced` - Asset was mentioned
- `inspected` - Asset was viewed/analyzed
- `compared` - Asset was compared
- `cloned` - Asset was duplicated

---

## 🎨 Artifacts (10+)

Canvas-style generated content that can be viewed, edited, and published.

### Artifact Types

| Type | Count | Examples |
|------|-------|----------|
| `decision-model` | 1 | Credit Scoring Model |
| `ml-model` | 3 | Fraud Detection, Churn Prediction |
| `rule-model` | 2 | Credit Rules, Churn Intervention |
| `dashboard` | 1 | Analytics Dashboard |
| `document` | 1 | Fraud Improvements |
| `code` | - | - |
| `json` | - | - |
| `diagram` | - | - |

### Artifact Status

- **Draft**: Being created
- **Generated**: AI generated
- **Reviewed**: User reviewed
- **Approved**: Approved for use
- **Published**: Published/deployed
- **Archived**: No longer active

### Canvas Configuration

Each artifact has Canvas settings:

```typescript
{
  layout: 'editor' | 'split' | 'preview',
  theme: 'light' | 'dark' | 'auto',
  fontSize: 14,
  lineNumbers: true,
  wordWrap: true,
  readOnly: false,
}
```

---

## 🔗 Integration with Automations

Artifacts can be published as real automation assets:

```typescript
// Artifact created in chat
const artifact = {
  id: 'artifact-credit-dm',
  type: 'decision-model',
  content: '{ ... }',
  // Linked to real asset!
  assetId: 'asset-credit-dm-001',
};

// Real asset in automations data layer
const asset = {
  id: 'asset-credit-dm-001',
  name: 'Credit Scoring Model',
  type: 'decision-model',
  // ... full asset data
};
```

---

## 📊 Data Examples

### Example Conversation

```typescript
{
  id: 'conv-credit-risk-creation',
  title: 'Create Credit Risk Assessment Automation',
  type: 'canvas',
  status: 'archived',
  
  messageIds: ['msg-cr-001', 'msg-cr-002', ...],
  artifactIds: ['artifact-credit-dm', ...],
  
  // Context
  contextAutomationId: 'automation-6-24-20',
  
  // User
  userId: 'user-dom',
  userName: 'Dom Washburn',
  
  // AI
  aiModel: 'gpt-4',
  
  // Stats
  messageCount: 6,
  artifactCount: 3,
  totalTokens: 8542,
  
  // Organization
  isFavorite: true,
  isPinned: true,
  isShared: true,
}
```

### Example Message

```typescript
{
  id: 'msg-cr-002',
  conversationId: 'conv-credit-risk-creation',
  
  role: 'assistant',
  content: 'I'll create a credit scoring model...',
  contentType: 'markdown',
  
  // Links to artifacts
  artifactIds: ['artifact-credit-dm'],
  
  // Links to automation assets
  assetReferences: [
    {
      assetId: 'asset-credit-dm-001',
      assetType: 'asset',
      referenceType: 'created',
    }
  ],
  
  // AI metadata
  aiModel: 'gpt-4',
  promptTokens: 142,
  completionTokens: 98,
  
  // User feedback
  rating: { value: 5, feedback: 'Perfect!' },
}
```

### Example Artifact

```typescript
{
  id: 'artifact-credit-dm',
  title: 'Credit Scoring Decision Model',
  type: 'decision-model',
  
  conversationId: 'conv-credit-risk-creation',
  messageId: 'msg-cr-002',
  
  // Published as real asset!
  assetId: 'asset-credit-dm-001',
  
  // Content (JSON, markdown, code, etc.)
  content: '{ ... }',
  contentType: 'application/json',
  
  // Status & version
  status: 'published',
  version: '1.0.0',
  versionHistory: [...],
  
  // AI metadata
  aiGenerated: true,
  aiModel: 'gpt-4',
  confidence: 0.94,
  
  // Analytics
  viewCount: 142,
  editCount: 3,
  
  // Canvas settings
  canvasConfig: { ... },
}
```

---

## 🔍 Usage Examples

### Get All Conversations

```typescript
import { useConversations } from '@/data/hooks';

const { conversations, count } = useConversations();
```

### Filter Conversations

```typescript
const { conversations } = useConversations({
  filter: {
    type: 'canvas',
    status: 'active',
    hasArtifacts: true,
    isFavorite: true,
  },
  sort: {
    field: 'lastMessageDate',
    direction: 'desc',
  },
});
```

### Get Conversations for Automation

```typescript
// Find all chats about specific automation
const { conversations } = useConversations({
  filter: {
    contextAutomationId: 'automation-6-24-20',
  },
});
```

### Get Messages in Conversation

```typescript
import { useMessages } from '@/data/hooks';

const { messages } = useMessages({
  filter: {
    conversationId: 'conv-credit-risk-creation',
  },
});
```

### Get Artifacts

```typescript
import { useArtifacts } from '@/data/hooks';

// All artifacts
const { artifacts } = useArtifacts();

// For specific conversation
const { artifacts } = useArtifacts({
  filter: {
    conversationId: 'conv-credit-risk-creation',
  },
});

// Published artifacts only
const { artifacts } = useArtifacts({
  filter: {
    status: 'published',
    aiGenerated: true,
  },
});
```

### Get Asset References

```typescript
import { useAssetReferences } from '@/data/hooks';

// All references
const { references } = useAssetReferences();

// References to specific asset
const { references } = useAssetReferences({
  filter: {
    assetId: 'asset-credit-dm-001',
  },
});

// References where asset was created
const { references } = useAssetReferences({
  filter: {
    referenceType: 'created',
  },
});
```

---

## 🎨 Type Definitions

### Main Types

```typescript
import type {
  Conversation,
  Message,
  Artifact,
  AssetReference,
  ConversationType,
  MessageRole,
  ArtifactType,
  ArtifactStatus,
  ReferenceType,
} from '@/data/chats';
```

### Conversation Types

```typescript
type ConversationType = 
  | 'chat'           // Regular chat
  | 'canvas'         // Canvas-focused
  | 'review'         // Review session
  | 'brainstorm'     // Ideation
  | 'debug'          // Troubleshooting
  | 'training';      // Learning
```

### Artifact Types

```typescript
type ArtifactType = 
  | 'decision-model'
  | 'rule-model'
  | 'ml-model'
  | 'predictive-model'
  | 'optimization-model'
  | 'task-model'
  | 'policy'
  | 'dashboard'
  | 'prompt'
  | 'data-model'
  | 'code'
  | 'document'
  | 'diagram'
  | 'table'
  | 'json'
  | 'yaml'
  | 'csv';
```

---

## 🔧 Lookup Functions

All available in `/data/chats/lookups.ts`:

```typescript
// Conversations
getConversationById(id)
getAllConversations()
getConversationsByType(type)
getConversationsByStatus(status)
getConversationsByAutomation(automationId)

// Messages
getMessageById(id)
getMessagesByConversationId(conversationId)
getMessagesByRole(role)

// Artifacts
getArtifactById(id)
getAllArtifacts()
getArtifactsByConversationId(conversationId)
getArtifactsByType(type)
getArtifactsByStatus(status)
getPublishedArtifacts()

// Asset References
getAssetReferenceById(id)
getReferencesByAssetId(assetId)
getReferencesByType(referenceType)
```

---

## 🌟 Canvas View

Artifacts can be opened in a "Canvas" view (like ChatGPT Canvas):

### Canvas Features

- **Side-by-side**: Chat + artifact editing
- **Syntax highlighting**: Code/JSON artifacts
- **Markdown preview**: Live preview for markdown
- **Version control**: Track changes
- **Publish**: Convert to real automation assets

### Canvas Layouts

1. **Editor**: Full-screen editing
2. **Split**: Chat + editor side-by-side
3. **Preview**: Read-only preview

### Canvas Example

```typescript
function CanvasView({ artifactId }) {
  const { artifact } = useArtifact(artifactId);
  const { conversation } = useConversation(artifact.conversationId);
  const { messages } = useMessages({ conversationId: conversation.id });
  
  return (
    <div className="canvas-layout">
      <div className="chat-panel">
        {messages.map(msg => <Message key={msg.id} {...msg} />)}
      </div>
      <div className="editor-panel">
        <ArtifactEditor artifact={artifact} />
      </div>
    </div>
  );
}
```

---

## 🔄 Workflow Examples

### 1. Create Automation via Chat

```
User: "Create a credit risk automation"
  ↓
AI: Generates decision model artifact
  ↓
User: Reviews in Canvas, makes edits
  ↓
User: Publishes artifact
  ↓
System: Creates real automation asset
```

### 2. Improve Existing Asset

```
User: "Review my fraud detection model"
  ↓
AI: Analyzes asset, suggests improvements
  ↓
User: Views recommendations in Canvas
  ↓
AI: Creates improved version as artifact
  ↓
User: Publishes as new version
```

### 3. Learn & Template

```
User: "How do I create a decision model?"
  ↓
AI: Provides examples as artifacts
  ↓
User: Saves examples as templates
  ↓
User: Uses templates for new automations
```

---

## 📊 Statistics

### Conversation Stats

- **Total Conversations**: 8
- **Active**: 4
- **Archived**: 4
- **With Artifacts**: 7
- **With Asset References**: 5

### Message Stats

- **Total Messages**: 20+
- **User Messages**: 10+
- **Assistant Messages**: 10+
- **With Artifacts**: 8
- **With Asset References**: 6

### Artifact Stats

- **Total Artifacts**: 10+
- **Published**: 7
- **Reviewed**: 1
- **AI-Generated**: 10+
- **Linked to Assets**: 4

---

## 🚀 Next Steps

1. **Build UI Components**
   - Chat interface
   - Canvas view
   - Message list
   - Artifact editor

2. **Create Pages**
   - Conversations list
   - Canvas full-screen
   - Artifact gallery

3. **Add Features**
   - Real-time chat
   - Artifact version control
   - Export/import
   - Sharing

4. **Extend Data**
   - More conversations
   - More artifacts
   - More asset types

---

## 📚 Related Documentation

- **Automations**: `/data/automations/README.md`
- **Objectives**: `/data/objectives/README.md`
- **Branching**: `/data/automations/BRANCHING_AND_VERSIONING.md`

---

**Last updated**: 2025-10-16  
**Version**: 1.0.0
