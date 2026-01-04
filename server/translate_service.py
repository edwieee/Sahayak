import sys
import json
from deep_translator import GoogleTranslator

# Supported language map cleanup (frontend code -> google translate code)
LANG_MAP = {
    'en': 'en',
    'hi': 'hi',
    'ml': 'ml',
    'ta': 'ta',
    'te': 'te',
    'kn': 'kn',
    'bn': 'bn',
    'mr': 'mr',
    'gu': 'gu'
}

def translate_text(text, target_lang):
    try:
        if not text:
            return ""
        
        # Deep Translator batch limits might exist, but for single/small batch it's fine.
        # If it is a list of strings
        if isinstance(text, list):
             translator = GoogleTranslator(source='auto', target=target_lang)
             return translator.translate_batch(text)
        
        # Single string
        translator = GoogleTranslator(source='auto', target=target_lang)
        return translator.translate(text)
    except Exception as e:
        return text # Fallback to original

def main():
    try:
        # Expecting JSON input via stdin or arguments
        # Usage: python translate_service.py <target_lang> <json_string_payload>
        
        if len(sys.argv) < 3:
            print(json.dumps({"error": "Missing arguments"}))
            return

        target_lang_code = sys.argv[1]
        payload_str = sys.argv[2]
        
        target_lang = LANG_MAP.get(target_lang_code, 'en')
        
        if target_lang == 'en':
             # No op if target is english (assuming source is english)
             print(payload_str)
             return

        data = json.loads(payload_str)
        
        translated_data = {}
        
        # We handle specific structure: either a dict of keys or a single text
        if isinstance(data, dict):
            for key, value in data.items():
                if isinstance(value, str):
                    translated_data[key] = translate_text(value, target_lang)
                elif isinstance(value, list):
                    # List of strings?
                    if len(value) > 0 and isinstance(value[0], str):
                         translated_data[key] = translate_text(value, target_lang)
                    else:
                         translated_data[key] = value # complex objects not supported deep
                else:
                    translated_data[key] = value
        else:
             # Just a simple text? (Shouldn't happen with our controller logic but safety check)
             pass

        print(json.dumps(translated_data, ensure_ascii=False))

    except Exception as e:
        # Output error as json
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
