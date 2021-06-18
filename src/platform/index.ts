export type PlatformData = {
  name: string
  header: Header
}

export type Header = {
  start: number
  end: number
}

type Platform = {
  PCVR: PlatformData
  Quest: PlatformData
  Desktop: PlatformData
  QuestDT: PlatformData
}

export const platforms: Platform = {
  PCVR: { name: 'PCVR', header: { start: 4, end: 23 } },
  Quest: { name: 'Questのみ', header: { start: 44, end: 53 } },
  Desktop: { name: 'デスクトップのみ', header: { start: 24, end: 43 } },
  QuestDT: { name: 'Questとデスクトップ', header: { start: 54, end: 73 } },
}
