import { randomBytes, pbkdf2Sync, timingSafeEqual } from 'node:crypto';

// Fonction pour créer un hash avec un salt
export function hashWithSalt(password: string) {
  // Générer un salt aléatoire
  const salt = randomBytes(16).toString('hex');

  // Créer un hash de mot de passe avec le salt
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  // Retourner le hash et le salt
  return { salt, hash };
}

export function verifyPassword(
  storedHash: string,
  storedSalt: string,
  password: string,
) {
  const hash = pbkdf2Sync(password, storedSalt, 1000, 64, 'sha512')
    .toString('hex');

  return timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash));
}
