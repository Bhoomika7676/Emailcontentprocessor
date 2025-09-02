import { EmailInput } from '../types/email';

export function processEmailContent(email: EmailInput) {
  const { subject, body } = email;
  
  // Extract important phrases (sentences with keywords)
  const importantKeywords = [
    'urgent', 'important', 'deadline', 'asap', 'priority', 'critical',
    'meeting', 'call', 'schedule', 'appointment', 'reminder',
    'approve', 'confirm', 'verify', 'review', 'feedback',
    'budget', 'cost', 'payment', 'invoice', 'price',
    'project', 'task', 'deliverable', 'milestone', 'goal'
  ];
  
  const sentences = body.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const importantPhrases = sentences.filter(sentence => 
    importantKeywords.some(keyword => 
      sentence.toLowerCase().includes(keyword.toLowerCase())
    )
  ).map(s => s.trim()).slice(0, 5); // Limit to 5 most important

  // Extract action items (sentences with action verbs)
  const actionVerbs = [
    'need to', 'should', 'must', 'please', 'can you', 'could you',
    'schedule', 'send', 'review', 'approve', 'complete', 'finish',
    'call', 'email', 'contact', 'respond', 'reply'
  ];
  
  const actionItems = sentences.filter(sentence =>
    actionVerbs.some(verb =>
      sentence.toLowerCase().includes(verb.toLowerCase())
    )
  ).map(s => s.trim()).slice(0, 3); // Limit to 3 action items

  // Extract key points (longer sentences that seem informative)
  const keyPoints = sentences
    .filter(sentence => 
      sentence.trim().length > 50 && 
      sentence.trim().length < 200 &&
      !importantPhrases.includes(sentence.trim()) &&
      !actionItems.includes(sentence.trim())
    )
    .slice(0, 4)
    .map(s => s.trim());

  // Basic sentiment analysis
  const positiveWords = ['good', 'great', 'excellent', 'perfect', 'amazing', 'wonderful', 'fantastic', 'awesome', 'love', 'like', 'happy', 'pleased', 'satisfied', 'thank'];
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'angry', 'frustrated', 'disappointed', 'concerned', 'worried', 'issue', 'problem', 'error'];
  
  const text = (subject + ' ' + body).toLowerCase();
  const positiveCount = positiveWords.reduce((count, word) => 
    count + (text.match(new RegExp(word, 'g')) || []).length, 0
  );
  const negativeCount = negativeWords.reduce((count, word) => 
    count + (text.match(new RegExp(word, 'g')) || []).length, 0
  );
  
  let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
  if (positiveCount > negativeCount) sentiment = 'positive';
  else if (negativeCount > positiveCount) sentiment = 'negative';

  return {
    important_phrases: importantPhrases,
    action_items: actionItems,
    key_points: keyPoints,
    sentiment
  };
}