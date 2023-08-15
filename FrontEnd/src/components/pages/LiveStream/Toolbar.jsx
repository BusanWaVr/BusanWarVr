import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import CommentIcon from "@mui/icons-material/Comment";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import QrcodeOutlined from "@mui/icons-material/QrcodeOutlined";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";

import QRCodeComponent from "./QRCodeComponent";

import { useSelector, useDispatch } from "react-redux";

const Toolbar = (props) => {
  const {
    isAudioEnabled,
    isVideoEnabled,
    isFullScreen,
    isChatOpen,
    isVoteOpen,
    youtubeLink,
  } = useSelector((state) => state.liveStream);
  const dispatch = useDispatch();

  const ToolbarContainer = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 30px;
    background-color: #eee;
    border-radius: 30px;
    padding: 0 10px;
    z-index: 99;
  `;

  const ToolbarButton = styled.button`
    width: 60px;
    height: 60px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    &:hover {
      border: none;
    }
    transition: none;
  `;

  const HtmlTooltip = muiStyled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  return (
    <ToolbarContainer>
      {isVideoEnabled ? (
        <ToolbarButton onClick={props.toggleVideo}>
          <VideocamIcon />
        </ToolbarButton>
      ) : (
        <ToolbarButton onClick={props.toggleVideo}>
          <VideocamOffIcon />
        </ToolbarButton>
      )}
      {isAudioEnabled ? (
        <ToolbarButton onClick={props.toggleAudio}>
          <MicIcon />
        </ToolbarButton>
      ) : (
        <ToolbarButton onClick={props.toggleAudio}>
          <MicOffIcon />
        </ToolbarButton>
      )}
      {isFullScreen ? (
        <ToolbarButton onClick={props.toggleFullScreen}>
          <FullscreenExitIcon />
        </ToolbarButton>
      ) : (
        <ToolbarButton onClick={props.toggleFullScreen}>
          <FullscreenIcon />
        </ToolbarButton>
      )}
      <Divider orientation="vertical" flexItem />
      {isChatOpen ? (
        <ToolbarButton
          onClick={() => {
            props.handleLeaveChatToggle();
            props.onLeaveChat();
          }}
        >
          <CommentIcon />
        </ToolbarButton>
      ) : (
        <ToolbarButton
          onClick={() => {
            props.handleJoinChatToggle();
            props.onJoinChat();
          }}
        >
          <CommentsDisabledIcon />
        </ToolbarButton>
      )}

      {/* 투표 */}
      <ToolbarButton onClick={props.toggleVote}>
        <HowToVoteIcon />
      </ToolbarButton>

      <HtmlTooltip
        title={<QRCodeComponent youtubeLink={youtubeLink} />}
        placement="top"
      >
        <ToolbarButton>
          <QrcodeOutlined />
        </ToolbarButton>
      </HtmlTooltip>

      <ToolbarButton
        type="button"
        id="buttonLeaveSession"
        onClick={props.leaveSession}
      >
        <ExitToAppIcon />
      </ToolbarButton>
    </ToolbarContainer>
  );
};
export default Toolbar;
