// Rate limiter in-memory — funciona por instância de servidor.
// Para produção distribuída (Vercel multi-region), substituir por Upstash Redis.

type Entry = { count: number; resetAt: number }
const store = new Map<string, Entry>()

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()

  // limpa entradas expiradas periodicamente
  if (Math.random() < 0.01) {
    store.forEach((v, k) => {
      if (v.resetAt < now) store.delete(k)
    })
  }

  const entry = store.get(key)

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= limit) return false

  entry.count++
  return true
}
