
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { gamesService } from "../services/gamesService";
import { toast } from "sonner";
import { generateGames } from "@/utils/mockData/gameData";

export function useGames() {
  const queryClient = useQueryClient();

  const gamesQuery = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      try {
        return await gamesService.getGames();
      } catch (error) {
        console.log("Falling back to mock games data");
        return generateGames();
      }
    }
  });

  const optimizeMutation = useMutation({
    mutationFn: gamesService.optimizeGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      toast.success("Game optimization completed");
    },
    onError: (error: any) => {
      console.error("Optimization failed:", error);
      toast.error("Failed to optimize game", {
        description: error.message || "Please try again"
      });
    }
  });

  return {
    games: gamesQuery.data,
    isLoading: gamesQuery.isLoading,
    isError: gamesQuery.isError,
    error: gamesQuery.error,
    optimizeGame: optimizeMutation.mutate,
    isOptimizing: optimizeMutation.isPending
  };
}
