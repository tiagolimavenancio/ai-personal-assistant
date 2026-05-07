import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { WalletCardsIcon } from "lucide-react";

function Profile({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user } = useContext(AuthContext);

  const [maxTokens, setMaxTokens] = useState<number>(0);

  useEffect(() => {
    setMaxTokens(user?.orderId ? 10000 : 50000);
  }, [user?.orderId]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{}</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="flex gap-4 items-center">
                <Image
                  className="w-[60px] h-[60px] rounded-full"
                  src={user?.picture}
                  alt={user?.name}
                  width={150}
                  height={150}
                />
                <div>
                  <h2 className="text-lg font-bold">{user?.name}</h2>
                  <h2 className="text-gray-500">{user?.email}</h2>
                </div>
              </div>
              <hr className="my-3" />

              <div className="flex flex-col gap-2">
                <h2 className="font-bold">Token Usage</h2>
                <h2>
                  {user?.credits}/{maxTokens}
                </h2>
                <Progress value={(user?.credits / maxTokens) * 100} />
                <h2 className="flex justify-between font-bold mt-3 text-lg">
                  Current Plan
                  <span className="p-1 bg-gray-100 rounded-md px-2 font-normal">
                    {!user?.orderId ? "Free Plan" : "Pro Plan"}
                  </span>
                </h2>
              </div>

              <div className="mt-4 p-4 border rounded-xl">
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-bold text-lg">Pro Plan</h2>
                    <h2>500,000 Tokens</h2>
                  </div>
                  <h2 className="font-bold text-lg">$10 / Month</h2>
                </div>
                <hr className="my-3" />
                <Button className="w-full">
                  <WalletCardsIcon /> Upgrade (10$)
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Profile;
