import React, { useState } from 'react';
import { Mail, Send, Loader2 } from 'lucide-react';
import { EmailInput } from '../types/email';

interface EmailFormProps {
  onSubmit: (email: EmailInput) => Promise<void>;
  isProcessing: boolean;
}

export function EmailForm({ onSubmit, isProcessing }: EmailFormProps) {
  const [email, setEmail] = useState<EmailInput>({
    subject: '',
    body: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.subject.trim() && email.body.trim()) {
      await onSubmit(email);
      setEmail({ subject: '', body: '' });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg mr-3">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Process Email</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Email Subject
          </label>
          <input
            type="text"
            id="subject"
            value={email.subject}
            onChange={(e) => setEmail({ ...email, subject: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter email subject..."
            disabled={isProcessing}
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
            Email Body
          </label>
          <textarea
            id="body"
            rows={8}
            value={email.body}
            onChange={(e) => setEmail({ ...email, body: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Paste your email content here..."
            disabled={isProcessing}
          />
        </div>

        <button
          type="submit"
          disabled={isProcessing || !email.subject.trim() || !email.body.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Process Email</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}