import React, { useRef } from 'react';
import { Upload, FileText, Mail } from 'lucide-react';
import { EmailInput } from '../types/email';
import { parseEmailFile } from '../utils/emailParser';

interface EmailUploadProps {
  onEmailParsed: (email: EmailInput) => void;
  disabled?: boolean;
}

export function EmailUpload({ onEmailParsed, disabled }: EmailUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      const parsedEmail = parseEmailFile(content);
      onEmailParsed(parsedEmail);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error reading file. Please make sure it\'s a valid text or email file.');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="bg-purple-100 p-2 rounded-lg mr-3">
          <Upload className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Upload Email File</h2>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors duration-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-gray-100 p-4 rounded-full">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Upload Email File
            </h3>
            <p className="text-gray-600 mb-4">
              Support for .eml, .txt, and other text-based email formats
            </p>
          </div>

          <button
            onClick={handleUploadClick}
            disabled={disabled}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
          >
            <Upload className="h-5 w-5" />
            <span>Choose File</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".eml,.txt,.msg"
            onChange={handleFileUpload}
            className="hidden"
            disabled={disabled}
          />

          <div className="text-xs text-gray-500 space-y-1">
            <p>Supported formats: .eml (email files), .txt (plain text)</p>
            <p>Maximum file size: 10MB</p>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Mail className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">How to get email files:</p>
            <ul className="space-y-1 text-blue-700">
              <li>• <strong>Gmail:</strong> Open email → More (⋮) → Download message</li>
              <li>• <strong>Outlook:</strong> Open email → File → Save As → Choose .eml format</li>
              <li>• <strong>Apple Mail:</strong> Select email → File → Save As</li>
              <li>• <strong>Text files:</strong> Copy and paste email content into a .txt file</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}