import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";

const QRCodeComponent: React.FC = () => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    // 컴포넌트가 마운트될 때 페이지의 URL을 가져옵니다.
    const currentUrl = window.location.href;
    setUrl(currentUrl);
  }, []);

  return (
    <div>
      {/* QR 코드 컴포넌트에 현재 페이지의 URL을 전달하여 QR 코드를 생성합니다. */}
      {url && <QRCode value={url} size={256} />}
    </div>
  );
};

export default QRCodeComponent;
