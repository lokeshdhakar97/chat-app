import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

export const DialogBox = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"} className="mt-8">
          Add Chat or Join Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Type Chat ID </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          Chat ID
          <Input
            id="chatid"
            placeholder="Example yourname12"
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Chat</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
