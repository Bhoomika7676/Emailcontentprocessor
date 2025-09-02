import React, { useState, useEffect } from 'react';
import { Mail, RefreshCw, Download, Clock, User } from 'lucide-react';
import { EmailMessage, EmailAccount } from '../types/email';

interface EmailSelectorProps {
  connectedAccount: EmailAccount;
  onEmailSelected: (email: { subject: string; body: string }) => void;
  disabled?: boolean;
}

export function EmailSelector({ connectedAccount, onEmailSelected, disabled }: EmailSelectorProps) {
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  // Mock email data for demonstration
  const mockEmails: EmailMessage[] = [
    {
      id: '1',
      subject: 'Urgent: Project Deadline Approaching - Action Required',
      body: 'Hi team, I wanted to remind everyone that our project deadline is approaching next Friday. We need to complete the final review by Wednesday and submit all deliverables by Thursday. Please prioritize this task and let me know if you need any assistance. The client is expecting the final presentation on Monday morning.',
      from: 'manager@company.com',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isRead: false
    },
    {
      id: '2',
      subject: 'Meeting Invitation: Q1 Budget Review',
      body: 'You are invited to attend the Q1 budget review meeting scheduled for tomorrow at 2 PM in Conference Room A. Please bring your department budget reports and be prepared to discuss any budget variances. The meeting agenda includes cost analysis, budget allocation for Q2, and approval of pending expenses.',
      from: 'finance@company.com',
      date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      isRead: true
    },
    {
      id: '3',
      subject: 'Customer Feedback: Product Enhancement Request',
      body: 'We received excellent feedback from our customer regarding the new features. They are particularly happy with the user interface improvements and have requested additional functionality for the dashboard. The customer mentioned they would like to see real-time analytics and better export options. This is a great opportunity to strengthen our relationship.',
      from: 'support@company.com',
      date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      isRead: true
    },
    {
      id: '4',
      subject: 'Invoice #12345 - Payment Due',
      body: 'This is a reminder that invoice #12345 for $2,500 is due for payment within the next 5 days. Please process the payment at your earliest convenience to avoid any late fees. If you have any questions about this invoice, please contact our accounting department immediately.',
      from: 'billing@vendor.com',
      date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      isRead: false
    },
    {
      id: '5',
      subject: 'Team Building Event - RSVP Required',
      body: 'Join us for our annual team building event next month! We have planned exciting activities including team challenges, networking sessions, and a group dinner. Please confirm your attendance by replying to this email. The event will be held at the downtown conference center and transportation will be provided.',
      from: 'hr@company.com',
      date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      isRead: true
    }
  ];

  const loadEmails = async () => {
    setIsLoading(true);
    // Simulate API call to fetch emails
    await new Promise(resolve => setTimeout(resolve, 1500));
    setEmails(mockEmails);
    setIsLoading(false);
  };

  useEffect(() => {
    loadEmails();
  }, [connectedAccount]);

  const handleEmailSelect = (email: EmailMessage) => {
    setSelectedEmailId(email.id);
    onEmailSelected({
      subject: email.subject,
      body: email.body
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-green-100 p-2 rounded-lg mr-3">
            <Mail className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Select Email</h2>
            <p className="text-sm text-gray-600">{connectedAccount.email}</p>
          </div>
        </div>
        
        <button
          onClick={loadEmails}
          disabled={isLoading || disabled}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading emails...</span>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => handleEmailSelect(email)}
              className={`
                p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md
                ${selectedEmailId === email.id 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
                }
                ${!email.isRead ? 'bg-blue-25 border-l-4 border-l-blue-500' : ''}
              `}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-medium truncate ${!email.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                    {email.subject}
                  </h3>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <User className="h-3 w-3 mr-1" />
                    <span className="truncate mr-3">{email.from}</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatDate(email.date)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-3">
                  {!email.isRead && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                  {selectedEmailId === email.id && (
                    <Download className="h-4 w-4 text-blue-600" />
                  )}
                </div>
              </div>
              
              <p className="text-xs text-gray-600 line-clamp-2">
                {email.body.substring(0, 120)}...
              </p>
            </div>
          ))}
        </div>
      )}

      {emails.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <Mail className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No emails found</p>
          <p className="text-sm text-gray-500">Try refreshing or check your email account</p>
        </div>
      )}
    </div>
  );
}