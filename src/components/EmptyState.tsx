import React from 'react';
import { FileText } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileText className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">No emails processed yet</h3>
      <p className="text-gray-600">
        Start by entering an email above to see the extracted important content here.
      </p>
    </div>
  );
}