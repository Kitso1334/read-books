import { Audiobooks } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetAudiobooksGroupedByAuthor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [audiobooks, setAudiobooks] = useState<Audiobooks[]>([]);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    setIsLoading(true);

    const fetchAudiobooks = async () => {
      const { data, error } = await supabaseClient
        .from("Audiobooks")
        .select("*");

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setAudiobooks(data as Audiobooks[]);
      setIsLoading(false);
    };

    fetchAudiobooks();
  }, [supabaseClient]);

  const audiobooksByAuthor = useMemo(() => {
    return audiobooks.reduce((acc, audiobook) => {
      const author = audiobook.author || "Unknown Author"; // Default if author is missing
      if (!acc[author]) {
        acc[author] = [];
      }
      acc[author].push(audiobook);
      return acc;
    }, {} as Record<string, Audiobooks[]>);
  }, [audiobooks]);

  return {
    isLoading,
    audiobooksByAuthor,
  };
};

export default useGetAudiobooksGroupedByAuthor;
