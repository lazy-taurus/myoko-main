// src/lib/auth.js (you can add this in the same file as getUserFromRequest)
export function authorizeUser(user, ...allowedRoles) {
  if (!allowedRoles.includes(user.role)) {
    throw new Error(
      `Role ${user.role} is not authorized to access this resource`
    );
  }
  return true;
}
