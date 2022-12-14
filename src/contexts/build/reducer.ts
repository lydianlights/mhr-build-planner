import { DEFAULT_ACTIVE_SKILLS } from '@/util/items/defaultActiveSkills';
import { nanoid } from 'nanoid';
import { ActiveSkillTable, ArmorChoice, BuildState, RankOption, TalismanChoice, WeaponChoice } from './types';

function getDefaultWeapon(): WeaponChoice {
  return {
    name: 'Kamura Cleaver I',
    decorations: [],
    rampageDecorations: [],
  };
}

function getDefaultHeadArmor(): ArmorChoice {
  return {
    name: 'Kamura Head Scarf',
    decorations: [],
  };
}

function getDefaultBodyArmor(): ArmorChoice {
  return {
    name: 'Kamura Garb',
    decorations: [],
  };
}

function getDefaultArmsArmor(): ArmorChoice {
  return {
    name: 'Kamura Braces',
    decorations: [],
  };
}

function getDefaultWaistArmor(): ArmorChoice {
  return {
    name: 'Kamura Obi',
    decorations: [],
  };
}

function getDefaultLegsArmor(): ArmorChoice {
  return {
    name: 'Kamura Leggings',
    decorations: [],
  };
}

function getDefaultTalisman(): TalismanChoice {
  return {
    skill1: null,
    skill2: null,
    slot1: null,
    slot2: null,
    slot3: null,
  };
}

function getDefaultActiveSkills(): ActiveSkillTable {
  return {
    ...DEFAULT_ACTIVE_SKILLS,
  };
}

export function getDefaultBuild(): BuildState {
  return {
    id: nanoid(),
    buildName: '',
    weapon: getDefaultWeapon(),
    head: getDefaultHeadArmor(),
    body: getDefaultBodyArmor(),
    arms: getDefaultArmsArmor(),
    waist: getDefaultWaistArmor(),
    legs: getDefaultLegsArmor(),
    talisman: getDefaultTalisman(),

    targetRank: 'master',
    prioritySkills: [],
    activeSkills: getDefaultActiveSkills(),
  };
}

export type BuildDispatchAction =
  | { type: 'RESET_BUILD' }
  | { type: 'SET_BUILD_NAME', name: string }
  | { type: 'SET_TARGET_RANK', rank: string }
  | { type: 'ADD_PRIORITY_SKILL', name: string }
  | { type: 'REMOVE_PRIORITY_SKILL', name: string }
  | { type: 'SET_WEAPON', data: WeaponChoice }
  | { type: 'SET_HEAD_ARMOR', data: ArmorChoice }
  | { type: 'SET_BODY_ARMOR', data: ArmorChoice }
  | { type: 'SET_ARMS_ARMOR', data: ArmorChoice }
  | { type: 'SET_WAIST_ARMOR', data: ArmorChoice }
  | { type: 'SET_LEGS_ARMOR', data: ArmorChoice }
  | { type: 'SET_TALISMAN', data: TalismanChoice }
  | { type: 'SET_ACTIVE_SKILL', skill: string, value: boolean };

export function reducer(build: BuildState, action: BuildDispatchAction): BuildState {
  switch (action.type) {
    case 'RESET_BUILD': {
      return getDefaultBuild();
    }
    case 'SET_BUILD_NAME': {
      return {
        ...build,
        buildName: action.name,
      };
    }
    case 'SET_TARGET_RANK': {
      let newRank = action.rank;
      if (newRank !== 'low' && newRank !== 'high' && newRank !== 'master') {
        newRank = 'master';
      }
      return {
        ...build,
        targetRank: (newRank as RankOption),
      };
    }
    case 'ADD_PRIORITY_SKILL': {
      const newSkillList = [...build.prioritySkills];
      newSkillList.push(action.name);
      return {
        ...build,
        prioritySkills: newSkillList.sort(),
      };
    }
    case 'REMOVE_PRIORITY_SKILL': {
      const newSkillList = build.prioritySkills.filter((s) => s !== action.name);
      return {
        ...build,
        prioritySkills: newSkillList.sort(),
      };
    }
    case 'SET_WEAPON': {
      return {
        ...build,
        weapon: { ...action.data },
      };
    }
    case 'SET_HEAD_ARMOR': {
      return {
        ...build,
        head: { ...action.data },
      };
    }
    case 'SET_BODY_ARMOR': {
      return {
        ...build,
        body: { ...action.data },
      };
    }
    case 'SET_ARMS_ARMOR': {
      return {
        ...build,
        arms: { ...action.data },
      };
    }
    case 'SET_WAIST_ARMOR': {
      return {
        ...build,
        waist: { ...action.data },
      };
    }
    case 'SET_LEGS_ARMOR': {
      return {
        ...build,
        legs: { ...action.data },
      };
    }
    case 'SET_TALISMAN': {
      return {
        ...build,
        talisman: { ...action.data },
      };
    }
    case 'SET_ACTIVE_SKILL': {
      if (DEFAULT_ACTIVE_SKILLS[action.skill] == null) return build;
      const newActiveSkills = {
        ...build.activeSkills,
      };
      newActiveSkills[action.skill] = action.value;
      return {
        ...build,
        activeSkills: newActiveSkills,
      };
    }
    default:
      return build;
  }
}
