"use client";
import AddFAQModal from "./add-faq-modal";

export const FAQFilter = () => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
      <AddFAQModal />
    </div>
  );
};
