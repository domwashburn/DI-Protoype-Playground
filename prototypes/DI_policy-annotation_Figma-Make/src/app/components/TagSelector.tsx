import React, { useState, useMemo, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { ChevronDown, ChevronRight, Tag, Plus, Search } from 'lucide-react';

export interface TagDefinition {
  id: string;
  name: string;
  color: string;
  parent?: string;
  children?: string[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TagSelectorProps {
  selectedTag?: Tag;
  onTagSelect: (tag: Tag) => void;
  onCreateTag?: (tagName: string, parentId?: string) => void;
}

// Default tag system similar to Things app
export const DEFAULT_TAGS: TagDefinition[] = [
  // Root level tags
  { id: 'data-model', name: 'Data model', color: '#3B82F6' },
  { id: 'decision-logic', name: 'Decision Logic', color: '#8B5CF6' },
  { id: 'business-objective', name: 'Business Objective', color: '#10B981' },
  { id: 'kpi', name: 'KPI', color: '#F59E0B' },
  
  // Data model children
  { id: 'data-model-attribute', name: 'attribute', color: '#60A5FA', parent: 'data-model' },
  { id: 'data-model-inputs', name: 'inputs', color: '#60A5FA', parent: 'data-model' },
  { id: 'data-model-vocabulary', name: 'Vocabulary', color: '#60A5FA', parent: 'data-model' },
  { id: 'data-model-output', name: 'output', color: '#60A5FA', parent: 'data-model' },
  
  // Decision Logic children
  { id: 'decision-logic-rules', name: 'rules', color: '#A78BFA', parent: 'decision-logic' },
  { id: 'decision-logic-validation', name: 'validation', color: '#A78BFA', parent: 'decision-logic' },
  
  // Business Objective children
  { id: 'business-objective-strategic', name: 'strategic goals', color: '#34D399', parent: 'business-objective' },
  { id: 'business-objective-compliance', name: 'compliance', color: '#34D399', parent: 'business-objective' },
  { id: 'business-objective-risk', name: 'risk management', color: '#34D399', parent: 'business-objective' },
  { id: 'business-objective-customer', name: 'customer service', color: '#34D399', parent: 'business-objective' },
  
  // KPI children
  { id: 'kpi-financial', name: 'financial metrics', color: '#FBBF24', parent: 'kpi' },
  { id: 'kpi-operational', name: 'operational metrics', color: '#FBBF24', parent: 'kpi' },
  { id: 'kpi-risk', name: 'risk metrics', color: '#FBBF24', parent: 'kpi' },
  { id: 'kpi-quality', name: 'quality metrics', color: '#FBBF24', parent: 'kpi' },
];

export function TagSelector({ selectedTag, onTagSelect, onCreateTag }: TagSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagParent, setNewTagParent] = useState<string | undefined>();

  // Build tag hierarchy
  const tagHierarchy = useMemo(() => {
    const rootTags = DEFAULT_TAGS.filter(tag => !tag.parent);
    const childTags = DEFAULT_TAGS.filter(tag => tag.parent);
    
    return rootTags.map(rootTag => ({
      ...rootTag,
      children: childTags.filter(child => child.parent === rootTag.id)
    }));
  }, []);

  // Initialize with all parent tags expanded by default
  const [expandedTags, setExpandedTags] = useState<Set<string>>(() => {
    const rootTagIds = tagHierarchy
      .filter(tag => tag.children && tag.children.length > 0)
      .map(tag => tag.id);
    return new Set(rootTagIds);
  });

  // Auto-expand tags that have matching children during search
  useEffect(() => {
    if (searchTerm) {
      const newExpanded = new Set<string>();
      tagHierarchy.forEach(rootTag => {
        const hasMatchingChild = rootTag.children?.some(child => 
          child.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (hasMatchingChild) {
          newExpanded.add(rootTag.id);
        }
      });
      setExpandedTags(newExpanded);
    } else {
      // Reset to all expanded when search is cleared
      const rootTagIds = tagHierarchy
        .filter(tag => tag.children && tag.children.length > 0)
        .map(tag => tag.id);
      setExpandedTags(new Set(rootTagIds));
    }
  }, [searchTerm, tagHierarchy]);

  // Filter tags based on search
  const filteredTags = useMemo(() => {
    if (!searchTerm) return tagHierarchy;
    
    const term = searchTerm.toLowerCase();
    return tagHierarchy.filter(tag => {
      const nameMatch = tag.name.toLowerCase().includes(term);
      const childMatch = tag.children?.some(child => 
        child.name.toLowerCase().includes(term)
      );
      return nameMatch || childMatch;
    });
  }, [tagHierarchy, searchTerm]);

  const toggleExpanded = (tagId: string) => {
    const newExpanded = new Set(expandedTags);
    if (newExpanded.has(tagId)) {
      newExpanded.delete(tagId);
    } else {
      newExpanded.add(tagId);
    }
    setExpandedTags(newExpanded);
  };

  const handleTagClick = (tag: TagDefinition) => {
    const fullName = tag.parent 
      ? `${DEFAULT_TAGS.find(t => t.id === tag.parent)?.name}/${tag.name}`
      : tag.name;
    
    onTagSelect({
      id: tag.id,
      name: fullName,
      color: tag.color
    });
  };

  const handleCreateTag = () => {
    if (newTagName.trim() && onCreateTag) {
      onCreateTag(newTagName.trim(), newTagParent);
      setNewTagName('');
      setNewTagParent(undefined);
      setIsCreating(false);
    }
  };

  return (
    <div className="w-64 border border-gray-200 rounded-lg bg-white shadow-sm">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Select Tag</span>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          <Input
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-7 h-8 text-sm"
          />
        </div>
      </div>

      {/* Selected Tag Display */}
      {selectedTag && (
        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-500 mb-1">Selected:</div>
          <Badge 
            style={{ backgroundColor: selectedTag.color }}
            className="text-white text-xs"
          >
            {selectedTag.name}
          </Badge>
        </div>
      )}

      {/* Tags List */}
      <ScrollArea className="max-h-64">
        <div className="p-2 overflow-hidden">
          {filteredTags.map((rootTag) => (
            <div key={rootTag.id} className="mb-1">
              {/* Root Tag */}
              <div
                className={`flex items-center gap-1 p-2 rounded cursor-pointer transition-colors ${
                  selectedTag?.id === rootTag.id
                    ? 'bg-blue-100 border border-blue-300'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleTagClick(rootTag)}
              >
                {rootTag.children && rootTag.children.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpanded(rootTag.id);
                    }}
                    className="p-0.5 hover:bg-gray-200 rounded flex-shrink-0"
                  >
                    {expandedTags.has(rootTag.id) ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronRight className="w-3 h-3" />
                    )}
                  </button>
                )}
                <div
                  className="w-3 h-3 rounded-full border border-gray-300 flex-shrink-0"
                  style={{ backgroundColor: rootTag.color }}
                />
                <span className="text-sm truncate min-w-0">{rootTag.name}</span>
              </div>

              {/* Child Tags */}
              {expandedTags.has(rootTag.id) && rootTag.children && (
                <div className="ml-4 mt-1 space-y-1 overflow-hidden">
                  {rootTag.children.map((childTag) => (
                    <div
                      key={childTag.id}
                      className={`flex items-center gap-2 p-1.5 rounded cursor-pointer transition-colors ${
                        selectedTag?.id === childTag.id
                          ? 'bg-blue-100 border border-blue-300'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleTagClick(childTag)}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full border border-gray-300 flex-shrink-0"
                        style={{ backgroundColor: childTag.color }}
                      />
                      <span className="text-sm truncate min-w-0">{childTag.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Create New Tag */}
          {onCreateTag && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              {isCreating ? (
                <div className="space-y-2">
                  <Input
                    placeholder="Tag name..."
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    className="h-8 text-sm"
                    autoFocus
                  />
                  <div className="flex gap-1">
                    <Button size="sm" onClick={handleCreateTag} className="h-7 text-xs">
                      Create
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setIsCreating(false);
                        setNewTagName('');
                        setNewTagParent(undefined);
                      }}
                      className="h-7 text-xs"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCreating(true)}
                  className="w-full justify-start h-8 text-sm text-gray-600"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  New Tag
                </Button>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}