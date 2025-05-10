import TableStatus from '@/enum/tableStatus';
import { Link } from 'react-router-dom';

const Table = ({
  tableId,
  numberOfSeats,
  numberOfTable,
  defaultSize = 100,
  status,
}: {
  tableId: string;
  numberOfSeats: number;
  numberOfTable: string;
  defaultSize?: number;
  status: string;
}) => {
  return (
    <Link
      to={`/serving/orders/${tableId}`}
      className="p-2 border border-gray-100 transition-all duration-300 cursor-pointer hover:border-blue-700 rounded-md"
    >
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
          <span
            className={` py-2 font-semibold px-3 rounded-md ${
              status === TableStatus.AVAILABLE
                ? 'bg-[#c0d7ce] text-green-600'
                : ''
            } ${
              status === TableStatus.RESERVED ? 'bg-[#e7ccc6] text-red-600' : ''
            } ${
              status === TableStatus.OCCUPIED
                ? 'bg-[#c6cee7] text-blue-600'
                : ''
            }  ${
              status === TableStatus.UNAVAILABLE
                ? 'bg-[#d4d5dc] text-gray-400'
                : ''
            }`}
          >
            {numberOfTable}
          </span>
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
    </Link>
  );
};

export default Table;
