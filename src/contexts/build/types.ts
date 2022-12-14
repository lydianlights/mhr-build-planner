export type RankOption = 'low' | 'high' | 'master';

export type WeaponChoice = {
  name: string,
  decorations: Array<string | null>,
  rampageDecorations: Array<string | null>,
};

export type ArmorChoice = {
  name: string,
  decorations: Array<string | null>,
};

export type TalismanSkillChoice = {
  name: string,
  level: number,
};

export type TalismanDecorationChoice = {
  size: number,
  name: string | null,
};

export type TalismanChoice = {
  skill1: TalismanSkillChoice | null,
  skill2: TalismanSkillChoice | null,
  slot1: TalismanDecorationChoice | null,
  slot2: TalismanDecorationChoice | null,
  slot3: TalismanDecorationChoice | null,
};

export type ActiveSkillTable = {
  [key: string]: boolean | undefined,
};

export type BuildState = {
  id: string,
  buildName: string,
  weapon: WeaponChoice,
  head: ArmorChoice,
  body: ArmorChoice,
  arms: ArmorChoice,
  waist: ArmorChoice,
  legs: ArmorChoice,
  talisman: TalismanChoice,

  targetRank: RankOption,
  prioritySkills: string[],
  activeSkills: ActiveSkillTable,
};

export type CalculatedSkill = {
  level: number,
  maxLevel: number,
  effectiveLevel: number,
};

export type CalculatedSkills = {
  [key: string]: CalculatedSkill | undefined,
};

export type SharpnessMultipliers = {
  raw: number,
  elemental: number,
};

export type CalculatedStats = {
  effectiveRaw: number,
  raw: number,
  affinity: number,
  critMultiplier: number,

  effectiveElement: number,
  element: number,
  elementCritMultiplier: number,
  status: number,

  defense: number,
  fireRes: number,
  waterRes: number,
  thunderRes: number,
  iceRes: number,
  dragonRes: number,

  sharpness: number[],
  sharpnessClass: number,
  sharpnessMultipliers: SharpnessMultipliers,
};
