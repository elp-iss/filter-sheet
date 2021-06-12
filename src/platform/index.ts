export type PlatformData = {
  name: string
  header: string
}

type Platform = {
  PCVR: PlatformData
  Quest: PlatformData
  Desktop: PlatformData
  QuestDT: PlatformData
}

export const platforms: Platform = {
  PCVR: { name: 'PCVR', header: 'E1:X1' },
  Quest: { name: 'Questのみ', header: 'AS1:BB1' },
  Desktop: { name: 'デスクトップのみ', header: 'Y1:AR1' },
  QuestDT: { name: 'Questとデスクトップ', header: 'BC1:BV1' },
}
