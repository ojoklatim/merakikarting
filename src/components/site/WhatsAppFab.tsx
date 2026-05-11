import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/256763170060?text=Hi!%20I'd%20like%20to%20book%20a%20karting%20session."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="pulse-ring keep-round fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full flex items-center justify-center text-white shadow-lg"
      style={{ background: "#25D366" }}
    >
      <MessageCircle size={26} />
    </a>
  );
}
