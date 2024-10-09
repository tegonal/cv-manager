'use client';
import React, { useEffect, useState } from 'react';
import { useRowLabel } from '@payloadcms/ui';

const truncate = (str: string, n: number) => {
  return str.length > n ? str.slice(0, n - 1) + '...' : str;
};

const excludeKeys = ['id', 'year', 'fromYear', 'toYear', 'locale', 'organisation', 'level'];

export const RowLabelFirstText: React.FC = () => {
  const { data, rowNumber, path } = useRowLabel<any>();
  const [label, setLabel] = useState(`Item ${rowNumber}`);

  useEffect(() => {
    if (data) {
      const textFields = Object.keys(data).filter(
        (key) => typeof data[key] === 'string' && !excludeKeys.includes(key),
      );
      const label = textFields[0];

      if (label) {
        setLabel(truncate(data[label], 50));
      }
    } else {
      setLabel(`Item ${rowNumber}`);
    }
  }, [data, rowNumber]);

  return (
    <div>
      <span>{label}</span>
    </div>
  );
};
