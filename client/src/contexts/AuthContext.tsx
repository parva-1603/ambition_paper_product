export const AuthProvider = ({ children }: any) => children;
export const useAuth = () => ({
  signInWithGoogle: async () => {},
  signInWithPhone: async (_: string) => ({} as any),
  verifyOtp: async () => true,
});
