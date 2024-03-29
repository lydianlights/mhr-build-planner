import React, { useCallback, useMemo, useState } from 'react';
import { Title } from '@mantine/core';
import headIcon from '@/assets/icons/items/armor_head.png';
import bodyIcon from '@/assets/icons/items/armor_body.png';
import armsIcon from '@/assets/icons/items/armor_arms.png';
import waistIcon from '@/assets/icons/items/armor_waist.png';
import legsIcon from '@/assets/icons/items/armor_legs.png';
import { armorTable } from '@/assets/game-data';
import { ArmorType } from '@/assets/game-data/types';
import { useBuildContext } from '@/contexts/build';
import { ArmorChoice } from '@/contexts/build/types';
import SelectArmorModal from '@/components/ItemSelectModals/SelectArmorModal';
import { GridSection, ItemIconWrapper, ItemSkillEntry, ItemStatEntry, ItemStatWithIcon, SlotSelection, TitleIconWrapper, TitleWrapper, Vertical } from '../shared';
import DecorationSelector from '@/components/DecorationSelector';
import { getElementIcon, stringifySkill } from '@/util/items';

export type ArmorInfoProps = {
  type: ArmorType,
};
const ArmorInfo = ({ type }: ArmorInfoProps) => {
  const { build, dispatch } = useBuildContext();
  const [modalOpen, setModalOpen] = useState(false);

  const { armorData, name, slots, icon } = useMemo(() => {
    let selectedArmor: ArmorChoice;
    let icon;

    switch (type) {
      case 'HEAD':
        icon = headIcon;
        selectedArmor = build.head;
        break;
      case 'BODY':
        icon = bodyIcon;
        selectedArmor = build.body;
        break;
      case 'ARMS':
        icon = armsIcon;
        selectedArmor = build.arms;
        break;
      case 'WAIST':
        icon = waistIcon;
        selectedArmor = build.waist;
        break;
      case 'LEGS':
        icon = legsIcon;
        selectedArmor = build.legs;
        break;
    }

    const armorData = armorTable[selectedArmor.name];
    const name = armorData?.name || 'undefined';
    const slots: SlotSelection[] = [];

    armorData?.slots.forEach((size, i) => {
      const decoration = selectedArmor.decorations[i] || null;
      slots.push({ size, decoration });
    });

    return {
      armorData,
      name,
      slots,
      icon,
    };
  }, [build.arms, build.body, build.head, build.legs, build.waist, type]);

  const handleSelectItem = useCallback((item: string) => {
    switch (type) {
      case 'HEAD': {
        const newData = {
          ...build.head,
          name: item,
          decorations: [],
        };
        dispatch({ type: 'SET_HEAD_ARMOR', data: newData });
        break;
      }
      case 'BODY': {
        const newData = {
          ...build.body,
          name: item,
          decorations: [],
        };
        dispatch({ type: 'SET_BODY_ARMOR', data: newData });
        break;
      }
      case 'ARMS': {
        const newData = {
          ...build.arms,
          name: item,
          decorations: [],
        };
        dispatch({ type: 'SET_ARMS_ARMOR', data: newData });
        break;
      }
      case 'WAIST': {
        const newData = {
          ...build.waist,
          name: item,
          decorations: [],
        };
        dispatch({ type: 'SET_WAIST_ARMOR', data: newData });
        break;
      }
      case 'LEGS': {
        const newData = {
          ...build.legs,
          name: item,
          decorations: [],
        };
        dispatch({ type: 'SET_LEGS_ARMOR', data: newData });
        break;
      }
    }
  }, [dispatch, build.arms, build.body, build.head, build.legs, build.waist, type]);

  const handleSelectDeco = useCallback((index: number, value: string | null) => {
    switch (type) {
      case 'HEAD': {
        const newData = {
          ...build.head,
          decorations: [...build.head.decorations],
        };
        newData.decorations[index] = value;
        dispatch({ type: 'SET_HEAD_ARMOR', data: newData });
        break;
      }
      case 'BODY': {
        const newData = {
          ...build.body,
          decorations: [...build.body.decorations],
        };
        newData.decorations[index] = value;
        dispatch({ type: 'SET_BODY_ARMOR', data: newData });
        break;
      }
      case 'ARMS': {
        const newData = {
          ...build.arms,
          decorations: [...build.arms.decorations],
        };
        newData.decorations[index] = value;
        dispatch({ type: 'SET_ARMS_ARMOR', data: newData });
        break;
      }
      case 'WAIST': {
        const newData = {
          ...build.waist,
          decorations: [...build.waist.decorations],
        };
        newData.decorations[index] = value;
        dispatch({ type: 'SET_WAIST_ARMOR', data: newData });
        break;
      }
      case 'LEGS': {
        const newData = {
          ...build.legs,
          decorations: [...build.legs.decorations],
        };
        newData.decorations[index] = value;
        dispatch({ type: 'SET_LEGS_ARMOR', data: newData });
        break;
      }
    }
  }, [dispatch, build.arms, build.body, build.head, build.legs, build.waist, type]);

  function renderModal() {
    return (
      <SelectArmorModal
        opened={modalOpen}
        onClose={() => { setModalOpen(false); }}
        armorType={type}
        onSelectItem={handleSelectItem}
      />
    );
  }

  return (
    <>
      {renderModal()}
      <GridSection section="icon">
        <ItemIconWrapper img={icon} onActivate={() => { setModalOpen(true); }} />
      </GridSection>
      <GridSection section="name">
        <TitleWrapper onActivate={() => { setModalOpen(true); }}>
          <Title order={4}>{name}</Title>
          <TitleIconWrapper>▼</TitleIconWrapper>
        </TitleWrapper>
      </GridSection>
      <GridSection section="skills">
        <Vertical>
          {armorData?.skills.map((skill) => (
            <ItemSkillEntry key={skill.name}>{stringifySkill(skill)}</ItemSkillEntry>
          )) ?? null}
        </Vertical>
      </GridSection>
      <GridSection section="slots">
        {
          slots.map(({ size, decoration }, index) => (
            <DecorationSelector
              key={index}
              slotSize={size}
              value={decoration}
              onChange={(val) => { handleSelectDeco(index, val); }}
            />
          ))
        }
      </GridSection>
      <GridSection section="stats">
        <ItemStatEntry>Def: {armorData?.stats.defense}</ItemStatEntry>
        <ItemStatWithIcon text={`${armorData?.stats.fireRes}`} icon={getElementIcon('fire')} />
        <ItemStatWithIcon text={`${armorData?.stats.waterRes}`} icon={getElementIcon('water')} />
        <ItemStatWithIcon text={`${armorData?.stats.thunderRes}`} icon={getElementIcon('thunder')} />
        <ItemStatWithIcon text={`${armorData?.stats.iceRes}`} icon={getElementIcon('ice')} />
        <ItemStatWithIcon text={`${armorData?.stats.dragonRes}`} icon={getElementIcon('dragon')} />
      </GridSection>
    </>
  );
};

export default ArmorInfo;
