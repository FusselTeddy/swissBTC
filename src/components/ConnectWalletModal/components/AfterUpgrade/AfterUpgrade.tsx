import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ComponentStack, FieldDescription, Icon, Loader } from "@components";
import { ConnectWalletComponentProps } from "../../ConnectWalletModal";
import { SBPBitboxContext } from "@config";
import { faHandPointUp } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "styled-components";
import { sleep } from "@utils";
import * as ConnectStyled from "../../styled";

const TIME_TO_WAKEUP_AFTER_UPGRADE = 2000;

export const AfterUpgrade = ({ status }: ConnectWalletComponentProps) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "connectWalletModal.afterUpgrade"
  });
  const { colors } = useTheme();

  const { setIsAfterUpgradeScreen, setAttentionToBitbox } =
    useContext(SBPBitboxContext);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      await sleep(TIME_TO_WAKEUP_AFTER_UPGRADE);
      setAttentionToBitbox(true);
      setIsReady(true);
    })();

    return () => {
      setAttentionToBitbox(false);
    };
  }, []);

  useEffect(() => {
    if (["unpaired", "uninitialized"].includes(status)) {
      setIsAfterUpgradeScreen(false);
    }
  }, [status]);

  return (
    <ComponentStack gapSize={10} style={{ alignItems: "center" }}>
      <ConnectStyled.Title>{t("title")}</ConnectStyled.Title>
      {isReady ? (
        <FieldDescription style={{ textAlign: "center" }}>
          <Icon
            icon={faHandPointUp}
            color={colors.greyLight}
            size={20}
            style={{ transform: [{ translateY: 4 }] }}
          />{" "}
          {t("instruction")}
        </FieldDescription>
      ) : (
        <Loader reason={t("rebooting")} />
      )}
    </ComponentStack>
  );
};
