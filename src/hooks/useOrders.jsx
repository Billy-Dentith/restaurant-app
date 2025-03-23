import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useOrders = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/orders");

      if (!response.ok) {
        throw new Error("Failed to fetch orders.");
      }

      return response.json();
    },
  });

  const updateOrder = useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order.");
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("The order status has been updated!");
    },
    onError() {
      toast.error("Failed to update the order. Please try again.");
    },
  });

  const deleteOrder = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete order.");
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order deleted successfully.");
    },
    onError() {
      toast.error("Failed to delete the order.")
    }
  });

  return { isLoading, error, data, updateOrder, deleteOrder };
};

export default useOrders;
