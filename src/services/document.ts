import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import {v4 as uuidv4} from 'uuid';
import { embeddings } from "./openai.js";
import { qdrantClient } from "./qdrant.js";
import { config } from "../config.js";

interface UploadResponse {
    success: boolean;
    documentId: string;
    chunksCount: number;
    message: string;
}

const textSplitters = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});

export async function process(
    filePath: string,
    fileName: string
): Promise<UploadResponse> {
    // 1. Carrega do arquivo PDF
    const loader = new PDFLoader(filePath);
    const documents = await loader.load();

    if(!documents || documents.length === 0)
        throw new Error('Nenhum documento encontrado no arquivo PDF');

    // 2. Divisão do texto em chunks
    const chunks = await textSplitters.splitDocuments(documents);

    if(!chunks || chunks.length === 0)
        throw new Error('Nenhum chunk encontrado no arquivo PDF');

    // 3. Adiciona metadados aos chunks
    const documentId = uuidv4();
    const documentsChunksWithMetadata = chunks.map((chunk, index) => {
        return {
            id: uuidv4(),
            text: chunk.pageContent,
            metadata: {
                documentId,
                chunkIndex: index,
                fileName,
                uploadedAt: new Date().toISOString(),
                page: chunk.metadata.loc?.pageNumber
            }
        }
    });

    // 4. Geração dos embeddings
    const texts = documentsChunksWithMetadata.map(chunk => chunk.text);
    const vectors = await embeddings.embedDocuments(texts);

    // 5. Armazenar os embeddings vetorizados de busco no banco de dados
    const data = documentsChunksWithMetadata.map((chunk, index) => {
        const vector = vectors[index];
        if(!vector || !Array.isArray(vector)) throw new Error('Erro ao gerar o embedding do chunk');
        return  {
            id: chunk.id,
            vector: vector,
            payload: {
                text: chunk.text,
                ...chunk.metadata
            }
        };
    });
    await qdrantClient.upsert(config.qdrant.collectionName, {
        points: data,
        wait: true
    });
    
    // 6. Retorna o resultado do upload

    return {
        success: true,
        documentId,
        chunksCount: documentsChunksWithMetadata.length,
        message: 'Documento carregado com sucesso',
    };
}   