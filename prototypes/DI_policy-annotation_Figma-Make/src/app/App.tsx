import React, { useState, useCallback, useRef, useEffect } from 'react';
import { PDFViewer } from './components/PDFViewer';
import { PageSelector } from './components/PageSelector';
import { AnnotationSidebar } from './components/AnnotationSidebar';
import { Button } from './components/ui/button';
import { Sidebar, FileText, PanelRight, Layers } from 'lucide-react';
import { Switch } from './components/ui/switch';
import { Tag, DEFAULT_TAGS } from './components/TagSelector';

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
  createdAt: Date;
}

export default function App() {
  // Sample annotations that demonstrate BAL/data model concepts
  const [annotations, setAnnotations] = useState<Annotation[]>([
    {
      id: '1',
      pageNumber: 2,
      text: 'Minimum credit score of 620 for most loan types',
      comment: 'Key eligibility threshold - this defines a critical decision boundary for loan approval',
      tags: [
        { id: 'data-model-attribute', name: 'Data model/attribute', color: '#60A5FA' },
        { id: 'decision-logic-rules', name: 'Decision Logic/rules', color: '#A78BFA' }
      ],
      positions: [{ x: 0.133, y: 0.28, width: 0.58, height: 0.022 }],
      createdAt: new Date('2024-01-15T10:30:00')
    },
    {
      id: '2',
      pageNumber: 2,
      text: 'Debt-to-income ratio not exceeding 43% for most loan types',
      comment: 'Critical financial ratio calculation - input attribute with business rule constraint',
      tags: [
        { id: 'data-model-attribute', name: 'Data model/attribute', color: '#60A5FA' },
        { id: 'decision-logic-validation', name: 'Decision Logic/validation', color: '#A78BFA' }
      ],
      positions: [{ x: 0.133, y: 0.44, width: 0.69, height: 0.022 }],
      createdAt: new Date('2024-01-15T10:35:00')
    },
    {
      id: '3',
      pageNumber: 2,
      text: 'Stable employment history (minimum 2 years)',
      comment: 'Employment stability requirement - temporal validation rule',
      tags: [
        { id: 'data-model-inputs', name: 'Data model/inputs', color: '#60A5FA' },
        { id: 'decision-logic-validation', name: 'Decision Logic/validation', color: '#A78BFA' }
      ],
      positions: [{ x: 0.133, y: 0.36, width: 0.52, height: 0.022 }],
      createdAt: new Date('2024-01-15T10:40:00')
    },
    {
      id: '4',
      pageNumber: 4,
      text: 'Personal loans up to $10,000',
      comment: 'Loan officer authority limit - defines decision hierarchy and output constraints',
      tags: [
        { id: 'data-model-output', name: 'Data model/output', color: '#60A5FA' },
        { id: 'decision-logic-rules', name: 'Decision Logic/rules', color: '#A78BFA' }
      ],
      positions: [{ x: 0.133, y: 0.56, width: 0.34, height: 0.022 }],
      createdAt: new Date('2024-01-15T10:45:00')
    },
    {
      id: '5',
      pageNumber: 3,
      text: 'Maximum loan-to-value ratio of 120%',
      comment: 'LTV business rule - key risk calculation parameter for auto loans',
      tags: [
        { id: 'data-model-vocabulary', name: 'Data model/Vocabulary', color: '#60A5FA' },
        { id: 'decision-logic-rules', name: 'Decision Logic/rules', color: '#A78BFA' }
      ],
      positions: [{ x: 0.133, y: 0.52, width: 0.49, height: 0.022 }],
      createdAt: new Date('2024-01-15T10:50:00')
    },
    {
      id: '6',
      pageNumber: 4,
      text: 'Income verification (2 years of tax returns, recent pay stubs)',
      comment: 'Required documentation inputs - defines data collection requirements',
      tags: [
        { id: 'data-model-inputs', name: 'Data model/inputs', color: '#60A5FA' },
        { id: 'decision-logic-validation', name: 'Decision Logic/validation', color: '#A78BFA' }
      ],
      positions: [{ x: 0.133, y: 0.28, width: 0.73, height: 0.022 }],
      createdAt: new Date('2024-01-15T10:55:00')
    },
    {
      id: '7',
      pageNumber: 4,
      text: 'Personal and auto loans: 3-5 business days',
      comment: 'SLA constraint - defines expected processing timeline output',
      tags: [
        { id: 'data-model-output', name: 'Data model/output', color: '#60A5FA' }
      ],
      positions: [{ x: 0.133, y: 0.8, width: 0.52, height: 0.022 }],
      createdAt: new Date('2024-01-15T11:00:00')
    },
    {
      id: '8',
      pageNumber: 5,
      text: 'Credit score analysis and credit report review',
      comment: 'Core risk assessment process - defines key evaluation inputs',
      tags: [
        { id: 'data-model-inputs', name: 'Data model/inputs', color: '#60A5FA' },
        { id: 'decision-logic-validation', name: 'Decision Logic/validation', color: '#A78BFA' }
      ],
      positions: [{ x: 0.133, y: 0.19, width: 0.61, height: 0.022 }],
      createdAt: new Date('2024-01-15T11:05:00')
    },
    {
      id: '9',
      pageNumber: 1,
      text: 'Minimize credit risk while serving customer needs',
      comment: 'Key business objective - defines the optimization goal for decision logic',
      tags: [
        { id: 'data-model-vocabulary', name: 'Data model/Vocabulary', color: '#60A5FA' }
      ],
      positions: [{ x: 0.133, y: 0.45, width: 0.6, height: 0.022 }],
      createdAt: new Date('2024-01-15T11:10:00')
    },
    {
      id: '10',
      pageNumber: 5,
      text: 'Fair Credit Reporting Act (FCRA)',
      comment: 'Regulatory constraint - external compliance rule affecting decision logic',
      tags: [
        { id: 'data-model-vocabulary', name: 'Data model/Vocabulary', color: '#60A5FA' },
        { id: 'decision-logic-validation', name: 'Decision Logic/validation', color: '#A78BFA' }
      ],
      positions: [{ x: 0.133, y: 0.4, width: 0.43, height: 0.022 }],
      createdAt: new Date('2024-01-15T11:15:00')
    },
    {
      id: '11',
      pageNumber: 1,
      text: 'serving customer needs',
      comment: 'Key business objective - balance risk with customer satisfaction and market competitiveness',
      tags: [
        { id: 'business-objective-customer', name: 'Business Objective/customer service', color: '#34D399' },
        { id: 'business-objective-strategic', name: 'Business Objective/strategic goals', color: '#34D399' }
      ],
      positions: [{ x: 0.545, y: 0.45, width: 0.245, height: 0.022 }],
      createdAt: new Date('2024-01-15T11:20:00')
    },
    {
      id: '12',
      pageNumber: 4,
      text: '3-5 business days',
      comment: 'Processing time KPI - operational efficiency metric for loan approval turnaround',
      tags: [
        { id: 'kpi-operational', name: 'KPI/operational metrics', color: '#FBBF24' }
      ],
      positions: [{ x: 0.4, y: 0.8, width: 0.2, height: 0.022 }],
      createdAt: new Date('2024-01-15T11:25:00')
    },
    {
      id: '13',
      pageNumber: 2,
      text: 'Debt-to-income ratio not exceeding 43%',
      comment: 'Critical risk metric threshold - DTI ratio serves as both decision rule and risk KPI',
      tags: [
        { id: 'kpi-risk', name: 'KPI/risk metrics', color: '#FBBF24' },
        { id: 'decision-logic-rules', name: 'Decision Logic/rules', color: '#A78BFA' }
      ],
      positions: [{ x: 0.133, y: 0.44, width: 0.48, height: 0.022 }],
      createdAt: new Date('2024-01-15T11:30:00')
    },
    {
      id: '14',
      pageNumber: 5,
      text: 'Comply with federal lending regulations',
      comment: 'Compliance objective - ensures all loan decisions meet regulatory requirements',
      tags: [
        { id: 'business-objective-compliance', name: 'Business Objective/compliance', color: '#34D399' }
      ],
      positions: [{ x: 0.133, y: 0.12, width: 0.45, height: 0.022 }],
      createdAt: new Date('2024-01-15T11:35:00')
    },
    {
      id: '15',
      pageNumber: 3,
      text: 'Maximum exposure to any single borrower: $500,000',
      comment: 'Risk management limit - prevents concentration risk and supports portfolio diversification objective',
      tags: [
        { id: 'business-objective-risk', name: 'Business Objective/risk management', color: '#34D399' },
        { id: 'kpi-financial', name: 'KPI/financial metrics', color: '#FBBF24' }
      ],
      positions: [{ x: 0.133, y: 0.68, width: 0.58, height: 0.022 }],
      createdAt: new Date('2024-01-15T11:40:00')
    },
    {
      id: '16',
      pageNumber: 5,
      text: 'Monthly loan portfolio reviews',
      comment: 'Quality assurance KPI - regular portfolio monitoring to maintain loan quality standards',
      tags: [
        { id: 'kpi-quality', name: 'KPI/quality metrics', color: '#FBBF24' },
        { id: 'business-objective-risk', name: 'Business Objective/risk management', color: '#34D399' }
      ],
      positions: [{ x: 0.133, y: 0.65, width: 0.37, height: 0.022 }],
      createdAt: new Date('2024-01-15T11:45:00')
    }
  ]);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | undefined>();
  const [selectionSource, setSelectionSource] = useState<'pdf' | 'sidebar' | 'filter' | 'keyboard' | undefined>();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [pageSelectorVisible, setPageSelectorVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showWelcome, setShowWelcome] = useState(true);
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [isViewMode, setIsViewMode] = useState(true); // Default to view-only mode
  const [availableTags] = useState<Tag[]>(
    DEFAULT_TAGS.map(tagDef => ({
      id: tagDef.id,
      name: tagDef.parent 
        ? `${DEFAULT_TAGS.find(t => t.id === tagDef.parent)?.name}/${tagDef.name}`
        : tagDef.name,
      color: tagDef.color
    }))
  );
  const scrollToPageRef = useRef<((pageNumber: number) => void) | null>(null);

  // Get unique tag categories for filtering
  const getTagCategories = () => {
    const categories = new Set<string>();
    annotations.forEach(annotation => {
      annotation.tags.forEach(tag => {
        const category = tag.name.split('/')[0];
        categories.add(category);
      });
    });
    return Array.from(categories);
  };

  // Filter annotations based on tag filter
  const filteredAnnotations = tagFilter 
    ? annotations.filter(annotation => 
        annotation.tags.some(tag => tag.name.startsWith(tagFilter))
      )
    : annotations;

  const handleAddAnnotation = useCallback((newAnnotation: Omit<Annotation, 'id'>) => {
    const annotation: Annotation = {
      ...newAnnotation,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    setAnnotations(prev => [...prev, annotation]);
    setSelectedAnnotationId(annotation.id);
  }, []);

  const handleAnnotationClick = useCallback((annotationId: string, source?: 'pdf' | 'sidebar' | 'filter' | 'keyboard') => {
    // Always select the clicked annotation (don't toggle off if already selected)
    setSelectedAnnotationId(annotationId);
    setSelectionSource(source);
  }, []);

  const handleDeleteAnnotation = useCallback((annotationId: string) => {
    setAnnotations(prev => prev.filter(ann => ann.id !== annotationId));
    if (selectedAnnotationId === annotationId) {
      setSelectedAnnotationId(undefined);
    }
  }, [selectedAnnotationId]);

  const handleEditAnnotation = useCallback((annotationId: string, comment: string) => {
    setAnnotations(prev => prev.map(ann => 
      ann.id === annotationId ? { ...ann, comment } : ann
    ));
  }, []);

  const handleNavigateToPage = useCallback((pageNumber: number) => {
    if (scrollToPageRef.current) {
      scrollToPageRef.current(pageNumber);
    }
  }, []);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const handlePageSelectorClick = useCallback((pageNumber: number) => {
    handleNavigateToPage(pageNumber);
  }, [handleNavigateToPage]);

  // Sort annotations by visual position (like Chrome's "find in page")
  const sortAnnotationsByPosition = useCallback((annotations: Annotation[]) => {
    return [...annotations].sort((a, b) => {
      // First sort by page number
      if (a.pageNumber !== b.pageNumber) {
        return a.pageNumber - b.pageNumber;
      }
      
      // Then by vertical position (Y coordinate) - use first position for multi-position annotations
      const aY = a.positions[0]?.y || 0;
      const bY = b.positions[0]?.y || 0;
      
      // Consider annotations on the same line if Y positions are very close (within 0.02 relative units)
      const yThreshold = 0.02;
      const isOnSameLine = Math.abs(aY - bY) < yThreshold;
      
      if (isOnSameLine) {
        // If on same line, sort by horizontal position (X coordinate)
        const aX = a.positions[0]?.x || 0;
        const bX = b.positions[0]?.x || 0;
        return aX - bX;
      }
      
      // Otherwise sort by vertical position
      return aY - bY;
    });
  }, []);

  // Global keyboard navigation for Tab/Shift+Tab to cycle through annotations
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle Tab/Shift+Tab when there are filtered annotations to navigate
      if (e.key === 'Tab' && filteredAnnotations.length > 0) {
        e.preventDefault(); // Override default browser tab behavior
        
        // In filter mode: sort by visual position (like Chrome's "find in page")
        // When no filter: use annotation number order (original order)
        const sortedAnnotations = tagFilter 
          ? sortAnnotationsByPosition(filteredAnnotations)
          : filteredAnnotations.slice().sort((a, b) => {
              const aIndex = annotations.findIndex(ann => ann.id === a.id);
              const bIndex = annotations.findIndex(ann => ann.id === b.id);
              return aIndex - bIndex;
            });
        
        const currentIndex = selectedAnnotationId 
          ? sortedAnnotations.findIndex(ann => ann.id === selectedAnnotationId)
          : -1;
        
        let nextIndex: number;
        
        if (e.shiftKey) {
          // Shift+Tab: Previous annotation
          if (currentIndex <= 0) {
            nextIndex = sortedAnnotations.length - 1; // Wrap to last
          } else {
            nextIndex = currentIndex - 1;
          }
        } else {
          // Tab: Next annotation
          if (currentIndex >= sortedAnnotations.length - 1) {
            nextIndex = 0; // Wrap to first
          } else {
            nextIndex = currentIndex + 1;
          }
        }
        
        const nextAnnotation = sortedAnnotations[nextIndex];
        if (nextAnnotation) {
          handleAnnotationClick(nextAnnotation.id, 'keyboard');
          handleNavigateToPage(nextAnnotation.pageNumber);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredAnnotations, selectedAnnotationId, handleNavigateToPage, sortAnnotationsByPosition, tagFilter, annotations]);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h1>PDF Annotation Tool</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Switch
                checked={!isViewMode}
                onCheckedChange={(checked) => setIsViewMode(!checked)}
                id="edit-mode-toggle"
              />
              <label htmlFor="edit-mode-toggle" className="text-sm cursor-pointer">
                Edit Mode
              </label>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageSelectorVisible(!pageSelectorVisible)}
              className="flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              {pageSelectorVisible ? 'Hide' : 'Show'} Pages
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarVisible(!sidebarVisible)}
              className="flex items-center gap-2"
            >
              <PanelRight className="w-4 h-4" />
              {sidebarVisible ? 'Hide' : 'Show'} Annotations
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Page Selector */}
        {pageSelectorVisible && (
          <PageSelector
            numPages={5}
            currentPage={currentPage}
            onPageClick={handlePageSelectorClick}
            annotations={filteredAnnotations}
          />
        )}

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden">
          <PDFViewer
            annotations={filteredAnnotations}
            onAddAnnotation={handleAddAnnotation}
            selectedAnnotationId={selectedAnnotationId}
            onAnnotationClick={(id) => handleAnnotationClick(id, 'pdf')}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onScrollToPage={(scrollFn) => {
              scrollToPageRef.current = scrollFn;
            }}
            tagFilter={tagFilter}
            onTagFilterChange={setTagFilter}
            allAnnotations={annotations}
            tagCategories={getTagCategories()}
            isViewMode={isViewMode}
          />
        </div>

        {/* Annotation Sidebar */}
        {sidebarVisible && (
          <AnnotationSidebar
            annotations={filteredAnnotations}
            onAnnotationClick={(id) => handleAnnotationClick(id, 'sidebar')}
            onDeleteAnnotation={handleDeleteAnnotation}
            onEditAnnotation={handleEditAnnotation}
            selectedAnnotationId={selectedAnnotationId}
            selectionSource={selectionSource}
            onNavigateToPage={handleNavigateToPage}
            allAnnotations={annotations}
            isViewMode={isViewMode}
          />
        )}
      </div>

      {/* Instructions */}
      {annotations.length === 0 && showWelcome && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center pointer-events-auto">
            <Sidebar className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="mb-2">Get Started with PDF Annotations</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              1. Select text in the PDF document<br />
              2. Add a comment and choose a tag category<br />
              3. View and manage your annotations in the sidebar<br />
              4. Click on annotations to navigate and edit them
            </p>
            <Button 
              className="mt-4"
              onClick={() => setShowWelcome(false)}
            >
              Got it!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}