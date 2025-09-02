import { EmailInput } from '../types/email';

export function parseEmailFile(content: string): EmailInput {
  // Handle .eml format (standard email format)
  if (content.includes('Subject:') && content.includes('From:')) {
    return parseEmlFormat(content);
  }
  
  // Handle plain text format
  return parsePlainTextFormat(content);
}

function parseEmlFormat(content: string): EmailInput {
  const lines = content.split('\n');
  let subject = '';
  let body = '';
  let isBody = false;
  let bodyStarted = false;

  for (const line of lines) {
    if (line.startsWith('Subject:')) {
      subject = line.replace('Subject:', '').trim();
    } else if (line.trim() === '' && !bodyStarted) {
      // Empty line typically separates headers from body
      isBody = true;
      bodyStarted = true;
    } else if (isBody) {
      body += line + '\n';
    }
  }

  return {
    subject: subject || 'No Subject',
    body: body.trim() || 'No content found'
  };
}

function parsePlainTextFormat(content: string): EmailInput {
  const lines = content.split('\n');
  
  // Try to find a subject line (first non-empty line or line starting with common patterns)
  let subject = '';
  let bodyStartIndex = 0;
  
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i].trim();
    if (line && !subject) {
      subject = line;
      bodyStartIndex = i + 1;
      break;
    }
  }
  
  // Rest is body
  const body = lines.slice(bodyStartIndex).join('\n').trim();
  
  return {
    subject: subject || 'Uploaded Email',
    body: body || content.trim()
  };
}