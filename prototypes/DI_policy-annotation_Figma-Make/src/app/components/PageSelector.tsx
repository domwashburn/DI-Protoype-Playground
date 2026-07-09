import React from 'react';
import { ScrollArea } from './ui/scroll-area';
import { FileText } from 'lucide-react';
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
}

interface PageSelectorProps {
  numPages: number;
  currentPage: number;
  onPageClick: (pageNumber: number) => void;
  annotations: Annotation[];
}

export function PageSelector({ numPages, currentPage, onPageClick, annotations }: PageSelectorProps) {
  // Get annotation count per page
  const getPageAnnotationCount = (pageNumber: number) => {
    return annotations.filter(ann => ann.pageNumber === pageNumber).length;
  };

  // Mock page thumbnails content
  const getPagePreview = (pageNumber: number) => {
    const previews = {
      1: "BASIC LOAN APPROVAL POLICY\n\nUnited States Regulations\n\n1. OVERVIEW...",
      2: "2. BORROWER ELIGIBILITY CRITERIA\n\n2.1 MINIMUM REQUIREMENTS\nCredit Score • Income • Legal Status...",
      3: "3. LOAN AMOUNT AND TERMS\n\n3.1 LOAN AMOUNT LIMITS\nPersonal • Mortgage • Auto • Business...",
      4: "4. APPROVAL PROCESS\n\n4.1 APPLICATION PROCESS\nDocumentation • Authority • Timeline...",
      5: "5. RISK MANAGEMENT\n\n5.1 RISK ASSESSMENT\nCompliance • Quality Control • Appeals..."
    };
    return previews[pageNumber as keyof typeof previews] || `Page ${pageNumber} content...`;
  };

  return (
    <div className="w-48 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 bg-white">
        <h3 className="text-sm font-medium text-gray-900">Pages</h3>
        <p className="text-xs text-gray-500">{numPages} total</p>
      </div>

      {/* Page Thumbnails */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {Array.from({ length: numPages }, (_, index) => {
            const pageNumber = index + 1;
            const annotationCount = getPageAnnotationCount(pageNumber);
            const isCurrentPage = pageNumber === currentPage;

            return (
              <div
                key={pageNumber}
                className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                  isCurrentPage
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
                }`}
                onClick={() => onPageClick(pageNumber)}
              >
                {/* Thumbnail Container */}
                <div className="aspect-[3/4] p-2">
                  <div className="w-full h-full bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
                    {/* Mini page header */}
                    <div className="flex items-center gap-1 p-1 border-b border-gray-100 bg-gray-50">
                      <FileText className="w-2 h-2 text-blue-600" />
                      <div className="text-[6px] text-gray-600 truncate">Loan Policy</div>
                    </div>
                    
                    {/* Mini page content */}
                    <div className="p-1">
                      <div className="text-[6px] leading-tight text-gray-700 line-clamp-6">
                        {getPagePreview(pageNumber)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Page Number */}
                <div className="absolute bottom-1 left-1 right-1 text-center">
                  <div className={`inline-block px-1.5 py-0.5 rounded text-xs ${
                    isCurrentPage
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-600 text-white'
                  }`}>
                    {pageNumber}
                  </div>
                </div>

                {/* Annotation Count Badge */}
                {annotationCount > 0 && (
                  <div className="absolute top-1 right-1">
                    <div className="bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {annotationCount}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}