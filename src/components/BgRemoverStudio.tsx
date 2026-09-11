import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, Download, ImagePlus, RotateCcw, Sparkles, UploadCloud } from "lucide-react";

type Status = "idle" | "processing" | "done" | "error";

const ACCEPTED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_BYTES = 15 * 1024 * 1024;

export function BgRemoverStudio() {
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("image");
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const urlsRef = useRef<string[]>([]);

  useEffect(() => {
    const urls = urlsRef.current;
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  const track = (url: string) => {
    urlsRef.current.push(url);
    return url;
  };

  const reset = () => {
    setStatus("idle");
    setProgress(0);
    setOriginalUrl(null);
    setResultUrl(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleFile = useCallback(async (file: File) => {
    if (!ACCEPTED.includes(file.type)) {
      setStatus("error");
      setError("That file type isn't supported. Please use a JPG, PNG or WEBP image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setStatus("error");
      setError("That image is larger than 15 MB. Please try a smaller one.");
      return;
    }

    setError(null);
    setResultUrl(null);
    setProgress(0);
    setFileName(file.name.replace(/\.[^.]+$/, "") || "image");
    setOriginalUrl(track(URL.createObjectURL(file)));
    setStatus("processing");

    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(file, {
        output: { format: "image/png", quality: 1 },
        progress: (_key: string, current: number, total: number) => {
          if (total > 0) setProgress(Math.min(99, Math.round((current / total) * 100)));
        },
      });
      setResultUrl(track(URL.createObjectURL(blob)));
      setProgress(100);
      setStatus("done");
    } catch (e) {
      console.error(e);
      setStatus("error");
      setError("We couldn't process that image. Please try again with another photo.");
    }
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void handleFile(file);
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />

      {status === "idle" || status === "error" ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "rounded-3xl border-2 border-dashed bg-card p-8 text-center shadow-[var(--shadow-card)] transition-all duration-300 sm:p-14",
            dragging ? "border-primary bg-accent/60 scale-[1.01]" : "border-border",
          )}
        >
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-brand)]">
            <UploadCloud className="size-8" />
          </div>
          <h2 className="mt-6 text-xl font-semibold sm:text-2xl">Drag &amp; Drop your image here</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            JPG, JPEG, PNG or WEBP — up to 15 MB. Your image never leaves your device.
          </p>
          <Button
            variant="hero"
            size="xl"
            className="mt-7"
            onClick={() => inputRef.current?.click()}
          >
            <ImagePlus /> Upload Image
          </Button>

          {error ? (
            <p
              role="alert"
              className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-destructive"
            >
              <AlertCircle className="size-4" /> {error}
            </p>
          ) : null}
        </div>
      ) : null}

      {status === "processing" ? (
        <div className="rounded-3xl border bg-card p-10 text-center shadow-[var(--shadow-card)]">
          <div className="mx-auto flex size-16 animate-pulse items-center justify-center rounded-2xl bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-brand)]">
            <Sparkles className="size-8" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">Removing background…</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Cutting out your subject with clean edges. This takes a few seconds.
          </p>
          <div className="mx-auto mt-6 h-2 w-full max-w-sm overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-[image:var(--gradient-brand)] transition-all duration-300"
              style={{ width: `${Math.max(8, progress)}%` }}
            />
          </div>
          {originalUrl ? (
            <img
              src={originalUrl}
              alt="Image being processed"
              className="mx-auto mt-8 max-h-64 rounded-2xl object-contain opacity-60"
            />
          ) : null}
        </div>
      ) : null}

      {status === "done" && originalUrl && resultUrl ? (
        <div className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <figure>
              <figcaption className="mb-3 text-sm font-semibold text-muted-foreground">
                Before
              </figcaption>
              <div className="flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-muted sm:h-80">
                <img
                  src={originalUrl}
                  alt="Original upload"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </figure>
            <figure>
              <figcaption className="mb-3 text-sm font-semibold text-muted-foreground">
                After — transparent PNG
              </figcaption>
              <div className="checkerboard flex h-64 items-center justify-center overflow-hidden rounded-2xl sm:h-80">
                <img
                  src={resultUrl}
                  alt="Image with the background removed"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </figure>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="hero" size="xl" asChild>
              <a href={resultUrl} download={`${fileName}-no-bg.png`}>
                <Download /> Download PNG
              </a>
            </Button>
            <Button variant="soft" size="xl" onClick={reset}>
              <RotateCcw /> Remove Another Background
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
