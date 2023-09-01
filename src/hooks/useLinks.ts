import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Link } from "@prisma/client";
import { toast } from "@/hooks/use-toast";

interface LinksStore {
  links: Link[];
  addLink: (link: Link) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useLinks = create(
  persist<LinksStore>(
    (set, get) => ({
      links: [],
      addLink: (link: Link) => {
        const currentLinks = get().links;
        set({ links: [link, ...currentLinks] });

        toast({
          title: "successfully",
          description: "Made shortlink",
        });
      },

      removeItem: (id: string) => {
        set({ links: [...get().links.filter((link) => link.id !== id)] }),
          toast({
            title: "successfully",
            description: "Removed link",
          });
      },

      clear: () => {
        set({ links: [] });

        toast({
          description: "Cleared your links",
        });
      },
    }),
    {
      name: "links-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
