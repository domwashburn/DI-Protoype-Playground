import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Search, Edit3, Trash2, MessageSquare, BookOpen } from 'lucide-react';
import { Tag } from './TagSelector';

interface Annotation {
  id: string;
  pageNumber: number;
  text: string;
  comment: string;
  tags: Tag[];
  positions: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
  createdAt?: Date;
}

interface AnnotationSidebarProps {
  annotations: Annotation[];
  onAnnotationClick: (annotationId: string) => void;
  onDeleteAnnotation: (annotationId: string) => void;
  onEditAnnotation: (annotationId: string, comment: string) => void;
  selectedAnnotationId?: string;
  selectionSource?: 'pdf' | 'sidebar' | 'filter' | 'keyboard';
  onNavigateToPage: (pageNumber: number) => void;
  allAnnotations?: Annotation[]; // Need this to calculate annotation numbers
  isViewMode?: boolean;
}

export function AnnotationSidebar({
  annotations,
  onAnnotationClick,
  onDeleteAnnotation,
  onEditAnnotation,
  selectedAnnotationId,
  selectionSource,
  onNavigateToPage,
  allAnnotations = annotations,
  isViewMode = false
}: AnnotationSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editComment, setEditComment] = useState('');
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const annotationRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Filter annotations based on search term
  const searchFilteredAnnotations = annotations.filter(annotation =>
    annotation.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    annotation.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    annotation.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort by annotation number (position in original annotations array)
  const filteredAnnotations = searchFilteredAnnotations.sort((a, b) => {
    const aIndex = allAnnotations.findIndex(ann => ann.id === a.id);
    const bIndex = allAnnotations.findIndex(ann => ann.id === b.id);
    return aIndex - bIndex;
  });

  // Helper function to get annotation number
  const getAnnotationNumber = (annotationId: string) => {
    return allAnnotations.findIndex(ann => ann.id === annotationId) + 1;
  };

  const handleEditStart = (annotation: Annotation) => {
    setEditingId(annotation.id);
    setEditComment(annotation.comment);
  };

  const handleEditSave = (annotationId: string) => {
    onEditAnnotation(annotationId, editComment);
    setEditingId(null);
    setEditComment('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditComment('');
  };

  // Scroll to selected annotation when it changes (but not when clicked from sidebar)
  useEffect(() => {
    if (selectedAnnotationId && annotationRefs.current[selectedAnnotationId]) {
      const selectedElement = annotationRefs.current[selectedAnnotationId];
      
      // Simple delay to ensure DOM is ready
      const scrollTimer = setTimeout(() => {
        // Trigger animation
        setAnimatingId(selectedAnnotationId);
        setTimeout(() => {
          setAnimatingId(null);
        }, 600);
        
        // Only scroll if the selection didn't come from a sidebar click
        // (since the user can already see the card they clicked)
        if (selectionSource !== 'sidebar') {
          selectedElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
        }
      }, 50);
      
      return () => {
        clearTimeout(scrollTimer);
      };
    }
  }, [selectedAnnotationId, selectionSource]);



  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full min-w-0">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-5 h-5 text-gray-600" />
          <h2>Annotations</h2>
          <Badge variant="secondary" className="ml-auto">
            {annotations.length}
          </Badge>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search annotations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Annotations List */}
      <ScrollArea className="flex-1 min-h-0" ref={scrollAreaRef}>
        <div className="p-4 space-y-3 min-w-0">
          {filteredAnnotations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No annotations found</p>
              <p className="text-sm mt-1">
                {searchTerm 
                  ? 'Try a different search term' 
                  : isViewMode 
                    ? 'Switch to Edit Mode to create annotations'
                    : 'Select text in the PDF to create annotations'
                }
              </p>
            </div>
          ) : (
            filteredAnnotations.map((annotation) => (
              <div key={annotation.id}>
                <div
                  ref={(el) => {
                    annotationRefs.current[annotation.id] = el;
                  }}
                  className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md min-w-0 ${
                    selectedAnnotationId === annotation.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${
                    animatingId === annotation.id ? 'annotation-selected' : ''
                  }`}
                  onClick={() => {
                    onAnnotationClick(annotation.id);
                  }}
                >
                  {/* Annotation Number, Page Number and Tags */}
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 px-1.5 py-0.5 bg-gray-100 rounded flex-shrink-0">
                        #{getAnnotationNumber(annotation.id)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 text-xs flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToPage(annotation.pageNumber);
                        }}
                      >
                        <BookOpen className="w-3 h-3 mr-1" />
                        Page {annotation.pageNumber}
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {annotation.tags.map((tag) => (
                        <Badge 
                          key={tag.id}
                          style={{ backgroundColor: tag.color }}
                          className="text-white text-xs max-w-full truncate"
                          title={tag.name}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Selected Text */}
                  <div className="mb-2">
                    <p className="text-sm bg-gray-100 p-2 rounded italic break-words">
                      "{truncateText(annotation.text, 100)}"
                    </p>
                  </div>

                  {/* Comment */}
                  {editingId === annotation.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        className="w-full p-2 text-sm border border-gray-300 rounded resize-none break-words"
                        rows={2}
                        onClick={(e) => e.stopPropagation()}
                        style={{ wordBreak: 'break-word' }}
                      />
                      <div className="flex flex-wrap gap-1">
                        <Button
                          size="sm"
                          className="flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditSave(annotation.id);
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditCancel();
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {annotation.comment ? (
                        <p className="text-sm text-gray-700 break-words">
                          {annotation.comment}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400 italic">
                          No comment
                        </p>
                      )}
                      
                      {/* Action Buttons - Only show in edit mode */}
                      {!isViewMode && (
                        <div className="flex flex-wrap gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1 flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditStart(annotation);
                            }}
                          >
                            <Edit3 className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1 text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteAnnotation(annotation.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <Separator className="mt-3" />
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer Stats */}
      {annotations.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Total annotations:</span>
              <span>{annotations.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Pages with annotations:</span>
              <span>{new Set(annotations.map(a => a.pageNumber)).size}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}