'use client';
import React, { useMemo, useState } from 'react';
import { useRowLabel } from '@payloadcms/ui';
import { Skill } from '@/types/payload-types';
import ky from 'ky';

const skillFields = ['skill', 'language', 'softSkill', 'name'];

export const RowLabelSkill: React.FC = (args) => {
  const { data } = useRowLabel<any>();
  const [skill, setSkill] = useState<Skill>();

  const fetchSkill = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      ky.get<Skill>(`/api/skill/${id}`)
        .json()
        .then((data) => setSkill(data));
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
    const skillId = data?.[skillField];
    if (!skill || (skillId && skill.id !== skillId)) {
      fetchSkill(skillId);
    }
    return skill?.name;
  }, [data, skill]);

  return (
    <div>
      <span>{label}</span>
    </div>
  );
};
