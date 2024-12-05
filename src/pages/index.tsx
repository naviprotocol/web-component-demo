import {
  ConnectButton,
  useCurrentAccount,
  ConnectModal,
  useSignTransaction,
} from "@mysten/dapp-kit";
import { useState, useEffect, useCallback } from "react";
import { swapPanelClient } from "@/services/swap";
import { Input, Button } from "@nextui-org/react";

export default function Home() {
  const account = useCurrentAccount();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [fee, setFee] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");

  useEffect(() => {
    if (account) {
      swapPanelClient.setUserAddress(account.address);
    } else {
      swapPanelClient.setUserAddress("");
    }
  }, [account]);

  useEffect(() => {
    swapPanelClient.events.on("clickConnect", () => {
      setOpen(true);
    });
    swapPanelClient.events.on("swapSuccess", (swapResult) => {
      console.log("swapSuccess", swapResult);
    });
  }, []);

  const { mutateAsync: signTransaction } = useSignTransaction();

  useEffect(() => {
    // register the onSignTransaction callback
    swapPanelClient.onSignTransaction = async (tx) => {
      const resp = await signTransaction({
        transaction: tx,
      });
      return {
        signature: resp.signature,
        bytes: resp.bytes,
      };
    };
  }, [signTransaction]);

  const handleSaveServiceFee = useCallback(() => {
    const feeValue = parseFloat(fee);
    if (!isNaN(feeValue) && feeValue >= 0 && receiverAddress) {
      swapPanelClient.setServiceFee({
        fee: feeValue / 100,
        receiverAddress,
      });
    } else {
      swapPanelClient.setServiceFee(null);
    }
  }, [fee, receiverAddress]);

  return (
    <>
      <main className="flex gap-8 pt-20 pl-20 h-screen">
        <div className="flex gap-4 items-center flex-col">
          <ConnectButton />
          <div
            className="rounded-full cursor-pointer border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            onClick={() => {
              swapPanelClient.show();
            }}
          >
            Show Swap
          </div>
          <div
            className="rounded-full cursor-pointer border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            onClick={() => {
              swapPanelClient.hide();
            }}
          >
            Hide Swap
          </div>
          <div
            className="rounded-full cursor-pointer border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            onClick={() => {
              swapPanelClient.setTokenFrom(
                "0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX"
              );
            }}
          >
            Set Swap From Token
          </div>
          <div
            className="rounded-full cursor-pointer border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            onClick={() => {
              swapPanelClient.setTokenFromAmount("111");
            }}
          >
            Set Swap Amount
          </div>
          <div
            className="rounded-full cursor-pointer border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            onClick={() => {
              swapPanelClient.setTokenTo(
                "0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC"
              );
            }}
          >
            Set Swap To Token
          </div>
          <div
            className="rounded-full cursor-pointer border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            onClick={() => {
              swapPanelClient.changeTheme(theme === "dark" ? "light" : "dark");
              setTheme(theme === "dark" ? "light" : "dark");
              document.documentElement.classList.toggle("dark");
            }}
          >
            Toggle Theme ({theme})
          </div>
        </div>
        <div className="flex gap-4 items-center flex-col w-[250px]">
          <div className="flex flex-col gap-2">
            <div className="font-semibold">Service Fee</div>
            <Input
              max={1}
              type="text"
              label="Fee"
              color="default"
              endContent="%"
              value={fee}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9.]/g, "");
                const fee = parseFloat(value);
                if (!isNaN(fee) && fee > 1) {
                  value = "1";
                }
                setFee(value);
              }}
            />
            <Input
              max={1}
              type="text"
              label="Receiver Address"
              color="default"
              value={receiverAddress}
              onChange={(e) =>
                setReceiverAddress(e.target.value.replace(/[^0-9a-zA-Z]/g, ""))
              }
            />
            <Button
              color="primary"
              className="w-full"
              onClick={handleSaveServiceFee}
            >
              Save
            </Button>
          </div>
        </div>
      </main>
      <ConnectModal
        trigger={<></>}
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
      />
    </>
  );
}
