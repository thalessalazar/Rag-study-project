import {ChatOpenAI, OpenAIEmbeddings} from '@langchain/openai';
import {config} from '../config.js';

export const embeddings = new OpenAIEmbeddings({
    openAIApiKey: config.openai.apiKey,
    model: 'text-embedding-3-small',
    maxRetries: 3,
    timeout: 10000,
});

export const llm = new ChatOpenAI({
    model: 'gpt-4o-mini',
    temperature: 0,
    openAIApiKey: config.openai.apiKey,
    maxRetries: 3,
    timeout: 10000,
});