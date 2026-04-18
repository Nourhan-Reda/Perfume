import type { InfoRowProps } from "../../types/profile";

export default function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.04] border border-[rgba(180,120,200,0.10)] hover:bg-[rgba(180,120,200,0.09)] hover:border-[rgba(180,120,200,0.22)] hover:-translate-y-0.5 transition-all duration-200">
      <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-[rgba(122,63,110,0.30)] border border-[rgba(180,120,180,0.18)] flex items-center justify-center text-[#c084b8]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#6b4a72] mb-0.5">
          {label}
        </p>
        <p className="text-sm font-light text-[#e2c8e8] break-all leading-snug">
          {value}
        </p>
      </div>
    </div>
  );
}