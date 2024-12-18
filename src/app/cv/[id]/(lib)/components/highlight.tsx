import { PayloadLexicalReactRenderer } from '@/lib/lexical-render/src/payloadLexicalReactRenderer';
import { IconHighlight } from '@/app/cv/[id]/(lib)/icon/highlight';

type Props = {
  title: string | undefined | null;
  subtitle: string | undefined | null;
  description: any;
};

export const HighlightEntry: React.FC<Props> = ({ title, subtitle, description }) => {
  return (
    <div className={'no-page-break relative rounded border-l-8 border-l-lime-600 bg-gray-100 p-2'}>
      <p className={'pr-8 font-bold'}>{title}</p>
      <p className={'pr-8 text-xs'}>{subtitle}</p>
      <div>
        <PayloadLexicalReactRenderer content={description} />
      </div>
      <div className={'absolute right-2 top-2 size-6 text-gray-400'}>
        <IconHighlight />
      </div>
    </div>
  );
};
