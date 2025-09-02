import React from 'react';
import { CheckCircle, AlertCircle, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ProcessedEmail } from '../types/email';

interface ProcessedEmailCardProps {
  email: ProcessedEmail;
}

export function ProcessedEmailCard({ email }: ProcessedEmailCardProps) {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'negative':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Minus className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-700 bg-green-100';
      case 'negative':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {email.original_subject}
        </h3>
        <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(email.extracted_content.sentiment)}`}>
          {getSentimentIcon(email.extracted_content.sentiment)}
          <span className="ml-1 capitalize">{email.extracted_content.sentiment}</span>
        </div>
      </div>

      <div className="space-y-4">
        {email.extracted_content.important_phrases.length > 0 && (
          <div>
            <div className="flex items-center mb-2">
              <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
              <h4 className="font-medium text-gray-700">Important Phrases</h4>
            </div>
            <div className="space-y-1">
              {email.extracted_content.important_phrases.map((phrase, index) => (
                <p key={index} className="text-sm text-gray-600 bg-orange-50 p-2 rounded-lg">
                  {phrase}
                </p>
              ))}
            </div>
          </div>
        )}

        {email.extracted_content.action_items.length > 0 && (
          <div>
            <div className="flex items-center mb-2">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <h4 className="font-medium text-gray-700">Action Items</h4>
            </div>
            <div className="space-y-1">
              {email.extracted_content.action_items.map((item, index) => (
                <p key={index} className="text-sm text-gray-600 bg-green-50 p-2 rounded-lg">
                  {item}
                </p>
              ))}
            </div>
          </div>
        )}

        {email.extracted_content.key_points.length > 0 && (
          <div>
            <div className="flex items-center mb-2">
              <Clock className="h-4 w-4 text-blue-500 mr-2" />
              <h4 className="font-medium text-gray-700">Key Points</h4>
            </div>
            <div className="space-y-1">
              {email.extracted_content.key_points.map((point, index) => (
                <p key={index} className="text-sm text-gray-600 bg-blue-50 p-2 rounded-lg">
                  {point}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Processed {new Date(email.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}