import React from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import CustomDrawer from "../Components/Custom/CustomDrawer";
import { Button, Typography } from "@chainsafe/common-components";
import { shortenAddress } from "../Utils/Helpers";

const useStyles = makeStyles(({ constants, palette, zIndex }: ITheme) =>
  createStyles({
    root: {
      zIndex: zIndex?.blocker,
      position: "absolute",
      "& li": {
        position: "relative",
        padding: "8px 0",
        "&:before": {
          display: "block",
          backgroundColor: palette.additional["gray"][2],
          height: constants.generalUnit,
          width: constants.generalUnit,
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          left: constants.generalUnit * 4,
          transform: "translate(-50%, -50%)",
        },
      },
    },
    subtitle: {
      margin: `${constants.generalUnit * 2}px 0`,
    },
    agreement: {
      margin: `${constants.generalUnit * 2}px 0`,
    },
    startButton: {
      backgroundColor: palette.additional["preflight"][1],
      color: palette.additional["preflight"][2],
      marginBottom: constants.generalUnit * 2,
    },
    backdrop: {
      position: "absolute",
      zIndex: zIndex?.layer4,
    },
  })
);

interface IPreflightModalTransferProps {
  open: boolean;
  close: () => void;
  sender: string;
  receiver: string;
  value: number;
  tokenSymbol: string;
  sourceNetwork: string;
  targetNetwork: string;
  start: () => void;
}

const PreflightModalTransfer: React.FC<IPreflightModalTransferProps> = ({
  open,
  close,
  receiver,
  sender,
  sourceNetwork,
  targetNetwork,
  tokenSymbol,
  value,
  start,
}: IPreflightModalTransferProps) => {
  const classes = useStyles();

  return (
    <CustomDrawer
      className={classes.root}
      classNames={{
        backdrop: classes.backdrop,
      }}
      size={430}
      open={open}
    >
      <ul>
		<li>
          <Typography variant="h5">
            ◻️ Make sure you have enough balance in your wallet to cover bridge and gas fee.
          </Typography>
        </li>
	    <li>
          <Typography variant="h5">
            ◻️ Make sure you're connected to the right network, double check your Metamask network.
          </Typography>
        </li>
		<li>
          <Typography variant="h5">
            ◻️ If you're connected to a wrong network and still process a transfer, then your funds might be permanently lost.
          </Typography>
        </li>
        <li>
          <Typography variant="h5">
            ◻️ You can safely close the bridge after 2nd transaction. <br /><br />
          </Typography>
        </li>
      </ul>
      <Button onClick={start} className={classes.startButton} fullsize>
        Start Transfer
      </Button>
      <Button onClick={close}>Back</Button>
    </CustomDrawer>
  );
};

export default PreflightModalTransfer;
