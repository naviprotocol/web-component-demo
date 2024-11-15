import {
  ConnectButton,
  useCurrentAccount,
  ConnectModal,
  useSignTransaction,
} from "@mysten/dapp-kit";
import { SwapPanelClient } from "navi-web-component";
import { useState, useEffect } from "react";

const swapPanelClient = new SwapPanelClient();

export default function Home() {
  const account = useCurrentAccount();
  const [open, setOpen] = useState(false);

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

  return (
    <div
      className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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
        </div>
      </main>
      <ConnectModal
        trigger={<></>}
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
      />
    </div>
  );
}
