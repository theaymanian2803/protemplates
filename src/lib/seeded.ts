export function seededRandom(seed: string): () => number {
  let s = 0
  for (let i = 0; i < seed.length; i++) {
    s = ((s << 5) - s + seed.charCodeAt(i)) | 0
  }
  s = Math.abs(s) || 1
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function getPlaceholderReviewCount(templateId: string): number {
  const rand = seededRandom(templateId + '_rc')
  return Math.floor(rand() * 14) + 7
}

export function getPlaceholderSales(templateId: string): number {
  return getPlaceholderReviewCount(templateId)
}

export function formatSales(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return `${n}`
}

export function getDisplaySales(templateId: string, realSales?: number | null): number {
  return getPlaceholderSales(templateId) + (Number(realSales) || 0)
}

export function getDisplayReviewCount(templateId: string, realCount?: number | null): number {
  return getPlaceholderReviewCount(templateId) + (Number(realCount) || 0)
}