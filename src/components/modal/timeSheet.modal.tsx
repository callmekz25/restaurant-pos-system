import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import formatDate from "@/utils/formatDate";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useAbsent, useAttendance } from "@/hooks/timeSheet";
import { useQueryClient } from "@tanstack/react-query";
import IGroupTimeSheet from "@/interfaces/timesheet/groupTimeSheet.interface";
import TransparentLoading from "../ui/transparantLoading";
import AddViolationModal from "./addViolation.modal";
import { useGetViolations } from "@/hooks/violation";
import IViolationRequest from "@/interfaces/violation/violationRequest";
import { useForm, Controller } from "react-hook-form";
interface Ts extends IGroupTimeSheet {
  index: number;
}
const TimeSheetModal = ({
  ts,
  open,
  onOpenChange,
}: {
  ts: Ts;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const [month, setMonth] = useState("MAY");
  const [year, setYear] = useState("2025");
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      statusAttendance: true,
      menuTimeSheet: "attendance",
      workingHours: 8,
      workShiftId: "",
      violationId: "",
    },
  });
  const statusAttendance = watch("statusAttendance");
  const violationId = watch("violationId");
  const menuTimeSheet = watch("menuTimeSheet");
  const workingHours = watch("workingHours");
  const [selectViolation, setSelectViolation] =
    useState<IViolationRequest | null>(null);
  const [openViolationModal, setOpenViolationModal] = useState<boolean>(false);
  const { mutate: markWork, isPending: isMarkWorkPending } = useAttendance();
  const { mutate: markAbsent, isPending: isMarkAbsentPending } = useAbsent();
  const {
    data: violations,
    isLoading: isViolationsLoading,
    error,
  } = useGetViolations();
  const timesheet = ts?.timesheets[ts.index];
  console.log(timesheet);
  useEffect(() => {
    if (violationId !== "" && violations) {
      setSelectViolation(
        violations.find((v: IViolationRequest) => v.violationId === violationId)
      );
    }
  }, [violationId, violations]);
  console.log(selectViolation);

  // Hàm chấm công đi làm hay vắng làm dựa vào status attendance
  const handleAttendance = () => {
    const request = {
      empId: ts.empId,
      // workingHours,
      workingDate: timesheet.workingDate,
    };
    if (statusAttendance) {
      markWork(request, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["time-sheets", month, year],
          });
          onOpenChange(false);
        },
      });
    } else {
      markAbsent(request, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["time-sheets", month, year],
          });
          onOpenChange(false);
        },
      });
    }
  };

  console.log(statusAttendance);

  if (isMarkWorkPending || isMarkAbsentPending) {
    return <TransparentLoading />;
  }
  return (
    <form>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTitle className="hidden"></DialogTitle>
        <DialogContent className=" outline-none rounded px-5 py-5 flex flex-col min-w-[700px] ">
          <DialogDescription className="hidden"></DialogDescription>
          <h3 className="text-xl font-semibold text-center">Time Sheet</h3>
          <div className="flex justify-between items-start ">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-medium">
                Employee Name:{" "}
                <span className="font-semibold text-[16px] ">{ts.empName}</span>
              </h4>
              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium">Work Shifts:</span>
                <Controller
                  name="workShiftId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={timesheet.workShiftId}
                    >
                      <SelectTrigger className=" border border-gray-300  rounded outline-none shadow-none  text-black ">
                        <SelectValue placeholder="Chọn ca làm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="F1">F1 (10:00 - 18:00)</SelectItem>
                        <SelectItem value="F2">F2 (14:00 - 22:00)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-medium">Time:</span>
              <span className="text-[16px] ">{formatDate(new Date())}</span>
            </div>
          </div>
          <div className="">
            <div className=" border-b border-gray-400 pb-2 text-sm mt-5">
              <ul className="flex items-center ">
                <li
                  onClick={() => setValue("menuTimeSheet", "attendance")}
                  className={`px-5 cursor-pointer ${
                    menuTimeSheet === "attendance"
                      ? "text-blue-700 opacity-100"
                      : "opacity-70 "
                  }`}
                >
                  Attendance
                </li>
                <li
                  className={`px-5 cursor-pointer ${
                    menuTimeSheet === "violation"
                      ? "text-blue-700 opacity-100"
                      : "opacity-70 "
                  }`}
                  onClick={() => setValue("menuTimeSheet", "violation")}
                >
                  Violation
                </li>
                <li
                  onClick={() => setValue("menuTimeSheet", "reward")}
                  className={`px-5 cursor-pointer ${
                    menuTimeSheet === "reward"
                      ? "text-blue-700 opacity-100"
                      : "opacity-70 "
                  }`}
                >
                  Reward
                </li>
              </ul>
            </div>
            <div className="">
              {menuTimeSheet === "attendance" && (
                <>
                  <div className="flex items-center gap-10 mt-5 text-[13px]">
                    <span>Attendance</span>
                    <Controller
                      name="statusAttendance"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value?.toString()}
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                        >
                          <SelectTrigger className=" border border-gray-300  text-[13px] rounded outline-none shadow-none  text-black ">
                            <SelectValue placeholder="Chọn loại" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Work</SelectItem>
                            <SelectItem value="false">Off</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  {statusAttendance && (
                    <div className="flex items-center gap-10 text-[13px] mt-5">
                      <label htmlFor="hours">Work Hours</label>
                      <input
                        id="hours"
                        type="number"
                        value={workingHours}
                        {...register("workingHours")}
                        className="outline-none border border-gray-300 rounded px-2 py-1.5 w-20"
                      />
                    </div>
                  )}
                </>
              )}
              {menuTimeSheet === "violation" && (
                <>
                  {isViolationsLoading && <TransparentLoading />}
                  <div className="mt-5 text-sm">
                    <div className="flex items-center font-medium ">
                      <p className="w-[45%] px-4">Violation Content</p>
                      <p className="w-[25%] px-4">Penalties apply</p>
                      <p className="w-[25%] px-4">Into Money</p>
                      <p className="flex-1 px-4"></p>
                    </div>
                    <div className="flex items-center text-[13px] mt-4">
                      <div className="px-4 w-[45%]">
                        <Controller
                          name="violationId"
                          control={control}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className=" border border-gray-300  text-[13px] rounded outline-none shadow-none  text-black ">
                                <SelectValue placeholder="Choose violation" />
                              </SelectTrigger>
                              <SelectContent>
                                {violations &&
                                  violations.length > 0 &&
                                  violations.map((v: IViolationRequest) => {
                                    return (
                                      <SelectItem
                                        key={v.violationId}
                                        value={v.violationId ?? ""}
                                      >
                                        {v.violationContent}
                                      </SelectItem>
                                    );
                                  })}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                      <div className="px-4 w-[25%]">
                        <input
                          type="text"
                          name=""
                          id=""
                          className=" outline-none w-full  px-1  border-b border-gray-400"
                          value={selectViolation?.violationFine}
                        />
                      </div>
                      <div className="px-4 w-[25%]">
                        <input
                          type="text"
                          readOnly
                          name=""
                          id=""
                          className=" outline-none w-full  px-1 border-b border-gray-400"
                          value={selectViolation?.violationFine}
                        />
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <button>
                          <TrashIcon className="size-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => setOpenViolationModal(true)}
                      className="flex items-center gap-1 mt-10 text-[12px] border border-gray-400 rounded px-2 py-1.5"
                    >
                      <PlusIcon className="size-3" />
                      Add violation
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center text-sm justify-end gap-5">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-1.5 border border-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => handleAttendance()}
              className="px-4 py-2 bg-red-800 text-white rounded"
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <AddViolationModal
        openViolation={openViolationModal}
        onOpenViolationChange={setOpenViolationModal}
      />
    </form>
  );
};

export default TimeSheetModal;
