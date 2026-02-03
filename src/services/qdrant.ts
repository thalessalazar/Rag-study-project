import {QdrantClient} from '@qdrant/js-client-rest';
import {config} from '../config.js';

export const qdrantClient = new QdrantClient({
    url: config.qdrant.url,
});

export async function initQdrantCollection() {
    const collections = await qdrantClient.getCollections();
    const existCollection = collections.collections.find( collection => collection.name = config.qdrant.collectionName )

    if(!existCollection) {
        await qdrantClient.createCollection(config.qdrant.collectionName, {
            vectors: {
                size: 1536,
                distance: 'Cosine',
            }
        });

        console.log(`Collection ${config.qdrant.collectionName} created successfully`);
        return;
    } 

    console.log(`Collection ${config.qdrant.collectionName} already exists`);
    return;
}