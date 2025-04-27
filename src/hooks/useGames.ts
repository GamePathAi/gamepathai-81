
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { gamesService } from "../services/gamesService";
import { toast } from "sonner";

export function useGames() {
  const queryClient = useQueryClient();

  const gamesQuery = useQuery({
    queryKey: ["games"],
    queryFn: gamesService.getGames
  });

  const optimizeMutation = useMutation({
    mutationFn: gamesService.optimizeGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      toast.success("Game optimization completed");
    },
    onError: (error) => {
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
