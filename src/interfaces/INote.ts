export interface NoteDTO {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface NoteProps {
  id: number;
  title: string;
  imageUrl: string;
  isBookmarked: boolean;
}
