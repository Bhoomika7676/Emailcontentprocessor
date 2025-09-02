import React, { useState } from 'react';
import { Mail, Plus, CheckCircle, AlertCircle, Globe } from 'lucide-react';
import { EmailAccount } from '../types/email';

interface EmailAccountConnectProps {
  onAccountConnected: (account: EmailAccount) => void;
  connectedAccounts: EmailAccount[];
}

export function EmailAccountConnect({ onAccountConnected, connectedAccounts }: EmailAccountConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'gmail' | 'outlook' | 'yahoo' | null>(null);

  const providers = [
    {
      id: 'gmail' as const,
      name: 'Gmail',
      icon: '📧',
      color: 'from-red-500 to-red-600',
      description: 'Connect your Google account'
    },
    {
      id: 'outlook' as const,
      name: 'Outlook',
      icon: '📮',
      color: 'from-blue-500 to-blue-600',
      description: 'Connect your Microsoft account'
    },
    {
      id: 'yahoo' as const,
      name: 'Yahoo Mail',
      icon: '💌',
      color: 'from-purple-500 to-purple-600',
      description: 'Connect your Yahoo account'
    }
  ];

  const handleConnect = async (provider: 'gmail' | 'outlook' | 'yahoo') => {
    setIsConnecting(true);
    setSelectedProvider(provider);

    // Simulate OAuth connection process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockAccount: EmailAccount = {
      id: Date.now().toString(),
      email: `user@${provider === 'gmail' ? 'gmail.com' : provider === 'outlook' ? 'outlook.com' : 'yahoo.com'}`,
      provider,
      isConnected: true
    };

    onAccountConnected(mockAccount);
    setIsConnecting(false);
    setSelectedProvider(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg mr-3">
          <Globe className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Connect Email Account</h2>
      </div>

      {/* Connected Accounts */}
      {connectedAccounts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Connected Accounts</h3>
          <div className="space-y-2">
            {connectedAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">{account.email}</p>
                    <p className="text-sm text-gray-600 capitalize">{account.provider}</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Connected
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Provider Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {providers.map((provider) => {
          const isConnected = connectedAccounts.some(acc => acc.provider === provider.id);
          const isCurrentlyConnecting = isConnecting && selectedProvider === provider.id;
          
          return (
            <button
              key={provider.id}
              onClick={() => !isConnected && !isConnecting && handleConnect(provider.id)}
              disabled={isConnected || isConnecting}
              className={`
                relative p-6 rounded-xl border-2 transition-all duration-200 text-left
                ${isConnected 
                  ? 'border-green-300 bg-green-50 cursor-default' 
                  : isCurrentlyConnecting
                    ? 'border-blue-300 bg-blue-50 cursor-wait'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md cursor-pointer'
                }
              `}
            >
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">{provider.icon}</span>
                <h3 className="font-semibold text-gray-800">{provider.name}</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{provider.description}</p>
              
              <div className="flex items-center justify-between">
                {isConnected ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Connected</span>
                  </div>
                ) : isCurrentlyConnecting ? (
                  <div className="flex items-center text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-sm font-medium">Connecting...</span>
                  </div>
                ) : (
                  <div className="flex items-center text-gray-600">
                    <Plus className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Connect</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Secure Email Access:</p>
            <p className="text-blue-700">
              Your email credentials are handled securely through OAuth. We only access email content 
              for processing and never store your login credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}