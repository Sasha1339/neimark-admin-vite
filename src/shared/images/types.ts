export type ImageResponse = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  bucketId: string;
  name: string;
  signature: string;
  mimeType: string;
  sizeOriginal: number;
  chunksTotal: number;
  chunksUploaded: number;
}