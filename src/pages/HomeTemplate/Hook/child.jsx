import { memo } from "react";

const ChildComponent = () => {
  // Component con sẽ bị render theo nếu Component cha render lại
  // thêm func memo vô thì Component con sẽ ko render lại theo Component cha
  // nhưng sẽ không có tác dụng khi cha truyền qua con theo props mặc dù có sử dụng memo
  console.log("ChildComponent render");
  return (
    <div>
      <h1>ChildComponent</h1>
    </div>
  );
};

export default memo(ChildComponent);
