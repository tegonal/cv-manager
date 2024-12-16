'use client';
import React, { useMemo, useState } from 'react';
import { useLocale, useRowLabel } from '@payloadcms/ui';
import { Skill, SkillGroup } from '@/types/payload-types';
import ky from 'ky';

const skillFields = ['skill', 'language', 'softSkill', 'name'];

type SkillOrSkillGroup = (Skill | SkillGroup) & { type: 'skill' | 'skillGroup' };

export const RowLabelSkill: React.FC = (args) => {
  const { data } = useRowLabel<any>();
  const locale = useLocale();
  const [skill, setSkill] = useState<SkillOrSkillGroup>();

  const fetchSkill = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      ky.get<Skill>(`/api/skill/${id}?locale=${locale.code}`)
        .json()
        .then((data) => setSkill({ ...data, type: 'skill' }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSkillGroup = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      ky.get<Skill>(`/api/skillGroup/${id}?locale=${locale.code}`)
        .json()
        .then((data) => setSkill({ ...data, type: 'skillGroup' }));
    } catch (error) {
      console.error(error);
    }
  };

  const label = useMemo(() => {
    const skillField = skillFields.find((field) => data?.[field]);
    if (!skillField) {
      return '';
    }
    if (skillField === 'name') {
      return data?.[skillField];
    }
    const skillRelation = data?.[skillField];
    const skillType = skillRelation.type;
    const skillId = skillRelation.id;

    if (!skill || (skillId && skill.id !== skillId && skill.type !== skillType)) {
      switch (skillType) {
        case 'skill':
          fetchSkill(skillId);
          break;
        case 'skillGroup':
          fetchSkillGroup(skillId);
          break;
      }
    }
    return skill?.name;
  }, [data, skill]);

  return (
    <div>
      <span>{label}</span>
    </div>
  );
};
