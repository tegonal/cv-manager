'use client';
import React, { useMemo, useState } from 'react';
import { useLocale, useRowLabel } from '@payloadcms/ui';
import { Lang } from '@/types/payload-types';
import ky from 'ky';

export const RowLabelLanguage: React.FC = (args) => {
  const { data } = useRowLabel<any>();
  const locale = useLocale();
  const [skillGroup, setSkillGroup] = useState<Lang>();

  const fetchSkill = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      ky.get<Lang>(`/api/langs/${id}?locale=${locale.code}`)
        .json()
        .then((data) => setSkillGroup(data));
    } catch (error) {
      console.error(error);
    }
  };

  const label = useMemo(() => {
    const groupId = data?.language;
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
