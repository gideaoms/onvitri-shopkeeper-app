export declare namespace Picture {
  type Variant = {
    url: string;
    name: string;
    ext: string;
    width: number;
    height: number;
    size: Size;
  };
  type Size = 'sm' | 'md';
}

export type Picture = {
  id: string;
  isUploading: boolean;
  variants: Picture.Variant[];
};
