export interface ProcessedEmail {
  id: string;
  original_subject: string;
  original_body: string;
  extracted_content: {
    important_phrases: string[];
    action_items: string[];
    key_points: string[];
    sentiment: 'positive' | 'neutral' | 'negative';
  };
  created_at: string;
}

export interface EmailInput {
  subject: string;
  body: string;
}

export interface EmailAccount {
  id: string;
  email: string;
  provider: 'gmail' | 'outlook' | 'yahoo';
  isConnected: boolean;
}

export interface EmailMessage {
  id: string;
  subject: string;
  body: string;
  from: string;
  date: string;
  isRead: boolean;
}