import * as SecureStore from "expo-secure-store";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

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
    SecureStore.setItem(key, value);
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
    if (!userInfo.expiration) return;

    const expirationDate = new Date(userInfo.expiration).getTime();
    const now = Date.now();

    if (expirationDate <= now) {
      logout(true);
      return;
    }

    const timeout = setTimeout(() => {
      logout(true);
    }, expirationDate - now);

    return () => clearTimeout(timeout);
  }, [userInfo.expiration]);

  async function login(user: UserInfo) {
    setUserInfo({
      accessToken: user.accessToken,
      userId: user.userId,
      expiration: user.expiration,
      refreshToken: user.refreshToken,
      refreshExpiration: user.refreshExpiration,
    });

    await setSecureStorageItemAsync("accessToken", user.accessToken);
    await setSecureStorageItemAsync("refreshToken", user.refreshToken);
  }

  async function logout(expired = false) {
    setUserInfo({
      accessToken: "",
      userId: "",
      expiration: "",
      refreshToken: "",
      refreshExpiration: "",
    });

    await setSecureStorageItemAsync("refreshToken", null);
    await setSecureStorageItemAsync("accessToken", null);

    if (expired) {
      Alert.alert(
        "Ops! Sua sessão expirou.",
        "Entre novamente para continuar usando."
      );
    }
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
