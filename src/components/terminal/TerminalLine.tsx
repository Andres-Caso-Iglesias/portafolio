'use client';

import { ProjectCard, type ProjectData } from '@/components/chat/ProjectCard';
import { parseLinks } from './parseLinks';

export type TerminalLineKind = 'input' | 'system' | 'assistant' | 'error';

export interface TerminalLineData {
  id: string;
  kind: TerminalLineKind;
  text: string;
  project?: ProjectData;
}

interface TerminalLineProps {
  line: TerminalLineData;
}

export function TerminalLine({ line }: TerminalLineProps) {
  if (line.kind === 'input') {
    return (
      <div className="font-mono text-[13px] leading-relaxed break-words">
        <span className="text-emerald-400 select-none" aria-hidden="true">
          {'> '}
        </span>
        <span className="text-slate-100">{line.text}</span>
      </div>
    );
  }

  if (line.kind === 'error') {
    return (
      <div className="font-mono text-[13px] leading-relaxed break-words text-red-400">
        {line.text}
      </div>
    );
  }

  if (line.kind === 'system') {
    return (
      <div className="font-mono text-[13px] leading-relaxed break-words text-emerald-300">
        {line.text}
      </div>
    );
  }

  return (
    <div className="font-mono text-[13px] leading-relaxed break-words text-slate-200">
      <div className="whitespace-pre-wrap break-words">{parseLinks(line.text)}</div>
      {line.project && <ProjectCard project={line.project} />}
    </div>
  );
}
