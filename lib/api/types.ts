export type AppLanguage = "FR" | "EN";

export type Pagination = {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
};

export type Book = {
  readonly id: string;
  readonly title: string;
  readonly author?: string;
  readonly description?: string;
  readonly price?: number;
  readonly coverImageUrl?: string;
  readonly coverImageURL?: string;
  readonly coverUrl?: string;
  readonly imageUrl?: string;
  readonly categoryId?: string;
  readonly category?: { readonly name?: string };
  readonly language?: string;
  readonly level?: string;
  readonly viewCount?: number;
  readonly viewsCount?: number;
  readonly likesCount?: number;
  readonly previewPageCount?: number;
  readonly hasPreview?: boolean;
  readonly format?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
};

export type SearchSuggestion = {
  readonly id: string;
  readonly title: string;
  readonly author?: string;
};

export type BooksListResponse = {
  readonly data: readonly Book[];
  readonly pagination: Pagination;
};

export type BookAccessState = {
  readonly bookId: string;
  readonly canPreview: boolean;
  readonly previewPageCount?: number;
  readonly isAuthenticated: boolean;
  readonly hasPurchased: boolean;
  readonly requiresLoginForFullRead: boolean;
  readonly requiresPurchaseForFullRead: boolean;
  readonly canReadFull: boolean;
};

export type Category = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
};

export type CategoryWithBooks = Category & {
  readonly books: readonly Book[];
};

export type Bundle = {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly price?: number;
  readonly books?: readonly Book[];
};

export type Advertisement = {
  readonly id: string;
  readonly title?: string;
  readonly imageUrl?: string;
  readonly linkUrl?: string;
  readonly location?: string;
};

export type Review = {
  readonly id: string;
  readonly bookId?: string;
  readonly userId?: string;
  readonly rating: number;
  readonly comment?: string;
  readonly createdAt?: string;
};

export type AuthUser = {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly role: string;
};

export type LoginResponse = {
  readonly token: string;
  readonly user: AuthUser;
};

export type RegisterPayload = {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly language: AppLanguage;
  readonly favoriteCategoryIds: readonly string[];
  readonly country?: string;
};

export type RegisterResponse = {
  readonly message: string;
  readonly requiresEmailVerification?: boolean;
};

export type MessageResponse = {
  readonly message: string;
};

export type GetBooksParams = {
  readonly search?: string;
  readonly category?: string;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly level?: string;
  readonly language?: string;
  readonly sort?: string;
  readonly order?: "asc" | "desc";
  readonly page?: number;
  readonly limit?: number;
};
