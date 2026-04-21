'use client';

interface SectionHeadingProps {
  title: string;
  count?: number;
  action?: string;
  onAction?: () => void;
  className?: string;
}

export function SectionHeading({ title, count, action, onAction, className }: SectionHeadingProps) {
  return (
    <div className={`flex items-center justify-between mt-6 mb-[14px] first:mt-0 ${className || ''}`}>
      <h3 className="font-display font-[800] text-[20px] text-navy tracking-[0.01em]">
        {title}
        {count !== undefined && (
          <span className="ml-2 bg-sky-soft text-navy text-[11px] font-bold px-[9px] py-[3px] rounded-[10px] font-mono align-middle">
            {count}
          </span>
        )}
      </h3>
      {action && (
        <button
          onClick={onAction}
          className="text-[12px] text-sky font-semibold hover:text-navy transition-colors"
        >
          {action}
        </button>
      )}
    </div>
  );
}
