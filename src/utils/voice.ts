export const speak = (text: string, onEnd?: () => void) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = onEnd || null;
    // Default to local voices
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
    window.speechSynthesis.cancel();
};

export const startListening = (onResult: (text: string) => void, onError: (err: any) => void) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
        onError("Speech recognition not supported in this browser.");
        return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN'; // Default to Indian English, can be expanded
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
    };

    recognition.onerror = (event: any) => {
        onError(event.error);
    };

    recognition.start();
    return recognition;
};
