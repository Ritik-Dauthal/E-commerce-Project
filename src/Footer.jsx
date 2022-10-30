import React, { memo } from "react";

function Footer() {
  return (
    <div className="flex h-16 py-4 bg-gray-300">
      <div className="text-xs md:ml-20 md:text-lg">Copyright@2022|Codeyogi</div>
      <span className="grow"></span>
      <div className="text-xs md:mr-20 md:text-lg">Powrerd By Codeyogi</div>
    </div>
  );
}
export default memo(Footer);
