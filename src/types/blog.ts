export interface PostMetadata {
    title: string;
    description: string;
    slug: string;
    readingTime?: string;
}

export interface FolderData {
    folderName: string;
    metadata: PostMetadata;
}