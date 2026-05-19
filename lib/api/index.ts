export { getAds } from "@/lib/api/ads";
export {
  forgotPassword,
  getVerifyEmailUrl,
  loginUser,
  registerUser,
  resendVerificationEmail,
  resetPassword,
  verifyEmailWithCode,
} from "@/lib/api/auth";
export {
  getBookAccess,
  getBookById,
  getBookCoverUrl,
  getBookPreviewUrl,
  getBookReviews,
  getBooks,
  getLatestBooks,
  getMostReadBooks,
  getRelatedBooks,
} from "@/lib/api/books";
export { getBundleById, getBundles } from "@/lib/api/bundles";
export { getCategories, getCategoryBySlug } from "@/lib/api/categories";
export {
  getApiBaseUrl,
  getApiConfigHint,
  hasApiBaseUrl,
  resolveApiBaseUrl,
} from "@/lib/api/config";
export { ApiError, isApiError } from "@/lib/api/errors";
export type {
  Advertisement,
  AppLanguage,
  AuthUser,
  Book,
  BookAccessState,
  BooksListResponse,
  Bundle,
  Category,
  CategoryWithBooks,
  GetBooksParams,
  LoginResponse,
  MessageResponse,
  Pagination,
  RegisterPayload,
  RegisterResponse,
  Review,
} from "@/lib/api/types";
