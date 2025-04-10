import {
  ConnectButton,
  useCurrentAccount,
  ConnectModal,
  useSignTransaction,
} from "@mysten/dapp-kit";
import { useState, useEffect } from "react";
import { ivanAiClient } from "@/services/ivan";

export default function Home() {
  const account = useCurrentAccount();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (account) {
      ivanAiClient.setUserAddress(account.address);
    } else {
      ivanAiClient.setUserAddress("");
    }
  }, [account]);

  useEffect(() => {
    ivanAiClient.events.on("clickConnect", () => {
      setOpen(true);
    });
  }, []);

  const { mutateAsync: signTransaction } = useSignTransaction();

  useEffect(() => {
    // register the onSignTransaction callback
    ivanAiClient.onSignTransaction = async (tx) => {
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
    <>
      <main className="flex gap-8 pt-20 pl-20 h-screen bg-white">
        <div className="flex gap-4 items-center flex-col">
          <ConnectButton />
        </div>
        <div>
           
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
