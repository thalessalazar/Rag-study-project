import {QdrantClient} from '@qdrant/js-client-rest';
import {config} from '../config.js';

export const qdrantClient = new QdrantClient({
    url: config.qdrant.url,
});

export async function iniQdrantCollection(collectionName: string) {
    const collections = await qdrantClient.getCollections();
    const existCollection = collections.collections.find( collection => collection.name = config.qdrant.collectionName )

    if(!existCollection) {
        await qdrantClient.createCollection(collectionName, {
            vectors: {
                size: 1536,
                distance: 'Cosine',
            }
        });

        console.log(`Collection ${collectionName} created successfully`);
        return;
    } 

    console.log(`Collection ${collectionName} already exists`);
    return;
}