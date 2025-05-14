import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { useAddViolation } from "@/hooks/violation";

const AddViolationModal = ({
  openViolation,
  onOpenViolationChange,
}: {
  openViolation: boolean;
  onOpenViolationChange: (open: boolean) => void;
}) => {
  const [violationContent, setViolationContent] = useState<string>("");
  const [violationFine, setViolationFine] = useState<number>(0);
  const { mutate: addViolation, isPending } = useAddViolation();
  const handleAddViolation = () => {
    if (violationContent !== "" && violationFine > 0) {
      const data = {
        violationContent,
        violationFine,
      };
      addViolation(data, {
        onSuccess: () => {
          console.log("Add violation success");
        },
      });
    } else {
      return;
    }
  };
  return (
    <Dialog open={openViolation} onOpenChange={onOpenViolationChange}>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogContent className=" outline-none rounded px-10 py-5 flex flex-col min-w-[700px] ">
        <DialogDescription className="hidden"></DialogDescription>
        <h3 className="text-xl font-semibold text-center">Add Violation</h3>
        <div className="flex flex-col gap-10 mt-3 text-[15px] font-medium">
          <div className="flex items-center">
            <label htmlFor="name" className="flex-[0_0_25%]">
              Violation name
            </label>
            <input
              type="text"
              name="name"
              value={violationContent}
              onChange={(e) => setViolationContent(e.target.value)}
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
              name="fine"
              value={violationFine}
              onChange={(e) => setViolationFine(Number(e.target.value))}
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
            onClick={() => handleAddViolation()}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddViolationModal;
