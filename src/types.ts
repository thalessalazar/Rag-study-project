export interface SearchResult {
    id: string;
    text: string;
    score: number;
    metadata: {
        documentId: string;
        fileName: string;
        chunkIndex: number;
        page?: number;
    };
}

export interface QueryRequest {
    query: string;
    topK?: number;
}

export interface QueryResponse {
    question: string;
    answers: SearchResult[];
    countChunks: number;
}

export interface UploadResponse {
    success: boolean;
    documentId: string;
    chunksCount: number;
    message: string;
}
