import fs from 'fs';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';

export type GenerateInput = {
  birthDate: string;
  lifePath: number;
  personalYear: number;
  currentYear: number;
  currentMonth: number;
};

export async function generateLayer2Report(input: GenerateInput): Promise<string> {
  const root = process.cwd();
  const systemPrompt = fs.readFileSync(
    path.join(root, 'lib', 'Numerology', 'numerology_layer2_system_prompt_v2.md'),
    'utf-8'
  );
  const motherFile = fs.readFileSync(
    path.join(root, 'lib', 'Numerology', 'numerology_layer2_motherfile.md'),
    'utf-8'
  );

  const combinedSystem = `${systemPrompt}\n\n---\n\n## KNOWLEDGE BASE\n\n${motherFile}`;

  const userMessage = `Generate a full Layer 2 numerology report for the following person:

- Birth Date: ${input.birthDate}
- Life Path Number: ${input.lifePath}
- Personal Year Number: ${input.personalYear}
- Current Year: ${input.currentYear}
- Current Month: ${input.currentMonth}

Please produce the complete personalised report now.`;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    system: combinedSystem,
    messages: [{ role: 'user', content: userMessage }],
  });

  const block = message.content[0];
  if (block.type !== 'text') throw new Error('Unexpected response type from Claude');
  return block.text;
}
