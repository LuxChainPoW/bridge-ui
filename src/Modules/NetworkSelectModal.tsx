import React from "react";
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import { useChainbridge } from "../Contexts/ChainbridgeContext";
import { useNetworkManager } from "../Contexts/NetworkManagerContext";
import {
  Button,
  Modal,
  ProgressBar,
  Typography,
} from "@chainsafe/common-components";

const useStyles = makeStyles(({ constants, palette, zIndex }: ITheme) => {
  return createStyles({
    root: {},
    slide: {
      borderRadius: constants.generalUnit / 2,
      padding: `${constants.generalUnit}px ${constants.generalUnit * 2}px`,
      "& > p": {
        marginTop: constants.generalUnit * 2,
        marginBottom: constants.generalUnit * 3,
        textAlign: "center",
      },
    },
    buttons: {
      marginBottom: constants.generalUnit * 2,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
  });
});

const NetworkSelectModal = () => {
  const classes = useStyles();
  const { isReady, chains } = useChainbridge();
  const { walletType, setWalletType } = useNetworkManager();

  return (
    <Modal
      active={walletType !== "unset" && walletType !== "Ethereum" && !isReady}
      closePosition="right"
      className={classes.root}
      injectedClass={{
        inner: classes.slide,
      }}
    >
      {walletType === "select" && (
        <>
          <Typography variant="h3" component="p">
            Please select a wallet
          </Typography>
          <section className={classes.buttons}>
            {chains?.every((item) => item.type === "Ethereum") ? (
              <Button onClick={() => setWalletType("Ethereum")}>
                Connect Wallet
              </Button>
            ) : (
              <>
                <Button onClick={() => setWalletType("Ethereum")}>
                  Connect Wallet
                </Button>
              </>
            )}
          </section>
        </>
      )}
    </Modal>
  );
};

export default NetworkSelectModal;
