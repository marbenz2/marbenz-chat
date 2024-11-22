import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Paperclip, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { PreviewType } from "@/types";

const MessageInput = () => {
  const [text, setText] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<PreviewType | null>(null);
  const [pdfPreview, setPdfPreview] = useState<PreviewType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage } = useChatStore();

  interface HandleDataChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList };
  }

  const handleDataChange = (e: HandleDataChangeEvent) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      toast.error("Please select an image or PDF file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (file.type.startsWith("image/")) {
        setImagePreview({ data: reader.result as string, name: file.name });
        setPdfPreview(null);
      } else if (file.type === "application/pdf") {
        setPdfPreview({ data: reader.result as string, name: file.name });
        setImagePreview(null);
      }
    };

    if (file.type.startsWith("image/")) {
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      reader.readAsDataURL(file);
    }
  };

  const removePreview = () => {
    setImagePreview(null);
    setPdfPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async () => {
    if (!text.trim() && !imagePreview && !pdfPreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
        pdf: pdfPreview,
      });
      removePreview();
      setText("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview.data ?? undefined}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removePreview}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      {pdfPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <embed
              src={pdfPreview.data ?? undefined}
              type="application/pdf"
              width="100%"
              height="500px"
            />
            <button
              onClick={removePreview}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-2"
      >
        <div className="relative flex-1 flex gap-2">
          <textarea
            className="w-full textarea textarea-bordered rounded-lg textarea-sm sm:textarea-md leading-5 sm:leading-5 resize-none pr-12 sm:pr-12"
            placeholder="Nachricht eingeben..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <input
            type="file"
            accept="image/* ,application/pdf"
            className="hidden"
            ref={fileInputRef}
            onChange={handleDataChange}
          />
          <button
            type="button"
            className={`absolute right-0 btn w-12 h-12 min-h-0 bg-transparent border-0 rounded-lg
                 ${imagePreview ? "text-emerald-500" : "text-zinc-500"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="size-5" />
          </button>
        </div>
        <button
          type="button"
          className="flex btn btn-circle"
          onClick={handleSendMessage}
          disabled={!text.trim() && !imagePreview && !pdfPreview}
        >
          <Send className="size-5" />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
