import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Html5Qrcode } from "html5-qrcode";
import { X, Camera, Upload, AlertCircle, RefreshCw, Loader2, ScanLine } from "lucide-react";
import { extractHashOrId } from "@/lib/qr";

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (extractedValue: string) => void;
}

export function QrScannerModal({ isOpen, onClose, onScanSuccess }: QrScannerModalProps) {
  const [scannerError, setScannerError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [cameras, setCameras] = useState<Array<{ id: string; label: string }>>([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isStoppingRef = useRef(false);
  const onCloseRef = useRef(onClose);
  const onScanSuccessRef = useRef(onScanSuccess);

  useEffect(() => {
    onCloseRef.current = onClose;
    onScanSuccessRef.current = onScanSuccess;
  }, [onClose, onScanSuccess]);

  const containerId = "tochi-qr-reader-viewport";

  // Clean stop helper
  const stopScanner = useCallback(async () => {
    if (isStoppingRef.current) return;
    isStoppingRef.current = true;

    try {
      if (scannerRef.current) {
        if (scannerRef.current.isScanning) {
          await scannerRef.current.stop();
        }
        scannerRef.current.clear();
      }
    } catch (err) {
      console.warn("Failed to stop QR scanner cleanly:", err);
    } finally {
      scannerRef.current = null;
      isStoppingRef.current = false;
    }
  }, []);

  const handleScanHit = useCallback(
    async (decodedText: string) => {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate([40, 60, 40]);
        } catch {
          // Haptic not permitted
        }
      }

      const extracted = extractHashOrId(decodedText);
      await stopScanner();
      onScanSuccessRef.current(extracted);
      onCloseRef.current();
    },
    [stopScanner],
  );

  // Start Camera
  const startCamera = useCallback(
    async (cameraId?: string) => {
      setIsInitializing(true);
      setScannerError(null);

      try {
        await stopScanner();

        // Ensure DOM element is present
        const el = document.getElementById(containerId);
        if (!el) {
          setIsInitializing(false);
          return;
        }

        const html5QrCode = new Html5Qrcode(containerId);
        scannerRef.current = html5QrCode;

        // Enumerate available cameras
        try {
          const availableDevices = await Html5Qrcode.getCameras();
          if (availableDevices && availableDevices.length > 0) {
            setCameras(availableDevices);
          }
        } catch {
          // Device enumeration not required
        }

        const cameraConfig = cameraId
          ? { deviceId: { exact: cameraId } }
          : { facingMode: "environment" };

        await html5QrCode.start(
          cameraConfig,
          {
            fps: 10,
            qrbox: (viewfinderWidth, viewfinderHeight) => {
              const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
              const edge = Math.floor(minEdge * 0.72);
              return { width: edge, height: edge };
            },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            void handleScanHit(decodedText);
          },
          () => {
            // Frame error (no QR detected in current frame, normal loop)
          },
        );

        setIsInitializing(false);
      } catch (err: unknown) {
        console.error("Camera start error:", err);
        setIsInitializing(false);
        const msg =
          err instanceof Error
            ? err.message
            : "Camera permission was not granted or camera is unavailable.";
        setScannerError(msg);
      }
    },
    [handleScanHit, stopScanner],
  );

  // Switch between front/rear cameras
  const handleSwitchCamera = async () => {
    if (cameras.length <= 1) return;
    const nextIndex = (currentCameraIndex + 1) % cameras.length;
    setCurrentCameraIndex(nextIndex);
    const targetCamera = cameras[nextIndex];
    if (targetCamera) {
      await startCamera(targetCamera.id);
    }
  };

  // File upload scan fallback
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessingFile(true);
    setScannerError(null);

    try {
      await stopScanner();

      const el = document.getElementById(containerId);
      if (!el) {
        setIsProcessingFile(false);
        return;
      }

      const html5QrCode = new Html5Qrcode(containerId);
      const decodedText = await html5QrCode.scanFile(file, false);
      html5QrCode.clear();

      await handleScanHit(decodedText);
    } catch (err: unknown) {
      console.warn("File scan failed:", err);
      setScannerError(
        "No readable QR code found in this image. Please try a clearer photo or camera scan.",
      );
      // Restart camera after failed file scan
      await startCamera();
    } finally {
      setIsProcessingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      void stopScanner();
      return undefined;
    }

    // Small tick for DOM modal mount
    const timer = setTimeout(() => {
      void startCamera();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      void stopScanner();
    };
  }, [isOpen, startCamera, stopScanner]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-sm rounded-3xl border border-white/15 bg-[#250812] text-[#FAF6F0] p-5 sm:p-6 shadow-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Scan QR Code"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center text-[#FAF6F0]">
                <ScanLine className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-sans text-[#FAF6F0]">Scan Credential QR</h3>
                <p className="text-[10px] font-mono text-[#FAF6F0]/60">
                  Certificate or Offer Letter
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF6F0] flex items-center justify-center transition-all active:scale-95"
              aria-label="Close scanner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Viewport Area */}
          <div className="my-4 relative">
            <div
              id={containerId}
              className="w-full aspect-square rounded-2xl overflow-hidden bg-black/60 relative border border-white/10 flex items-center justify-center"
            >
              {isInitializing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-xs font-mono text-[#FAF6F0]/80 gap-2 bg-black/70 z-20">
                  <Loader2 className="h-6 w-6 animate-spin text-[#FAF6F0]" />
                  <span>Activating camera...</span>
                </div>
              )}

              {isProcessingFile && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-xs font-mono text-[#FAF6F0]/80 gap-2 bg-black/70 z-20">
                  <Loader2 className="h-6 w-6 animate-spin text-[#FAF6F0]" />
                  <span>Reading QR image...</span>
                </div>
              )}
            </div>

            {/* Reticle Visual Overlay */}
            {!isInitializing && !scannerError && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                  {/* Four Corner Brackets */}
                  <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#FAF6F0] rounded-tl-lg" />
                  <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#FAF6F0] rounded-tr-lg" />
                  <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#FAF6F0] rounded-bl-lg" />
                  <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#FAF6F0] rounded-br-lg" />

                  {/* Scanning Laser Beam */}
                  <div className="absolute inset-x-2 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#FAF6F0] to-transparent shadow-[0_0_12px_#FAF6F0] animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Scanner Error / Fallback info */}
          {scannerError && (
            <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-950/50 p-3 text-xs text-rose-200 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-rose-200">Camera access issue</p>
                <p className="text-[11px] text-rose-300/80 mt-0.5">{scannerError}</p>
              </div>
            </div>
          )}

          {/* Actions & Controls */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center gap-2">
              {/* File upload input fallback */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="qr-file-upload-input"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessingFile}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-[#FAF6F0] text-xs font-mono font-medium border border-white/10 transition-all active:scale-95 disabled:opacity-50"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Upload QR Photo</span>
              </button>

              {cameras.length > 1 && (
                <button
                  type="button"
                  onClick={handleSwitchCamera}
                  disabled={isInitializing}
                  className="inline-flex items-center justify-center p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-[#FAF6F0] border border-white/10 transition-all active:scale-95 disabled:opacity-50"
                  title="Switch Camera"
                  aria-label="Switch Camera"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full text-center py-1.5 text-[11px] font-mono text-[#FAF6F0]/60 hover:text-[#FAF6F0] transition-colors"
            >
              Cancel &bull; Enter Code Manually
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
