import { useAuth } from "@clerk/clerk-react";

export const useApi = () => {
  const { getToken } = useAuth();

  const makeRequest = async (endpoint, options = {}) => {
    const token = await getToken();

    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Use relative path since Vercel routes /api/* to backend
    const response = await fetch(`/api/${endpoint}`, {
      ...defaultOptions,
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (response.status === 429) {
        throw new Error("Daily quota exceeded");
      }
      throw new Error(errorData?.detail || "An error occurred");
    }

    return response.json();
  };

  return { makeRequest };
};
