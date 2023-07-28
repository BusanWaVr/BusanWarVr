import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import styled from "styled-components";

const QRcodeDiv = styled.div`
  position: fixed;
  top: 100px;
  right: 30px;
  width: 200px;
`;

interface QRProps {
  youtubeLink: string;
}

function QRCodeComponent({ youtubeLink }: QRProps) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    // 컴포넌트가 마운트될 때 페이지의 URL을 가져옵니다.
    setUrl(youtubeLink);
  }, []);

  return (
    <QRcodeDiv>
      {/* QR 코드 컴포넌트에 현재 페이지의 URL을 전달하여 QR 코드를 생성합니다. */}
      {url && <QRCode value={url} size={100} />}
    </QRcodeDiv>
  );
}

export default QRCodeComponent;
