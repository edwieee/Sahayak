import sys
import asyncio
import edge_tts
import uuid
import os

# Voice configurations for supported languages
VOICES = {
    'en': 'en-IN-NeerjaNeural',
    'hi': 'hi-IN-SwaraNeural',
    'ml': 'ml-IN-SobhanaNeural',
    'ta': 'ta-IN-PallaviNeural',
    'te': 'te-IN-MohanNeural',
    'kn': 'kn-IN-GaganNeural',
    'bn': 'bn-IN-TanishaaNeural',
    'mr': 'mr-IN-AarohiNeural',
    'gu': 'gu-IN-DhwaniNeural'
}

async def main():
    try:
        # Args: 1=Text, 2=LanguageCode, 3=OutputDir
        if len(sys.argv) < 4:
            print("Error: Missing arguments")
            return

        text = sys.argv[1]
        lang = sys.argv[2]
        output_dir = sys.argv[3]

        voice = VOICES.get(lang, 'en-IN-NeerjaNeural')
        
        # Generate unique filename
        filename = f"tts_{uuid.uuid4()}.mp3"
        output_path = os.path.join(output_dir, filename)

        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(output_path)

        # Print just the filename to stdout for Node.js to capture
        print(filename)

    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(main())
