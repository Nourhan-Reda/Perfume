 export interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

 export interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName: string;
  initialEmail: string;
  onSave: (name: string, email: string) => Promise<void>;
}