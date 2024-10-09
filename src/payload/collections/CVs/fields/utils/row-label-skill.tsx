'use client';
import React, { useMemo, useState } from 'react';
import { useRowLabel } from '@payloadcms/ui';
import { Skill } from '@/types/payload-types';
import ky from 'ky';

export const RowLabelSkill: React.FC = (args) => {
  const { data, rowNumber, path } = useRowLabel<any>();
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
    if (!skill || skill.id !== data?.skill) {
      fetchSkill(data.skill);
    }
    return skill?.name;
  }, [data?.skill, skill]);

  return (
    <div>
      <span>{label}</span>
    </div>
  );
};
