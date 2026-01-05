// Podcast-style conversational text generator
// Converts service data into a natural two-person conversation

interface ServiceData {
    title: string;
    description: string;
    steps: string[];
    documents_required: string[];
    eligibility: string;
    notes?: string;
    category?: string;
}

export function generatePodcastScript(data: ServiceData): string {
    const host = "Priya";
    const expert = "Raj";

    const script = `
[Intro Music Fades]

${host}: Hello everyone! Welcome back to Sahayak Simplified, where we break down government services and schemes into simple, easy-to-understand conversations. I'm ${host}, and today I have ${expert} with me, our expert guide.

${expert}: Hi ${host}! Hi everyone! Great to be here.

${host}: So ${expert}, today we're talking about "${data.title}". Can you tell us what this is all about?

${expert}: Absolutely! ${data.description}

${host}: That sounds really helpful! So, if someone wants to apply for this, what do they need to do? Can you walk us through the steps?

${expert}: Of course! Let me break it down step by step.

${data.steps.map((step, idx) => `
${expert}: Step ${idx + 1}: ${step}

${host}: ${getHostResponse(idx, data.steps.length)}
`).join('\n')}

${host}: Got it! Now, what documents would someone need to have ready before they start this process?

${expert}: Good question! Here's what you'll need to bring:

${data.documents_required.map((doc, idx) => `
${expert}: ${idx === 0 ? 'First' : idx === data.documents_required.length - 1 ? 'And finally' : 'Next'}, you'll need ${doc}.
`).join('\n')}

${host}: Okay, so make sure you have all those documents ready. Now, is everyone eligible for this, or are there specific criteria?

${expert}: Great question! ${data.eligibility}

${host}: That's important to know. ${data.notes ? `Is there anything else people should keep in mind?` : 'Thanks for explaining that so clearly!'}

${data.notes ? `${expert}: Yes! ${data.notes}

${host}: That's really helpful to know!` : ''}

${host}: Before we wrap up, ${expert}, what would you say is the most important thing for someone to remember about ${data.title}?

${expert}: I'd say the most important thing is to have all your documents ready beforehand. That way, the process will be much smoother and faster. And remember, this service is designed to help you, so don't hesitate to reach out if you need assistance!

${host}: Perfect advice! Thank you so much, ${expert}, for breaking this down for us today.

${expert}: My pleasure, ${host}! Happy to help.

${host}: And to all our listeners, if you found this helpful, make sure to save this service in your Sahayak app so you get updates about any changes. Until next time, this is Sahayak Simplified!

[Outro Music]
  `.trim();

    return script;
}

function getHostResponse(stepIndex: number, totalSteps: number): string {
    const responses = [
        "Okay, that makes sense.",
        "Right, got it.",
        "That's clear.",
        "Understood.",
        "Makes sense!",
        "Okay, and then?",
        "I see.",
        "That's straightforward.",
    ];

    if (stepIndex === totalSteps - 1) {
        return "Perfect! That's the final step then.";
    }

    return responses[stepIndex % responses.length];
}

// Text-to-speech with podcast-style pacing
export async function speakPodcast(
    script: string,
    onComplete?: () => void,
    onProgress?: (progress: number) => void
): Promise<void> {
    if (!('speechSynthesis' in window)) {
        throw new Error('Text-to-speech not supported in this browser');
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    // Preload voices to reduce delay
    let voices = speechSynthesis.getVoices();
    if (voices.length === 0) {
        // Wait for voices to load
        await new Promise<void>((resolve) => {
            speechSynthesis.onvoiceschanged = () => {
                voices = speechSynthesis.getVoices();
                resolve();
            };
            // Timeout after 500ms if voices don't load
            setTimeout(resolve, 500);
        });
    }

    return new Promise((resolve) => {
        // Split script into segments for better pacing
        const segments = script
            .split('\n\n')
            .filter(line => line.trim() && !line.includes('[') && !line.includes(']'))
            .map(seg => seg.trim());

        let currentSegment = 0;
        const totalSegments = segments.length;

        // Select best voice once
        const preferredVoice = voices.find(v =>
            v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Female'))
        ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

        const speakSegment = () => {
            if (currentSegment >= totalSegments) {
                onComplete?.();
                resolve();
                return;
            }

            const utterance = new SpeechSynthesisUtterance(segments[currentSegment]);

            // Configure voice for podcast feel
            utterance.rate = 0.95; // Slightly slower for clarity
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            utterance.voice = preferredVoice;

            utterance.onend = () => {
                currentSegment++;
                onProgress?.(currentSegment / totalSegments);

                // Reduced pause between segments for smoother flow
                if (currentSegment < totalSegments) {
                    setTimeout(speakSegment, 150); // Reduced from 300ms
                } else {
                    onComplete?.();
                    resolve();
                }
            };

            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event);
                currentSegment++;
                if (currentSegment < totalSegments) {
                    setTimeout(speakSegment, 100);
                } else {
                    onComplete?.();
                    resolve();
                }
            };

            // Start speaking immediately
            speechSynthesis.speak(utterance);
        };

        // Start immediately
        speakSegment();
    });
}

export function stopPodcast(): void {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
    }
}
