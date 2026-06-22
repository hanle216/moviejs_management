import { useState, useEffect, useCallback, useMemo } from "react";
import ChildComponent from "./child";

const Hooks = () => {
  console.log("hooks render"); //state thay đổi nên nguyên component render lại, nên sẽ in lại
  const [count, setCount] = useState(0);

  // userEffect truyền 2 tham số: arrow function và array (còn được xem là dependencies )
  // useEffect chỉ chạy 1 lần duy nhất sau lần render đầu tiên - khi array dependencies (phụ thuộc) rỗng
  useEffect(() => {
    console.log("use effect - chạy 1 lần duy nhất sau lần render đầu tiên");
    const getListProductAPI = () => {
      console.log("getListProductAPI - gọi API láy danh sách sp - chỉ render 1 lần");
    };
    getListProductAPI();
  }, []);

  // trong arr có thể phụ thuộc vào nhiều state khác (arr chứa được nhiều phần tử)
  useEffect(() => {
    console.log("useEffect - chạy sau mỗi lần render - khi mảng khác rỗng");
    const getListProduct = () => {
      console.log("gọi API lấy danh sách sp theo phân trang", count);
    };
    getListProduct();
  }, [count]);

  // setInterval(): cho phép làm hành động sau ... giây
  useEffect(() => {
    const intervalID = setInterval(() => {
      console.log("tracking...");
    }, 1000);
    return () => {
      console.log(
        "useEffect - chạy khi component bị huỷ vì chuyển sang trang/tab khác",
      );
      clearInterval(intervalID);
    };
  }, []);

  const handleChild = () => {
    console.log("handle child");
  };
  // cache handleChild => không bị khởi tạo lại khi Component cha re-render
  const handleCallback = useCallback(handleChild, []);

  // hàm tăng số từ 0 -> 1000
  const countUp = () => {
    let i = 0;
    while (i < 1000) {
      i++;
    }
    console.log("count up: ", i);
    return i;
  };
  // useMemo: không tính toán lại khi Component cha re-render
  const countUpMemo = useMemo(() => countUp(), []);
  return (
    <div>
      <h1>Hooks</h1>
      <p>Count : {count}</p>
      <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <h2>Count up: {countUpMemo}</h2>
      <hr />
      <ChildComponent onChild={handleCallback} />
    </div>
  );
};

export default Hooks;
