import { setupInterceptors } from "@/hooks/useAxiosInstance";
import * as SecureStore from "expo-secure-store";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type AuthContextType = {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  login: (user: UserInfo) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface UserInfo {
  accessToken: string;
  refreshToken: string;
  userId: string;
  expiration: string;
  refreshExpiration: string;
}

async function setSecureStorageItemAsync(key: string, value: string | null) {
  if (value == null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    accessToken: "",
    userId: "",
    refreshToken: "",
    expiration: "",
    refreshExpiration: "",
  });

  const isAuthenticated = useCallback(() => {
    return (
      !!userInfo.accessToken &&
      !!userInfo.expiration &&
      new Date(userInfo.expiration) > new Date()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.accessToken]);

  useEffect(() => {
    const IS_AUTHENTICATED = isAuthenticated();

    if (IS_AUTHENTICATED) {
      setupInterceptors(userInfo.accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  async function login(user: UserInfo) {
    setUserInfo({
      accessToken: user.accessToken,
      userId: user.userId,
      expiration: user.expiration,
      refreshToken: user.refreshToken,
      refreshExpiration: user.refreshExpiration,
    });

    await setSecureStorageItemAsync("refreshToken", user.refreshToken);
  }

  async function logout() {
    setUserInfo({
      accessToken: "",
      userId: "",
      expiration: "",
      refreshToken: "",
      refreshExpiration: "",
    });

    await setSecureStorageItemAsync("refreshToken", null);
  }

  return (
    <AuthContext.Provider
      value={{ userInfo, setUserInfo, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}
