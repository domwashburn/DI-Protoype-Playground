import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ZoomIn, ZoomOut, RotateCw, FileText, X } from 'lucide-react';
import { TagSelector, Tag } from './TagSelector';

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
}

interface PDFViewerProps {
  annotations: Annotation[];
  onAddAnnotation: (annotation: Omit<Annotation, 'id'>) => void;
  selectedAnnotationId?: string;
  onAnnotationClick: (annotationId: string, source?: 'pdf' | 'sidebar' | 'filter' | 'keyboard') => void;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  onScrollToPage?: (pageNumber: number) => void;
  tagFilter?: string | null;
  onTagFilterChange?: (filter: string | null) => void;
  allAnnotations?: Annotation[];
  tagCategories?: string[];
  isViewMode?: boolean;
}

export function PDFViewer({ 
  annotations, 
  onAddAnnotation, 
  selectedAnnotationId,
  onAnnotationClick,
  currentPage,
  onPageChange,
  onScrollToPage,
  tagFilter,
  onTagFilterChange,
  allAnnotations = [],
  tagCategories = [],
  isViewMode = false
}: PDFViewerProps) {
  // Overlay color variable to keep container and page overlays in sync
  const FILTER_OVERLAY_COLOR = 'rgba(255, 255, 255, 0.8)';
  const [numPages] = useState<number>(5); // Mock 5 pages
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [hasAutoZoomed, setHasAutoZoomed] = useState(false);
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectionPositions, setSelectionPositions] = useState<Array<{x: number, y: number, width: number, height: number}> | null>(null);
  const [selectionRect, setSelectionRect] = useState<{left: number, top: number, width: number, height: number} | null>(null);
  const [showAnnotationForm, setShowAnnotationForm] = useState(false);
  const [annotationComment, setAnnotationComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedPageForAnnotation, setSelectedPageForAnnotation] = useState<number>(1);
  const [tagSearchTerm, setTagSearchTerm] = useState<string>('');
  const [highlightedTagIndex, setHighlightedTagIndex] = useState<number>(0);

  // All tags data
  const allTags = useMemo(() => [
    { id: 'data-model', name: 'Data model', color: '#3B82F6', category: 'Data model', isParent: true },
    { id: 'data-model-attribute', name: 'attribute', color: '#60A5FA', category: 'Data model', fullName: 'Data model/attribute', isChild: true },
    { id: 'data-model-inputs', name: 'inputs', color: '#60A5FA', category: 'Data model', fullName: 'Data model/inputs', isChild: true },
    { id: 'data-model-vocabulary', name: 'Vocabulary', color: '#60A5FA', category: 'Data model', fullName: 'Data model/Vocabulary', isChild: true },
    { id: 'data-model-output', name: 'output', color: '#60A5FA', category: 'Data model', fullName: 'Data model/output', isChild: true },
    { id: 'decision-logic', name: 'Decision Logic', color: '#8B5CF6', category: 'Decision Logic', isParent: true },
    { id: 'decision-logic-rules', name: 'rules', color: '#A78BFA', category: 'Decision Logic', fullName: 'Decision Logic/rules', isChild: true },
    { id: 'decision-logic-validation', name: 'validation', color: '#A78BFA', category: 'Decision Logic', fullName: 'Decision Logic/validation', isChild: true },
    { id: 'business-objective', name: 'Business Objective', color: '#10B981', category: 'Business Objective', isParent: true },
    { id: 'business-objective-strategic', name: 'strategic goals', color: '#34D399', category: 'Business Objective', fullName: 'Business Objective/strategic goals', isChild: true },
    { id: 'business-objective-compliance', name: 'compliance', color: '#34D399', category: 'Business Objective', fullName: 'Business Objective/compliance', isChild: true },
    { id: 'business-objective-risk', name: 'risk management', color: '#34D399', category: 'Business Objective', fullName: 'Business Objective/risk management', isChild: true },
    { id: 'business-objective-customer', name: 'customer service', color: '#34D399', category: 'Business Objective', fullName: 'Business Objective/customer service', isChild: true },
    { id: 'kpi', name: 'KPI', color: '#F59E0B', category: 'KPI', isParent: true },
    { id: 'kpi-financial', name: 'financial metrics', color: '#FBBF24', category: 'KPI', fullName: 'KPI/financial metrics', isChild: true },
    { id: 'kpi-operational', name: 'operational metrics', color: '#FBBF24', category: 'KPI', fullName: 'KPI/operational metrics', isChild: true },
    { id: 'kpi-risk', name: 'risk metrics', color: '#FBBF24', category: 'KPI', fullName: 'KPI/risk metrics', isChild: true },
    { id: 'kpi-quality', name: 'quality metrics', color: '#FBBF24', category: 'KPI', fullName: 'KPI/quality metrics', isChild: true }
  ], []);

  // Fuzzy match function
  const fuzzyMatch = useCallback((text: string, query: string): number => {
    if (!query) return 1;
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    
    let textIndex = 0;
    let queryIndex = 0;
    let matches = 0;
    
    while (textIndex < textLower.length && queryIndex < queryLower.length) {
      if (textLower[textIndex] === queryLower[queryIndex]) {
        matches++;
        queryIndex++;
      }
      textIndex++;
    }
    
    return queryIndex === queryLower.length ? matches / queryLower.length : 0;
  }, []);

  // Filtered and sorted tags
  const filteredTags = useMemo(() => {
    const searchTerm = tagSearchTerm || '';
    if (!searchTerm) return allTags;
    
    return allTags.filter(tag => {
      const nameScore = fuzzyMatch(tag.name, searchTerm);
      const categoryScore = fuzzyMatch(tag.category, searchTerm);
      const fullNameScore = tag.fullName ? fuzzyMatch(tag.fullName, searchTerm) : 0;
      return nameScore > 0 || categoryScore > 0 || fullNameScore > 0;
    }).sort((a, b) => {
      const aScore = Math.max(
        fuzzyMatch(a.name, searchTerm),
        fuzzyMatch(a.category, searchTerm),
        a.fullName ? fuzzyMatch(a.fullName, searchTerm) : 0
      );
      const bScore = Math.max(
        fuzzyMatch(b.name, searchTerm),
        fuzzyMatch(b.category, searchTerm),
        b.fullName ? fuzzyMatch(b.fullName, searchTerm) : 0
      );
      return bScore - aScore;
    });
  }, [allTags, tagSearchTerm, fuzzyMatch]);

  // Reset highlighted index when filtered tags change
  useEffect(() => {
    if (filteredTags.length > 0 && highlightedTagIndex >= filteredTags.length) {
      setHighlightedTagIndex(0);
    }
  }, [filteredTags.length, highlightedTagIndex]);

  // Helper function to check if a tag is selected
  const isTagSelected = useCallback((tagId: string) => {
    return selectedTags.some(tag => tag.id === tagId);
  }, [selectedTags]);

  // Helper function to toggle tag selection
  const handleTagToggle = useCallback((tag: Tag) => {
    setSelectedTags(prev => {
      const isSelected = prev.some(t => t.id === tag.id);
      if (isSelected) {
        return prev.filter(t => t.id !== tag.id);
      } else {
        return [...prev, tag];
      }
    });
  }, []);

  // Helper function to remove a specific tag
  const handleTagRemove = useCallback((tagId: string) => {
    setSelectedTags(prev => prev.filter(tag => tag.id !== tagId));
  }, []);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>(Array(numPages).fill(null));

  // Loan Approval Policy Content
  const mockPDFContent = {
    1: "BASIC LOAN APPROVAL POLICY\n\nUnited States Regulations\n\n1. OVERVIEW\n\nThis document outlines the basic loan approval policy for financial institutions operating in the United States. The policy establishes criteria and procedures for evaluating loan applications to ensure compliance with federal regulations and sound lending practices.\n\n1.1 PURPOSE\nThe purpose of this policy is to:\n- Establish clear guidelines for loan approval decisions\n- Ensure consistent application of lending standards\n- Comply with federal lending regulations\n- Minimize credit risk while serving customer needs\n- Maintain fair and equitable lending practices\n\n1.2 SCOPE\nThis policy applies to all consumer and commercial loan applications processed by the institution, including but not limited to:\n- Personal loans\n- Mortgage loans\n- Auto loans\n- Business loans\n- Lines of credit",
    2: "2. BORROWER ELIGIBILITY CRITERIA\n\n2.1 MINIMUM REQUIREMENTS\nAll loan applicants must meet the following minimum requirements:\n\na) Credit Score Requirements:\n- Minimum credit score of 620 for most loan types\n- Minimum credit score of 580 for FHA-backed mortgages\n- No recent bankruptcies within the past 2 years\n- No active judgments or liens\n\nb) Income Verification:\n- Stable employment history (minimum 2 years)\n- Verifiable income through pay stubs, tax returns, or bank statements\n- Debt-to-income ratio not exceeding 43% for most loan types\n- Debt-to-income ratio not exceeding 50% for qualified mortgages\n\nc) Identification and Legal Status:\n- Valid government-issued photo identification\n- Legal U.S. residency or citizenship documentation\n- Social Security Number verification\n\n2.2 ADDITIONAL CONSIDERATIONS\n- Age requirement: Applicant must be 18 years or older\n- Banking relationship history with the institution\n- Collateral requirements for secured loans",
    3: "3. LOAN AMOUNT AND TERMS\n\n3.1 LOAN AMOUNT LIMITS\nLoan amounts are subject to the following limitations:\n\na) Personal Loans:\n- Minimum: $1,000\n- Maximum: $50,000\n- Unsecured loans limited to $25,000\n\nb) Mortgage Loans:\n- Conforming loan limits as established by FHFA\n- Jumbo loans require additional documentation\n- Down payment requirements vary by loan type\n\nc) Auto Loans:\n- Maximum loan-to-value ratio of 120%\n- Terms not to exceed 7 years for new vehicles\n- Terms not to exceed 5 years for used vehicles\n\nd) Business Loans:\n- Maximum exposure to any single borrower: $500,000\n- SBA loans follow SBA guidelines\n- Commercial real estate loans require appraisal\n\n3.2 INTEREST RATES\nInterest rates are determined based on:\n- Prime rate plus margin based on risk assessment\n- Credit score of the applicant\n- Loan type and term\n- Collateral and loan-to-value ratio\n- Market conditions and regulatory requirements",
    4: "4. APPROVAL PROCESS AND DOCUMENTATION\n\n4.1 APPLICATION PROCESS\na) Initial Application:\n- Complete loan application form\n- Required documentation checklist\n- Credit authorization and disclosure forms\n- Privacy notices and regulatory disclosures\n\nb) Documentation Requirements:\n- Income verification (2 years of tax returns, recent pay stubs)\n- Bank statements (2-3 months)\n- Employment verification\n- Asset documentation for collateral\n- Insurance requirements\n\n4.2 APPROVAL AUTHORITY\nLoan approval authority is delegated as follows:\n\na) Loan Officers:\n- Personal loans up to $10,000\n- Auto loans up to $25,000\n- Standard credit parameters\n\nb) Senior Loan Officers:\n- Personal loans up to $25,000\n- Auto loans up to $50,000\n- Mortgage loans up to $200,000\n\nc) Loan Committee:\n- All loans exceeding individual authority limits\n- Non-standard credit decisions\n- Policy exceptions\n\n4.3 DECISION TIMELINE\n- Personal and auto loans: 3-5 business days\n- Mortgage loans: 30-45 days\n- Business loans: 7-14 business days\n- Committee decisions: Within 10 business days",
    5: "5. RISK MANAGEMENT AND COMPLIANCE\n\n5.1 RISK ASSESSMENT\nAll loan applications undergo risk assessment including:\n- Credit score analysis and credit report review\n- Debt-to-income ratio calculations\n- Employment and income stability verification\n- Collateral valuation (if applicable)\n- Fraud detection screening\n\n5.2 REGULATORY COMPLIANCE\nAll lending activities must comply with:\n- Fair Credit Reporting Act (FCRA)\n- Equal Credit Opportunity Act (ECOA)\n- Truth in Lending Act (TILA)\n- Real Estate Settlement Procedures Act (RESPA)\n- Community Reinvestment Act (CRA)\n- Anti-Money Laundering (AML) requirements\n- Know Your Customer (KYC) regulations\n\n5.3 QUALITY CONTROL\n- Monthly loan portfolio reviews\n- Annual policy review and updates\n- Regular training for lending staff\n- Internal audit of lending practices\n- Customer complaint tracking and resolution\n\n5.4 EXCEPTIONS AND APPEALS\n- Documented justification required for policy exceptions\n- Senior management approval for significant exceptions\n- Appeal process for declined applications\n- Regulatory notification requirements\n\nEFFECTIVE DATE: This policy is effective immediately and supersedes all previous versions.\n\nAPPROVED BY: Board of Directors\nDATE: Current Date\nNEXT REVIEW: Annual"
  };

  // Scroll to page functionality using modern CSS scroll capabilities
  const scrollToPage = useCallback((pageNumber: number) => {
    const pageElement = pageRefs.current[pageNumber - 1];
    if (pageElement) {
      // Use scrollIntoView with intelligent centering that prevents cut-offs
      pageElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  }, []);

  // Expose scroll to page function
  useEffect(() => {
    if (onScrollToPage) {
      onScrollToPage(scrollToPage);
    }
  }, [scrollToPage, onScrollToPage]);

  // Handle scroll to detect current page
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const centerY = containerTop + containerHeight / 2;

    // Find which page is most visible
    for (let i = 0; i < numPages; i++) {
      const pageElement = pageRefs.current[i];
      if (pageElement) {
        const pageTop = pageElement.offsetTop;
        const pageBottom = pageTop + pageElement.offsetHeight;
        
        if (centerY >= pageTop && centerY <= pageBottom) {
          if (currentPage !== i + 1) {
            onPageChange(i + 1);
          }
          break;
        }
      }
    }
  }, [currentPage, onPageChange, numPages]);

  // Auto-zoom to fit one page with peek on initial load
  useEffect(() => {
    if (!hasAutoZoomed && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      // Wait for initial render to complete
      const autoZoomTimer = setTimeout(() => {
        // Constants for page dimensions (US Letter 8.5x11 at 72 DPI)
        const PAGE_HEIGHT = 792; // Base page height in pixels
        const MARGIN_FACTOR = 0.85; // Use 85% of container height to leave nice margins
        
        // Get available container height
        const containerHeight = container.clientHeight;
        const targetPageHeight = containerHeight * MARGIN_FACTOR;
        
        // Calculate optimal scale to fit one page with margins
        let optimalScale = targetPageHeight / PAGE_HEIGHT;
        
        // Apply reasonable bounds but allow higher zoom for larger viewports
        optimalScale = Math.max(0.5, Math.min(2.5, optimalScale));
        
        // For scales below 1.0, preserve aspect ratio constraints
        if (optimalScale < 1.0) {
          // Ensure minimum readable size
          optimalScale = Math.max(optimalScale, 0.6);
        }
        
        // Only apply if it's meaningfully different and reasonable
        if (Math.abs(optimalScale - scale) > 0.05 && optimalScale >= 0.5) {
          setScale(optimalScale);
        }
        
        setHasAutoZoomed(true);
        
        // After setting the scale, center the current page
        setTimeout(() => {
          scrollToPage(currentPage);
        }, 150); // Additional delay to allow scale change to render
      }, 100);
      
      return () => clearTimeout(autoZoomTimer);
    }
  }, [hasAutoZoomed, scale, currentPage, scrollToPage]);

  // Throttled scroll handler
  useEffect(() => {
    let timeoutId: number;
    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(handleScroll, 100);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', throttledScroll);
      return () => {
        container.removeEventListener('scroll', throttledScroll);
        clearTimeout(timeoutId);
      };
    }
  }, [handleScroll]);

  const handleTextSelection = useCallback(() => {
    // Don't allow text selection for annotation creation in view mode
    if (isViewMode) return;
    
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();
    
    if (selectedText) {
      // Find which page contains the selection
      let selectedPage = currentPage;
      for (let i = 0; i < numPages; i++) {
        const pageElement = pageRefs.current[i];
        if (pageElement && pageElement.contains(range.commonAncestorContainer)) {
          selectedPage = i + 1;
          break;
        }
      }

      const pageElement = pageRefs.current[selectedPage - 1];
      if (pageElement) {
        const pageRect = pageElement.getBoundingClientRect();
        
        // Get all rectangles for the selection (handles multi-line selections)
        const clientRects = range.getClientRects();
        const positions: Array<{x: number, y: number, width: number, height: number}> = [];
        
        let minTop = Infinity;
        let maxBottom = -Infinity;
        let minLeft = Infinity;
        let maxRight = -Infinity;

        // Convert each rectangle to relative coordinates
        for (let i = 0; i < clientRects.length; i++) {
          const rect = clientRects[i];
          
          // Skip very small rectangles (likely spaces or line breaks)
          if (rect.width < 1 || rect.height < 1) continue;
          
          const relativeRect = {
            x: (rect.left - pageRect.left) / pageRect.width,
            y: (rect.top - pageRect.top) / pageRect.height,
            width: rect.width / pageRect.width,
            height: rect.height / pageRect.height
          };
          
          positions.push(relativeRect);
          
          // Track bounds for popover positioning
          minTop = Math.min(minTop, rect.top);
          maxBottom = Math.max(maxBottom, rect.bottom);
          minLeft = Math.min(minLeft, rect.left);
          maxRight = Math.max(maxRight, rect.right);
        }

        // If no valid rectangles, fall back to range bounding rect
        if (positions.length === 0) {
          const rect = range.getBoundingClientRect();
          positions.push({
            x: (rect.left - pageRect.left) / pageRect.width,
            y: (rect.top - pageRect.top) / pageRect.height,
            width: rect.width / pageRect.width,
            height: rect.height / pageRect.height
          });
          minLeft = rect.left;
          maxBottom = rect.bottom;
        }

        // Store absolute position for popover positioning (use the bounds of all rectangles)
        setSelectionRect({
          left: minLeft,
          top: maxBottom + 8, // Position below the selection
          width: maxRight - minLeft,
          height: maxBottom - minTop
        });

        setSelectedText(selectedText);
        setSelectionPositions(positions);
        setSelectedPageForAnnotation(selectedPage);
        setShowAnnotationForm(true);
      }
    }
  }, [currentPage, numPages, isViewMode]);

  const handleAddAnnotation = () => {
    if (selectedText && selectionPositions && selectedTags.length > 0) {
      const newAnnotation: Omit<Annotation, 'id'> = {
        pageNumber: selectedPageForAnnotation,
        text: selectedText,
        comment: annotationComment,
        tags: selectedTags,
        positions: selectionPositions
      };
      
      onAddAnnotation(newAnnotation);
      setShowAnnotationForm(false);
      setAnnotationComment('');
      setSelectedText('');
      setSelectionPositions(null);
      setSelectionRect(null);
      setSelectedPageForAnnotation(1);
      setSelectedTags([]);
      setTagSearchTerm('');
      
      // Clear selection
      window.getSelection()?.removeAllRanges();
    }
  };

  // Get annotations for a specific page
  const getPageAnnotations = (pageNumber: number) => {
    return annotations.filter(ann => ann.pageNumber === pageNumber);
  };

  // Get global annotation number (index + 1) for superscript display
  const getAnnotationNumber = (annotationId: string) => {
    return allAnnotations.findIndex(ann => ann.id === annotationId) + 1;
  };

  return (
    <div className="relative h-full bg-gray-50">
      {/* PDF Content - Continuous Scroll - Full height */}
      <div 
        ref={scrollContainerRef}
        className="h-full overflow-auto p-4 flex justify-center pt-24"
        onMouseUp={handleTextSelection}
        style={{
          backgroundColor: tagFilter ? FILTER_OVERLAY_COLOR : undefined
        }}
      >
        <div className="space-y-6 py-[10vh]">
          {Array.from({ length: numPages }, (_, index) => {
            const pageNumber = index + 1;
            const pageAnnotations = getPageAnnotations(pageNumber);

            return (
              <div
                key={pageNumber}
                ref={(el) => (pageRefs.current[index] = el)}
                className="relative bg-white shadow-lg border border-gray-200"
                style={{
                  width: `${612 * scale}px`,
                  height: `${792 * scale}px`,
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: 'center center'
                }}
              >
                {/* Mock PDF Page */}
                <div 
                  className={`p-8 h-full overflow-hidden flex flex-col ${isViewMode ? 'select-none' : 'select-text'} relative`} 
                  style={{ fontSize: `${14 * scale}px`, lineHeight: 1.6 }}
                >
                  {/* Page-level dimming overlay when filter is active */}
                  {tagFilter && (() => {
                    // Get all annotations that match the current filter on this page
                    const filteredPageAnnotations = pageAnnotations.filter(ann => 
                      ann.tags.some(tag => tag.name === tagFilter || tag.name.startsWith(tagFilter + '/'))
                    );
                    
                    if (filteredPageAnnotations.length > 0) {
                      // Create spotlights for ALL filtered annotations
                      const spotlightPadding = 0.01; // Add small padding around selections
                      
                      // Collect all spotlight areas
                      const spotlightAreas = filteredPageAnnotations.map(annotation => {
                        const pos = annotation.positions[0]; // Use first position for simplicity
                        if (pos) {
                          return {
                            left: Math.max(0, pos.x - spotlightPadding),
                            top: Math.max(0, pos.y - spotlightPadding),
                            right: Math.min(1, pos.x + pos.width + spotlightPadding),
                            bottom: Math.min(1, pos.y + pos.height + spotlightPadding)
                          };
                        }
                        return null;
                      }).filter(Boolean);
                      
                      // For simplicity with multiple spotlights, use CSS mask to create cutouts
                      // Create a mask that excludes all spotlight areas
                      const maskPaths = spotlightAreas.map((area, index) => 
                        `polygon(0% 0%, 0% 100%, ${area.left * 100}% 100%, ${area.left * 100}% ${area.top * 100}%, ${area.right * 100}% ${area.top * 100}%, ${area.right * 100}% ${area.bottom * 100}%, ${area.left * 100}% ${area.bottom * 100}%, ${area.left * 100}% 100%, 100% 100%, 100% 0%)`
                      );
                      
                      // Use a simpler approach: full overlay but ensure all filtered annotations have high z-index
                      return (
                        <div 
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            backgroundColor: FILTER_OVERLAY_COLOR,
                            zIndex: 50
                          }}
                        />
                      );
                    }
                    
                    // Default: full overlay when no filtered annotations on this page
                    return (
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundColor: FILTER_OVERLAY_COLOR,
                          zIndex: 50
                        }}
                      />
                    );
                  })()}

                  {/* Page Header */}
                  <div 
                    className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200 relative"
                    style={{ zIndex: tagFilter ? 2 : 'auto' }}
                  >
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <h1 className="text-lg">Basic Loan Approval Policy</h1>
                      <p className="text-sm text-gray-500">United States Regulations - Page {pageNumber} of {numPages}</p>
                    </div>
                  </div>

                  {/* Page Content with Inline Highlighting */}
                  <div 
                    className={`whitespace-pre-line flex-1 overflow-hidden relative ${isViewMode ? 'select-none' : 'select-text'}`}
                    style={{ 
                      color: tagFilter ? '#9CA3AF' : '#374151', // Dimmed text color when filtering
                      // Higher z-index for pages containing selected annotations when filtering
                      zIndex: tagFilter ? (pageAnnotations.some(ann => ann.id === selectedAnnotationId) ? 200 : 2) : 'auto'
                    }}
                  >
                    {(() => {
                      const content = mockPDFContent[pageNumber as keyof typeof mockPDFContent];
                      const pageAnns = pageAnnotations.slice().sort((a, b) => {
                        // Sort by position in text to handle overlapping highlights correctly
                        const aStart = content.indexOf(a.text);
                        const bStart = content.indexOf(b.text);
                        return aStart - bStart;
                      });

                      // Build segments of text with annotations
                      const segments: Array<{
                        text: string;
                        annotation?: typeof pageAnns[0];
                        isHighlighted: boolean;
                      }> = [];

                      let lastIndex = 0;
                      
                      // Process annotations in order
                      pageAnns.forEach(annotation => {
                        const textToHighlight = annotation.text;
                        const startIndex = content.indexOf(textToHighlight, lastIndex);
                        
                        if (startIndex !== -1 && startIndex >= lastIndex) {
                          // Add text before annotation
                          if (startIndex > lastIndex) {
                            segments.push({
                              text: content.substring(lastIndex, startIndex),
                              isHighlighted: false
                            });
                          }
                          
                          // Add highlighted text
                          segments.push({
                            text: textToHighlight,
                            annotation: annotation,
                            isHighlighted: true
                          });
                          
                          lastIndex = startIndex + textToHighlight.length;
                        }
                      });
                      
                      // Add remaining text
                      if (lastIndex < content.length) {
                        segments.push({
                          text: content.substring(lastIndex),
                          isHighlighted: false
                        });
                      }

                      return segments.map((segment, index) => {
                        if (!segment.isHighlighted) {
                          return <React.Fragment key={index}>{segment.text}</React.Fragment>;
                        }
                        
                        const annotation = segment.annotation!;
                        const annotationNumber = getAnnotationNumber(annotation.id);
                        const isSelected = selectedAnnotationId === annotation.id;
                        
                        // Check if this annotation matches the current filter
                        const isFilteredAnnotation = tagFilter ? annotation.tags.some(tag => 
                          tag.name === tagFilter || tag.name.startsWith(tagFilter + '/')
                        ) : true;
                        
                        // Determine highlight color based on filter context
                        let backgroundColor = '#3B82F6'; // Default blue
                        
                        if (tagFilter) {
                          // When filtering, prioritize the filtered tag's color
                          const matchingTag = annotation.tags.find(tag => 
                            tag.name === tagFilter || tag.name.startsWith(tagFilter + '/')
                          );
                          if (matchingTag) {
                            backgroundColor = matchingTag.color;
                          } else if (annotation.tags.length > 0) {
                            // Fallback to first tag if no exact match
                            backgroundColor = annotation.tags[0].color;
                          }
                        } else {
                          // When not filtering, use the first tag's color
                          backgroundColor = annotation.tags[0]?.color || '#3B82F6';
                        }
                        
                        // Convert hex to RGB for accessibility calculations
                        const hexToRgb = (hex: string) => {
                          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                          return result ? {
                            r: parseInt(result[1], 16),
                            g: parseInt(result[2], 16),
                            b: parseInt(result[3], 16)
                          } : { r: 59, g: 130, b: 246 }; // Default blue RGB
                        };
                        
                        // Calculate relative luminance for accessibility
                        const getLuminance = (r: number, g: number, b: number) => {
                          const [rs, gs, bs] = [r, g, b].map(c => {
                            c = c / 255;
                            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
                          });
                          return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
                        };
                        
                        // Calculate contrast ratio
                        const getContrastRatio = (color1: {r: number, g: number, b: number}, color2: {r: number, g: number, b: number}) => {
                          const lum1 = getLuminance(color1.r, color1.g, color1.b);
                          const lum2 = getLuminance(color2.r, color2.g, color2.b);
                          const brightest = Math.max(lum1, lum2);
                          const darkest = Math.min(lum1, lum2);
                          return (brightest + 0.05) / (darkest + 0.05);
                        };
                        
                        const rgb = hexToRgb(backgroundColor);
                        const whiteRgb = { r: 255, g: 255, b: 255 };
                        const blackRgb = { r: 0, g: 0, b: 0 };
                        
                        // Ensure minimum contrast ratio of 4.5:1 for accessibility
                        const contrastWithWhite = getContrastRatio(rgb, whiteRgb);
                        const contrastWithBlack = getContrastRatio(rgb, blackRgb);
                        
                        // Use appropriate opacity based on contrast
                        let highlightOpacity = 0.2; // Default 20% opacity
                        if (contrastWithWhite < 4.5 && contrastWithBlack >= 4.5) {
                          // Dark color - use lighter opacity for better readability
                          highlightOpacity = 0.15;
                        } else if (contrastWithWhite >= 4.5) {
                          // Light color - can use higher opacity
                          highlightOpacity = 0.3;
                        }
                        
                        const highlightColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${highlightOpacity})`;
                        
                        return (
                          <span
                            key={index}
                            className={`inline-highlight ${isSelected ? 'selected' : ''} cursor-pointer`}
                            style={{
                              backgroundColor: highlightColor,
                              padding: '2px 0',
                              borderRadius: '2px',
                              // Only transition hover effects, not layout properties
                              transition: 'filter 0.2s',
                              // Add subtle border for better definition
                              border: `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`,
                              // Ensure highlighted text is prominent when filtering
                              color: tagFilter ? '#374151' : 'inherit',
                              // High z-index for all filtered annotations, highest for selected
                              zIndex: tagFilter && isSelected ? 9999 : tagFilter && isFilteredAnnotation ? 100 : tagFilter ? 2 : 'auto',
                              position: 'relative',
                              // Enhanced highlighting when filtering - stronger for filtered annotations
                              boxShadow: tagFilter && isFilteredAnnotation ? `0 0 0 1px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)` : 'none'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onAnnotationClick(annotation.id, 'pdf');
                            }}
                            title={`${annotation.tags.map(tag => tag.name).join(', ')}: ${annotation.comment}`}
                          >
                            {segment.text}
                            <span
                              className="annotation-number"
                              style={{
                                display: 'inline-block',
                                background: 'white',
                                border: '1px solid #9CA3AF',
                                borderRadius: '2px',
                                padding: '1px 3px',
                                marginLeft: '2px',
                                fontSize: `${10 * scale}px`,
                                lineHeight: 1,
                                color: '#374151',
                                verticalAlign: 'baseline',
                                fontWeight: 'normal'
                              }}
                            >
                              [{annotationNumber}]
                            </span>
                          </span>
                        );
                      });
                    })()}
                  </div>

                  {/* Page Footer */}
                  <div 
                    className="absolute bottom-4 right-8 text-xs"
                    style={{ 
                      color: tagFilter ? '#D1D5DB' : '#9CA3AF',
                      zIndex: tagFilter ? 2 : 'auto'
                    }}
                  >
                    Page {pageNumber}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating PDF Controls - Overlaid on top with backdrop blur */}
      <div className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
        {/* Progressive backdrop blur layer matching Figma design intent */}
        <div 
          className="absolute backdrop-blur-[1px] backdrop-filter pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.4) 70%, rgba(255, 255, 255, 0.15) 90%, transparent 100%)',
            height: '100px', // Reduced height for more focused effect
            width: '100%',
            top: '0',
            left: '0'
          }}
        />
        {/* Additional subtle blur layer for smoother transition */}
        <div 
          className="absolute backdrop-blur-[0.5px] backdrop-filter pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0.05) 85%, transparent 100%)',
            height: '120px',
            width: '100%',
            top: '0',
            left: '0'
          }}
        />
        <div className="box-border content-stretch flex items-start p-[16px] relative pointer-events-auto transition-all duration-300 ease-in-out" style={{ justifyContent: tagFilter ? 'center' : 'space-between' }}>
          
          {/* Navigation Container - Left */}
          <div 
            className="bg-white box-border content-stretch flex gap-[8px] h-[50px] items-center px-[9px] py-px relative rounded-[10px] shrink-0 transition-all duration-300 ease-in-out"
            style={{
              transform: tagFilter ? 'translateX(-120px)' : 'translateX(0)',
              opacity: tagFilter ? 0 : 1,
              pointerEvents: tagFilter ? 'none' : 'auto'
            }}
          >
            <div className="absolute border border-[rgba(229,231,235,0.6)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
            
            <div 
              className="bg-[rgba(255,255,255,0.9)] h-[32px] relative rounded-[8px] shrink-0"
              style={{ opacity: currentPage <= 1 ? 0.5 : 1 }}
            >
              <div className="absolute border border-[rgba(209,213,220,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage <= 1}
                  className="h-auto p-0 font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] bg-transparent border-0 hover:bg-gray-100"
                >
                  <p className="leading-[20px] whitespace-pre">Previous</p>
                </Button>
              </div>
            </div>
            
            <div className="bg-[rgba(249,250,251,0.8)] h-[32px] relative rounded-[4px] shrink-0">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] h-[32px] items-center justify-center px-[21px] py-0 relative">
                <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#364153] text-[14px] text-center text-nowrap tracking-[-0.1504px]">
                  <p className="leading-[20px] whitespace-pre">{currentPage} / {numPages}</p>
                </div>
              </div>
            </div>
            
            <div 
              className="bg-[rgba(255,255,255,0.9)] h-[32px] relative rounded-[8px] shrink-0"
              style={{ opacity: currentPage >= numPages ? 0.5 : 1 }}
            >
              <div className="absolute border border-[rgba(209,213,220,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToPage(Math.min(numPages, currentPage + 1))}
                  disabled={currentPage >= numPages}
                  className="h-auto p-0 font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] bg-transparent border-0 hover:bg-gray-100"
                >
                  <p className="leading-[20px] whitespace-pre">Next</p>
                </Button>
              </div>
            </div>
          </div>

          {/* Tag Filter Container - Center */}
          {!tagFilter ? (
            <div className="bg-white box-border content-stretch flex gap-[8px] h-[50px] items-center px-[9px] py-px relative rounded-[10px] shrink-0">
              <div className="absolute border border-[rgba(229,231,235,0.6)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
              
              {tagCategories.map((category) => (
                <div key={category} className="bg-[rgba(255,255,255,0.9)] h-[32px] relative rounded-[8px] shrink-0">
                  <div className="absolute border border-[rgba(209,213,220,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onTagFilterChange?.(category)}
                      className="h-auto p-0 font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] bg-transparent border-0 hover:bg-gray-100"
                    >
                      <p className="leading-[20px] whitespace-pre">{category}</p>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white box-border content-stretch flex gap-[8px] h-[50px] items-center px-[9px] py-px relative rounded-[10px] shrink-0">
              <div className="absolute border border-[rgba(229,231,235,0.6)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
              
              {/* Close Filter Button */}
              <div className="bg-[rgba(255,255,255,0.9)] h-[32px] relative rounded-[8px] shrink-0 w-[32px]">
                <div className="absolute border border-[rgba(209,213,220,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onTagFilterChange?.(null)}
                    className="h-auto p-0 w-4 h-4 bg-transparent border-0 text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Filter Display with Full Functionality */}
              <div 
                className="bg-[rgba(249,250,251,0.8)] h-[32px] relative rounded-[4px] shrink-0 flex items-center px-3"
                style={(() => {
                  // Find the tag color for the current filter
                  const parentCategory = tagFilter.split('/')[0];
                  const tagColor = allAnnotations
                    .flatMap(ann => ann.tags)
                    .find(tag => tag.name.startsWith(parentCategory))?.color || '#3B82F6';
                  
                  // Convert hex to RGB for accessibility calculations
                  const hexToRgb = (hex: string) => {
                    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? {
                      r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16)
                    } : { r: 59, g: 130, b: 246 }; // Default blue
                  };
                  
                  const rgb = hexToRgb(tagColor);
                  
                  // Use very light background to ensure text contrast
                  const lightBg = {
                    r: Math.min(255, rgb.r + (255 - rgb.r) * 0.95),
                    g: Math.min(255, rgb.g + (255 - rgb.g) * 0.95),
                    b: Math.min(255, rgb.b + (255 - rgb.b) * 0.95)
                  };
                  
                  const borderColor = `rgb(${Math.max(0, rgb.r - 20)}, ${Math.max(0, rgb.g - 20)}, ${Math.max(0, rgb.b - 20)})`;
                  
                  return {
                    borderColor: borderColor + '60' // Add transparency
                  };
                })()}
              >
                <span 
                  className="text-sm font-medium"
                  style={(() => {
                    const parentCategory = tagFilter.split('/')[0];
                    const tagColor = allAnnotations
                      .flatMap(ann => ann.tags)
                      .find(tag => tag.name.startsWith(parentCategory))?.color || '#3B82F6';
                    
                    // Convert hex to RGB and ensure high contrast
                    const hexToRgb = (hex: string) => {
                      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                      return result ? {
                        r: parseInt(result[1], 16),
                        g: parseInt(result[2], 16),
                        b: parseInt(result[3], 16)
                      } : { r: 59, g: 130, b: 246 };
                    };
                    
                    const rgb = hexToRgb(tagColor);
                    // Use a darker version of the tag color for better contrast
                    const textColor = `rgb(${Math.max(0, rgb.r - 80)}, ${Math.max(0, rgb.g - 80)}, ${Math.max(0, rgb.b - 80)})`;
                    
                    return { color: textColor };
                  })()}
                >
                  {tagFilter.split('/')[0]}
                </span>
                <div 
                  className="w-px h-4 mx-2"
                  style={(() => {
                    const parentCategory = tagFilter.split('/')[0];
                    const tagColor = allAnnotations
                      .flatMap(ann => ann.tags)
                      .find(tag => tag.name.startsWith(parentCategory))?.color || '#3B82F6';
                    
                    const hexToRgb = (hex: string) => {
                      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                      return result ? {
                        r: parseInt(result[1], 16),
                        g: parseInt(result[2], 16),
                        b: parseInt(result[3], 16)
                      } : { r: 59, g: 130, b: 246 };
                    };
                    
                    const rgb = hexToRgb(tagColor);
                    const dividerColor = `rgb(${Math.max(0, rgb.r - 20)}, ${Math.max(0, rgb.g - 20)}, ${Math.max(0, rgb.b - 20)})`;
                    
                    return { backgroundColor: dividerColor };
                  })()}
                />
                <div className="flex gap-1">
                  {(() => {
                    const parentCategory = tagFilter.split('/')[0];
                    const allCategoryCount = allAnnotations.filter(ann => 
                      ann.tags.some(tag => tag.name.startsWith(parentCategory))
                    ).length;
                    const isAllActive = tagFilter === parentCategory;
                    
                    // Get the tag color for styling with accessibility
                    const tagColor = allAnnotations
                      .flatMap(ann => ann.tags)
                      .find(tag => tag.name.startsWith(parentCategory))?.color || '#3B82F6';
                    
                    const hexToRgb = (hex: string) => {
                      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                      return result ? {
                        r: parseInt(result[1], 16),
                        g: parseInt(result[2], 16),
                        b: parseInt(result[3], 16)
                      } : { r: 59, g: 130, b: 246 };
                    };
                    
                    // Calculate relative luminance for accessibility
                    const getLuminance = (r: number, g: number, b: number) => {
                      const [rs, gs, bs] = [r, g, b].map(c => {
                        c = c / 255;
                        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
                      });
                      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
                    };
                    
                    // Calculate contrast ratio
                    const getContrastRatio = (color1: {r: number, g: number, b: number}, color2: {r: number, g: number, b: number}) => {
                      const lum1 = getLuminance(color1.r, color1.g, color1.b);
                      const lum2 = getLuminance(color2.r, color2.g, color2.b);
                      const brightest = Math.max(lum1, lum2);
                      const darkest = Math.min(lum1, lum2);
                      return (brightest + 0.05) / (darkest + 0.05);
                    };
                    
                    const rgb = hexToRgb(tagColor);
                    const whiteRgb = { r: 255, g: 255, b: 255 };
                    
                    // Create accessible color variations
                    const createAccessibleColors = (isActive: boolean) => {
                      if (isActive) {
                        // Active state: solid color background with white text if contrast is good
                        const contrastWithWhite = getContrastRatio(rgb, whiteRgb);
                        if (contrastWithWhite >= 4.5) {
                          return {
                            backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                            borderColor: `rgb(${Math.max(0, rgb.r - 40)}, ${Math.max(0, rgb.g - 40)}, ${Math.max(0, rgb.b - 40)})`,
                            color: 'white'
                          };
                        } else {
                          // If white doesn't have enough contrast, use dark text on light background
                          const lightBg = {
                            r: Math.min(255, rgb.r + (255 - rgb.r) * 0.7),
                            g: Math.min(255, rgb.g + (255 - rgb.g) * 0.7),
                            b: Math.min(255, rgb.b + (255 - rgb.b) * 0.7)
                          };
                          return {
                            backgroundColor: `rgb(${lightBg.r}, ${lightBg.g}, ${lightBg.b})`,
                            borderColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                            color: `rgb(${Math.max(0, rgb.r - 100)}, ${Math.max(0, rgb.g - 100)}, ${Math.max(0, rgb.b - 100)})`
                          };
                        }
                      } else {
                        // Inactive state: very light background with dark text
                        const veryLightBg = {
                          r: Math.min(255, rgb.r + (255 - rgb.r) * 0.9),
                          g: Math.min(255, rgb.g + (255 - rgb.g) * 0.9),
                          b: Math.min(255, rgb.b + (255 - rgb.b) * 0.9)
                        };
                        return {
                          backgroundColor: `rgb(${veryLightBg.r}, ${veryLightBg.g}, ${veryLightBg.b})`,
                          borderColor: `rgb(${Math.max(0, rgb.r - 20)}, ${Math.max(0, rgb.g - 20)}, ${Math.max(0, rgb.b - 20)})`,
                          color: `rgb(${Math.max(0, rgb.r - 80)}, ${Math.max(0, rgb.g - 80)}, ${Math.max(0, rgb.b - 80)})`
                        };
                      }
                    };
                    
                    const createBadgeColors = (isActive: boolean) => {
                      if (isActive) {
                        return {
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          color: `rgb(${Math.max(0, rgb.r - 60)}, ${Math.max(0, rgb.g - 60)}, ${Math.max(0, rgb.b - 60)})`
                        };
                      } else {
                        return {
                          backgroundColor: `rgb(${Math.max(0, rgb.r - 20)}, ${Math.max(0, rgb.g - 20)}, ${Math.max(0, rgb.b - 20)})`,
                          color: 'white'
                        };
                      }
                    };
                    
                    const subCategories = Array.from(new Set(
                      allAnnotations
                        .flatMap(ann => ann.tags)
                        .filter(tag => tag.name.startsWith(parentCategory))
                        .map(tag => tag.name.split('/')[1])
                        .filter(Boolean)
                    ));

                    return [
                      // "All" button
                      <button
                        key="all"
                        onClick={() => onTagFilterChange?.(parentCategory)}
                        className="text-xs border px-2 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 hover:bg-gray-100"
                        style={createAccessibleColors(isAllActive)}
                        title={`Show all ${parentCategory} annotations (${allCategoryCount} annotations)`}
                      >
                        <span>all</span>
                        <span 
                          className="px-1 py-0.5 rounded-full text-[10px] min-w-[16px] h-4 flex items-center justify-center"
                          style={createBadgeColors(isAllActive)}
                        >
                          {allCategoryCount}
                        </span>
                      </button>,
                      // Subcategory buttons
                      ...subCategories.map((subCategory) => {
                        const fullTagName = `${parentCategory}/${subCategory}`;
                        const count = allAnnotations.filter(ann => 
                          ann.tags.some(tag => tag.name === fullTagName)
                        ).length;
                        
                        const hasChildren = allAnnotations.some(ann => 
                          ann.tags.some(tag => tag.name.startsWith(fullTagName + '/'))
                        );
                        
                        const isActive = tagFilter === fullTagName;
                        
                        return (
                          <button
                            key={subCategory}
                            onClick={() => {
                              // Apply the filter
                              onTagFilterChange?.(fullTagName);
                              
                              // Auto-scroll logic: navigate to first matching annotation unless current selection already matches
                              const filteredAnnotations = allAnnotations.filter(ann => 
                                ann.tags.some(tag => tag.name === fullTagName || tag.name.startsWith(fullTagName + '/'))
                              );
                              
                              if (filteredAnnotations.length > 0) {
                                // Check if currently selected annotation matches this filter
                                const currentAnnotationMatches = selectedAnnotationId && 
                                  filteredAnnotations.some(ann => ann.id === selectedAnnotationId);
                                
                                if (!currentAnnotationMatches) {
                                  // Navigate to first matching annotation
                                  const firstAnnotation = filteredAnnotations[0];
                                  onAnnotationClick(firstAnnotation.id, 'filter');
                                  scrollToPage(firstAnnotation.pageNumber);
                                }
                              }
                            }}
                            className="text-xs border px-2 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 hover:bg-gray-100"
                            style={createAccessibleColors(isActive)}
                            title={`Filter to ${fullTagName} (${count} annotations)`}
                          >
                            <span>{subCategory}</span>
                            <span 
                              className="px-1 py-0.5 rounded-full text-[10px] min-w-[16px] h-4 flex items-center justify-center"
                              style={createBadgeColors(isActive)}
                            >
                              {count}
                            </span>
                          </button>
                        );
                      })
                    ];
                  })()}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="bg-[rgba(255,255,255,0.9)] h-[32px] relative rounded-[8px] shrink-0 w-[32px]">
                <div className="absolute border border-[rgba(209,213,220,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const currentIndex = annotations.findIndex(ann => ann.id === selectedAnnotationId);
                      if (currentIndex > 0) {
                        const prevAnnotation = annotations[currentIndex - 1];
                        onAnnotationClick(prevAnnotation.id, 'filter');
                        scrollToPage(prevAnnotation.pageNumber);
                      }
                    }}
                    disabled={!selectedAnnotationId || annotations.findIndex(ann => ann.id === selectedAnnotationId) <= 0}
                    className="w-full h-full bg-transparent border-0 text-neutral-950 hover:bg-gray-100"
                  >
                    {"<"}
                  </Button>
                </div>
              </div>

              <div className="bg-[rgba(255,255,255,0.9)] h-[32px] relative rounded-[8px] shrink-0 w-[32px]">
                <div className="absolute border border-[rgba(209,213,220,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const currentIndex = annotations.findIndex(ann => ann.id === selectedAnnotationId);
                      if (currentIndex < annotations.length - 1) {
                        const nextAnnotation = annotations[currentIndex + 1];
                        onAnnotationClick(nextAnnotation.id, 'filter');
                        scrollToPage(nextAnnotation.pageNumber);
                      }
                    }}
                    disabled={!selectedAnnotationId || annotations.findIndex(ann => ann.id === selectedAnnotationId) >= annotations.length - 1}
                    className="h-auto p-0 w-4 h-4 bg-transparent border-0 text-neutral-950 hover:bg-gray-100"
                  >
                    {">"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Zoom & Tools Container - Right */}
          <div 
            className="bg-white box-border content-stretch flex gap-[8px] h-[50px] items-center px-[9px] py-px relative rounded-[10px] shrink-0 transition-all duration-300 ease-in-out"
            style={{
              transform: tagFilter ? 'translateX(120px)' : 'translateX(0)',
              opacity: tagFilter ? 0 : 1,
              pointerEvents: tagFilter ? 'none' : 'auto'
            }}
          >
            <div className="absolute border border-[rgba(229,231,235,0.6)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
            
            <div className="bg-[rgba(255,255,255,0.9)] relative rounded-[8px] shrink-0 size-[32px]">
              <div className="absolute border border-[rgba(209,213,220,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-px relative size-[32px]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                  className="h-auto p-0 bg-transparent border-0 hover:bg-gray-100"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-[rgba(249,250,251,0.8)] h-[32px] relative rounded-[4px] shrink-0 w-[60px]">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[60px]">
                <div className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[0] left-[30px] not-italic text-[#364153] text-[14px] text-center top-[6.5px] tracking-[-0.1504px] translate-x-[-50%] w-[35px]">
                  <p className="leading-[20px]">{Math.round(scale * 100)}%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[rgba(255,255,255,0.9)] relative rounded-[8px] shrink-0 size-[32px]">
              <div className="absolute border border-[rgba(209,213,220,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-px relative size-[32px]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setScale(s => Math.min(2.0, s + 0.1))}
                  className="h-auto p-0 bg-transparent border-0 hover:bg-gray-100"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-[rgba(209,213,220,0.5)] h-[20px] relative shrink-0 w-px">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] w-px" />
            </div>
            
            <div className="bg-[rgba(255,255,255,0.9)] relative rounded-[8px] shrink-0 size-[32px]">
              <div className="absolute border border-[rgba(209,213,220,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-px relative size-[32px]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRotation(r => (r + 90) % 360)}
                  className="h-auto p-0 bg-transparent border-0 hover:bg-gray-100"
                >
                  <RotateCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Annotation Form Popover - Only show in edit mode */}
      {!isViewMode && showAnnotationForm && selectionRect && (
        <div
          className="fixed z-50"
          style={{
            left: `${selectionRect.left}px`,
            top: `${selectionRect.top}px`,
          }}
        >
          <div 
            ref={(el) => {
              if (el && selectionRect) {
                // Edge detection and positioning
                const rect = el.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                const margin = 16; // Minimum margin from viewport edge
                
                let left = selectionRect.left;
                let top = selectionRect.top;
                
                // Adjust horizontal position if cut off
                if (left + rect.width > viewportWidth - margin) {
                  left = viewportWidth - rect.width - margin;
                }
                if (left < margin) {
                  left = margin;
                }
                
                // Adjust vertical position if cut off
                if (top + rect.height > viewportHeight - margin) {
                  // Try positioning above the selection
                  const newTop = selectionRect.top - rect.height - 8;
                  if (newTop >= margin) {
                    top = newTop;
                  } else {
                    // If still doesn't fit, position within viewport
                    top = Math.max(margin, viewportHeight - rect.height - margin);
                  }
                }
                if (top < margin) {
                  top = margin;
                }
                
                el.style.left = `${left}px`;
                el.style.top = `${top}px`;
              }
              
              // Handle escape key and click away
              if (el) {
                const handleKeyDown = (e: KeyboardEvent) => {
                  if (e.key === 'Escape') {
                    setShowAnnotationForm(false);
                    setAnnotationComment('');
                    setSelectedText('');
                    setSelectionPositions(null);
                    setSelectionRect(null);
                    setSelectedPageForAnnotation(1);
                    setSelectedTags([]);
                    setTagSearchTerm('');
                    window.getSelection()?.removeAllRanges();
                  }
                };
                
                const handleClickAway = (e: MouseEvent) => {
                  if (!el.contains(e.target as Node)) {
                    setShowAnnotationForm(false);
                    setAnnotationComment('');
                    setSelectedText('');
                    setSelectionPositions(null);
                    setSelectionRect(null);
                    setSelectedPageForAnnotation(1);
                    setSelectedTags([]);
                    setTagSearchTerm('');
                    window.getSelection()?.removeAllRanges();
                  }
                };
                
                document.addEventListener('keydown', handleKeyDown);
                document.addEventListener('mousedown', handleClickAway);
                
                return () => {
                  document.removeEventListener('keydown', handleKeyDown);
                  document.removeEventListener('mousedown', handleClickAway);
                };
              }
            }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-96 max-w-[calc(100vw-32px)]"
          >
            <h3 className="mb-2">Add Annotation</h3>
            <div className="mb-2">
              <p className="text-sm text-gray-600 mb-1">Selected text:</p>
              <p className="text-sm bg-gray-100 p-2 rounded">{selectedText}</p>
            </div>
            <div className="mb-3">
              <label className="block text-sm mb-1">Comment:</label>
              <textarea
                value={annotationComment}
                onChange={(e) => setAnnotationComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded resize-none"
                rows={2}
                placeholder="Add your comment..."
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm mb-1">Tags:</label>
              
              {/* Selected Tags Display */}
              {selectedTags.length > 0 && (
                <div className="mb-2 p-2 border border-gray-200 rounded bg-gray-50">
                  <div className="flex flex-wrap gap-1">
                    {selectedTags.map((tag) => (
                      <div
                        key={tag.id}
                        className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-300 rounded text-xs"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: tag.color }}
                        />
                        <span>{tag.name}</span>
                        <button
                          className="ml-1 text-gray-400 hover:text-gray-600"
                          onClick={() => handleTagRemove(tag.id)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tag Selection Interface */}
              <div className="border border-gray-200 rounded">
                {/* Search Input */}
                <div className="p-2 border-b border-gray-100">
                  <input
                    type="text"
                    placeholder="Search tags..."
                    value={tagSearchTerm || ''}
                    onChange={(e) => {
                      setTagSearchTerm(e.target.value);
                      setHighlightedTagIndex(0); // Reset to first item on search change
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setHighlightedTagIndex(prev => Math.min(prev + 1, filteredTags.length - 1));
                      } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        setHighlightedTagIndex(prev => Math.max(prev - 1, 0));
                      } else if (e.key === 'Enter') {
                        e.preventDefault();
                        const selectedTagData = filteredTags[highlightedTagIndex];
                        if (selectedTagData) {
                          const tagToAdd = { 
                            id: selectedTagData.id, 
                            name: selectedTagData.fullName || selectedTagData.name, 
                            color: selectedTagData.color 
                          };
                          handleTagToggle(tagToAdd);
                        }
                      }
                    }}
                    className="w-full p-1.5 text-sm border border-gray-200 rounded outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Filtered Tags List */}
                <div className="max-h-48 overflow-y-auto">
                  {tagSearchTerm ? (
                    // Flat list when searching - with highlighting and checkmarks
                    filteredTags.map((tag, index) => {
                      const isSelected = isTagSelected(tag.id);
                      return (
                        <button
                          key={tag.id}
                          className={`w-full flex items-center gap-2 p-2 text-left rounded text-sm transition-colors ${
                            index === highlightedTagIndex
                              ? 'bg-blue-100 border border-blue-300'
                              : isSelected
                              ? 'bg-green-50 hover:bg-green-100'
                              : 'hover:bg-gray-100'
                          } ${tag.isChild ? 'pl-6' : ''}`}
                          onClick={() => handleTagToggle({ id: tag.id, name: tag.fullName || tag.name, color: tag.color })}
                        >
                          <div 
                            className={`${tag.isChild ? 'w-2.5 h-2.5' : 'w-3 h-3'} rounded-full border border-gray-300 flex-shrink-0`} 
                            style={{ backgroundColor: tag.color }} 
                          />
                          <span className="flex-1">{tag.fullName || tag.name}</span>
                          {isSelected && (
                            <span className="text-green-600 text-sm">✓</span>
                          )}
                        </button>
                      );
                    })
                  ) : (
                    // Hierarchical display when not searching - with checkmarks
                    (() => {
                      const categories = Array.from(new Set(filteredTags.map(tag => tag.category)));

                      return categories.map((category, categoryIndex) => {
                        const categoryTags = filteredTags.filter(tag => tag.category === category);
                        const parentTag = categoryTags.find(tag => tag.isParent);
                        const childTags = categoryTags.filter(tag => tag.isChild);

                        return (
                          <div key={category} className={categoryIndex > 0 ? "border-t border-gray-100" : ""}>
                            <div className="p-2 bg-gray-50 text-sm text-gray-700">{category}</div>
                            <div className="space-y-1 p-1">
                              {parentTag && (() => {
                                const isSelected = isTagSelected(parentTag.id);
                                return (
                                  <button
                                    key={parentTag.id}
                                    className={`w-full flex items-center gap-2 p-2 text-left rounded text-sm transition-colors ${
                                      isSelected
                                        ? 'bg-green-50 hover:bg-green-100'
                                        : 'hover:bg-gray-100'
                                    }`}
                                    onClick={() => handleTagToggle({ id: parentTag.id, name: parentTag.name, color: parentTag.color })}
                                  >
                                    <div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: parentTag.color }} />
                                    <span className="flex-1">{parentTag.name}</span>
                                    {isSelected && (
                                      <span className="text-green-600 text-sm">✓</span>
                                    )}
                                  </button>
                                );
                              })()}
                              {childTags.map((childTag) => {
                                const isSelected = isTagSelected(childTag.id);
                                return (
                                  <button
                                    key={childTag.id}
                                    className={`w-full flex items-center gap-2 p-2 text-left rounded text-sm pl-6 transition-colors ${
                                      isSelected
                                        ? 'bg-green-50 hover:bg-green-100'
                                        : 'hover:bg-gray-100'
                                    }`}
                                    onClick={() => handleTagToggle({ id: childTag.id, name: childTag.fullName || childTag.name, color: childTag.color })}
                                  >
                                    <div className="w-2.5 h-2.5 rounded-full border border-gray-300" style={{ backgroundColor: childTag.color }} />
                                    <span className="flex-1">{childTag.name}</span>
                                    {isSelected && (
                                      <span className="text-green-600 text-sm">✓</span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      });
                    })()
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddAnnotation} disabled={selectedTags.length === 0}>
                Add Annotation
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAnnotationForm(false);
                  setAnnotationComment('');
                  setSelectedText('');
                  setSelectionPositions(null);
                  setSelectionRect(null);
                  setSelectedPageForAnnotation(1);
                  setSelectedTags([]);
                  setTagSearchTerm('');
                  window.getSelection()?.removeAllRanges();
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}