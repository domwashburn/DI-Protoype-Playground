/**
 * Sample Rich Text content with blocks (Notion/Monday Notes style)
 */

export type BlockType = 
  | 'paragraph' 
  | 'heading1' 
  | 'heading2' 
  | 'heading3' 
  | 'bulletList' 
  | 'numberedList'
  | 'quote'
  | 'code'
  | 'divider'
  | 'callout'
  | 'checkbox'
  | 'table';

export interface ContentBlock {
  id: string;
  type: BlockType;
  content: string;
  checked?: boolean; // for checkbox blocks
  level?: number; // for list nesting
  tableData?: {
    rows: string[][];
    hasHeader?: boolean;
  }; // for table blocks
  metadata?: Record<string, any>;
}

export interface RichTextDocument {
  id: string;
  title: string;
  description: string;
  blocks: ContentBlock[];
}

export const richTextSamples: RichTextDocument[] = [
  {
    id: 'project-plan',
    title: 'Q4 Product Launch Plan',
    description: 'Comprehensive plan for Q4 product launch',
    blocks: [
      {
        id: 'b1',
        type: 'heading1',
        content: 'Q4 Product Launch Plan'
      },
      {
        id: 'b2',
        type: 'paragraph',
        content: 'This document outlines our strategy for the upcoming product launch scheduled for December 2025.'
      },
      {
        id: 'b3',
        type: 'heading2',
        content: 'Key Objectives'
      },
      {
        id: 'b4',
        type: 'bulletList',
        content: 'Achieve 10,000 sign-ups in the first month'
      },
      {
        id: 'b5',
        type: 'bulletList',
        content: 'Generate $500K in revenue by end of Q1 2026'
      },
      {
        id: 'b6',
        type: 'bulletList',
        content: 'Maintain customer satisfaction score above 4.5/5'
      },
      {
        id: 'b7',
        type: 'heading2',
        content: 'Timeline & Milestones'
      },
      {
        id: 'b8',
        type: 'checkbox',
        content: 'Complete product development - Oct 31, 2025',
        checked: true
      },
      {
        id: 'b9',
        type: 'checkbox',
        content: 'Finalize marketing materials - Nov 15, 2025',
        checked: true
      },
      {
        id: 'b10',
        type: 'checkbox',
        content: 'Beta testing with selected customers - Nov 30, 2025',
        checked: false
      },
      {
        id: 'b11',
        type: 'checkbox',
        content: 'Public launch - Dec 15, 2025',
        checked: false
      },
      {
        id: 'b12',
        type: 'callout',
        content: '⚠️ Important: Ensure all stakeholders are aligned on launch date before proceeding with marketing campaign.'
      },
      {
        id: 'b13',
        type: 'heading2',
        content: 'Technical Requirements'
      },
      {
        id: 'b14',
        type: 'code',
        content: '// API endpoint configuration\nconst API_BASE_URL = "https://api.product.com/v1";\nconst AUTH_ENDPOINT = "/auth/token";\nconst RATE_LIMIT = 1000; // requests per hour'
      }
    ]
  },
  {
    id: 'meeting-notes',
    title: 'Team Sync - Oct 21, 2025',
    description: 'Weekly team synchronization meeting notes',
    blocks: [
      {
        id: 'mn1',
        type: 'heading1',
        content: 'Team Sync - October 21, 2025'
      },
      {
        id: 'mn2',
        type: 'paragraph',
        content: 'Attendees: Sarah, Mike, Jennifer, David, Lisa'
      },
      {
        id: 'mn3',
        type: 'divider',
        content: '---'
      },
      {
        id: 'mn4',
        type: 'heading2',
        content: 'Discussion Points'
      },
      {
        id: 'mn5',
        type: 'numberedList',
        content: 'Sprint progress review - 85% complete'
      },
      {
        id: 'mn6',
        type: 'numberedList',
        content: 'Blocker: API integration delays (waiting on third-party)'
      },
      {
        id: 'mn7',
        type: 'numberedList',
        content: 'UX feedback from user testing sessions'
      },
      {
        id: 'mn8',
        type: 'quote',
        content: '"The new dashboard design significantly improved user engagement in our tests." - Lisa, UX Lead'
      },
      {
        id: 'mn9',
        type: 'heading2',
        content: 'Action Items'
      },
      {
        id: 'mn10',
        type: 'checkbox',
        content: 'Mike: Follow up with third-party vendor on API timeline',
        checked: false
      },
      {
        id: 'mn11',
        type: 'checkbox',
        content: 'Sarah: Update sprint board with revised estimates',
        checked: false
      },
      {
        id: 'mn12',
        type: 'checkbox',
        content: 'Jennifer: Schedule design review for Friday',
        checked: false
      }
    ]
  }
];

export const emptyRichTextDocument: RichTextDocument = {
  id: 'new',
  title: 'Untitled Document',
  description: 'Start typing to add content...',
  blocks: [
    {
      id: 'initial',
      type: 'paragraph',
      content: ''
    }
  ]
};