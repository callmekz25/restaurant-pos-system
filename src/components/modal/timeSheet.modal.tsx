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
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useAbsent, useAttendance } from "@/hooks/timeSheet";
import { useQueryClient } from "@tanstack/react-query";
import IGroupTimeSheet from "@/interfaces/timesheet/groupTimeSheet.interface";
import TransparentLoading from "../ui/transparantLoading";
import AddViolationModal from "./addViolation.modal";
import { useGetViolations } from "@/hooks/violation";
import IViolationRequest from "@/interfaces/violation/violationRequest";
import { useForm, Controller } from "react-hook-form";
import {
  useAddViolationRecord,
  useGetVRByEmpIdAndWorkingDate,
} from "@/hooks/violationRecord";
import IViolationRecordRequest from "@/interfaces/violationRecord/violationRecordRequest";
import IViolationRecord from "@/interfaces/violationRecord/violationRecord";
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
    },
  });
  const [employeeViolations, setEmployeeViolations] = useState<
    IViolationRecord[] | []
  >([
    {
      violationRecordId: "",
      empId: "",
      workingDate: "",
      violation: {
        violationId: "",
        violationContent: "",
        violationFine: 0,
      },
      violationTime: "",
    },
  ]);
  const timesheet = ts?.timesheets[ts.index];
  const statusAttendance = watch("statusAttendance");

  const menuTimeSheet = watch("menuTimeSheet");
  const workingHours = watch("workingHours");

  const [openViolationModal, setOpenViolationModal] = useState<boolean>(false);
  // Lấy ra các VR của nhân viên
  const {
    data: violationRecords,
    isLoading: isVRLoading,
    error: errorVR,
    refetch,
  } = useGetVRByEmpIdAndWorkingDate(ts.empId, timesheet.workingDate);
  const { mutate: markWork, isPending: isMarkWorkPending } = useAttendance();
  const { mutate: markAbsent, isPending: isMarkAbsentPending } = useAbsent();
  const { mutate: addViolationRecord, isPending: isAddViolationRecordPending } =
    useAddViolationRecord();
  const {
    data: violations,
    isLoading: isViolationsLoading,
    error: errorViolations,
  } = useGetViolations();
  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open]);

  useEffect(() => {
    if (violationRecords && violationRecords.length > 0) {
      setEmployeeViolations(violationRecords);
    }
  }, [violationRecords]);
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
  // Hàm lấy ra thông tin của violations vừa select để render ra số tiền của violation đó
  const handleSelectViolation = (index: number, violationId: string) => {
    const selectViolation: IViolationRequest = violations.find(
      (v: IViolationRequest) => v.violationId === violationId
    );
    const updateEmployeeViolations = [...employeeViolations];
    updateEmployeeViolations[index] = {
      ...updateEmployeeViolations[index],
      violation: {
        violationId: selectViolation.violationId,
        violationContent: selectViolation.violationContent,
        violationFine: selectViolation.violationFine,
      },
    };
    setEmployeeViolations(updateEmployeeViolations);
  };
  // Hàm ghi nhận phạt các vi phạm
  const handleAddViolationRecords = () => {
    const violationRecordRequest: IViolationRecordRequest[] =
      employeeViolations.map((ev) => {
        return {
          violationId: ev.violation.violationId!,
          empId: ts.empId,
          workingDate: timesheet.workingDate,
        };
      });
    addViolationRecord(violationRecordRequest, {
      onSuccess: () => {
        console.log("Add violation record success!");
      },
    });
  };
  const actionHandlers: Record<string, () => void> = {
    attendance: handleAttendance,
    violation: handleAddViolationRecords,
  };
  // Hàm dựa vào menu timesheet để gọi tới hàm chấm công hay phạt vi phạm
  const handleSave = () => {
    const handler = actionHandlers[menuTimeSheet];
    if (handler) {
      handler();
    } else {
      alert("Error try again!");
    }
  };
  console.log(violationRecords);

  if (isMarkWorkPending || isMarkAbsentPending || isAddViolationRecordPending) {
    return <TransparentLoading />;
  }
  return (
    <form>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTitle className="hidden"></DialogTitle>
        <DialogContent className=" outline-none rounded px-5 py-5 flex flex-col min-w-[800px] ">
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
                      <p className="w-[25%] px-4">Amount</p>
                      <p className="w-[25%] px-4">Into Money</p>
                      <p className="flex-1 px-4"></p>
                    </div>
                    <div className="flex flex-col gap-6 mt-4 max-h-[160px] overflow-y-auto pr-2">
                      {employeeViolations.map(
                        (ev: IViolationRecord, index: number) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center text-[13px] "
                            >
                              <div className="px-4  flex-[0_0_45%] max-w-[45%] flex items-center gap-2">
                                <Select
                                  value={ev.violation.violationId}
                                  onValueChange={(val) =>
                                    handleSelectViolation(index, val)
                                  }
                                >
                                  <SelectTrigger className=" border border-gray-300   text-[13px] rounded outline-none shadow-none  text-black ">
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
                                <button
                                  onClick={() => setOpenViolationModal(true)}
                                >
                                  <PlusIcon className="size-5 opacity-60 cursor-pointer" />
                                </button>
                                <button>
                                  <EditIcon className="size-5 opacity-60 cursor-pointer" />
                                </button>
                              </div>
                              <div className="px-4 flex-[0_0_25%] max-w-[25%]">
                                <input
                                  type="text"
                                  readOnly
                                  name=""
                                  value="1"
                                  id=""
                                  className=" outline-none w-full  px-1  border-b border-gray-400"
                                />
                              </div>
                              <div className="px-4 flex-[0_0_25%] max-w-[25%]">
                                <input
                                  type="text"
                                  readOnly
                                  value={ev.violation.violationFine}
                                  name=""
                                  id=""
                                  className=" outline-none w-full  px-1 border-b border-gray-400"
                                />
                              </div>
                              <div className="flex-1 flex items-center justify-center">
                                <button>
                                  <TrashIcon className="size-4 text-red-500" />
                                </button>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setEmployeeViolations((prev) => [
                          {
                            empId: ts.empId,
                            workingDate: timesheet.workingDate,
                            violationRecordId: "",
                            violationTime: "",
                            violation: {
                              violationId: "",
                              violationContent: "",
                              violationFine: 0,
                            },
                          },
                          ...prev,
                        ]);
                      }}
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
              onClick={() => handleSave()}
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
