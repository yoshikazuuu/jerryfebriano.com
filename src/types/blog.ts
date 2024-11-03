export interface PostMetadata {
    title: string;
    description: string;
    date: string;
    readingTime?: string;
}

export interface FolderData {
    folderName: string;
    metadata: PostMetadata;
}