// import {config} from './config.js';
// import express from 'express';

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
    
// });

// app.listen(config.server.port, () => {
//     console.log(`Server is running on port ${config.server.port}`);
// });

import {processDocument} from "./services/document.js";
import {initQdrantCollection} from "./services/qdrant.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));


async function main() {
    console.log("Iniciando aplicação...");
    try {
        console.log("Iniciando coleção Qdrant...");
        await initQdrantCollection();

        const pdfPath = path.join(__dirname, "uploads", "NIKE10K2023.pdf");
        const fileName = path.basename('NIKE10K2023.pdf');

        console.log(`pdfpath: ${pdfPath}`);

        const startTime = Date.now();
        const result = await processDocument(pdfPath, fileName);
        const duration = Date.now() - startTime;

        console.log(`Documento ${fileName} processado com sucesso em ${duration}ms`);
        console.log(`ID do documento: ${result.documentId}`);
        console.log(`Quantidade de chunks: ${result.chunksCount}`);
        console.log(`Duração do processamento: ${duration}ms`);
    } catch (error) {
        console.error('Erro ao iniciar o Qdrant:', error);
    }
}

main();