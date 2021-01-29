import { authProvider } from "../providers/auth_provider";

export function authHeader() {
  let user = authProvider.getUserOnly();
  if (user && user.token.accessToken) {
    return `Bearer ${user.token.accessToken}`;
  } else {
    return "";
  }
}
