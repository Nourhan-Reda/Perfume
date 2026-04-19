import { useEffect, useState } from "react";
import { X, User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName: string;
  initialEmail: string;
  onSave: (name: string, email: string, newPassword?: string) => Promise<void>;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  initialName,
  initialEmail,
  onSave,
}: EditProfileModalProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(initialName);
    setEmail(initialEmail);
  }, [initialName, initialEmail]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // reset password fields on close
  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    // لو المستخدم بيحاول يغير الباسورد
    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword) {
        setError("Please enter your current password.");
        return;
      }
      if (newPassword.length < 8) {
        setError("New password must be at least 8 characters.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("New passwords do not match.");
        return;
      }
    }

    setError("");
    setIsSaving(true);
    try {
      await onSave(
        name.trim(),
        email.trim(),
        newPassword || undefined,
        currentPassword || undefined
      );
      handleClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to save. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = "flex items-center gap-2.5 border border-[#2d1a3a] bg-[#120a1a] px-3 py-3 rounded-xl focus-within:border-[#9b7aac] transition-colors";
  const fieldInput = "flex-1 bg-transparent text-[#f0eaf4] text-[13px] outline-none placeholder:text-[#3d2550]";
  const label = "block text-[11px] uppercase tracking-[0.3em] text-[#6b4f7a] mb-1.5 font-medium";
  const eyeBtn = "text-[#6b4f7a] hover:text-[#c8a8d8] transition-colors cursor-pointer flex-shrink-0";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(10,5,15,0.75)", backdropFilter: "blur(6px)" }}
      onClick={handleClose}
    >
      <div
        className="w-full max-w-[440px] rounded-[28px] px-8 py-8 relative border border-[rgba(180,120,200,0.18)] max-h-[90vh] overflow-y-auto"
        style={{
          background: "linear-gradient(160deg, #1e1128 0%, #160e20 100%)",
          boxShadow: "0 40px 100px rgba(80,30,100,0.4), 0 0 0 1px rgba(255,255,255,0.04) inset",
          animation: "fade-up 0.4s cubic-bezier(.22,.68,0,1.2) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={handleClose} className="absolute top-5 right-5 text-[#6b4f7a] hover:text-[#c8a8d8] transition-colors cursor-pointer">
          <X size={18} />
        </button>

        {/* Heading */}
        <div className="mb-6">
          <p className="text-[11px] tracking-[0.4em] text-[#9b7aac] uppercase mb-1.5 font-medium">Account</p>
          <h2 className="text-[1.5rem] text-[#f0eaf4] font-light leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Edit <span className="italic text-[#c8a8d8]">Profile</span>
          </h2>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 px-3 py-2.5 border border-[#e06c75]/30 bg-[#e06c75]/5 rounded-lg">
            <p className="text-[11px] tracking-wide text-[#e06c75]">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          {/* Full Name */}
          <div>
            <label className={label}>Full Name</label>
            <div className={inputClass}>
              <User size={15} className="text-[#6b4f7a] flex-shrink-0" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={fieldInput} placeholder="Your full name" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={label}>Email Address</label>
            <div className={inputClass}>
              <Mail size={15} className="text-[#6b4f7a] flex-shrink-0" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={fieldInput} placeholder="you@example.com" />
            </div>
          </div>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-[#2d1a3a]" />
            </div>
            <span className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] text-[#4a3058] bg-[#160e20] px-3 w-fit mx-auto">
              Change Password
            </span>
          </div>

          {/* Current Password */}
          <div>
            <label className={label}>Current Password</label>
            <div className={inputClass}>
              <Lock size={15} className="text-[#6b4f7a] flex-shrink-0" />
              <input type={showCurrent ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={fieldInput} placeholder="Your current password" />
              <button type="button" onClick={() => setShowCurrent(p => !p)} className={eyeBtn}>
                {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className={label}>New Password</label>
            <div className={inputClass}>
              <Lock size={15} className="text-[#6b4f7a] flex-shrink-0" />
              <input type={showNew ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={fieldInput} placeholder="Min 8 characters" />
              <button type="button" onClick={() => setShowNew(p => !p)} className={eyeBtn}>
                {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className={label}>Confirm New Password</label>
            <div className={inputClass}>
              <Lock size={15} className="text-[#6b4f7a] flex-shrink-0" />
              <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={fieldInput} placeholder="Repeat new password" />
              <button type="button" onClick={() => setShowConfirm(p => !p)} className={eyeBtn}>
                {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-6">
          <button onClick={handleClose} className="flex-1 py-3 text-[11px] tracking-[0.25em] uppercase font-medium border border-[#2d1a3a] text-[#6b4f7a] hover:border-[#6b4f7a] hover:text-[#9b7aac] transition-all rounded-xl cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex-1 py-3 text-[11px] tracking-[0.25em] uppercase font-medium transition-all rounded-xl cursor-pointer
              ${isSaving
                ? "bg-[#4a2d5e]/50 text-[#6b4f7a] border border-[#4a2d5e] cursor-not-allowed"
                : "bg-[#3d1f52] text-[#f0eaf4] border border-[#6b4f7a] hover:bg-[#4a2d5e] hover:border-[#c8a8d8]"
              }`}
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={13} className="animate-spin" /> Saving…
              </span>
            ) : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}