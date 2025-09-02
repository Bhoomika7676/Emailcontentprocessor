import React, { useState, useEffect } from 'react';
import { Zap, Database, Mail } from 'lucide-react';
import { EmailForm } from './components/EmailForm';
import { EmailUpload } from './components/EmailUpload';
import { EmailAccountConnect } from './components/EmailAccountConnect';
import { EmailSelector } from './components/EmailSelector';
import { ProcessedEmailCard } from './components/ProcessedEmailCard';
import { EmptyState } from './components/EmptyState';
import { processEmailContent } from './utils/emailProcessor';
import { ProcessedEmail, EmailInput, EmailAccount } from './types/email';

function App() {
  const [emails, setEmails] = useState<ProcessedEmail[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState<EmailAccount[]>([]);
  const [activeTab, setActiveTab] = useState<'connect' | 'upload' | 'manual'>('connect');

  // Load emails from localStorage on component mount
  useEffect(() => {
    const savedEmails = localStorage.getItem('processedEmails');
    if (savedEmails) {
      setEmails(JSON.parse(savedEmails));
    }
  }, []);

  // Save emails to localStorage whenever emails change
  useEffect(() => {
    localStorage.setItem('processedEmails', JSON.stringify(emails));
  }, [emails]);

  const handleEmailSubmit = async (emailInput: EmailInput) => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const extractedContent = processEmailContent(emailInput);
    
    const processedEmail: ProcessedEmail = {
      id: Date.now().toString(),
      original_subject: emailInput.subject,
      original_body: emailInput.body,
      extracted_content: extractedContent,
      created_at: new Date().toISOString()
    };

    setEmails(prev => [processedEmail, ...prev]);
    setIsProcessing(false);
  };

  const handleUploadedEmail = (emailInput: EmailInput) => {
    handleEmailSubmit(emailInput);
  };

  const handleAccountConnected = (account: EmailAccount) => {
    setConnectedAccounts(prev => [...prev, account]);
    setActiveTab('connect'); // Stay on connect tab to show email selector
  };

  const handleEmailSelected = (emailInput: EmailInput) => {
    handleEmailSubmit(emailInput);
  };

  const clearAllEmails = () => {
    setEmails([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl mr-3">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Email Content Processor
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Extract important information from your emails using AI-powered content analysis
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('connect')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
                activeTab === 'connect'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Mail className="h-5 w-5 mx-auto mb-1" />
              Connect Email
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
                activeTab === 'upload'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Database className="h-5 w-5 mx-auto mb-1" />
              Upload File
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
                activeTab === 'manual'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Zap className="h-5 w-5 mx-auto mb-1" />
              Manual Entry
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'connect' && (
          <>
            <EmailAccountConnect 
              onAccountConnected={handleAccountConnected}
              connectedAccounts={connectedAccounts}
            />
            {connectedAccounts.length > 0 && (
              <EmailSelector
                connectedAccount={connectedAccounts[0]}
                onEmailSelected={handleEmailSelected}
                disabled={isProcessing}
              />
            )}
          </>
        )}

        {activeTab === 'upload' && (
          <EmailUpload onEmailParsed={handleUploadedEmail} disabled={isProcessing} />
        )}

        {activeTab === 'manual' && (
          <EmailForm onSubmit={handleEmailSubmit} isProcessing={isProcessing} />
        )}

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Processed Emails ({emails.length})
              </h2>
            </div>
            {emails.length > 0 && (
              <button
                onClick={clearAllEmails}
                className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-200"
              >
                Clear All
              </button>
            )}
          </div>

          {emails.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-6">
              {emails.map((email) => (
                <ProcessedEmailCard key={email.id} email={email} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2025 Email Content Processor - Powered by intelligent content extraction</p>
        </div>
      </div>
    </div>
  );
}

export default App;