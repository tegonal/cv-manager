'use client';
import React, { useMemo, useState } from 'react';
import { useLocale, useRowLabel } from '@payloadcms/ui';
import { SkillGroup } from '@/types/payload-types';
import ky from 'ky';

export const RowLabelSkillGroup: React.FC = (args) => {
  const { data } = useRowLabel<any>();
  const locale = useLocale();
  const [skillGroup, setSkillGroup] = useState<SkillGroup>();

  const fetchSkill = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      ky.get<SkillGroup>(`/api/skillGroup/${id}?locale=${locale.code}`)
        .json()
        .then((data) => setSkillGroup(data));
    } catch (error) {
      console.error(error);
    }
  };

  const label = useMemo(() => {
    const groupId = data?.group;
    if (!skillGroup || (groupId && skillGroup.id !== groupId)) {
      fetchSkill(groupId);
    }
    return skillGroup?.name;
  }, [data, skillGroup]);

  return (
    <div>
      <span>{label}</span>
    </div>
  );
};
