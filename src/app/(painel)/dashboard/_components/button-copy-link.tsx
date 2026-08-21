"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { LinkIcon } from "lucide-react";

export function ButtonCopyLink({ link }: { link: string }) {
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(link);
    toast.add({
      title: "Link copiado!",
      description: "O link foi copiado para a área de transferência.",
      type: "success",
    });
  };

  return (
    <Button
      title="Copiar Link"
      size="lg"
      onClick={handleCopyLink}
      className="cursor-pointer "
    >
      <LinkIcon className="h-5 w-5" />
    </Button>
  );
}
