const Table = ({
  numberOfSeats,
  numberOfTable,
  defaultSize = 100,
}: {
  numberOfSeats: number;
  numberOfTable: number;
  defaultSize?: number;
}) => {
  return (
    <div className="p-2 border border-gray-100 transition-all duration-300 cursor-pointer hover:border-blue-700  rounded-md">
      <div
        className=" flex flex-col gap-3"
        style={{ width: `${(numberOfSeats / 2) * defaultSize}px` }}
      >
        <div className="flex items-center gap-5">
          {Array.from({ length: numberOfSeats / 2 }).map((_, index) => {
            return (
              <div
                key={index}
                className="py-1.5 w-full rounded-full bg-[#dcdcdc]"
              ></div>
            );
          })}
        </div>
        <div className="w-full py-10 rounded-lg bg-[#dcdcdc] flex items-center justify-center">
          <div className="bg-[#c0d7ce] text-green-600 py-2 font-semibold px-3 rounded-md">
            T{numberOfTable}
          </div>
        </div>
        <div className="flex items-center gap-5">
          {Array.from({ length: numberOfSeats / 2 }).map((_, index) => {
            return (
              <div
                key={index}
                className="py-1.5 w-full rounded-full bg-[#dcdcdc]"
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Table;
