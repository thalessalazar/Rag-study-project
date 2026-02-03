import { config } from "../config.js";
import { qdrantClient } from "./qdrant.js";
import { embeddings } from "./openai.js";
import type {QueryRequest, SearchResult, QueryResponse} from "../types.js";

export async function queryChunks(request: QueryRequest): Promise<QueryResponse> {
    return {
        question: request.query,
        answers: [],
        countChunks: 0
    }
}
