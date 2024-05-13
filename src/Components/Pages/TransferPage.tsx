import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import AboutDrawer from "../../Modules/AboutDrawer";
import ChangeNetworkDrawer from "../../Modules/ChangeNetworkDrawer";
import PreflightModalTransfer from "../../Modules/PreflightModalTransfer";
import {
  Button,
  Typography,
  QuestionCircleSvg,
  SelectInput,
} from "@chainsafe/common-components";
import { Form, Formik } from "formik";
import AddressInput from "../Custom/AddressInput";
import clsx from "clsx";
import TransferActiveModal from "../../Modules/TransferActiveModal";
import { useChainbridge } from "../../Contexts/ChainbridgeContext";
import TokenSelectInput from "../Custom/TokenSelectInput";
import TokenInput from "../Custom/TokenInput";
import { object, string } from "yup";
import { utils } from "ethers";
import FeesFormikWrapped from "./FormikContextElements/Fees";
import { useNetworkManager } from "../../Contexts/NetworkManagerContext";
import NetworkUnsupportedModal from "../../Modules/NetworkUnsupportedModal";
import { isValidSubstrateAddress } from "../../Utils/Helpers";
import { useHomeBridge } from "../../Contexts/HomeBridgeContext";
import { showImageUrl } from "../../Utils/Helpers";

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      padding: "30px 30px 10px 30px",
      position: "relative",
      background: "#fff",
    },
    walletArea: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    connectButton: {
      margin: `20px 0`,
	  padding: "15px 16px !important",
	  fontSize: "20px",
	  borderRadius: "5px",
	  background: "#03225D",
    },
    connecting: {
      textAlign: "center",
      marginBottom: constants.generalUnit * 2,
    },
    connected: {
      width: "100%",
      "& > *:first-child": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      },
    },
    changeButton: {
      cursor: "pointer",
    },
    networkName: {
	  fontSize: "18px",
      padding: "8px 12px",
      border: "2px solid #03225D",
      borderRadius: 3,
      color: "#03225D",
      marginTop: constants.generalUnit,
      marginBottom: constants.generalUnit * 3,
    },
    formArea: {
      "&.disabled": {
        opacity: 0.2,
		pointerEvents: "none",
      },
    },
    currencySection: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      margin: `${constants.generalUnit * 3}px 0`,
    },
    tokenInputArea: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-around",
    },
    tokenInputSection: {
      width: "auto",
    },
    tokenInput: {
      margin: 0,
      "& > div": {
        height: 32,
        "& input": {
		  border: "1px solid palette.additional['gray'][6]",
        },
      },
      "& span:last-child.error": {
        position: "absolute",
        width: "calc(100% + 62px)",
      },
    },
    maxButton: {
      height: 32,
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      color: palette.additional["gray"][8],
      backgroundColor: palette.additional["gray"][3],
      borderColor: palette.additional["gray"][6],
      "&:hover": {
        borderColor: palette.additional["gray"][6],
        backgroundColor: palette.additional["gray"][7],
        color: palette.common.white.main,
      },
      "&:focus": {
        borderColor: palette.additional["gray"][6],
      },
    },
    currencySelector: {
      width: "40%",
      paddingRight: constants.generalUnit,
      "& *": {
        cursor: "pointer",
      },
    },
    token: {},
    address: {
      margin: 0,
      marginBottom: constants.generalUnit * 3,
    },
    addressInput: {
	  fontSize: "15px !important",
	},
    generalInput: {
      "& > span": {
        marginBottom: constants.generalUnit,
		fontSize: "15px",
		color: "#000000a1",
		fontWeight: "500",
      },
    },
	extra1: {
      "& > span": {
        fontSize: "15px",
        fontWeight: "600",
        lineHeight: "22px",
		color: "#000000a1",
      },
    },
    faqButton: {
      cursor: "pointer",
      height: 25,
      width: 25,
      fill: `${palette.additional["transferUi"][1]} !important`,
	  marginBottom: "-6px",
	  paddingRight: "5px",
    },
    tokenItem: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      "& img, & svg": {
        display: "block",
        height: 14,
        width: 14,
        marginRight: 10,
      },
      "& span": {
        minWidth: `calc(100% - 20px)`,
        textAlign: "left",
      },
    },
    fees: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: constants.generalUnit,
      "& > *": {
        display: "block",
        width: "50%",
        color: palette.additional["gray"][8],
        marginBottom: constants.generalUnit / 2,
        "&:nth-child(even)": {
          textAlign: "right",
        },
      },
    },
    accountSelector: {
      marginBottom: 24,
    },
  })
);

type PreflightDetails = {
  tokenAmount: number;
  token: string;
  tokenSymbol: string;
  receiver: string;
};

const TransferPage = () => {
  const classes = useStyles();
  const { walletType, setWalletType } = useNetworkManager();

  const {
    deposit,
    setDestinationChain,
    transactionStatus,
    resetDeposit,
    bridgeFee,
    tokens,
    isReady,
    homeConfig,
    destinationChainConfig,
    destinationChains,
    address,
    checkSupplies,
  } = useChainbridge();

  const { accounts, selectAccount } = useHomeBridge();
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const [changeNetworkOpen, setChangeNetworkOpen] = useState<boolean>(false);
  const [preflightModalOpen, setPreflightModalOpen] = useState<boolean>(false);

  const [preflightDetails, setPreflightDetails] = useState<PreflightDetails>({
    receiver: "",
    token: "",
    tokenAmount: 0,
    tokenSymbol: "",
  });

  useEffect(() => {
    if (walletType !== "select" && walletConnecting === true) {
      setWalletConnecting(false);
    } else if (walletType === "select") {
      setWalletConnecting(true);
    }
  }, [walletType, walletConnecting]);

  const selectedToken = homeConfig?.tokens.find(
    (token) => token.address === preflightDetails.token
  );

  const DECIMALS =
    selectedToken && selectedToken.decimals ? selectedToken.decimals : 18;

  const REGEX =
    DECIMALS > 0
      ? new RegExp(`^[0-9]{1,18}(.[0-9]{1,${DECIMALS}})?$`)
      : new RegExp(`^[0-9]{1,18}?$`);

  const transferSchema = object().shape({
    tokenAmount: string()
      .test("Token selected", "Select token", (value) => {
        if (
          !!value &&
          preflightDetails &&
          tokens[preflightDetails.token] &&
          tokens[preflightDetails.token].balance !== undefined
        ) {
          return true;
        } else {
          return false;
        }
      })
      .test("InputValid", "Input invalid", (value) => {
        try {
          return REGEX.test(`${value}`);
        } catch (error) {
          console.error(error);
          return false;
        }
      })
      .test("Max", "Insufficent funds", (value) => {
        if (
          value &&
          preflightDetails &&
          tokens[preflightDetails.token] &&
          tokens[preflightDetails.token].balance
        ) {
          if (homeConfig?.type === "Ethereum") {
            return parseFloat(value) <= tokens[preflightDetails.token].balance;
          } else {
            return (
              parseFloat(value + (bridgeFee || 0)) <=
              tokens[preflightDetails.token].balance
            );
          }
        }
        return false;
      })
      .test(
        "Bridge Supplies",
        "Transfer currently not available.",
        async (value) => {
          if (checkSupplies && destinationChainConfig && value) {
            const supplies = await checkSupplies(
              parseFloat(value),
              preflightDetails.token,
              destinationChainConfig.chainId
            );
            return Boolean(supplies);
          }
          return false;
        }
      )
      .test("Min", "Less than minimum", (value) => {
        if (value) {
          return parseFloat(value) > 0;
        }
        return false;
      })
      .required("Please set a value"),
    token: string().required("Select token"),
    receiver: string()
      .test("Valid address", "Please add a valid address", (value) => {
        if (destinationChainConfig?.type === "Substrate") {
          return isValidSubstrateAddress(value as string);
        }
        return utils.isAddress(value as string);
      })
      .required("Please add a receiving address"),
  });

  return (
    <article className={classes.root}>
	  <p style={{ fontSize: '17px', color: '#0132B3', textAlign: 'center' }}>
        LuxChain Bridge
      </p>
      <div className={classes.walletArea}>
        {!isReady ? (
          <Button
            className={classes.connectButton}
            fullsize
            onClick={() => {
              setWalletType("select");
            }}
          >
            Connect Wallet
          </Button>
        ) : walletConnecting ? (
          <section className={classes.connecting}>
            <Typography component="p" variant="h5">
              This app requires access to your wallet, <br />
              please login and authorize access to continue.
            </Typography>
          </section>
        ) : (
          <section className={classes.connected}>
            <div>
              <Typography variant="body1" style={{fontSize: '15px', fontWeight: '600', lineHeight: '22px'}}>Transfer from:</Typography>
              <Typography
                className={classes.changeButton}
                variant="body1"
                onClick={() => setChangeNetworkOpen(true)}
              >
                Change Network
              </Typography>
            </div>
            <Typography
              component="h2"
              variant="h2"
              className={classes.networkName}
            >
              {homeConfig?.name}
            </Typography>
          </section>
        )}
      </div>
      {isReady &&
        walletType === "Substrate" &&
        accounts &&
        accounts.length > 0 && (
          <div>
            <section className={classes.accountSelector}>
              <SelectInput
                label="Select account"
                className={classes.generalInput}
                options={accounts.map((acc, i) => ({
                  label: acc.address,
                  value: i,
                }))}
                onChange={(value) => selectAccount && selectAccount(value)}
                value={accounts.findIndex((v) => v.address === address)}
                placeholder="Select an account"
              />
            </section>
          </div>
        )}
      <Formik
        initialValues={{
          tokenAmount: 0,
          token: "",
          receiver: "",
        }}
        validateOnChange={false}
        validationSchema={transferSchema}
        onSubmit={(values) => {
          setPreflightDetails({
            ...values,
            tokenSymbol: tokens[values.token].symbol || "",
          });
          setPreflightModalOpen(true);
        }}
      >
        {(props) => (
          <Form
            className={clsx(classes.formArea, {
              disabled: !homeConfig || !address || props.isValidating,
            })}
          >
            <section>
              <SelectInput
                label="Receive in:"
                className={classes.extra1}
                disabled={!homeConfig}
                options={destinationChains.map((dc) => ({
                  label: dc.name,
                  value: dc.chainId,
                }))}
                onChange={(value) => setDestinationChain(value)}
                value={destinationChainConfig?.chainId}
              />
            </section>
            <section className={classes.currencySection}>
			{/* 
            <section>
              <div
                className={clsx(classes.tokenInputArea, classes.generalInput)}
              >
                <TokenInput
                  classNames={{
                    input: clsx(classes.tokenInput, classes.generalInput),
                    button: classes.maxButton,
                  }}
                  tokenSelectorKey="token"
                  tokens={tokens}
                  disabled={
                    !destinationChainConfig ||
                    !preflightDetails.token ||
                    preflightDetails.token === ""
                  }
                  name="tokenAmount"
                  label="Transfer Amount"
                />
              </div>
            </section>
			 */}
              <section className={classes.currencySelector}>
                <TokenSelectInput
                  tokens={tokens}
                  name="token"
                  disabled={!destinationChainConfig}
                  label={`Balance: `}
                  className={classes.generalInput}
                  placeholder=""
                  sync={(tokenAddress) => {
                    setPreflightDetails({
                      ...preflightDetails,
                      token: tokenAddress,
                      receiver: "",
                      tokenAmount: 0,
                      tokenSymbol: "",
                    });
                  }}
                  options={
                    Object.keys(tokens).map((t) => ({
                      value: t,
                      label: (
                        <div className={classes.tokenItem}>
                          {tokens[t]?.imageUri && (
                            <img
                              src={showImageUrl(tokens[t]?.imageUri)}
                              alt={tokens[t]?.symbol}
                            />
                          )}
                          <span>{tokens[t]?.symbol || t}</span>
                        </div>
                      ),
                    })) || []
                  }
                />
              </section>
			  <section className={classes.tokenInputSection}>
                <div
                  className={clsx(classes.tokenInputArea, classes.generalInput)}
                >
                  <TokenInput
                    classNames={{
                      input: clsx(classes.tokenInput, classes.generalInput),
                      button: classes.maxButton,
                    }}
                    tokenSelectorKey="token"
                    tokens={tokens}
                    disabled={
                      !destinationChainConfig ||
                      !preflightDetails.token ||
                      preflightDetails.token === ""
                    }
                    name="tokenAmount"
                    label="Transfer Amount"
                  />
                </div>
              </section>
            </section>
            <section>
              <AddressInput
                disabled={!destinationChainConfig}
                name="receiver"
                label="Receiving Address"
                placeholder="Please enter your wallet address"
                className={classes.extra1}
                classNames={{
                  input: classes.extra1,
                }}
                senderAddress={`${address}`}
                sendToSameAccountHelper={
                  destinationChainConfig?.type === homeConfig?.type
                }
              />
            </section>
            <FeesFormikWrapped
              amountFormikName="tokenAmount"
              className={classes.fees}
              fee={bridgeFee}
              feeSymbol={homeConfig?.nativeTokenSymbol}
              symbol={
                preflightDetails && tokens[preflightDetails.token]
                  ? tokens[preflightDetails.token].symbol
                  : undefined
              }
            />
            <section>
              <Button type="submit" fullsize variant="primary" className={classes.connectButton}>
                Start transfer
              </Button>
            </section>
            <section>
				<QuestionCircleSvg
					onClick={() => setAboutOpen(true)}
					className={classes.faqButton}
				/>
				<Typography variant="h5" style={{ color: 'black' }}>
					<strong>Convert LUX to WLUX:</strong> <a href="https://wrapper.luxchain.io/" target="_blank" style={{ color: 'blue', textDecoration: 'none' }}>wrapper.luxchain.io</a> <br />
				</Typography>
			</section>
          </Form>
        )}
      </Formik>
      <AboutDrawer open={aboutOpen} close={() => setAboutOpen(false)} />
      <ChangeNetworkDrawer
        open={changeNetworkOpen}
        close={() => setChangeNetworkOpen(false)}
      />
      <PreflightModalTransfer
        open={preflightModalOpen}
        close={() => setPreflightModalOpen(false)}
        receiver={preflightDetails?.receiver || ""}
        sender={address || ""}
        start={() => {
          setPreflightModalOpen(false);
          preflightDetails &&
            deposit(
              preflightDetails.tokenAmount,
              preflightDetails.receiver,
              preflightDetails.token
            );
        }}
        sourceNetwork={homeConfig?.name || ""}
        targetNetwork={destinationChainConfig?.name || ""}
        tokenSymbol={preflightDetails?.tokenSymbol || ""}
        value={preflightDetails?.tokenAmount || 0}
      />
      <TransferActiveModal open={!!transactionStatus} close={resetDeposit} />
      {/* This is here due to requiring router */}
      <NetworkUnsupportedModal />
    </article>
  );
};
export default TransferPage;
