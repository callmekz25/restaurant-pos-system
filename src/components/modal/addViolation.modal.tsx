import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { useAddViolation } from "@/hooks/violation";
import TransparentLoading from "../ui/transparantLoading";
import { useForm } from "react-hook-form";
import IViolationRequest from "@/interfaces/violation/violationRequest";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const AddViolationModal = ({
  openViolation,
  onOpenViolationChange,
}: {
  openViolation: boolean;
  onOpenViolationChange: (open: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<IViolationRequest>();
  const { mutate: addViolation, isPending } = useAddViolation();
  const handleAddViolation = (data: IViolationRequest) => {
    if (data !== null) {
      addViolation(data, {
        onSuccess: () => {
          toast.success("Add violation successful!");
          onOpenViolationChange(false);
          queryClient.invalidateQueries({
            queryKey: ["violations"],
          });
        },
      });
    } else {
      return;
    }
  };
  if (isPending) {
    return <TransparentLoading />;
  }
  return (
    <Dialog open={openViolation} onOpenChange={onOpenViolationChange}>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogContent className=" outline-none rounded px-10 py-5 flex flex-col min-w-[700px] ">
        <form onSubmit={handleSubmit(handleAddViolation)}>
          <DialogDescription className="hidden"></DialogDescription>
          <h3 className="text-xl font-semibold text-center">Add Violation</h3>
          <div className="flex flex-col gap-10 mt-3 text-[15px] font-medium">
            <div className="flex items-center">
              <label htmlFor="name" className="flex-[0_0_25%]">
                Violation name
              </label>
              <input
                type="text"
                {...register("violationContent")}
                id="name"
                className=" outline-none w-full font-normal  px-1 flex-1  border-b border-gray-400"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="fine" className="flex-[0_0_25%]">
                Fine
              </label>
              <input
                type="number"
                {...register("violationFine")}
                id="fine"
                className=" outline-none w-full font-normal  px-1 flex-1  border-b border-gray-400"
              />
            </div>
          </div>
          <div className="flex items-center text-sm mt-6 justify-end gap-5">
            <button
              onClick={() => onOpenViolationChange(false)}
              className="px-4 py-1.5 border border-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddViolationModal;
