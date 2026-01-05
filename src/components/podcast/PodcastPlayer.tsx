import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Pause, X, Volume2, SkipForward, SkipBack } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PodcastPlayerProps {
    isOpen: boolean;
    onClose: () => void;
    script: string;
    title: string;
    onPlay: (onProgress: (progress: number) => void) => void;
    onStop: () => void;
}

export function PodcastPlayer({ isOpen, onClose, script, title, onPlay, onStop }: PodcastPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showScript, setShowScript] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            handleStop();
        }
    }, [isOpen]);

    const handleClose = () => {
        handleStop();
        onClose();
    };

    const handlePlay = () => {
        setIsPlaying(true);
        onPlay((prog) => setProgress(prog * 100));
    };

    const handleStop = () => {
        setIsPlaying(false);
        setProgress(0);
        onStop();
    };

    const handlePause = () => {
        setIsPlaying(false);
        onStop();
    };

    const formatScript = (text: string) => {
        return text.split('\n').map((line, idx) => {
            const trimmed = line.trim();

            // Skip music cues
            if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
                return (
                    <div key={idx} className="text-center text-xs text-muted-foreground italic py-2">
                        {trimmed}
                    </div>
                );
            }

            // Detect speaker
            const speakerMatch = trimmed.match(/^(Priya|Raj):/);
            if (speakerMatch) {
                const speaker = speakerMatch[1];
                const text = trimmed.substring(speaker.length + 1).trim();
                const isPriya = speaker === 'Priya';

                return (
                    <div key={idx} className={cn(
                        "flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2",
                        isPriya ? "justify-start" : "justify-end"
                    )}>
                        <div className={cn(
                            "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
                            isPriya
                                ? "bg-primary/10 text-foreground rounded-tl-none"
                                : "bg-secondary/20 text-foreground rounded-tr-none"
                        )}>
                            <div className="flex items-center gap-2 mb-1">
                                <div className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                                    isPriya ? "bg-primary text-white" : "bg-secondary text-white"
                                )}>
                                    {speaker[0]}
                                </div>
                                <span className="text-xs font-bold">{speaker}</span>
                            </div>
                            <p className="text-sm leading-relaxed">{text}</p>
                        </div>
                    </div>
                );
            }

            // Empty lines
            if (!trimmed) {
                return <div key={idx} className="h-2" />;
            }

            // Regular text
            return (
                <p key={idx} className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {trimmed}
                </p>
            );
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <DialogTitle className="text-xl font-black tracking-tight mb-2">
                                🎙️ Podcast Mode
                            </DialogTitle>
                            <DialogDescription className="text-sm">
                                {title}
                            </DialogDescription>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleClose} className="rounded-full shrink-0">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>

                {/* Player Controls */}
                <div className="px-6 py-4 bg-muted/30 border-b space-y-4">
                    <div className="flex items-center justify-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full h-12 w-12"
                            disabled
                        >
                            <SkipBack className="h-5 w-5" />
                        </Button>

                        {!isPlaying ? (
                            <Button
                                size="icon"
                                className="rounded-full h-16 w-16 shadow-lg"
                                onClick={handlePlay}
                            >
                                <Play className="h-6 w-6 ml-1" />
                            </Button>
                        ) : (
                            <Button
                                size="icon"
                                variant="destructive"
                                className="rounded-full h-16 w-16 shadow-lg"
                                onClick={handlePause}
                            >
                                <Pause className="h-6 w-6" />
                            </Button>
                        )}

                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full h-12 w-12"
                            disabled
                        >
                            <SkipForward className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{Math.floor(progress)}%</span>
                            <span className="flex items-center gap-1">
                                <Volume2 className="h-3 w-3" />
                                Podcast Mode
                            </span>
                        </div>
                    </div>

                    {/* Toggle Script View */}
                    <div className="flex justify-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowScript(!showScript)}
                            className="text-xs"
                        >
                            {showScript ? "Hide" : "Show"} Conversation Script
                        </Button>
                    </div>
                </div>

                {/* Script Content */}
                {showScript && (
                    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
                        {formatScript(script)}
                    </div>
                )}

                {!showScript && (
                    <div className="flex-1 flex items-center justify-center px-6 py-12">
                        <div className="text-center space-y-4 max-w-md">
                            <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                                <Volume2 className="w-12 h-12 text-primary" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg">
                                    {isPlaying ? "Playing Podcast..." : "Ready to Listen"}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {isPlaying
                                        ? "Sit back and listen to a friendly conversation explaining this service in simple terms."
                                        : "Press play to hear a conversational explanation of this service, just like a podcast!"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
