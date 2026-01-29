import dotenv from 'dotenv';

dotenv.config();

const FILE_SIZE_LIMIT_10MB = 1024 * 1024 * 10; // 10MB

export const config = {
    openai: {
        apiKey: process.env.OPENAI_API_KEY || '',
    },
    qdrant: {
        url: process.env.QDRANT_URL || '',
        collection: process.env.QDRANT_COLLECTION || '',
    },
    server: {
        port: process.env.PORT || 3333
    },
    storage: {
        dir: process.env.UPLOAD_DIR || 'uploads',
        maxFileSize: FILE_SIZE_LIMIT_10MB
    }
};